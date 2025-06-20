using System.Text.Json;
using FridgeMaster_API.Data;
using FridgeMaster_API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OpenFoodFacts.DotNet;
using OpenFoodFacts.DotNet.Wrapper;
using OpenFoodFacts.DotNet.Wrapper.Models;
using OpenFoodFacts4Net.ApiClient;
using OpenFoodFacts4Net.Json.Data;

namespace FridgeMaster_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenFoodFactsController : ControllerBase
    {

        private readonly AppDbContext _db;

        public OpenFoodFactsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("codeBar")]
        public async Task<ActionResult> AddByCodeBar([FromQuery] string codeBar)
        {
            var client = new OpenFoodFacts4Net.ApiClient.Client();
            var resultApi = await client.GetProductAsync(codeBar);
            var product = resultApi.Product;


            var httpClient = new HttpClient();
            var url = $"https://world.openfoodfacts.org/api/v0/product/{codeBar}.json";
            var result = await httpClient.GetAsync(url);
            if (!result.IsSuccessStatusCode) return NotFound("Product not Found");

            var content = await result.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);

            if (!json.RootElement.TryGetProperty("product", out var productHTTP))
            {
                return NotFound("Product data not found in the response.");
            }

            bool HasPalmOil = false;
            if (product.IngredientsFromPalmOilN != 0) HasPalmOil = true;

            var item = new FoodFactsItem
            {
                Code = codeBar,
                Brand = productHTTP.TryGetProperty("brands", out var brands) ? brands.ToString() ?? string.Empty : string.Empty,
                ProductName = product.ProductName,
                NutriGrade = product.NutritionGradeFr,
                ImageUrl = product.ImageFrontUrl,
                IngredientImgUrl = product.ImageIngredientsUrl,
                NutritionImgUrl = product.ImageNutritionUrl,
                HasPalmOil = HasPalmOil,
                Keywords = productHTTP.TryGetProperty("_keywords", out var keywords) ? keywords.EnumerateArray().Select(k => k.GetString() ?? string.Empty).ToArray() : Array.Empty<string>(),
                Ingredients = productHTTP.TryGetProperty("ingredients_text_with_allergens_fr", out var ingredientsText) ? ingredientsText.GetString() ?? string.Empty : string.Empty,
                Nutriments = productHTTP.TryGetProperty("nutriments", out var nutriments) ? nutriments.ToString() ?? string.Empty : string.Empty
            };

            _db.FoodFactsItems.Add(item);
            await _db.SaveChangesAsync();

            return Ok(item);
        }

        [HttpGet("keywords")]
        public async Task<ActionResult<IEnumerable<FoodFactsItem>>> SearchItem([FromQuery] string keywords)
        {
            string[] keys = keywords.Split(" ", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            var allItems = await _db.FoodFactsItems.ToListAsync();
            var result = allItems
                .Where(f => keys.All(searchKey =>
                    f.Keywords.Any(itemKey =>
                        string.Equals(itemKey, searchKey, StringComparison.OrdinalIgnoreCase)
                        )
                    ))
                .ToList();
            return Ok(result);
        }
        }
    
}
