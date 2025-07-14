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
    public async Task<IActionResult> UpdateProfile([FromForm] ProfileUpdateDto updateDto)
    {
        var user = await GetCurrentUser(); // get current logged in user
        if (user == null) return Unauthorized();

        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.UserId == user.Id); // load the user's profile from the DB

        if (profile == null)
        {
            return NotFound("Profile not found.");
        }

        profile.ProfileName = updateDto.ProfileName;
        profile.Location = updateDto.Location;
        profile.Email = updateDto.Email;
        // Roles

        if (updateDto.ProfileImageUrl != null && updateDto.ProfileImageUrl.Length > 0)
        {
            // folder to save the files
            var uploadImage = Path.Combine("wwwroot", "uploads", "images");
            Directory.CreateDirectory(uploadImage);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + updateDto.ProfileImageUrl.FileName;
            var filePath = Path.Combine(uploadImage, uniqueFileName);
            
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await updateDto.ProfileImageUrl.CopyToAsync(stream);
            }
            
            profile.ProfileImageUrl = $"/uploads/{uniqueFileName}";

        }
        else
        {
            Console.WriteLine("Not able to upload image");
        }
        await _context.SaveChangesAsync();

        return Ok(new
        {
            profileName = profile.ProfileName,
            location = profile.Location,
            profileImageUrl = profile.ProfileImageUrl,
            email = profile.Email
            // Roles
        });
    }
}