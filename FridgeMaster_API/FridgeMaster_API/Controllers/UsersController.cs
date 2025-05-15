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
    public class UsersController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly AppDbContext _db;


        public UsersController(IMapper mapper, AppDbContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        /// <summary>
        /// Get list of all Users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRequest>>> GetAll()
        {
            var query = await _db.Users.ToListAsync();
            var result = _mapper.Map<List<UserRequest>>(query);
            return Ok(result);
        }


        /// <summary>
        /// Get specific User by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("Id")]
        public async Task<ActionResult<UserRequest>> GetUser(int Id)
        {
            var isExist = await _db.Users.AnyAsync(u => u.id == Id);
            if (!isExist) return NotFound($"User id:{Id} not found");

            var query = await _db.Users.FirstAsync(u => u.id == Id);
            var result = _mapper.Map<UserRequest>(query);
            return Ok(result);
        }
    }
}
