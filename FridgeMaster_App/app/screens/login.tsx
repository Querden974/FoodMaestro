import {View, Text, TextInput, Button, Alert} from 'react-native'
import {RefObject,useRef , useState} from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Router, useRouter} from 'expo-router';
import {useAuthStore} from "@/app/stores/useAuthStore";
import * as Burnt from "burnt"

export default function Login() {
    const router:Router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    if(isLoggedIn) router.replace("/screens/Home")

    const login = useAuthStore((state) => state.login);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const registerApi = "http://192.168.1.96:5020/api/Login";

    const handleForm:()=>Promise<void> = async ():Promise<void> => {

         const form = {
             username,
             password,
         };

         try {
             const res:Response = await fetch(registerApi, {
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
                 console.log("Login successfull");
                 login(username);
                 Burnt.toast({
                     title: "Login successfull",
                     preset:"done",
                     from: "top"
                 })
                 router.replace('/screens/Dashboard')
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
                    <TextInput value={username} onChangeText={setUsername} className={"border rounded-xl"}/>
                </View>
                <View className={"w-[80%] gap-2"}>
                    <Text>Password:</Text>
                    <TextInput secureTextEntry={true} value={password} onChangeText={setPassword}   className={"border rounded-xl"}/>
                </View>
                <View className={"w-[80%] gap-2 rounded-xl"}>
                    <Button title={"Connect to your account"} onPress={():void=>{handleForm()}} />
                </View>

            </SafeAreaView>

        </SafeAreaProvider>

    )
}
