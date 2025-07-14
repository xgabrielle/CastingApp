using Microsoft.AspNetCore.Identity;

namespace CastingApp.Backend.Models;

public class ApplicationUser : IdentityUser
{
    public string? ProfileName { get; set; }
    public string? Email { get; set; }
    
    public List<CastingAd> Ads { get; set; }
    public Profile? Profile { get; set; }
}