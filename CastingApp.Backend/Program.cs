using System.Text;
using Microsoft.Extensions.Configuration;
using CastingApp.Backend.Data;
using CastingApp.Backend.Services;
using Microsoft.EntityFrameworkCore;
using CastingApp.Backend.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("Connection string is missing.");
}



builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            // Setup token validation
            
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// Register PostgreSQL EF Core DbContext
builder.Services.AddNpgsql<ApplicationDbContext>(connectionString);

// Register controllers
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});


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
else 
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowFrontend");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();


