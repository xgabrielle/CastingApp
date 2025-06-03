using CastingApp.Backend.Models;

namespace CastingApp.Backend.Services;

public interface ITokenService
{
    string CreateToken(ApplicationUser user);
}