namespace FridgeMaster_API.Request
{
    public class FoodRequest
    {
        public int Id { get; set; }
        public string FoodName { get; set; }
        public string FoodCategory { get; set; }
        public string? ImageUrl { get; set; }
        public string? tag { get; set; } = null;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
