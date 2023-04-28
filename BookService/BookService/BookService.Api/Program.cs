using BookService.BLL.Interfaces;
using BookService.DAL.Interfaces;
using BookService.DAL.Repositories;
using BookService.BLL.Orchestrators;
using BookService.DAL.DbAccess;
using Microsoft.EntityFrameworkCore;
using BookService.Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IBookOrchestrator, BookOrchestrator>();
builder.Services.AddScoped<IBookRepository, BookRepository>();

builder.Services.AddDbContext<BookDbContext>(options => options.UseInMemoryDatabase("Books"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<GlobalErrorHandlingMiddleware>();

app.MapControllers();

app.Run();
