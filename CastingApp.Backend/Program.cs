using Microsoft.Extensions.Configuration;
using CastingApp.Backend.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication();


var connectionString = $"Host={Env.GetString("DB_HOST")};Port={Env.GetString("DB_PORT")};Database={Env.GetString("DB_NAME")};Username={Env.GetString("DB_USERNAME")};Password={Env.GetString("DB_PASSWORD")}";

Console.WriteLine($"Connection string: {connectionString}");

if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("Connection string is missing in configuration.");
}

// Register PostgreSQL EF Core DbContext
builder.Services.AddNpgsql<ApplicationDbContext>(connectionString);

Console.WriteLine($"🔐 Final connection string: {connectionString}");

// Register controllers
builder.Services.AddControllers();

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

// Map controller endpoints
app.MapControllers();

app.Run();


