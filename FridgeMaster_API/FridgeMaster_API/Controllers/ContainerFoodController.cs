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
    public class ContainerFoodController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public ContainerFoodController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all ContainerFood
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContainerFood>>> GetAll()
        {
            return await _db.ContainerFoods.ToListAsync();
        }

        /// <summary>
        /// Get ContainerFood by container Id
        /// </summary>
        /// <param name="cId"></param>
        /// <returns></returns>
        [HttpGet("cId")]
        public async Task<ActionResult<IEnumerable<ContainerFoodRequest>>> GetByUser(int cId)
        {
            var isContainerExist = await _db.ContainerFoods.AnyAsync(cf => cf.ContainerId == cId);

            if (isContainerExist) 
            {
                var select = await _db.ContainerFoods
                    .Where(cf => cf.ContainerId == cId)
                    .Include(cf => cf.FoodFactItem)
                    .Include(cf => cf.Container).ThenInclude(c => c.User)
                    .ToListAsync();

                var result = _mapper.Map<List<ContainerFoodRequest>>(select);
                return Ok(result);
            }
            
            return NotFound($"containerId: {cId} not found");
        }

        /// <summary>
        /// Get specific containerFood by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("Id")]
        public async Task<ActionResult<ContainerFoodRequest>> GetContainerFood(int Id)
        {
            var isContainerExist = await _db.ContainerFoods.AnyAsync(cf => cf.Id == Id);

            if (isContainerExist)
            {
                var select = await _db.ContainerFoods
                    .Include(cf => cf.FoodFactItem)
                    .Include(cf => cf.Container).ThenInclude(c => c.User)
                    .FirstAsync(cf => cf.Id == Id);
                var result = _mapper.Map<ContainerFoodRequest>(select);
                return Ok(result);
            }
            return NotFound($"containerFoodId: {Id} not found");
        }


        /// <summary>
        /// Create new ContainerFood
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ContainerFood>> CreateContainerFood([FromBody] ContainerFoodRequest model)
        {
            var containerFood = new ContainerFood
            {
                ContainerId = model.ContainerId,
                FoodId = model.FoodId,
                Quantity = model.Quantity,
                Unit = model.Unit,
                UpdatedAt = DateTime.UtcNow
            };

            _db.ContainerFoods.Add(containerFood);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContainerFood), new { id = containerFood.Id }, containerFood);
        }



        /// <summary>
        /// Edit specific containerFood by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("id")]
        public async Task<ActionResult<ContainerFood>> EditContainerFood(int id, [FromBody] ContainerFoodRequest model)
        {
            var isContainerFoodExist = await _db.ContainerFoods.AnyAsync(cf => cf.Id == id);
            if (isContainerFoodExist)
            {
                var containerFood = await _db.ContainerFoods.FirstAsync(cf => cf.Id == id);
                _db.Entry(containerFood).CurrentValues.SetValues(model);
                await _db.SaveChangesAsync();
                return Ok(containerFood);
            }
            return NotFound($"ContainerFood {id} not found");
        }
    }
}
