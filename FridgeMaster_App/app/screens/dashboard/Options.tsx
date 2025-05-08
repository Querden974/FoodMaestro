import {View, Text, Button} from 'react-native'
import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {useAuthStore} from "@/app/stores/useAuthStore";
import * as Burnt from "burnt";

export default function Options() {
    const router = useRouter();
    const logout = useAuthStore(s => s.logout);

    function Logout(){
        logout();
        Burnt.toast({
            title: "Disconnected, See you soon!",
            preset:"done",
            from: "top"
        })
        router.replace('/screens/Home');
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView className={"p-2"}>
                <View className={"w-1/2 mx-auto"}>
                    <Button color={"red"} title={"Disconnect"} onPress={Logout}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
