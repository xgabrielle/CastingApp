using System.Runtime.CompilerServices;

namespace CastingApp.Backend.DTO;

public class GetAdDTO
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string PdfFileUrl { get; set; }
}