using System.Runtime;

namespace CastingApp.Backend.Model;

public class User
{
    public int Id { get; set; }
    internal string Username { get; set; }
    internal string Email { get; set; }
    internal string PasswordHash { get; set; }
    
    internal Profile Profile { get; set; }
}