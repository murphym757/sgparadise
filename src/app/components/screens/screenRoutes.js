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
  SgMainScreen,
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

  function sgUserStackNavbar() {
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
          name="SgMainScreen"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faHome } color={color} size={size} />
          ),
          }}
          component={SgMainScreen} // HomePage
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

  function sgAuthStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          options={{ headerShown: false }} 
          component={LoginScreen}
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

  function userAuthStatus() {
    if(currentUser !== null) {
      return "Main"
    } else {
      return "Auth"
    }
  }

  return (
      <NavigationContainer> 
        <Stack.Navigator initialRouteName={userAuthStatus}>
          <Stack.Screen 
            name="Main" 
            options={{ headerShown: false }} 
            component={sgUserStackNavbar}
          />
          <Stack.Screen 
            name="Auth" 
            options={{ headerShown: false }} 
            component={sgAuthStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}