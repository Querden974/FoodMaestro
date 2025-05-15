using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class Food
    {
        public int Id { get; set; }
        public string FoodName { get; set; }
        public string FoodCategory { get; set; }
        public string? ImageUrl { get; set; }
        
        public string? tag { get; set; } = null;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        [JsonIgnore]
        public ICollection<ContainerFood> ContainerFood { get; set; }
    }
}
