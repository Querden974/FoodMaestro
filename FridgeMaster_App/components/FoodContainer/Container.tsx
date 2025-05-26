import {Text} from "~/components/ui/text";
import {Pressable, View} from "react-native";
import {Button} from '~/components/ui/button'
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddFoodDialog from "~/components/Options/AddFoodDialog";


export default function ContainerFood(){


    return(
        <View className={"border bg-red-200 flex-1 rounded-md flex p-2"}>
            <View className={"flex flex-row  justify-between "}>
                <Text className={"text-2xl font-bold"}>Container 1</Text>
            <AddFoodDialog button={"+"} variant={"rounded"} />
            </View>


            <Text className={"text-center text-gray-500"}>Items</Text>


            <Button className={"mt-auto w-1/2 mx-auto"}>
                <Text>View more...</Text>
            </Button>
        </View>
    )
}