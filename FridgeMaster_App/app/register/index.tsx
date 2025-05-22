import {View, TextInput, Alert, Platform} from 'react-native'
import {useState} from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Router, useRouter} from "expo-router";
import {Button } from "~/components/ui/button"
import {Text} from "~/components/ui/text";
import { Input } from "~/components/ui/input"

export default function Register() {
    const router: Router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // const registerApi = "http://192.168.1.96:5020/api/Register";
    const registerApi = process.env.EXPO_PUBLIC_API_URL+"/register";
    async function handleSubmit():Promise<void> {
        if(password !== confirmPassword){
            return Alert.alert("Passwords do not match");
        }
        if(!username || !email || !password){
            return Alert.alert("Please enter a valid informations");
        }
        const form = {
            username,
            email,
            password,
        };

        console.log(form);


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
                console.log("Account created successfully");
                router.replace('/')
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
                    {/*<TextInput value={username} onChangeText={setUsername} className={"border rounded-xl"}/>*/}
                    <Input
                        value={username}
                        onChangeText={setUsername}
                        placeholder={"Enter your Username"}

                    />
                </View>
                <View className={"w-[80%] gap-2"}>
                    <Text>Email:</Text>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder={"Enter your Email Address"}

                    />
                    {/*<TextInput value={email} onChangeText={setEmail} className={"border rounded-xl"}/>*/}
                </View>
                <View className={"w-[80%] gap-2"}>
                    <Text>Password:</Text>
                    {/*<TextInput secureTextEntry={true} value={password} onChangeText={setPassword}   className={"border rounded-xl"}/>*/}
                    <Input
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={"Enter your Password"}

                    />
                </View>
                <View className={"w-[80%] gap-2"}>
                    <Text>Confirm Password:</Text>
                    {/*<TextInput secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}   className={"border rounded-xl"}/>*/}
                    <Input
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder={"Confirm your Password"}

                    />
                </View>
                <View className={"w-[80%] gap-2 rounded-xl"}>
                    <Button onPress={():void=>{handleSubmit()}}>
                        <Text>Create your account</Text>
                    </Button>

                </View>

            </SafeAreaView>

        </SafeAreaProvider>

    )
}