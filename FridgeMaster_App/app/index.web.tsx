import { Image, Pressable, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Link, useNavigationContainerRef} from "expo-router";
import {ReactElement, useEffect} from "react";
import {useAuthStore} from "~/app/stores/useAuthStore";
import {useRouter} from "expo-router";
import {Button} from "~/components/ui/button/button.web"
import {Text } from "~/components/ui/text";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import Dashboard from "app/(app)/(dashboard)";


export default function Home():ReactElement {
    const router = useRouter();
    const navigationRef = useNavigationContainerRef()
    const isLoggedIn:boolean = useAuthStore(state => state.isLoggedIn);

    const logout = useAuthStore(state => state.logout);
    const username:string = useAuthStore(state => state.username);

    //TO FIX
    // useEffect(() => {
    //     if(navigationRef.isReady()){
    //         if(isLoggedIn) router.navigate('/(app)/(dashboard)/index')
    //     }
    // }, []);
    return (
        <>
            <div className={"flex-1 justify-center items-center gap-6"}>

                        {!isLoggedIn &&
                            <>
                                <Text className={"text-blue-400 text-4xl text-center font-bold"}>Welcome to Food Maestro.</Text>
                                <div className={"w-1/2 gap-2"}>
                                    <Button asChild variant={"outline"}>
                                        <a href="/register">Register</a>
                                    </Button>
                                    <Button asChild>
                                        <a href="/login">Login</a>
                                    </Button>
                                    

                                </div>
                            </>

                        }
                    </div>
        </>


    );
}
