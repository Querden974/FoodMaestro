using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class Container
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        
        public User User { get; set; }

        public string ContainerName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public ICollection<ContainerFood> ContainerFood { get; set; }

    }


}
