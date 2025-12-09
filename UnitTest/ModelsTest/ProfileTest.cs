using CastingApp.Backend.Models;
using Xunit;
using FluentAssertions;

namespace UnitTest.ModelsTest;

public class ProfileTest
{
    // ACT
    // ASSERT
    // ARRANGE

    [Fact]
    public void Profile_Start_At_Default()
    {
        var profile = new Profile();

        profile.Email.Should().BeNull();
        profile.Location.Should().BeNull();
        profile.ProfileImageUrl.Should().BeNull();
        profile.ProfileName.Should().BeNull();
        profile.User.Should().BeNull();
        profile.UserId.Should().BeNull();
    }

    [Fact]
    public void Profile_Variables_Can_Be_Assigned()
    {
        var user = new ApplicationUser(){Id = "123"};
        var profile = new Profile()
        {
            Email = "testmail@email.com",
            Location = "Stockholm",
            ProfileImageUrl = "http://image.com/pic.jpg",
            ProfileName = "TestName",
            User = user,
            UserId = "123"
        };

        profile.Email.Should().Be("testmail@email.com");
        profile.Location.Should().Be("Stockholm");
        profile.ProfileImageUrl.Should().Be("http://image.com/pic.jpg");
        profile.ProfileName.Should().Be("TestName");
        profile.User.Should().Be(user);
        profile.UserId.Should().Be("123");

    }
}