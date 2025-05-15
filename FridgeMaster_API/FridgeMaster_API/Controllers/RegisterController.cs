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
using FridgeMaster_API.Request;
using AutoMapper;


namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        

        private readonly IMapper _mapper;

        private readonly AppDbContext _db;


        public RegisterController(IMapper mapper, AppDbContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        /// <summary>
        /// Create new User and initialize default Container and UserInfo
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> registration([FromBody] RegisterRequest model)
        {

            if (!ModelState.IsValid)
            {
                return Problem("Request is invalid");
            }


            if(_db.Users.Any(u => u.username == model.username))
            {
                return Problem("This username is already taken");
            }
            if (_db.Users.Any(u => u.email == model.email))
            {
                return Problem("This email adress is already registered");
            }

            var hasher = new PasswordHasher<User>();

            // Create New User
            var user = new User
            {
                username = model.username,
                password = model.password,
                email = model.email
            };
            user.password = hasher.HashPassword(user, model.password);
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Create UserInfo bind to User
            var userInfo = new UserInfo
            {
                UserId = user.id,
                FirstName = "",
                LastName= "",
                Birthday= null
                
            };
            _db.UserInfos.Add(userInfo);
            
            // Create Container bind to User
            var container = new Container
            {
                UserId = user.id,
                ContainerName = $"{user.username}'s container"
            };
            _db.Containers.Add(container);

            // Save All Changes
            await _db.SaveChangesAsync();

            return Ok(model);
            
           
            

        }

        


    }
}
