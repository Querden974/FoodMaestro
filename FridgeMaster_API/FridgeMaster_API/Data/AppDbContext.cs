using FridgeMaster_API.Model;
using Microsoft.EntityFrameworkCore;

namespace FridgeMaster_API.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<User> Users => Set<User>();

        public DbSet<UserInfo> UserInfos => Set<UserInfo>();    
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration) : base(options) {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("FoodMaestro");
            optionsBuilder.UseMySql(connectionString,new MySqlServerVersion( new Version(5, 7 ,24)));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInfo>()
                .Property(b => b.IsFirstLoggin)
                .HasDefaultValue(true);

            modelBuilder.Entity<User>()
                .HasOne(u => u.UserInfo)
                .WithOne(ui => ui.User)
                .HasForeignKey<UserInfo>(ui => ui.UserId);
        }
    }
}
