
using AutoMapper;
using BookService.BLL.Dtos;
using BookService.DAL.Entities;

namespace BookService.BLL;
public class BusinessProfile : Profile
{
    public BusinessProfile()
    {
        CreateMap<Book, BookDto>()
            .ReverseMap();
    }
    
}
