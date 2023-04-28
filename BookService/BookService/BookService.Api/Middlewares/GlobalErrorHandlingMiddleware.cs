using System.Net;
using System.Text.Json;
using BookService.BLL.Exceptions;
using Microsoft.AspNetCore.Http;

namespace BookService.Api.Middlewares;
public class GlobalErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {

            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        var exceptionResult = JsonSerializer.Serialize(new { error = ex.Message });
        context.Response.ContentType = "application/json";

        context.Response.StatusCode = ex switch
        {
            ResourceNotFoundException => (int)HttpStatusCode.NotFound,
            _ => (int)HttpStatusCode.InternalServerError
        };

        return context.Response.WriteAsync(exceptionResult);
    }
}
