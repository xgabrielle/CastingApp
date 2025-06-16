namespace CastingApp.Backend.DTO;

public class CreateAdDto
{
    public string Description { get; set; }
    public IFormFile PdfFile { get; set; }
}