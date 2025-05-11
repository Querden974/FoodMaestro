namespace FridgeMaster_API.Request
{
    public class UserInfoRequest
    {
        required public string FirstName {  get; set; }
        required public string LastName { get; set; }
        required public DateOnly Birthday { get; set; }
    }
}
