using System.ComponentModel.DataAnnotations;

namespace CastingApp.Backend.DTO;

public class RegisterDto
{
    [Required]
    internal string Username { get; set; }
    
    [Required]
    [EmailAddress]
    internal string Email { get; set; }
    
    [Required]
    [MinLength(5)]
    internal string Password { get; set; }
}