﻿using System.ComponentModel.DataAnnotations;

namespace CastingApp.Backend.DTO;

public class RegisterDto
{
    [Required]
    public required string Username { get; set; }
    
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    
    [Required]
    [MinLength(5)]
    public required string Password { get; set; }
}