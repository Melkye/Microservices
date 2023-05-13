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

    public async Task<IEnumerable<BookDto>> GetAllAsync()
    {
        var books = await _bookRepository.GetAllAsync();
        var bookDtos = _mapper.Map<IEnumerable<BookDto>>(books);
        return bookDtos;
    }

    public async Task<BookDto> GetByIdAsync(int id)
    {
        var book = await _bookRepository.GetByIdAsync(id);

        if (book == null)
        {
            throw new ResourceNotFoundException();
        }

        BookDto bookDto = _mapper.Map<BookDto>(book);
        return bookDto;
    }

    public async Task<BookDto> CreateAsync(BookDto dto)
    {
        var book = _mapper.Map<Book>(dto);

        var createdBook = await _bookRepository.CreateAsync(book);

        var createdDto = _mapper.Map<BookDto>(createdBook);
        return createdDto;
    }

    public async Task<BookDto> UpdateAsync(BookDto dto)
    {
        var existingBook = await GetByIdAsync(dto.Id); // throws exception unless found

        //var existingBookDto = _mapper.Map<Book>(existingBook);
        var bookToUpdate = _mapper.Map<Book>(dto);
        var updatedBook = await _bookRepository.UpdateAsync(bookToUpdate);

        var updatedDto = _mapper.Map<BookDto>(updatedBook);
        return updatedDto;
    }
    public async Task DeleteByIdAsync(int id)
    {
        var bookDto = await GetByIdAsync(id); // throws exception unless found

        var book = _mapper.Map<Book>(bookDto);
        await _bookRepository.DeleteAsync(book);
    }
}
