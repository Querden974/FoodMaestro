﻿using AutoMapper;
using FridgeMaster_API.Model;
using FridgeMaster_API.Request;

namespace FridgeMaster_API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ContainerFood, ContainerFoodRequest>();
            CreateMap<Container, ContainerRequest>();
            CreateMap<User, UserRequest>();
            CreateMap<UserInfo, UserInfoRequest>();
            CreateMap<ShoppingList, GETShoppingListRequest>();
        }
    }
}
