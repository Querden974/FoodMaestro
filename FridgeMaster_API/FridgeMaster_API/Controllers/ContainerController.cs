using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContainerController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public ContainerController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        /// <summary>
        /// List all container
        /// </summary>
        ///<returns> Une Liste des containers</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContainerRequest>>> GetAll()
        {
            var query = await _db.Containers
                .Include(c => c.User)
                .Include(cf => cf.ContainerFood)

                .ToListAsync();
            var result = _mapper.Map<List<ContainerRequest>>(query);
            return Ok(result);
        }

        /// <summary>
        /// Get Info for specific container
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("id")]
        public async Task<ActionResult<ContainerRequest>> GetContainer(int id)
        {
            var isExist = await _db.Containers.AnyAsync(c => c.Id == id);
            if( isExist)
            {
                var query = await _db.Containers
                    .Include(c => c.User)
                    .Include(cf => cf.ContainerFood).ThenInclude(f=>f.FoodFactItem)
                    .FirstAsync(c => c.Id == id);
                var result = _mapper.Map<ContainerRequest>(query);
                return Ok(result);
            }

            return NotFound("Container Not found");
        } 


        /// <summary>
        /// Edit Info for specific container
        /// </summary>
        /// <param name="model"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("id")]
        public async Task<IActionResult> EditContainer([FromBody] ContainerEditRequest model, int id)
        {
            var isContainerExist = _db.Containers.AnyAsync(c => c.Id == id);
            if (await isContainerExist == true)
            {
                var container = await _db.Containers.FirstAsync(c => c.Id == id);
                container.ContainerName = model.ContainerName;
                container.UpdatedAt = DateTime.UtcNow;

                var user = await _db.Users.FirstAsync(u => u.id == container.UserId);

                await _db.SaveChangesAsync();

                return Ok($"Container id:{id} handle by {user.username} edited succesfully");
            }

            return NotFound($"Container id:{id} not found");
        }
        /// <summary>
        /// Create new container for specific user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Container>> CreateContainer([FromBody] Container model)
        {
            var count = await _db.Containers.CountAsync(c => c.UserId == model.UserId);
            if (count >= 3) return BadRequest("User reach maximum containers");

            var container = new Container
            {
                UserId = model.UserId,
                ContainerName = model.ContainerName,
            };
            _db.Containers.Add(container);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContainer), new { id = container.Id }, container);
        }

        /// <summary>
        /// Get User Containers
        /// </summary>
        /// <param name="uId"></param>
        /// <returns></returns>
        [HttpGet("uId")]
        public async Task<ActionResult<IEnumerable<ContainerRequest>>> GetUserContainers(int uId)
        {
            var containerExists = _db.Containers.Any(c => c.UserId == uId);

            if (containerExists)
            {
               var containers =  await _db.Containers.Where(c => c.UserId == uId)
                    .Include(cf => cf.ContainerFood).ThenInclude(f => f.FoodFactItem)
                    .ToArrayAsync();
                return Ok(containers);
            }
            return Problem("User don't have containers");
        }
    }
}
