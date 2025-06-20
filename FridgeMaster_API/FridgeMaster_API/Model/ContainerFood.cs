using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class ContainerFood
    {
        public int Id { get; set; }
        public int ContainerId { get; set; }
        [JsonIgnore]
        public Container Container { get; set; }
        public int FoodId { get; set; }
        
        public FoodFactsItem? FoodFactItem { get; set; }
        public float Quantity { get; set; } = 1;
        public string Unit { get; set; } = "portion";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpirationDate {  get; set; }

        

    }
}
