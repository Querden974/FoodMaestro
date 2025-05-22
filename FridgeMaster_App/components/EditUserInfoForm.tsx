import {View, Platform} from 'react-native'
import React, {useEffect} from 'react'
import {Controller, useForm} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useAuthStore} from "~/app/stores/useAuthStore";
import {useUserInfo} from "~/app/stores/useUserInfo";
import {Router, useRouter} from "expo-router";
import {zodResolver} from "@hookform/resolvers/zod";
import EditUserDataSubmit from "~/functions/EditUserDataSubmit";
import {FormDataUserInfo, UserInfoSchema} from "~/Validator/userInfoValidator";
import {z} from "zod";
import {Input} from "~/components/ui/input"
import {Text} from "~/components/ui/text";
import {Button} from "~/components/ui/button";


export default function EditUserInfoForm() {
    const userId = useAuthStore(s=> s.id)
    const userDataStore:(firstname:string,lastname:string, birthday:Date, isFirstLogin:boolean) => void = useUserInfo(s => s.fetchData);
    const userData = {
        firstname: useUserInfo(s=> s.firstName),
        lastname: useUserInfo(s=> s.lastName),
        birthday: useUserInfo(s=> s.birthday),

    }
    // const API = "http://192.168.1.96:5020/api/UserInfo";
    const API = process.env.EXPO_PUBLIC_API_URL+"/UserInfo"
    const router:Router = useRouter()


    const {control,
        handleSubmit,
        formState:{errors}
    } = useForm<FormDataUserInfo>({
        resolver: zodResolver(UserInfoSchema),
        defaultValues:{
            UserId: userId,
            FirstName: userData.firstname,
            LastName: userData.lastname,
            Birthday:
                userData.birthday instanceof Date
                    ? userData.birthday
                    : new Date(userData.birthday),
        }
    });


    const email:string = useAuthStore(s => s.email)
    const [showPicker, setShowPicker] = React.useState(false);

    const onSubmit = async (data: FormDataUserInfo): Promise<void> => {
        console.log(data)
        try {
            await EditUserDataSubmit(API, data, router, userDataStore);
        } catch (err) {
            console.error("❌ Error caught in onSubmit:", err);
        }
    };
    return (
        <View className={"gap-1"}>
            <View>
                <Text>FirstName :</Text>
    <Controller
    control={control}
    name="FirstName"
    render={({ field: { onChange, value } }) => (
        <Input
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
            <Input
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
                    variant={"outline"}
                    onPress={() => setShowPicker(true)}
                >
                    <Text>{value ? value.toLocaleDateString() : "Choisir une date"}</Text>
                </Button>
            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                mode="date"
                display={"default"}
                onChange={(_, selectedDate) => {
                setShowPicker(Platform.OS === "ios");
                if (selectedDate) {
                    onChange(selectedDate)
                    setShowPicker(false)
                }
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
                <Text>Email :</Text>
                <Input
                    value={email}
                    editable={false}
                />
            </View>
            <Button onPress={handleSubmit(onSubmit, (err) => {
                console.log("❌ Validation errors:", err);
            })}>
                <Text className={"text-center"}>Submit informations</Text>
            </Button>
            </View>
    )
}
