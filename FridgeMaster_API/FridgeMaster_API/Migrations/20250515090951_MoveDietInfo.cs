using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FridgeMaster_API.Migrations
{
    /// <inheritdoc />
    public partial class MoveDietInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Carbs",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Proteins",
                table: "Foods");

            migrationBuilder.AddColumn<string>(
                name: "tag",
                table: "Foods",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "ContainerFoods",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Carbs",
                table: "ContainerFoods",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Fats",
                table: "ContainerFoods",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Proteins",
                table: "ContainerFoods",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tag",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Calories",
                table: "ContainerFoods");

            migrationBuilder.DropColumn(
                name: "Carbs",
                table: "ContainerFoods");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "ContainerFoods");

            migrationBuilder.DropColumn(
                name: "Proteins",
                table: "ContainerFoods");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "Foods",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Carbs",
                table: "Foods",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Fats",
                table: "Foods",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Proteins",
                table: "Foods",
                type: "float",
                nullable: true);
        }
    }
}
