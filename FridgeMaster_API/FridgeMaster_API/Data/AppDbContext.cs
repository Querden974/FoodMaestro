using FridgeMaster_API.Model;
using Microsoft.EntityFrameworkCore;

namespace FridgeMaster_API.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<User> Users => Set<User>();
        public DbSet<UserInfo> UserInfos => Set<UserInfo>();  
        public DbSet<Food> Foods => Set<Food>();
        public DbSet<Container> Containers => Set<Container>();
        public DbSet<ContainerFood> ContainerFoods => Set<ContainerFood>();

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

            
            // User Setup
            modelBuilder.Entity<User>(entity =>
            {
                // User Properties
                entity.Property(e => e.username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.email).IsRequired();
                entity.Property(e => e.password).IsRequired();

                entity.HasIndex(e => e.email).IsUnique();
                entity.HasIndex(e => e.username).IsUnique();
            });

            // UserInfo Setup
            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasKey(e => e.id);
                entity.Property(e => e.IsFirstLoggin).HasDefaultValue(true);
                entity.Property(e => e.FirstName).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(50);

                // Relation avec User (one-to-one)
                entity.HasOne(e => e.User)
                      .WithOne(u => u.UserInfo)
                      .HasForeignKey<UserInfo>(ui => ui.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Container Setup
            modelBuilder.Entity<Container>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.ContainerName).HasMaxLength(50).IsRequired();

                entity.HasOne(c => c.User)
                      .WithOne(u => u.Container)
                      .HasForeignKey<Container>(c=> c.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ContainerFood Setup
            modelBuilder.Entity<ContainerFood>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Quantity).HasMaxLength(50);
                entity.Property(e => e.Unit).HasMaxLength(50);

                entity.HasOne(cf => cf.Container)
                      .WithMany(c => c.ContainerFood)
                      .HasForeignKey(c => c.ContainerId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(cf => cf.Food)
                      .WithMany(f => f.ContainerFood)
                      .HasForeignKey(cf => cf.FoodId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(cf => new { cf.ContainerId, cf.FoodId }).IsUnique(); 
            });

        }     
    }
}
