import { Image } from "expo-image";
import React, { ReactElement } from "react";
import { View } from "react-native";
import { ContainerFoodType } from "~/app/stores/useContainerStore";
import AddFoodDialog from "~/components/Options/AddFoodDialog";
import { Button } from '~/components/ui/button/button.native';
import { Text } from "~/components/ui/text";

export default function ContainerFood({name, id, foods}:{name:string, id:number, foods:ContainerFoodType[]}){


    return(
        <View className={"border bg-red-200 flex-1 rounded-md flex p-2"}>
            <View className={"flex flex-row  justify-between "}>
                <Text className={"text-2xl font-bold"}>{name}</Text>
            <AddFoodDialog button={"+"} variant={"rounded"} />
            </View>

            {foods.length > 0 && foods.map((f,index) : ReactElement => {
                
                return (
                    // <Text key={index}>{f.foodFactItem.brand}</Text>
                    <View className="size-4">
                        
                       <Image source={{uri: f.foodFactItem.imageUrl}}
                            style={{
                                flex:1,
                                width: 16 ,
                                height: 16,
                                borderWidth:2,
                                backgroundColor: "#fff",
                                padding: 30,
                                borderRadius: 100,
                                resizeMode: 'contain'
                            }} /> 
                    </View>
                    
                )
            })}
            
        

            <Button className={"mt-auto w-1/2 mx-auto"}>
                <Text>View more...</Text>
            </Button>
        </View>
    )
}