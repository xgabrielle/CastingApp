using CastingApp.Backend.DTO;
using CastingApp.Backend.Models;

namespace CastingApp.Backend.Services;

public interface IProfileService
{
    public Task<ApplicationUser> GetProfileAsync(string userId);
    public Task<bool> UpdateProfileAsync(string userId, ProfileUpdateDto dto);
}