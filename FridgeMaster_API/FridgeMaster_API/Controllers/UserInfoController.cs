using System.Text.Json;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;
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
        //[ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        public async Task<IActionResult> WriteUserInfo([FromBody] UserInfoRequest model)
        {


            if (!ModelState.IsValid)
            {
                return Problem("Request body is empty");
            }

            

            if (model.FirstName.IsNullOrEmpty())
            {
                return Problem("Please enter a First Name");
            }
            if (model.LastName.IsNullOrEmpty())
            {
                return Problem("Please enter a Last Name");
            }


            var user = _db.UserInfos.First(u => u.UserId == model.UserId);
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Birthday = model.Birthday;
            user.IsFirstLoggin = false;

            await _db.SaveChangesAsync();

            return Ok(model);
        }
    }
}
