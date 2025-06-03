using System.Text.Json.Serialization;
using FridgeMaster_API.Model;

namespace FridgeMaster_API.Request
{
    public class ContainerFoodRequest
    {
        public int Id { get; set; }
        public int ContainerId { get; set; }
        public int FoodId { get; set; }
        public FoodFactsItem FoodFactItem { get; set; }
        public float Quantity { get; set; } = 1;
        public string Unit { get; set; } = "portion";

        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ExpirationDate { get; set; }


        
        


    }
}
