using CastingApp.Backend.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

Env.Load();
var builder = WebApplication.CreateBuilder(args);


var connectionStringBase = builder.Configuration.GetConnectionString("DefaultConnection");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

string? finalConnectionString = !string.IsNullOrEmpty(dbPassword) 
    ? $"{connectionStringBase}Password={dbPassword}"
    : connectionStringBase;

if (string.IsNullOrEmpty(dbPassword))
    Console.WriteLine("Warning: DB_PASSWORD environment variable not set.");

// Register PostgreSQL EF Core DbContext
builder.Services.AddNpgsql<ApplicationDbContext>(finalConnectionString);


// Swagger (OpenAPI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();


