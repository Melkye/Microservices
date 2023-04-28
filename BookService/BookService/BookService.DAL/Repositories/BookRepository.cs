using System.Collections.Generic;
using System.Threading.Tasks;
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

    public async Task<IEnumerable<Book>> GetAllAsync()
    {
        var books = await _dbContext.Books.ToListAsync();
        return books;
    }

    public async Task<Book?> GetByIdAsync(int id)
    {
        return await _dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Book> CreateAsync(Book book)
    {
        var createdEntity = await _dbContext.Books.AddAsync(book);
        await _dbContext.SaveChangesAsync();
        return createdEntity.Entity;
    }

    public async Task<Book> UpdateAsync(Book book)
    {
        var entity = await _dbContext.Books.FirstAsync(b => b.Id == book.Id);

        entity.Author = book.Author;
        entity.Description = book.Description;
        entity.Title = book.Title;

        await _dbContext.SaveChangesAsync();

        return entity;
    }

    public async Task DeleteAsync(Book book)
    {
        var existingEntity = await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == book.Id);
        _dbContext.Books.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }
}
