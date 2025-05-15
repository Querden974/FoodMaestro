namespace FridgeMaster_API.Request
{
    public class RegisterRequest
    {
        required public string username { get; set; }

        required public string password { get; set; }

        required public string email { get; set; }
    }
}
