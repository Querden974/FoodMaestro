using System.Text.Json.Serialization;

namespace FridgeMaster_API.Request
{
    public class ContainerRequest
    {
        public int Id { get; set; }
        
         public string ContainerName { get; set; }
         public UserRequest User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; } 

        public ICollection<ContainerFoodRequest> ContainerFood { get; set; }

    }

    public class ContainerCreationRequest
    {
        public int Id { get; set; }

        public string ContainerName { get; set; }
        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
