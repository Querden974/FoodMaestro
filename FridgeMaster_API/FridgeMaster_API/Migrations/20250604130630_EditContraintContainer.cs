using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FridgeMaster_API.Migrations
{
    /// <inheritdoc />
    public partial class EditContraintContainer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Supprimer la contrainte de clé étrangère
            migrationBuilder.DropForeignKey(
                name: "FK_Containers_Users_UserId",
                table: "Containers");

            // 2. Supprimer l’index unique
            migrationBuilder.DropIndex(
                name: "IX_Containers_UserId",
                table: "Containers");

            // 3. Recréer l’index (non unique)
            migrationBuilder.CreateIndex(
                name: "IX_Containers_UserId",
                table: "Containers",
                column: "UserId");

            // 4. Recréer la contrainte de clé étrangère
            migrationBuilder.AddForeignKey(
                name: "FK_Containers_Users_UserId",
                table: "Containers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            //migrationBuilder.DropTable(
            //    name: "Foods");

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Containers_UserId",
                table: "Containers");

            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FoodCategory = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FoodName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    tag = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Containers_UserId",
                table: "Containers",
                column: "UserId",
                unique: true);
        }
    }
}
