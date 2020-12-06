import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling & Screens
import {
    SgHomeScreen,
    UserAddGameScreen,
    CurrentThemeContext,
    MainContainer,
    MainFont,
    TouchableButton,
    TouchableButtonFont
} from '../index.js'

// React Navigation
import { createDrawerNavigator } from '@react-navigation/drawer'
const Drawer = createDrawerNavigator()

import { createStackNavigator } from '@react-navigation/stack'


export default function SgMainScreen({ navigation, route }) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
    const colors = useContext(CurrentThemeContext)

    function toOnLoginPress({ navigation }) {
        navigation.goBack()
  }

    function sgGamesStack() {
        const Stack = createStackNavigator()
            return (
                <Stack.Navigator
                    screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0
                    },
                    headerTintColor: colors.primaryFontColor,
                    style: {
                        shadowColor: 'transparent',
                    },
                }}
                initialRouteName="SgHome"
            >
                <Stack.Screen 
                    name="SgHome"
                    options={{ headerShown: false }}
                    component={SgHomeScreen} 
                />
                <Stack.Screen 
                    name="UserAddGame"
                    options={{ headerShown: false }}
                    component={UserAddGameScreen} 
                />
                </Stack.Navigator>   
            )
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        <View style={{ flex: 1 }}>
            {sgGamesStack()}
        </View>
    </SafeAreaView>
  );
}