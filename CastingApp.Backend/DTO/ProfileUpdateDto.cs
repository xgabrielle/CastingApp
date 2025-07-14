namespace CastingApp.Backend.DTO;

public class ProfileUpdateDto
{
    public string? Email { get; set; }
    public string? ProfileName { get; set; }
    public IFormFile? ProfileImageUrl { get; set; }
    public string? Location { get; set; }
}