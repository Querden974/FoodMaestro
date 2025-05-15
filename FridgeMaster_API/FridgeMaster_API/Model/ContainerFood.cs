using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class ContainerFood
    {
        public int Id { get; set; }
        public int ContainerId { get; set; }

        public Container Container { get; set; }
        public int FoodId { get; set; }
        
        public Food Food { get; set; }
        public float Quantity { get; set; } = 1;
        public string Unit { get; set; } = "portion";
        public int? Calories { get; set; }
        public float? Proteins { get; set; }
        public float? Carbs { get; set; }
        public float? Fats { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpirationDate {  get; set; }

        

    }
}
