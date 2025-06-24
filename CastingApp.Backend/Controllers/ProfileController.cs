using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.Data;
using CastingApp.Backend.DTO;
using Microsoft.AspNetCore.Identity;
using CastingApp.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CastingApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    
    public ProfileController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    private async Task<ApplicationUser> GetCurrentUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return null;
        }

        var user = await _userManager.FindByIdAsync(userId);
        return user;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();
        
        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.UserId == user.Id);

        if (profile == null)
        {
            return NotFound("Profile not found.");
        }
        var result = new 
        {
            profile.ProfileName,
            profile.Location,
            profile.ProfileImageUrl
            // Roles
        };
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateDto updateDto)
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();

        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.UserId == user.Id);

        if (profile == null)
        {
            return NotFound("Profile not found.");
        }

        profile.ProfileName = updateDto.Name;
        profile.ProfileImageUrl = updateDto.ProfileImageUrl;
        profile.Location = updateDto.Location;
        profile.Email = updateDto.Email;
        // Roles

        user.ProfileName = profile.ProfileName;
        user.Email = profile.Email;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            profile.ProfileName,
            profile.Location,
            profile.ProfileImageUrl,
            profile.Email
            // Roles
        });
    }
}