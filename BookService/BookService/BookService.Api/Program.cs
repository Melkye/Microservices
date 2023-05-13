using BookService.BLL.Interfaces;
using BookService.DAL.Interfaces;
using BookService.DAL.Repositories;
using BookService.BLL.Orchestrators;
using BookService.DAL.DbAccess;
using BookService.Api.Middlewares;
using Microsoft.EntityFrameworkCore;
using BookService.DAL.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddLogging();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IBookOrchestrator, BookOrchestrator>();
builder.Services.AddScoped<IBookRepository, BookRepository>();

var host = Environment.GetEnvironmentVariable("POSTGRES_HOST");
var port = Environment.GetEnvironmentVariable("POSTGRES_PORT");
var db = Environment.GetEnvironmentVariable("POSTGRES_DB");
var username = Environment.GetEnvironmentVariable("POSTGRES_USER");
var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");

var connectionString = $"host={host};port={port};database={db};username={username};password={password};";

builder.Services.AddNpgsql<BookDbContext>(connectionString);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    var context = serviceScope.ServiceProvider.GetService<BookDbContext>();

    var pendingMigrations = context.Database.GetPendingMigrations();
    if (pendingMigrations.Any())
    {
        context.Database.Migrate();
    }

    if (!context.Books.Any())
    {
        context.Books.AddRange(
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

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<GlobalErrorHandlingMiddleware>();

app.MapControllers();

app.Run();
