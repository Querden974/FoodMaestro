namespace FridgeMaster_API.Types
{
    public class ShoppingListItemsType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Quantity { get; set; }
        public bool inCart { get; set; }

    }
}
