using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class Container
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        [JsonIgnore]
        
        public User? User { get; set; }

        required public string ContainerName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        
        public ICollection<ContainerFood>? ContainerFood { get; set; }

    }


}
