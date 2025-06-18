namespace CastingApp.Backend.DTO;

public class CreateAdDto
{
    public string AdTitle { get; set; }
    public string Description { get; set; }
    public IFormFile PdfFile { get; set; }
}