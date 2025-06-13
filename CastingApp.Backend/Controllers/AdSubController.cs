using CastingApp.Backend.Data;
using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CastingApp.Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AdSubController : ControllerBase
{
    readonly ApplicationDbContext _context;
    AdSubController(ApplicationDbContext context)
    {
        _context = context;
    }
    [HttpPost("/api/ads/{adId}/submit")]
    [Authorize]
    public async Task<IActionResult> SubmitToAd(int adId, [FromForm] IFormFile videoFile)
    {
        var userId = int.Parse(User.FindFirst("id").Value);
        var ad = await _context.Ads
            .Include(a => a.User)
            .FirstOrDefaultAsync(a => a.Id == adId);

        if (ad == null) return NotFound();

        // Save the uploaded video
        var videoPath = Path.Combine("wwwroot/videos", Guid.NewGuid() + Path.GetExtension(videoFile.FileName));
        using (var stream = System.IO.File.Create(videoPath))
        {
            await videoFile.CopyToAsync(stream);
        }

        var submission = new AdSubmission
        {
            AdId = adId,
            UserId = userId,
            VideoUrl = videoPath,
            SubmittedAt = DateTime.UtcNow
        };
        
        _context.AdSubmission.Add(submission);
        await _context.SaveChangesAsync();

        // TODO: Notify the Ad owner (see below)
        return Ok(submission);
    }

}