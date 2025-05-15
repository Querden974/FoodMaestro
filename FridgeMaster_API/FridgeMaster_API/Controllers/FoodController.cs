using AutoMapper;
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
        private readonly IMapper _mapper;
        public FoodController(AppDbContext db, IMapper mapper) 
        {
            _db = db;
            _mapper = mapper;
        }

        /// <summary>
        /// List all Food
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodRequest>>> GetAll()
        {
            var query = await _db.Foods.ToListAsync();
            var result = _mapper.Map<List<FoodRequest>>(query);
            return Ok(result);
        }

        /// <summary>
        /// Get specifig Food by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("id")]
        public async Task<ActionResult<FoodRequest>> GetFood(int id)
        {
            if(!_db.Foods.Any(f => f.Id == id)){
                return NotFound("Food item not found");
            }
            var query = await _db.Foods.FirstAsync(f => f.Id == id);
            var result = _mapper.Map<FoodRequest>(query);
            return Ok(result);
        }

        /// <summary>
        /// Create new Food
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Edit specific Food by Id
        /// </summary>
        /// <param name="model"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpPut("Id")]
        public async Task<ActionResult<FoodRequest>> EditFood([FromBody] FoodRequest model, int Id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isExist = await _db.Foods.AnyAsync(f => f.Id == Id);
            if( isExist)
            {
                var query = await _db.Foods.FirstAsync(f => f.Id == Id);
                _db.Entry(query).CurrentValues.SetValues(model);
                await _db.SaveChangesAsync();
                return Ok($"Food id:{Id} is edited successfully");
            }
            return NotFound($"Food id:{Id} not found");
        }
    }
}
