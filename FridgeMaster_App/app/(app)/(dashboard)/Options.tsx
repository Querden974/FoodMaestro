import {View, Alert} from 'react-native'
import EditUserInfoForm from "~/components/EditUserInfoForm"
import {Redirect} from 'expo-router'

import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {useAuthStore} from "~/app/stores/useAuthStore";
import {useUserInfo} from "~/app/stores/useUserInfo";

import {Button} from "~/components/ui/button"
import {Text} from "~/components/ui/text";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import AddFoodDialog from "~/components/Options/AddFoodDialog";

export default function Options() {
    const router = useRouter();
    const clearUserInfo = useUserInfo(s=> s.clearData)
    const logout = useAuthStore(s => s.logout);
    const userData = {
        username: useAuthStore(s => s.username),
        email: useAuthStore(s => s.email),
        id: useAuthStore(s => s.id),

    }
    const [item, setItem] = React.useState<string>();

    function Logout(){
        logout();
        clearUserInfo();
        console.log('logout');

        // Burnt.toast({
        //     title: "Disconnected, See you soon!",
        //     preset:"done",
        //     from: "top"
        // })
        // return<Redirect href={"/"}/>
        return router.dismissAll();
    }



    return (
        <SafeAreaProvider>
            <SafeAreaView className={"p-1 h-full w-full"}>
                {/*<Text>{userData.username} : id={userData.id}</Text>*/}



                <Card className={"h-full w-full"}>

                    <CardContent>
                        <Accordion
                            type="single"
                            collapsible

                            className='w-full max-w-sm native:max-w-md'
                        >
                            <AccordionItem value='item-1'>
                                <AccordionTrigger>
                                    <Text>User Informations</Text>
                                </AccordionTrigger>
                                <AccordionContent>

                                    <Card>
                                        <CardContent className={"mt-3"}>
                                            <EditUserInfoForm />
                                        </CardContent>
                                    </Card>

                                </AccordionContent>
                            </AccordionItem>


                            <AccordionItem value='item-2'>
                                <AccordionTrigger>
                                    <Text>API INTERACTION (TEMP)</Text>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <AddFoodDialog button={"Add Food"} />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value='item-3'>
                                <AccordionTrigger>
                                    <Text className={"text-red-500 font-bold"}>Danger Zone</Text>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Text className={"text-red-500 font-bold "}>
                                        WARNING!</Text>
                                    <Text>
                                        This area is dedicated to delete your account
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                    <CardFooter className={"mt-auto mx-auto"}>
                        <Button variant={"destructive"} onPress={Logout}>
                            <Text>Disconnect</Text>
                        </Button>
                    </CardFooter>
                </Card>



            </SafeAreaView>
        </SafeAreaProvider>
    )
}
