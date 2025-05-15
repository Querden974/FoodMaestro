

using System.Text.Json.Serialization;

namespace FridgeMaster_API.Model
{
    public class User
    {
        public int id { get; set; }

        required public string username { get; set; }

        required public string password { get; set; }

        required public string email { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public UserInfo? UserInfo { get; set; }
        
        public Container? Container { get; set; }


    }
}
