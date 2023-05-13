using AutoMapper;
using BookService.API.Models;
using BookService.BLL.Dtos;
using BookService.BLL.Interfaces;
using BookService.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BookService.Api.Controllers;
[ApiController]
[Route("/books")]
public class BooksController : ControllerBase
{
    private readonly IBookOrchestrator _bookOrchestrator;
    private readonly IMapper _mapper;
    private readonly ILogger<BooksController> _logger;

    public BooksController(
        IBookOrchestrator bookService,
        IMapper mapper,
        ILogger<BooksController> logger)
    {
        _bookOrchestrator = bookService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var books = await _bookOrchestrator.GetAllAsync();

        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var book = await _bookOrchestrator.GetByIdAsync(id);

        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync(CreateBook bookModel)
    {
        var bookDto = _mapper.Map<BookDto>(bookModel);

        var createdBook = await _bookOrchestrator.CreateAsync(bookDto);

        return Ok(createdBook);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAsync(int id, UpdateBook bookModel)
    {
        var bookDto = _mapper.Map<BookDto>(bookModel);
        bookDto.Id = id;

        var updatedBook = await _bookOrchestrator.UpdateAsync(bookDto);

        return Ok(updatedBook);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        await _bookOrchestrator.DeleteByIdAsync(id);
        return NoContent();
    }
}
