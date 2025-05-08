import {Button, Image, Pressable, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";
import {ReactElement} from "react";
import {useAuthStore} from "@/app/stores/useAuthStore";


export default function Index():ReactElement {
    const isLoggedIn:boolean = useAuthStore(state => state.isLoggedIn);
    const logout = useAuthStore(state => state.logout);
    const username:string = useAuthStore(state => state.username);

    return (
        <SafeAreaProvider>
            <SafeAreaView className={"h-full px-3"}>
                {isLoggedIn &&
                    <View className={"flex flex-row items-center"}>
                        <Text className={"text-blue-400 text-3xl font-bold"}>Food Maestro</Text>
                        <View className={"ml-auto flex flex-row items-center gap-2"}>

                            <Pressable onPress={logout}>
                                <View className={"bg-primary rounded-full p-1"}>
                                    <Image source={require("../../assets/images/user-128-32.png")}/>
                                </View>
                            </Pressable>
                            {/*<Button title={"Logout"} onPress={logout}/>*/}
                        </View>
                    </View>


                }
                <View className={"flex-1 justify-center items-center gap-6"}>

                    {!isLoggedIn &&
                        <>
                            <Text className={"text-blue-400 text-4xl font-bold"}>Welcome to Food Maestro.</Text>
                            <View className={"w-1/2 gap-2"}>
                                <Link href={"/screens/register"} className={"btn"}>Register</Link>
                                <Link href={"/screens/login"} className={"btn-secondary"}>Login</Link>
                            </View>
                        </>

                    }




                </View>
            </SafeAreaView>
        </SafeAreaProvider>



    );
}
