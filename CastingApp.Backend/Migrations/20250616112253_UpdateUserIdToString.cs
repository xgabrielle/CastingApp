using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CastingApp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserIdToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_AspNetUsers_UserId1",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_AdSubmission_AspNetUsers_UserId1",
                table: "AdSubmission");

            migrationBuilder.DropIndex(
                name: "IX_AdSubmission_UserId1",
                table: "AdSubmission");

            migrationBuilder.DropIndex(
                name: "IX_Ads_UserId1",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "AdSubmission");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Ads");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "AdSubmission",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Ads",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_AdSubmission_UserId",
                table: "AdSubmission",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Ads_UserId",
                table: "Ads",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_AspNetUsers_UserId",
                table: "Ads",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AdSubmission_AspNetUsers_UserId",
                table: "AdSubmission",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_AspNetUsers_UserId",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_AdSubmission_AspNetUsers_UserId",
                table: "AdSubmission");

            migrationBuilder.DropIndex(
                name: "IX_AdSubmission_UserId",
                table: "AdSubmission");

            migrationBuilder.DropIndex(
                name: "IX_Ads_UserId",
                table: "Ads");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AdSubmission",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "AdSubmission",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Ads",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Ads",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AdSubmission_UserId1",
                table: "AdSubmission",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Ads_UserId1",
                table: "Ads",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_AspNetUsers_UserId1",
                table: "Ads",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdSubmission_AspNetUsers_UserId1",
                table: "AdSubmission",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
