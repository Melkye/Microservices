using AutoMapper;
using BookService.BLL.Dtos;
using BookService.BLL.Exceptions;
using BookService.BLL.Interfaces;
using BookService.DAL.Entities;
using BookService.DAL.Interfaces;

namespace BookService.BLL.Orchestrators;
public class BookOrchestrator : IBookOrchestrator
{
    private readonly IBookRepository _bookRepository;
    private readonly IMapper _mapper;

    public BookOrchestrator(IBookRepository bookRepository, IMapper mapper)
    {
        _bookRepository = bookRepository;
        _mapper = mapper;
    }

    public IEnumerable<BookDto> GetAll()
    {
        var books = _bookRepository.GetAll();
        var bookDtos = _mapper.Map<IEnumerable<BookDto>>(books);
        return bookDtos;
    }

    public BookDto GetById(int id)
    {
        var book = _bookRepository.GetById(id);

        if (book == null)
        {
            throw new ResourceNotFoundException();
        }

        BookDto bookDto = _mapper.Map<BookDto>(book);
        return bookDto;
    }

    public BookDto Create(BookDto dto)
    {
        var book = _mapper.Map<Book>(dto);

        var createdBook = _bookRepository.Create(book);

        var createdDto = _mapper.Map<BookDto>(createdBook);
        return createdDto;
    }

    public BookDto Update(BookDto dto)
    {
        var existingBook = GetById(dto.Id); // throws exception unless found

        var existingBookDto = _mapper.Map<Book>(existingBook);
        var updatedBook = _bookRepository.Update(existingBookDto);

        var updatedDto = _mapper.Map<BookDto>(updatedBook);
        return updatedDto;
    }
    public void DeleteById(int id)
    {
        var bookDto = GetById(id); // throws exception unless found

        var book = _mapper.Map<Book>(bookDto);
        _bookRepository.Delete(book);
    }
}
