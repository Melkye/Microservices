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
    private readonly IBookOrchestrator _bookService;
    private readonly IMapper _mapper;
    private readonly ILogger<BooksController> _logger;

    public BooksController(
        IBookOrchestrator bookService,
        IMapper mapper,
        ILogger<BooksController> logger)
    {
        _bookService = bookService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<GetBook>> GetAll()
    {
        var books = _bookService.GetAll();

        return Ok(books);
    }

    [HttpGet("{id}")]
    public ActionResult<GetBook> GetById(int id)
    {
        var book = _bookService.GetById(id);

        return Ok(book);
    }

    [HttpPost]
    public ActionResult<GetBook> Post(CreateBook bookModel)
    {
        var bookDto = _mapper.Map<BookDto>(bookModel);

        var createdBook = _bookService.Create(bookDto);

        return Ok(createdBook);
    }

    [HttpPut("{id}")]
    public ActionResult<GetBook> Put(int id, UpdateBook bookModel)
    {
        var bookDto = _mapper.Map<BookDto>(bookModel);
        bookDto.Id = id;

        var updatedBook = _bookService.Create(bookDto);

        return Ok(updatedBook);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        _bookService.DeleteById(id);
        return NoContent();
    }
}
