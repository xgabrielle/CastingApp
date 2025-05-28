using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CastingApp.Backend.Models;

public class Profile
{
    [Key]
    public int UserId { get; set; }
    public string? ProfileName { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? Location { get; set; }
    
    [ForeignKey("UserId")]
    public User? User { get; set; }
}