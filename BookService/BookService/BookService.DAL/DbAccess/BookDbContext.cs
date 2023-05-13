using BookService.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookService.DAL.DbAccess;
public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    public DbSet<Book> Books { get; set; }
}
