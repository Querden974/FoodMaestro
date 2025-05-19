import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard';
import Onboarding from '../screens/Onboarding';
import {SafeAreaProvider} from "react-native-safe-area-context";

export type RootStackParams = {
    Login:undefined;
    Register:undefined;
    Home:undefined;
    Dashboard:undefined;
    Onboarding:undefined;
}
const Stack = createNativeStackNavigator<RootStackParams>();
export default function AppNavigator() {
    return (
            <SafeAreaProvider>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="Onboarding" component={Onboarding} />

                </Stack.Navigator>
            </SafeAreaProvider>

    );
}
