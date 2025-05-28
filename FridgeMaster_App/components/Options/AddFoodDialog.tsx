import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "~/components/ui/alert-dialog";
import {Button, ButtonProps, buttonVariants} from "~/components/ui/button/button.native";
import {Text} from "~/components/ui/text";
import React, {useState} from "react";
import {PressableProps, View} from "react-native";
import {Input} from "~/components/ui/input";
import AddFoodSubmit from "~/functions/Options/AddFoodSubmit";

type ButtonVariants = NonNullable<ButtonProps["variant"]>

export default function AddFoodDialog({button, variant}:{button:string, variant:ButtonVariants}){
    const FoodApiRoute = process.env.EXPO_PUBLIC_API_URL+"/Food"

    const[foodData, setFoodData] = useState({
        FoodName: "",
        FoodCategory: "",
        imageUrl:"",
        tag:""

    })

    async function submitHandle() :Promise<void>{
        await AddFoodSubmit(FoodApiRoute,foodData)
        setFoodData({
            FoodName: "",
            FoodCategory: "",
            imageUrl:"",
            tag:""})
    }
    return (

        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant={variant}>
                    <Text>{button}</Text>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add new food to Database</AlertDialogTitle>
                    <AlertDialogDescription>Please fill inputs to add new food to database</AlertDialogDescription>
                    <View className={"mt-4"}>
                        <View>
                            <Text>Food Name: *</Text>
                            <Input
                            value={foodData.FoodName}
                            onChangeText={ value => setFoodData({ ...foodData , FoodName: value })}
                            placeholder={"Enter Food Name"}/>

                        </View>
                        <View>
                            <Text>Category: *</Text>
                            <Input
                                value={foodData.FoodCategory}
                                onChangeText={ value => setFoodData({ ...foodData , FoodCategory: value })}
                                placeholder={"Enter Food Category"}/>
                        </View>
                        <View>
                            <Text>Image URL:</Text>
                            <Input
                                value={foodData.imageUrl}
                                onChangeText={ value => setFoodData({ ...foodData , imageUrl: value })}
                                placeholder={"Paste an image url"}
                            />
                        </View>
                        <View>
                            <Text>Tag:</Text>
                            <Input
                                value={foodData.tag}
                                onChangeText={ value => setFoodData({ ...foodData , tag: value })}
                                placeholder={"Enter a food tag"}/>
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
