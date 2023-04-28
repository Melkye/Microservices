using System.Collections.Generic;
using System.Linq;
using BookService.DAL.DbAccess;
using BookService.DAL.Entities;
using BookService.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

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
        var books = _dbContext.Books.ToList();
        return books;
    }

    public Book? GetById(int id)
    {
        return _dbContext.Books.FirstOrDefault(x => x.Id == id);
    }

    public Book Create(Book book)
    {
        var createdEntity = _dbContext.Books.Add(book);
        _dbContext.SaveChanges();
        return createdEntity.Entity;
    }

    public Book Update(Book book)
    {
        var updatedEntity = _dbContext.Books.Update(book);
        _dbContext.SaveChanges();
        return updatedEntity.Entity;
    }

    public void Delete(Book book)
    {
        _dbContext.Books.Remove(book);
        _dbContext.SaveChanges();
    }
}
