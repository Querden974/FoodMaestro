import {View, Text} from 'react-native'
import React from 'react'
import HomeScreen from "~/app/screens/Home";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import RecipesScreen from "~/app/screens/dashboard/Recipes";
import FoodScreen from "~/app/screens/dashboard/Food";
import OptionsScreen from "~/app/screens/dashboard/Options";

const Tab = createBottomTabNavigator();
export default function AppTabs() {
    return (


                <Tab.Navigator screenOptions={{headerShown: false}}>
                    <Tab.Screen name="Food" component={FoodScreen} />
                    <Tab.Screen name="Recipes" component={RecipesScreen} />
                    <Tab.Screen name="Options" component={OptionsScreen} />



                </Tab.Navigator>


            )


}
