import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Stack} from "expo-router";

export default function Food() {
    return (
            <SafeAreaView >
                <View>
                    <Text>Food</Text>
                </View>
            </SafeAreaView>
    )
}
