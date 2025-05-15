using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly AppDbContext _db;
        public FoodController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetAll()
        {
            return await _db.Foods.ToListAsync();
        }

        [HttpGet("id")]
        public async Task<ActionResult<Food>> GetFood(int id)
        {
            if(!_db.Foods.Any(f => f.Id == id)){
                return NotFound("Food item not found");
            }
            return await _db.Foods.FirstAsync(f => f.Id == id);
        }

        [HttpPost]
        public async Task<IActionResult> AddFood([FromBody] FoodRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var food = new Food
            {
                FoodName = model.FoodName,
                FoodCategory = model.FoodCategory,
                tag = model.tag,
                ImageUrl = model.ImageUrl,
            };

            _db.Foods.Add(food);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFood),new { id = food.Id }, food);
        }
    }
}
