import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "~/components/ui/alert-dialog";
import {Button} from "~/components/ui/button";
import {Text} from "~/components/ui/text";
import React, {useState} from "react";
import {View} from "react-native";
import {Input} from "~/components/ui/input";
import AddFoodSubmit from "~/functions/Options/AddFoodSubmit";

export default function AddFoodDialog(){
    const FoodApiRoute = process.env.EXPO_PUBLIC_API_URL+"/Food"

    const[foodData, setFoodData] = useState({
        FoodName: "",
        FoodCategory: "",
        imageUrl:"",
        tag:""

    })

    async function submitHandle(){
        await AddFoodSubmit(FoodApiRoute,foodData)
    }
    return (

        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant='outline'>
                    <Text>Show Alert Dialog</Text>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add new food to Database</AlertDialogTitle>
                    <AlertDialogDescription>Please fill inputs to add new food to database</AlertDialogDescription>
                    <View className={"mt-4"}>
                        <View>
                            <Text>Food Name: *</Text>
                            <Input />
                        </View>
                        <View>
                            <Text>Category: *</Text>
                            <Input />
                        </View>
                        <View>
                            <Text>Image URL:</Text>
                            <Input />
                        </View>
                        <View>
                            <Text>Tag:</Text>
                            <Input />
                        </View>
                    </View>

                    <Text>* : required fields</Text>

                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <Text>Cancel</Text>
                    </AlertDialogCancel>
                    <AlertDialogAction onPress={submitHandle}>
                        <Text>Continue</Text>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
