import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling & Screens
import {
    SgHomeScreen,
    LoginScreenAlt,
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
                </Stack.Navigator>   
            )
    }

  const colors = useContext(CurrentThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        <View style={{ flex: 1 }}>
        <Drawer.Navigator initialRouteName="SgHome">
            <Drawer.Screen name="Home" component={sgGamesStack} />
        </Drawer.Navigator>
        </View>
    </SafeAreaView>
  );
}