using System.Collections.Generic;
using System.Threading.Tasks;
using BookService.DAL.Entities;

namespace BookService.DAL.Interfaces;
public interface IBookRepository
{
    Task<Book> CreateAsync(Book book);
    Task DeleteAsync(Book book);
    Task<IEnumerable<Book>> GetAllAsync();
    Task<Book?> GetByIdAsync(int id);
    Task<Book> UpdateAsync(Book book);
}