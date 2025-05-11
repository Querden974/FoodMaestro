import {View, Text, TextInput, Button, Platform} from 'react-native'
import React from 'react'
import DateTimePicker from "@react-native-community/datetimepicker"
import {useAuthStore} from "@/app/stores/useAuthStore";
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import EditUserDataSubmit from "@/functions/EditUserDataSubmit";
import {Router, useRouter} from "expo-router";

const schema = z.object({
    UserId:z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Birthday: z.date(),
})

export type FormDataUserInfo = z.infer<typeof schema>;

export default function Onboarding() {
    const userId = useAuthStore(s=> s.id)
    const API = "http://192.168.1.96:5020/api/UserInfo";
    const router:Router = useRouter()
    const {control,
        handleSubmit,
        formState:{errors}
    } = useForm<FormDataUserInfo>({
        resolver: zodResolver(schema),
        defaultValues:{
            UserId: userId,
            Birthday: new Date()
        }
    });

    const email:string = useAuthStore(s => s.email)
    const [showPicker, setShowPicker] = React.useState(false);

    const onSubmit = async (data:FormDataUserInfo):Promise<void> => {
        console.log(data);
        await EditUserDataSubmit(API,data,router)

    }
    return (
        <View className={"px-2"}>
            <Text>Welcome to Food Maestro!</Text>
            <Text>Please enter your informations:</Text>

            <View className={"gap-1"}>
                <View>
                    <Text>FirstName :</Text>
                    <Controller
                        control={control}
                        name="FirstName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className={"border rounded px-2"}
                                placeholder=""
                                value={value}
                                onChangeText={onChange}
                                keyboardType="default"
                            />
                        )}
                    />
                    {errors.FirstName && <Text>{errors.FirstName.message}</Text>}
                </View>
                <View>
                    <Text>LastName :</Text>
                    <Controller
                        control={control}
                        name="LastName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className={"border rounded px-2"}
                                placeholder=""
                                value={value}
                                onChangeText={onChange}
                                keyboardType="default"
                            />
                        )}
                    />
                    {errors.LastName && <Text>{errors.LastName.message}</Text>}
                </View>
                <View>
                    <Text>Birthday :</Text>
                    <Controller
                        control={control}
                        name="Birthday"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Button
                                    title={value ? value.toLocaleDateString() : "Choisir une date"}
                                    onPress={() => setShowPicker(true)}
                                />
                                {showPicker && (
                                    <DateTimePicker
                                        value={value || new Date()}
                                        mode="date"
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={(_, selectedDate) => {
                                            setShowPicker(Platform.OS === "ios");
                                            if (selectedDate) onChange(selectedDate);
                                        }}
                                    />
                                )}
                            </>
                        )}
                    />
                    {errors.Birthday && <Text>{errors.Birthday.message}</Text>}
                </View>
                <View>
                    {/*Email*/}
                    <TextInput className={"border rounded px-2"} editable={false} placeholder={"Email Address"} value={email} />
                </View>
                <Button title={"Submit informations"} onPress={handleSubmit(onSubmit)}/>
            </View>
        </View>
    )
}
