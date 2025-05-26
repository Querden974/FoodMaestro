import {View} from 'react-native'
import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Text} from "~/components/ui/text";
import ContainerFood from "~/components/FoodContainer/Container";



export default function Food() {
    return (


        <SafeAreaProvider>
            <SafeAreaView className={"p-1 h-screen flex-1 gap-2"}>
                {/*<Text>{userData.username} : id={userData.id}</Text>*/}






                    <ContainerFood />

                    <View className={"border bg-green-200 flex-1 rounded-md"}>
                        <Text className={"text-2xl font-bold  text-center"}>Container 1</Text>
                        <Text className={"text-center text-gray-500"}>Items</Text>
                    </View>

                    <View className={"border bg-blue-200 w-max flex-1 rounded-md"}>
                        <Text className={"text-2xl font-bold text-center"}>Container 1</Text>
                        <Text className={"text-center text-gray-500"}>Items</Text>
                    </View>





            </SafeAreaView>
        </SafeAreaProvider>
    )
}
