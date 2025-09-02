using CastingApp.Backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.DTO;
using CastingApp.Backend.Models;
using CastingApp.Backend.Services;


namespace CastingApp.Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly ApplicationDbContext _context;

    public AuthController(UserManager<ApplicationUser> userManager, ITokenService tokenService, ApplicationDbContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        try
        {
            var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var profile = new Profile
                {
                    UserId = user.Id,
                    ProfileName = model.Username,
                    Location = "Not specified",
                    ProfileImageUrl = null,
                    Email = model.Email
                };

                _context.Profiles.Add(profile);
                await _context.SaveChangesAsync();
                
                return Ok(new { message = "User and profile created successfully", userId = user.Id });
            }
            else
            {
                return BadRequest(new { errors = result.Errors });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "An error occurred during registration", details = ex.Message });
        }
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var token = _tokenService.CreateToken(user);
            return Ok(new { token });
        }
        
        return Unauthorized("Invalid credentials");
    }
}