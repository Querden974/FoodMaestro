using System.Text.Json;
using AutoMapper;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
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

        [HttpGet("{userId}")]
        public async Task<ActionResult<ShoppingList>> GetShoppingList(int userId)
        {
            var shoppingList = await _db.ShoppingLists.FirstAsync(s => s.UserId == userId);
                
            if (shoppingList == null)
            {
                return NotFound("Shopping list not found for the specified user.");
            }
            var parseList = JsonSerializer.Serialize(shoppingList.Items);
            return Ok(parseList);
        }


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

        [HttpPut]
        public async Task<ActionResult<ShoppingList>> EditShoppingList([FromBody] ShoppingList shoppingList)
        {
            if (shoppingList == null || shoppingList.UserId <= 0)
            {
                return BadRequest("Invalid shopping list data.");
            }
            var userList = await _db.ShoppingLists.FirstAsync(sl => sl.UserId == shoppingList.Id);
            userList.Items = JsonSerializer.Serialize(shoppingList.Items);
            userList.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return Ok("Shopping List Editted");
                
        }

    }
}
