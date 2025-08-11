using System.Runtime.CompilerServices;

namespace CastingApp.Backend.DTO;

public class GetAdDTO
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    
    public DateTime UploadDate { get; set; }
    public string? UserName { get; set; }
    public string? PdfFileName { get; set; }
    public string? PdfDownloadUrl { get; set; }
}