using BookService.BLL.Dtos;

namespace BookService.BLL.Interfaces;
public interface IBookService
{
    BookDto Create(BookDto dto);
    void DeleteById(int id);
    IEnumerable<BookDto> GetAll();
    BookDto GetById(int id);
    BookDto Update(BookDto dto);
}