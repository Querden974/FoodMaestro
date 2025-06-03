using System.Text.Json.Serialization;
using Microsoft.Identity.Client;

namespace FridgeMaster_API.Model
{
    public class FoodFactsItem
    {
        public int Id { get; set; }

        required public string Code { get; set; }

        required public string Brand { get; set; } = "TO SET";

        required public string ProductName { get; set; }

        required public string NutriGrade { get; set; }

        required public string ImageUrl { get; set; }

        required public string IngredientImgUrl { get; set; }

        required public string NutritionImgUrl { get; set; }

        public bool HasPalmOil { get; set; } = false;
        
        required public string[] Keywords { get; set; }

        required public string Ingredients { get; set; }

        required public string Nutriments { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        [JsonIgnore]
        public ICollection<ContainerFood> ContainerFood { get; set; }
    }
}
