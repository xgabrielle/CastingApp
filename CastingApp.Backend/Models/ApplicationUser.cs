using Microsoft.AspNetCore.Identity;

namespace CastingApp.Backend.Models;

public class ApplicationUser : IdentityUser
{
    public string? ProfileName { get; set; }
    public string? ProfileImageUrl { get; set; }
}