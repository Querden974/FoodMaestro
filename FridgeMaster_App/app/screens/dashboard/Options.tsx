import {View, Text, Button, TextInput} from 'react-native'
import EditUserInfoForm from "@/components/EditUserInfoForm"

import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {useAuthStore} from "@/app/stores/useAuthStore";
import * as Burnt from "burnt";

export default function Options() {
    const router = useRouter();
    const logout = useAuthStore(s => s.logout);
    const userData = {
        username: useAuthStore(s => s.username),
        email: useAuthStore(s => s.email),
        id: useAuthStore(s => s.id),
        userInfo: useAuthStore(s => s.userInfo),
    }

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
            <SafeAreaView className={"p-2 h-full w-full"}>
                <Text>{userData.username} : id={userData.id}</Text>
                <Text className={"mt-2"}>User Informations:</Text>
                <View className={"gap-1"}>
                    <EditUserInfoForm />
                </View>

                

                <View className={"w-1/2 mx-auto mt-auto"}>
                    <Button color={"red"} title={"Disconnect"} onPress={Logout}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
