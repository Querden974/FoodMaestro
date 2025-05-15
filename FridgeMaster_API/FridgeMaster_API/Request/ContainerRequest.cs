namespace FridgeMaster_API.Request
{
    public class ContainerRequest
    {
        public int Id { get; set; }

        public string ContainerName { get; set; }
        public UserRequest User { get; set; }
    }
}
