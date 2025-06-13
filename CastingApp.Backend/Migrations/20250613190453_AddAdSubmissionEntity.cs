using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CastingApp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddAdSubmissionEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CastingAd_AspNetUsers_UserId1",
                table: "CastingAd");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CastingAd",
                table: "CastingAd");

            migrationBuilder.RenameTable(
                name: "CastingAd",
                newName: "Ads");

            migrationBuilder.RenameIndex(
                name: "IX_CastingAd_UserId1",
                table: "Ads",
                newName: "IX_Ads_UserId1");

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "Ads",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ads",
                table: "Ads",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AdSubmission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VideoUrl = table.Column<string>(type: "text", nullable: false),
                    AdId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UserId1 = table.Column<string>(type: "text", nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdSubmission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdSubmission_Ads_AdId",
                        column: x => x.AdId,
                        principalTable: "Ads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdSubmission_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdSubmission_AdId",
                table: "AdSubmission",
                column: "AdId");

            migrationBuilder.CreateIndex(
                name: "IX_AdSubmission_UserId1",
                table: "AdSubmission",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_AspNetUsers_UserId1",
                table: "Ads",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_AspNetUsers_UserId1",
                table: "Ads");

            migrationBuilder.DropTable(
                name: "AdSubmission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ads",
                table: "Ads");

            migrationBuilder.RenameTable(
                name: "Ads",
                newName: "CastingAd");

            migrationBuilder.RenameIndex(
                name: "IX_Ads_UserId1",
                table: "CastingAd",
                newName: "IX_CastingAd_UserId1");

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "CastingAd",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CastingAd",
                table: "CastingAd",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CastingAd_AspNetUsers_UserId1",
                table: "CastingAd",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
