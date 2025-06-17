using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CastingApp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddAdTitleToCastingAd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdTitle",
                table: "Ads",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdTitle",
                table: "Ads");
        }
    }
}
