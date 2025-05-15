namespace FridgeMaster_API.Request
{
    public class ContainerFoodRequest
    {
        public int Id { get; set; }
        public int ContainerId { get; set; }
        public int FoodId { get; set; }
        public float Quantity { get; set; } = 1;
        public string Unit { get; set; } = "portion";
        public int? Calories { get; set; }
        public float? Proteins { get; set; }
        public float? Carbs { get; set; }
        public float? Fats { get; set; }
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ExpirationDate { get; set; }

        public FoodRequest Food { get; set; }
        public ContainerRequest Container { get; set; }


    }
}
