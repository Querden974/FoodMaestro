using System.Text.Json;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly AppDbContext _db;


        public LoginController(IConfiguration configuration, AppDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Login()
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            if (body.IsNullOrEmpty())
            {
                return Problem("You must enter credentials to log into your account");
            }

            var requestData = JsonSerializer.Deserialize<LoginRequest>(body);

            var hasher = new PasswordHasher<User>();
           
            
            var userInDb = _db.Users.FirstOrDefault(u => u.username == requestData.username);
            if (userInDb == null)
            {
                return Problem("User not found");
            }
            var resultPassword = hasher.VerifyHashedPassword(userInDb, userInDb.password, requestData.password);

            if(resultPassword == PasswordVerificationResult.Success)
            {
                Console.WriteLine("Logged");
                return Ok("Loggin Successful");
            }
            return Problem("Credentials incorrect");
        }
    }
}
