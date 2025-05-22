import {Slot, Stack} from "expo-router"
import "../global.css";
import Icon from 'react-native-vector-icons/FontAwesome';

export default  function RootLayout() {
    return (
        <Stack>
            <Stack.Screen  name="index" options={{headerShown: false}} />
            <Stack.Screen  name="register/index"
                           options={{
                               headerShown: true,
                               headerTitle: "Register"


                            }}  />
            <Stack.Screen  name="login/index"
                           options={{
                               headerShown: true,
                               headerTitle: "Login"
                           }}  />
            <Stack.Screen  name="(app)/"
                           options={{
                               headerShown: false
                           }}  />
            <Stack.Screen  name="(app)/(dashboard)"
                           options={{
                               headerShown: false
                           }}  />
            <Stack.Screen  name="(app)/onboarding"
                           options={{
                               headerShown: true,
                               headerTitle: "Onboarding"
                           }}  />
        </Stack>
    )

}