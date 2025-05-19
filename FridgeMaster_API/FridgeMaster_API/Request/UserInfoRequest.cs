namespace FridgeMaster_API.Request
{
    public class UserInfoRequest
    {
        public int UserId { get; set; }
        required public string FirstName {  get; set; }
        required public string LastName { get; set; }
        required public DateTime Birthday { get; set; }
        public bool IsFirstLoggin { get; set; }
    }
}
