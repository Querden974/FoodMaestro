import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function Options() {
    return (
        <SafeAreaProvider>
            <SafeAreaView >
                <View>
                    <Text>Options</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
