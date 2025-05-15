using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FridgeMaster_API.Migrations
{
    /// <inheritdoc />
    public partial class AddUpdatedAtForAllTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Users",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "UserInfos",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "UserInfos",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Foods",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "ContainerFoods",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "ContainerFoods");
        }
    }
}
