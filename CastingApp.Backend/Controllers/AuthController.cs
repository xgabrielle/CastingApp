using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.DTO;
using CastingApp.Backend.Models;


namespace CastingApp.Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var user = new ApplicationUser { UserName = model.Username, Email = model.Email, };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            Console.WriteLine("User Created");
            return Ok("User Created");
        }
        else
        {
            Console.WriteLine("Bad Request");
            return BadRequest(result.Errors);
        }
    }
}