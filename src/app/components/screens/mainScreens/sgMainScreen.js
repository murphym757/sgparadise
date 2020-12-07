import React, { useState, useEffect, useContext } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image, 
    ScrollView, 
    SafeAreaView, 
    TouchableOpacity 
} from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling & Screens
import {
    SgHomeScreen,
    SgGameSearchScreen,
    UserAddGameScreen,
    UserEditGameScreen,
    CurrentThemeContext,
    MainContainer,
    MainFont,
    TouchableButton,
    TouchableButtonFont
} from '../index.js'
import {
    sgSearchBarForm
} from './sgGameSearchScreenContent/searchIndex'

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

    function searchBar() {
        return sgSearchBarForm()
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
                <Stack.Screen 
                    name="UserEditGame"
                    options={{ headerShown: false }}
                    component={UserEditGameScreen} 
                />
                <Stack.Screen 
                    name="SgSearchGame"
                    options={{ headerShown: false }}
                    component={SgGameSearchScreen} 
                />
                </Stack.Navigator>   
            )
    }
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        <TouchableOpacity onPress={() => navigation.navigate('SgSearchGame')}>
            {searchBar()}
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
            {sgGamesStack()}
        </View>
    </SafeAreaView>
  );
}