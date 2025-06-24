using FridgeMaster_API.Types;

namespace FridgeMaster_API.Request
{
    public class GETShoppingListRequest
    {
        public required int Id { get; set; }
        public required int UserId { get; set; }
        public  string Items { get; set; }
    }
    public class ShoppingListRequest
    {
        
        public required int UserId { get; set; }
        public required ShoppingListItemsType NewItem { get; set; }
    }
}
