using System.Security.Permissions;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace FridgeMaster_API.Model
{
    public class UserInfo
    {
        public int id { get; set; }

        public int UserId { get; set; } 

        public User User { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime? Birthday { get; set; }

        public bool IsFirstLoggin { get; set; } = true;
    }
}
