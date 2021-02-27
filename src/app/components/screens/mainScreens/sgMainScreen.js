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
    SgConsoleListScreen,
    AddGameScreen,
    ConfirmAddGameScreen,
    EditGameScreen,
    CurrentThemeContext,
} from '../index.js'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'


export default function SgMainScreen({ navigation, route }) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
    const colors = useContext(CurrentThemeContext)

    function toOnLoginPress({ navigation }) {
        navigation.goBack()
    }

    function sgHomeStack() {
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
      
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        <View style={{ flex: 1 }}>
            {sgHomeStack()}
        </View>
    </SafeAreaView>
  );
}