using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; } // Navigation property for User
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string Items { get; set; } // JSON string of items
    }
}
