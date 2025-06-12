import React, { ReactElement } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useContainerStore } from "~/app/stores/useContainerStore";
import ContainerFood from '~/components/FoodContainer/Container';



export default function Food() {
    const containerData = useContainerStore(s => s.Containers);
    console.log(containerData[0]);
    
    
    return (


        <SafeAreaProvider>
            <SafeAreaView className={"p-1 h-screen flex-1 gap-2"}>
              
                   
                    

                    {containerData.map((c) : ReactElement => {
                        return <ContainerFood key={c.id} name={c.containerName} id={c.id} foods={c.containerFood} />
                    })}

                    {/* <ContainerFood name={"Container 1"} id={1}/>

                    <View className={"border bg-green-200 flex-1 rounded-md"}>
                        <Text className={"text-2xl font-bold  text-center"}>Container 1</Text>
                        <Text className={"text-center text-gray-500"}>Items</Text>
                    </View>

                    <View className={"border bg-blue-200 w-max flex-1 rounded-md"}>
                        <Text className={"text-2xl font-bold text-center"}>Container 1</Text>
                        <Text className={"text-center text-gray-500"}>Items</Text>
                    </View> */}





            </SafeAreaView>
        </SafeAreaProvider>
    )
}
