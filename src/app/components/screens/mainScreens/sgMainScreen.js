import React, { useState, useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useAuth } from 'auth/authContext'


// App Styling & Screens
import { CurrentThemeContext, SgHomeScreen } from 'index';

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
  )
}