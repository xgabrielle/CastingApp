using CastingApp.Backend.Models;

namespace CastingApp.Backend.DTO;

public class CreateAdDto
{
    public string AdTitle { get; set; }
    public ApplicationUser UserName { get; set; }
    public string Description { get; set; }
    public IFormFile PdfFile { get; set; }
    public DateTime UploadDate { get; set; }
}