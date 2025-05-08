using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using FridgeMaster_API.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Data.SqlClient;
using MySql.Data;
using MySql.Data.MySqlClient;
using FridgeMaster_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;


namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly AppDbContext _db;


        public RegisterController(IConfiguration configuration, AppDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> registration()
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            
            if (body.IsNullOrEmpty())
            {
                return Problem("Request body is empty");
            }

            var requestData = JsonSerializer.Deserialize<User>(body);

            if(_db.Users.Any(u => u.username == requestData.username))
            {
                return Problem("This username is already taken");
            }
            if (_db.Users.Any(u => u.email == requestData.email))
            {
                return Problem("This email adress is already registered");
            }

            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                username = requestData.username,
                password = requestData.password,
                email = requestData.email
            };
            user.password = hasher.HashPassword(user, requestData.password);

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(body);
            
           
            

        }

        


    }
}
