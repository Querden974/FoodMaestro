using System.Text.Json;
using System.Text.Json.Serialization;
using FridgeMaster_API.Types;

namespace FridgeMaster_API.Model
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; } // Navigation property for User
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        [JsonIgnore]
        public string Items { get; set; } = JsonSerializer.Serialize(new List<ShoppingListItemsType>()); // JSON string of items
    }
}
