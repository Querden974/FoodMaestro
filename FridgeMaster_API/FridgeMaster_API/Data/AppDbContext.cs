using FridgeMaster_API.Model;
using Microsoft.EntityFrameworkCore;

namespace FridgeMaster_API.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users => Set<User>();
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
