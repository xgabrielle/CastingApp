using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CastingApp.Backend.Models;

public class Profile
{
    [Key]
    public string UserId { get; set; }
    public string? ProfileName { get; set; }
    public string? Email { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? Location { get; set; }

    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; }
}