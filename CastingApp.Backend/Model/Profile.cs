using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CastingApp.Backend.Model;

public class Profile
{
    [Key]
    internal int UserId { get; set; }
    internal string ProfileName { get; set; }
    internal string ProfileImageUrl { get; set; }
    internal string Location { get; set; }
    
    [ForeignKey("UserId")]
    internal User User { get; set; }
}