import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function Recipes() {
    return (
        <SafeAreaProvider>
            <SafeAreaView >
                <View>
                    <Text>Recipes</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
