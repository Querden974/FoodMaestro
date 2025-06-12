import { Router, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "~/app/stores/useAuthStore";
import { useContainerStore } from "~/app/stores/useContainerStore";
import { useUserInfo } from "~/app/stores/useUserInfo";
import { Button } from "~/components/ui/button/button.native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";


export default function Login() {
    const router:Router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    // if(isLoggedIn) router.replace("/screens/Home")
    // useEffect(()=>{
    //     if(isLoggedIn) navigation.navigate("Dashboard")
    // },[isLoggedIn])
    const login = useAuthStore((state) => state.login);
    const userInfo = useUserInfo(s=>s.fetchData);
    const userData = useUserInfo();

    const containerFetch = useContainerStore(s => s.fetchContainers);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginApi = "http://192.168.1.96:5020/api/Login";
    // const loginApi:string = process.env.EXPO_PUBLIC_API_URL+"/Login"
    const handleForm:()=>Promise<void> = async ():Promise<void> => {

         const form = {
             username,
             password,
         };

         try {
             const res:Response = await fetch(loginApi, {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(form),

             })
             if(!res.ok){
                 throw new Error(`An error occured: ${res.status}`);
             }
             if(res.status === 200){

                 const resData = await res.json()
                 // console.log(resData);
                 login(resData.data.username, resData.data.email ,resData.data.id);

                 userInfo(
                     resData.data.userInfo.firstName,
                     resData.data.userInfo.lastName,
                     resData.data.userInfo.birthday,
                     resData.data.userInfo.isFirstLoggin
                 )
                containerFetch(resData.container);
                
                // console.log(resData.container)

                



                

                 if(resData.data.userInfo.isFirstLog){
                     router.push("/onboarding")
                 }else{
                     router.navigate("/(app)/(dashboard)")
                 }

             }else{
                // Add toast
             }

         }catch (err){
             console.error(err);
         }


     }
    return (
        <SafeAreaProvider>
            <SafeAreaView className={"w-full items-center justify-center h-full gap-4"}>
                <View className={"w-[80%] gap-2"}>
                    <Text>Username:</Text>
                    <Input
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View className={"w-[80%] gap-2"}>
                    <Text>Password:</Text>
                    {/*<TextInput secureTextEntry={true} value={password} onChangeText={setPassword}   className={"border rounded-xl"}/>*/}
                    <Input
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View className={"w-[80%] gap-2 rounded-xl"}>
                    {/*<Button title={"Connect to your account"} onPress={():void=>{handleForm()}} />*/}
                    <Button onPress={():void=>{handleForm()}}>
                        <Text>Connect to your account</Text>
                    </Button>
                </View>

            </SafeAreaView>

        </SafeAreaProvider>

    )
}
