using BookService.BLL.Dtos;
using BookService.DAL.Entities;

namespace BookService.BLL.Interfaces;
public interface IBookOrchestrator
{
    Task<BookDto> CreateAsync(BookDto dto);
    Task DeleteByIdAsync(int id);
    Task<IEnumerable<BookDto>> GetAllAsync();
    Task<BookDto> GetByIdAsync(int id);
    Task<BookDto> UpdateAsync(BookDto dto);
}