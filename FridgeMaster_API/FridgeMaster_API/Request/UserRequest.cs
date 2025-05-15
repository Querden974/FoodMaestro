namespace FridgeMaster_API.Request
{
    public class UserRequest
    {
        public int id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public UserInfoRequest UserInfo { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        
    }
}
