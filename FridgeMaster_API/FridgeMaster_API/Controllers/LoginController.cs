using System.Text.Encodings.Web;
using System.Text.Json;
using AutoMapper;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;
using FridgeMaster_API.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly AppDbContext _db;


        public LoginController(IMapper mapper, AppDbContext db)
        {
            _mapper = mapper;
            _db = db;
        }
        //[ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest body)
        {
            if (!ModelState.IsValid) return Problem("Request Invalid");

            var hasher = new PasswordHasher<User>();
           
            
            var userInDb = _db.Users
                .Include(u => u.UserInfo)
                .Include(u => u.ShoppingList)
                .FirstOrDefault(u => u.username == body.username);
            if (userInDb == null)
            {
                return Problem("User not found");
            }
            var resultPassword = hasher.VerifyHashedPassword(userInDb, userInDb.password, body.password);

            if(resultPassword == PasswordVerificationResult.Success)
            {
                Console.WriteLine("Logged");

                var result = _mapper.Map<UserRequest>(userInDb);
                var isContainerNotEmpty = _db.Containers.Any(c => c.UserId == userInDb.id);

                var shoppingList = await _db.ShoppingLists.FirstAsync(sl => sl.UserId == userInDb.id);
                var itemsList = JsonSerializer.Deserialize<IEnumerable<ShoppingListItemsType>>(shoppingList.Items);

                var containers = await _db.Containers.Where(c => c.UserId == userInDb.id)
                    .Include(cf => cf.ContainerFood)
                    .ThenInclude(f => f.FoodFactItem)
                    .ToListAsync();

                return Ok(new
                {
                    message = "Loggin Successful",
                    data = result,
                    container = containers,
                    shoppingList = itemsList
                });
            }
            else
            {

                return Problem("Credentials incorrect");
            }
                
        }
    }
}
