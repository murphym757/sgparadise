import 'react-native-gesture-handler'
import React, { useState, useContext } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  ConfirmAddGameScreen,
  CurrentThemeContext,
  EditGameScreen,
  faHeart,
  faHome,
  faUser,
  FontAwesomeIcon,
  GameScreen,
  LoginScreen,
  RegistrationScreen,
  ResetPasswordScreen,
  SgConsoleListScreen,
  SgGameSearchScreen,
  SgHomeScreen,
  SgIGDBGameSearchScreen,
  useAuth,
  UserProfileScreen,
  UserSavesScreen,
} from 'index'
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const { currentUser } = useAuth()
  const [notLoggingIn, setNotLoggingIn] = useState(false)
  const colors = useContext(CurrentThemeContext) 
  const scheme = useColorScheme()
  const ReactNavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryColor,
    },
  }

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
          component={sgGameStack} // HomePage
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

  function sgGameStack() {
    return (
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen 
          name="sgMainGamePage" 
          options={{ headerShown: false }} 
          component={SgHomeScreen}
        />
        <Stack.Screen 
          name="sgGamePage" 
          options={{ headerShown: false, gestureEnabled: false }} 
          component={GameScreen}
        />
        <Stack.Screen //For sg Paradise search
            name="SgGameSearch"
            options={{ headerShown: false }}
            component={SgGameSearchScreen} 
        />
        <Stack.Screen //For IGDB search
            name="sgIGDBSearch"
            options={{ headerShown: false }}
            component={SgIGDBGameSearchScreen} 
        />
        <Stack.Screen 
            name="SgConsoleList"
            options={{ headerShown: false }}
            component={SgConsoleListScreen} 
        />
        <Stack.Screen 
            name="SgAddGameConfirm"
            options={{ headerShown: false }}
            component={ConfirmAddGameScreen} 
        />
        <Stack.Screen 
            name="SgEditGame"
            options={{ headerShown: false }}
            component={EditGameScreen} 
        />
      </Stack.Navigator>
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
    if(currentUser !== null) return "Main" 
    return "Auth"
  }

  return (
      <NavigationContainer theme={ReactNavTheme}> 
        <Stack.Navigator initialRouteName={userAuthStatus}>
          <Stack.Screen 
            name="Main" 
            options={{ headerShown: false }} 
            component={sgUserStackNavbar}
          />
          <Stack.Screen 
            name="Game" 
            options={{ headerShown: false, gestureEnabled: false }} 
            component={sgGameStack}
          />
          <Stack.Screen 
            name="Auth" 
            options={{ headerShown: false }} 
            component={sgAuthStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

