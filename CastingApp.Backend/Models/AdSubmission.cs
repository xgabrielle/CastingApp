namespace CastingApp.Backend.Models;

public class AdSubmission
{
    public int Id { get; set; }

    public string VideoUrl { get; set; }

    public int AdId { get; set; }         
    public CastingAd Ad { get; set; }

    public string UserId { get; set; }        
    public ApplicationUser User { get; set; }

    public DateTime SubmittedAt { get; set; }
}