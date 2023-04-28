using BookService.DAL.Entities;
using Microsoft.EntityFrameworkCore;


namespace BookService.DAL.DbAccess;
public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {

    }
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>().HasData(
            new Book()
            {
                Id = 1,
                Title = "HP",
                Description = "The boy who lived",
                Author = "JKR"
            },
            new Book()
            {
                Id = 2,
                Title = "GoT",
                Description = "Dragon eggs here",
                Author = "GRRM"
            });
    }
}
