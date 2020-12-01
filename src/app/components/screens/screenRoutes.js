import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import {CurrentThemeContext} from '../../../../assets/styles/globalTheme'
import { 
  LoginScreen, 
  RegistrationScreen,
  SgHomeScreen,
  UserProfileScreen,
  UpdateUserScreen,
  UserSavesScreen,
  ResetPasswordScreen,
  FontAwesomeIcon,
  faHome, faHeart, faUser
} from './index.js'
import{ useAuth } from './authScreens/authContext'
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const { currentUser } = useAuth()
  const [notLoggingIn, setNotLoggingIn] = useState(false)
  const colors = useContext(CurrentThemeContext) 

  function loggedinStackNavbar() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primaryFontColor}
        inactiveColor={colors.secondaryColor}
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: colors.primaryColor }}
        barStyle={{ backgroundColor: colors.primaryColor }}     
      >
        <Tab.Screen 
          name="SgHomeScreen"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faHome } color={color} size={size} />
          ),
          }}
          component={SgHomeScreen} // HomePage
        />
        <Tab.Screen 
          name="Saved"
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faHeart } color={color} size={size} />
          ),
          }}
          component={UserSavesScreen} 
        />
        <Tab.Screen 
          name="UserProfileScreen"
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faUser } color={color} size={size} />
          ),
          }}
          component={UserProfileScreen} 
        />
      </Tab.Navigator>
    )
  }

  function notLoggedInStackNavbar() {
    <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primaryFontColor}
        inactiveColor={colors.secondaryColor}
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: colors.primaryColor }}
        barStyle={{ backgroundColor: colors.primaryColor }}     
      >
        <Tab.Screen 
          name="SgHomeScreen"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faHome } color={color} size={size} />
          ),
          }}
          component={UserProfileScreen} // HomePage
        />
        <Tab.Screen 
          name="Saved"
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faHeart } color={color} size={size} />
          ),
          }}
          component={UserSavesScreen} 
        />
        <Tab.Screen 
          name="UserProfileScreen"
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faUser } color={color} size={size} />
          ),
          }}
          component={UserProfileScreen} 
        />
      </Tab.Navigator>
  }

  function notLoggedInStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          options={{ headerShown: false }} 
          component={LoginScreen}
          initialParams={{ setNotLoggingIn: setNotLoggingIn }}
        />
        <Stack.Screen 
          name="Registration" 
          options={{ headerShown: false }}
          component={RegistrationScreen} 
        />
        <Stack.Screen 
          name="Reset Password" 
          options={{ headerShown: false }}
          component={ResetPasswordScreen} 
        />
      </Stack.Navigator>
    )
  }


  return (
      <NavigationContainer> 
        { notLoggingIn !== false || currentUser !== null 
          ? loggedinStackNavbar()
          : notLoggedInStack()
        }
      </NavigationContainer>
  );
}

