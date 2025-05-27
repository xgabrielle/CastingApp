using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.DTO;


namespace CastingApp.Backend.Controllers;
[ApiController]
[Route("controller")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;

    internal AuthController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("register")]
    internal async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var user = new IdentityUser { UserName = model.Username, Email = model.Email, };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
            return Ok("User Created");
   
        return BadRequest(result.Errors);
    }
}