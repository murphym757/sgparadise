import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling & Screens
import {
    CurrentThemeContext,
    Container,
    MainFont,
    TouchableButton,
    TouchableButtonFont,
} from '../index.js'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
  
    function loggedInUser() {
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
              component={HomeScreen} 
          />
        </Stack.Navigator>
    }

  const colors = useContext(CurrentThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        {currentUser !== null
            ?   <Container>
                    <MainFont>Home Screen</MainFont>
                    <Text>Logged In</Text>
                </Container>
            :   <Container>
                    <MainFont>Home Screen</MainFont>
                    <Text>Not Logged In</Text>
                    <TouchableButton
                        onPress={() => navigation.navigate('Auth', { screen: 'sgAuthStack' })}>
                        <TouchableButtonFont>Log in</TouchableButtonFont>
                    </TouchableButton>
                    <TouchableButton
                        onPress={() => navigation.navigate('UserAddGame')}>
                    <TouchableButtonFont>Add Game</TouchableButtonFont>
                    </TouchableButton>
                </Container>
        } 
    </SafeAreaView>
  );
}