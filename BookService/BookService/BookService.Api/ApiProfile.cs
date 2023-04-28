using AutoMapper;
using BookService.API.Models;
using BookService.BLL.Dtos;
using BookService.DAL.Entities;

namespace BookService.API;

public class ApiProfile : Profile
{
    public ApiProfile()
    {
        CreateMap<CreateBook, BookDto>();
        CreateMap<UpdateBook, BookDto>();
    }

}
