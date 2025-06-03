using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FridgeMaster_API.Migrations
{
    /// <inheritdoc />
    public partial class EditFoodToFoodFact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContainerFoods_Foods_FoodId",
                table: "ContainerFoods");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ContainerFoods_FoodFactsItems_FoodId",
                table: "ContainerFoods",
                column: "FoodId",
                principalTable: "FoodFactsItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContainerFoods_FoodFactsItems_FoodId",
                table: "ContainerFoods");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ContainerFoods_Foods_FoodId",
                table: "ContainerFoods",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
