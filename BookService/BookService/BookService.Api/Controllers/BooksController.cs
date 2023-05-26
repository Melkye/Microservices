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
        _logger.LogInformation("Trying to get all books");
        var books = await _bookOrchestrator.GetAllAsync();
        _logger.LogInformation("Successfull get all books");

        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        _logger.LogInformation("Trying to get book  by id");
        var book = await _bookOrchestrator.GetByIdAsync(id);
        _logger.LogInformation("Successfull get book by id");

        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync(CreateBook bookModel)
    {
        _logger.LogInformation("Trying to create book");

        var bookDto = _mapper.Map<BookDto>(bookModel);

        var createdBook = await _bookOrchestrator.CreateAsync(bookDto);
        _logger.LogInformation("Successfull book creation");


        return Ok(createdBook);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAsync(int id, UpdateBook bookModel)
    {
        _logger.LogInformation("Trying to update book");

        var bookDto = _mapper.Map<BookDto>(bookModel);
        bookDto.Id = id;

        var updatedBook = await _bookOrchestrator.UpdateAsync(bookDto);
        _logger.LogInformation("Successful book update");


        return Ok(updatedBook);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        _logger.LogInformation("Trying to delete book");

        await _bookOrchestrator.DeleteByIdAsync(id);
        _logger.LogInformation("Successful book deletion");

        return NoContent();
    }
}
