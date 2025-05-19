import { Image, Pressable, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Link, useNavigationContainerRef} from "expo-router";
import {ReactElement, useEffect} from "react";
import {useAuthStore} from "~/app/stores/useAuthStore";
import {useRouter} from "expo-router";
import {Button} from "~/components/ui/button"
import {Text } from "~/components/ui/text";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';


export default function Home():ReactElement {
    const router = useRouter();
    const navigationRef = useNavigationContainerRef()
    const isLoggedIn:boolean = useAuthStore(state => state.isLoggedIn);

    const logout = useAuthStore(state => state.logout);
    const username:string = useAuthStore(state => state.username);


    useEffect(() => {
        if(navigationRef.isReady()){
            if(isLoggedIn) router.navigate('/screens/Dashboard')
        }
    }, []);
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
                                <Button onPress={()=> router.navigate("/screens/register")}>
                                    <Text> Register</Text>
                                </Button>
                                <Button variant={"outline"} onPress={()=> router.navigate("/screens/login")}>
                                    <Text> Login</Text>
                                </Button>

                            </View>
                        </>

                    }




                </View>
            </SafeAreaView>
        </SafeAreaProvider>



    );
}
