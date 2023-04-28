using System.Collections.Generic;
using BookService.DAL.Entities;

namespace BookService.DAL.Interfaces;
public interface IBookRepository
{
    Book Create(Book book);
    void Delete(Book book);
    Book? GetById(int id);
    IEnumerable<Book> GetAll();
    Book Update(Book book);
}