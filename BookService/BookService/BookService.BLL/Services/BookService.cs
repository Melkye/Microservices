using BookService.DAL.Entities;
using BookService.BLL.Dtos;
using AutoMapper;
using BookService.DAL.Interfaces;
using BookService.BLL.Interfaces;

namespace BookService.BLL.Services;
public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;
    private readonly IMapper _mapper;

    public BookService(IBookRepository bookRepository, IMapper mapper)
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

        _bookRepository.Create(book);

        var createdDto = GetById(dto.Id);
        return createdDto;
    }

    public BookDto Update(BookDto dto)
    {
        var existingBook = GetById(dto.Id); // throws exception unless found

        var existingBookDto = _mapper.Map<Book>(existingBook);
        _bookRepository.Update(existingBookDto);

        var updatedDto = GetById(dto.Id);
        return updatedDto;
    }
    public void DeleteById(int id)
    {
        var bookDto = GetById(id); // throws exception unless found

        var book = _mapper.Map<Book>(bookDto);
        _bookRepository.Delete(book);
    }
}
