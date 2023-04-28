FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 433

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["BookService/BookService.Api/BookService.Api.csproj", "BookService.Api/"]
COPY ["BookService/BookService.BLL/BookService.BLL.csproj", "BookService.BLL/"]
COPY ["BookService/BookService.DAL/BookService.DAL.csproj", "BookService.DAL/"]
RUN dotnet restore "BookService.Api/BookService.Api.csproj"
COPY . .
WORKDIR "/BookService/BookService.Api"
RUN dotnet build "BookService.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BookService.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookService.Api.dll"]