using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.Data;
using CastingApp.Backend.DTO;
using Microsoft.AspNetCore.Identity;
using CastingApp.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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
        return await _userManager.GetUserAsync(User);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetProfile()
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();
        
        // Find the Profile entity for the current user
        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.UserId.ToString() == user.Id);

        if (profile == null)
        {
            return NotFound("Profile not found.");
        }
        var result = new 
        {
            profile.ProfileName,
            profile.Location,
            profile.ProfileImageUrl
        };
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateDto updateDto)
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();

        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.UserId.ToString() == user.Id);

        if (profile == null)
        {
            return NotFound("Profile not found.");
        }

        profile.ProfileName = updateDto.Name;
        profile.ProfileImageUrl = updateDto.ProfileImageUrl;
        profile.Location = updateDto.Location;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            profile.ProfileName,
            profile.Location,
            profile.ProfileImageUrl
        });
    }
}