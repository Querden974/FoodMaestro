

namespace FridgeMaster_API.Model
{
    public class User
    {
        public int id { get; set; }

        required public string username { get; set; }

        required public string password { get; set; }

        required public string email { get; set; }

        public UserInfo? UserInfo { get; set; }

    }
}
