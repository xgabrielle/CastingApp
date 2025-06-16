namespace CastingApp.Backend.Models;

public class CastingAd
{
    public int Id { get; set; }
    public string? Description { get; set; }

    public string? VideoUrl { get; set; }

    public string? PdfUrl { protected get; set; }

    public string? UserId { get; set; } 

    public DateTime UploadDate { get; set; }

    public ApplicationUser User { get; set; }
}