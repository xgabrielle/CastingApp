using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.Data;
using CastingApp.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CastingApp.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CastAdController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CastAdController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateAd([FromForm] CreateAdDto dto)
    {
        var userId = int.Parse(User.FindFirst("id").Value);

        // Save PDF (e.g., to wwwroot/uploads)
        var pdfPath = Path.Combine("wwwroot/uploads", Guid.NewGuid() + Path.GetExtension(dto.PdfFile.FileName));
        using (var stream = System.IO.File.Create(pdfPath))
        {
            await dto.PdfFile.CopyToAsync(stream);
        }

        var ad = new CastingAd()
        {
            Description = dto.Description,
            PdfUrl = pdfPath,
            UploadDate = DateTime.UtcNow,
            UserId = userId
        };

        _context.Ads.Add(ad);
        await _context.SaveChangesAsync();

        return Ok(ad);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAds()
    {
        var ads = await _context.Ads
            .Include(a => a.User)
            .ToListAsync();
        return Ok(ads);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAd(int id)
    {
        var ad = await _context.Ads
            .Include(a => a.User)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (ad == null) return NotFound();

        return Ok(ad);
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateAd(int id, [FromForm] CreateAdDto dto)
    {
        var userId = int.Parse(User.FindFirst("id").Value);
        var ad = await _context.Ads.FindAsync(id);

        if (ad == null) return NotFound();
        if (ad.UserId != userId) return Forbid();

        ad.Description = dto.Description;

        if (dto.PdfFile != null)
        {
            var newPath = Path.Combine("wwwroot/uploads", Guid.NewGuid() + Path.GetExtension(dto.PdfFile.FileName));
            using (var stream = System.IO.File.Create(newPath))
            {
                await dto.PdfFile.CopyToAsync(stream);
            }
            ad.PdfUrl = newPath;
        }

        await _context.SaveChangesAsync();
        return Ok(ad);
    }
    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteAd(int id)
    {
        var userId = int.Parse(User.FindFirst("id").Value);
        var ad = await _context.Ads.FindAsync(id);

        if (ad == null) return NotFound();
        if (ad.UserId != userId) return Forbid();

        _context.Ads.Remove(ad);
        await _context.SaveChangesAsync();

        return NoContent();
    }



}