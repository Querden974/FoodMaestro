using System.Text.Encodings.Web;
using System.Text.Json;
using AutoMapper;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;
using FridgeMaster_API.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public ShoppingListController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<GETShoppingListRequest>> GetShoppingList(int userId)
        {
            var query = await _db.ShoppingLists.FirstAsync(s => s.UserId == userId);
            var result = _mapper.Map<GETShoppingListRequest>(query);
            
            if (result == null)
            {
                return NotFound("Shopping list not found for the specified user.");
            }
            if (result.Items.Length == 0) { return Ok("Shopping list is Empty"); }
            var parseList = JsonSerializer.Deserialize<List<ShoppingListItemsType>>(result.Items ?? "[]");
            return Ok(parseList);
        }

        [Route("create")]
        [HttpPost]
        public async Task<ActionResult<ShoppingList>> CreateShoppingList([FromBody] ShoppingList shoppingList)
        {
            var isShoppingListExist = await _db.ShoppingLists.AnyAsync(s => s.UserId == shoppingList.UserId);
            if (isShoppingListExist)
            {
                return BadRequest("Shopping list already exists for this user.");
            }

            if (shoppingList == null || shoppingList.UserId <= 0)
            {
                return BadRequest("Invalid shopping list data.");
            }
            _db.ShoppingLists.Add(shoppingList);
            await _db.SaveChangesAsync();
            return Ok("Shopping list created");
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingList>> AddItemInShoppingList([FromBody] ShoppingListRequest shoppingListItem)
        {
            if (shoppingListItem == null || shoppingListItem.UserId <= 0)
            {
                return BadRequest("Invalid shopping list data.");
            }

            var userList = await _db.ShoppingLists.FirstAsync(sl => sl.UserId == shoppingListItem.UserId);
            if (userList == null) return NotFound("User shopping list not found");

            //current list
            var existingItems = !string.IsNullOrEmpty(userList.Items)
                ? JsonSerializer.Deserialize<List<ShoppingListItemsType>>(userList.Items)
                : new List<ShoppingListItemsType>();

            var newItem = shoppingListItem.NewItem != null 
                ? new List<ShoppingListItemsType> { shoppingListItem.NewItem } 
                : new List<ShoppingListItemsType>();

            existingItems?.AddRange(newItem);

            userList.Items = JsonSerializer.Serialize(existingItems);
            userList.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return Ok("Shopping List Editted");
        }

        //[HttpPatch]
        // Setup endpoint to edit ShoppingList 


    }
}
