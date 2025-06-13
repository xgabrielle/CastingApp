namespace CastingApp.Backend.Data;

public class CreateAdDto
{
    public string Description { get; set; }
    public IFormFile PdfFile { get; set; }
}