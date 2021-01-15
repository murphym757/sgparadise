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
import {
    searchBar
} from './sgGameSearchScreenContent/searchIndex'

// App Styling & Screens
import {
    SgHomeScreen,
    SgConsoleListScreen,
    AddGameScreen,
    EditGameScreen,
    SgGameSearchScreen,
    CurrentThemeContext,
} from '../index.js'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'


export default function SgMainScreen({ navigation, route }) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
    const [searchType, setSearchType] = useState('sgDBSearch')
    console.log(searchType)
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
                <Stack.Screen 
                    name="SgConsoleList"
                    options={{ headerShown: false }}
                    component={SgConsoleListScreen} 
                />
                <Stack.Screen 
                    name="SgAddGame"
                    options={{ 
                        headerShown: false,
                        gestureEnabled: false 
                    }}
                    component={AddGameScreen} 
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
        {searchBar({navigation}, searchType)}
        <View style={{ flex: 1 }}>
            {sgHomeStack()}
        </View>
    </SafeAreaView>
  );
}