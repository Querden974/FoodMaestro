import {Slot, Stack, Tabs} from "expo-router"
import "../../global.css";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {PortalHost} from "@rn-primitives/portal";

export default  function RootLayout() {
    return (
        <>
            <Tabs screenOptions={{headerShown: false}}>
                <Tabs.Screen
                    name={"index"}

                    options={{tabBarLabel: "Containers", tabBarIcon:({color, size}) => <Icon name={"kitchen"} color={color} size={size}/> }}/>
                <Tabs.Screen name={"Recipes"} options={{tabBarIcon:({color, size}) => <Icon name={"book"} color={color} size={size}/> }}/>
                <Tabs.Screen name={"Options"} options={{tabBarIcon:({color, size}) => <Icon name={"settings"} color={color} size={size}/> }}/>
            </Tabs>
            <PortalHost/>
        </>

    )

}