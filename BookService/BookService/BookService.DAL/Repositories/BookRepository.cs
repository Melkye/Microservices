using System.Collections.Generic;
using System.Linq;
using BookService.DAL.DbAccess;
using BookService.DAL.Entities;
using BookService.DAL.Interfaces;

namespace BookService.DAL.Repositories;
public class BookRepository : IBookRepository
{
    private readonly BookDbContext _dbContext;
    public BookRepository(BookDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<Book> GetAll()
    {
        return _dbContext.Books.ToList();
    }
    public Book? Get(int id)
    {
        return _dbContext.Books.FirstOrDefault(x => x.Id == id);
    }
    public void Create(Book book)
    {
        _dbContext.Books.Add(book);
    }
    public void Update(Book book)
    {
        _dbContext.Books.Update(book);
    }
    public void Delete(Book book)
    {
        _dbContext.Books.Remove(book);
    }
}
