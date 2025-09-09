using Microsoft.AspNetCore.Mvc;
using CastingApp.Backend.Data;
using CastingApp.Backend.DTO;
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
        var userId = User.FindFirst("id")!.Value;
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return BadRequest("User not found");
        
        var ad = new CastingAd()
        {
            AdTitle = dto.AdTitle,
            Description = dto.Description,
            UploadDate = DateTime.UtcNow,
            UserId = userId,
            UserName = user.UserName
        };

        if (dto.PdfFile != null)
        {
            using var ms = new MemoryStream();
            await dto.PdfFile.CopyToAsync(ms);
            ad.PdfFile = ms.ToArray();
            ad.PdfFileName = dto.PdfFile.FileName;
        }

        _context.Ads.Add(ad);
        await _context.SaveChangesAsync();

        return Ok(new {ad.Id});
        
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAds([FromQuery] int? userId, [FromQuery] string? search)
    {
        var query = _context.Ads.AsQueryable();

        if (userId.HasValue)
            query = query.Where(ad => ad.UserId == userId.Value.ToString());

        if (!string.IsNullOrEmpty(search))
            query = query.Where(ad =>
                ad.AdTitle.Contains(search) || ad.Description.Contains(search));
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

        var dto = new GetAdDTO
        {
            Id = ad.Id,
            Title = ad.AdTitle,
            Description = ad.Description,
            UploadDate = ad.UploadDate,
            UserName = ad.UserName,
            PdfFileName = ad.PdfFileName,
            PdfDownloadUrl = ad.PdfFile != null ? Url.Action(nameof(DownloadPdf), new {id = ad.Id}) : null
        };
        return Ok(dto);
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateAd(int id, [FromForm] CreateAdDto dto)
    {
        var userId = User.FindFirst("id").Value;
        var ad = await _context.Ads.FindAsync(id);

        if (ad == null) return NotFound();
        if (ad.UserId != userId) return Forbid();

        ad.AdTitle = dto.AdTitle;
        ad.Description = dto.Description;

        if (dto.PdfFile != null)
        {
            using var ms = new MemoryStream();
            await dto.PdfFile.CopyToAsync(ms);
            ad.PdfFile = ms.ToArray();
            ad.PdfFileName = dto.PdfFile.FileName;
        }

        await _context.SaveChangesAsync();
        return Ok(ad);
    }
    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteAd(int id)
    {
        var userId = User.FindFirst("id").Value;
        var ad = await _context.Ads.FindAsync(id);

        if (ad == null) return NotFound();
        if (ad.UserId != userId) return Forbid();

        _context.Ads.Remove(ad);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpGet("{id}/pdf")]
    public async Task<IActionResult> DownloadPdf(int id)
    {
        var ad = await _context.Ads.FindAsync(id);
        if (ad == null || ad.PdfFile == null)
            return NotFound();

        return File(ad.PdfFile, "application/pdf", ad.PdfFileName);
    }




}