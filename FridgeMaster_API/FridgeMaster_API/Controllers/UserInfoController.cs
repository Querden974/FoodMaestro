using System.Text.Json;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly AppDbContext _db;
        public UserInfoController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> WriteUserInfo()
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();


            if (body.IsNullOrEmpty())
            {
                return Problem("Request body is empty");
            }

            var requestData = JsonSerializer.Deserialize<UserInfo>(body);

            if (requestData.FirstName.IsNullOrEmpty())
            {
                return Problem("Please enter a First Name");
            }
            if (requestData.LastName.IsNullOrEmpty())
            {
                return Problem("Please enter a Last Name");
            }
            //if (requestData.Birthday.HasValue)
            //{
            //    return Problem("Please enter your Birth Day");
            //}

            var user = _db.UserInfos.FirstOrDefault(u => u.UserId == requestData.UserId);
            user.FirstName = requestData.FirstName;
            user.LastName = requestData.LastName;
            user.Birthday = requestData.Birthday;
            user.IsFirstLoggin = false;

            _db.SaveChanges();

            return Ok(body);
        }
    }
}
