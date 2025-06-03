using CastingApp.Backend.DTO;
using CastingApp.Backend.Models;
using CastingApp.Backend.Services;
using Microsoft.AspNetCore.Identity;

namespace CastingApp.Backend.Services;

public class ProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<ApplicationUser> GetProfileAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }
    
    public async Task<bool> UpdateProfileAsync(string userId, ProfileUpdateDto dto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return false;

        user.ProfileName = dto.Name;
        user.ProfileImageUrl = dto.ProfileImageUrl;
        user.Email = dto.Email;

        var result = await _userManager.UpdateAsync(user);
        return result.Succeeded;
    }
}