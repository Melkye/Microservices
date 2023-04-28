using System.Collections.Generic;
using BookService.DAL.Entities;

namespace BookService.DAL.Interfaces;
public interface IBookRepository
{
    void Create(Book book);
    void Delete(Book book);
    Book? GetById(int id);
    IEnumerable<Book> GetAll();
    void Update(Book book);
}