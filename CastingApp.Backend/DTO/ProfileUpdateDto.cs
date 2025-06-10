using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using CastingApp.Backend.Models;
namespace CastingApp.Backend.DTO;

public class ProfileUpdateDto
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string ProfileImageUrl { get; set; }
    public string Location { get; set; }
}