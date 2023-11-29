import 'react-native-gesture-handler'
import React, { useState, useCallback, useContext, useMemo } from 'react'
if (!global.atob) { global.atob = decode }
if (!global.btoa) { global.btoa = encode }
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CurrentThemeContext, faSearch, faHome, faUser, FontAwesomeIcon } from 'index'
import { decode, encode } from 'base-64'
import { LoginScreen, RegistrationScreen, ResetPasswordScreen } from 'auth/authScreensIndex'
import { SgConsoleListScreen, GameScreen, ConfirmAddGameScreen, EditGameScreen } from 'main/sgGameScreenContent/sgGameScreenContentIndex'
import { SgHomeScreen } from 'main/sgHomeScreenIndex'
import { SgSearchHome, SgGameSearchScreen, SgIGDBGameSearchScreen } from 'main/sgGameSearchScreenContent/sgGameSearchScreenContentIndex'
import { useAuth } from 'auth/authContext'
import { useColorScheme } from 'react-native'
import { UserProfileScreen, UserSavesScreen, UpdateUserScreen } from 'user/userScreensIndex'

console.log('this is a test. Let\'s see if it works.----UPDATE: It does!')
const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function ScreenRoutes() {
  const { currentUser } = useAuth()
    // Example of using useMemo to memoize a computed value
    const userAuthStatus = useMemo(() => {
      if (currentUser !== null) return 'Main'
      return 'Auth'
    }, [currentUser])
  
    // Example of using useCallback to memoize a function
    const tabBarListeners = useCallback(({ navigation, route }) => ({
      tabPress: () => navigation.navigate(route.name),
    }), [])
  
    // Example of using useMemo to memoize JSX elements
    const homeTabScreen = useMemo(() => {
      return tabScreen('HomeScreen', 'Home', faHome, SgGameStack, true)
    }, [])
  
    const searchTabScreen = useMemo(() => {
      return tabScreen('SearchScreen', 'Search', faSearch, SgSearchStack, true)
    }, [])
  
    const profileTabScreen = useMemo(() => {
      return tabScreen('UserProfileScreen', 'Account', faUser, SgAuthStack, true)
    }, [])
  
  console.log('The App function is running 4 separate times. Why?')
  
  function tabScreen(tabName, tabBarLabelName, faIconName, componentName, unMountOnBlurOption) {
    return (
      <Tab.Screen
          name={tabName}
          options={{
            tabBarLabel: tabBarLabelName,
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={ faIconName } color={color} size={size} />
            ),
            screenOptions: { unmountOnBlur: unMountOnBlurOption }
          }}
          component={componentName} // HomePage
          listeners={tabBarListeners}
        />
    )
  }
  
  function SgUserStackNavbar() {
    const colors = useContext(CurrentThemeContext)
    return (
      <Tab.Navigator
        initialRouteName="MainScreen"
        activeColor={colors.primaryFontColor}
        inactiveColor={colors.secondaryColor}
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: colors.primaryColor }}
        barStyle={{ backgroundColor: colors.primaryColor }}
      >
        {homeTabScreen}
        {searchTabScreen}
        {profileTabScreen}
      </Tab.Navigator>
    )
  }
  
  function SgSearchStack() {
    return (
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="SgSearchHome"
          options={{ headerShown: false, gestureEnabled: false }}
          component={SgSearchHome}
          initialParams={{ gamePageLinkPressed: false, gameDataToBePassed: null }}
        />
        <Stack.Screen
          name="sgGamePageSearch"
          options={{ headerShown: false, gestureEnabled: false }}
          component={GameScreen}
        />
      </Stack.Navigator>
    )
  }
  
  function SgGameStack() {
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
        <Stack.Screen
          name="SgSearchSet"
          options={{ headerShown: false, gestureEnabled: false  }}
          component={SgSearchHome}
          initialParams={{ gamePageLinkPressed: false, gameDataToBePassed: null }}
        />
      </Stack.Navigator>
    )
  }
  
  function SgAuthStack() {
    function AccountAccess() {
      return (
        currentUser !== null
          ? "User Profile"
          : "Login"
      )
    }
    return (
      <Stack.Navigator initialRouteName={AccountAccess()}>
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
          name="User Profile"
          options={{ headerShown: false }}
          component={UserProfileScreen}
        />
        <Stack.Screen
          name="Reset Password"
          options={{ headerShown: false }}
          component={ResetPasswordScreen}
        />
        <Stack.Screen
        name="Update Account"
        options={{ headerShown: false }}
        component={UpdateUserScreen}
      />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator initialRouteName={userAuthStatus}>
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={SgUserStackNavbar}
      />
      <Stack.Screen
        name="Game"
        options={{ headerShown: false, gestureEnabled: false }}
        component={SgGameStack}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false, gestureEnabled: false }}
        component={SgSearchStack}
      />
      <Stack.Screen
        name="Auth"
        options={{ headerShown: false }}
        component={SgAuthStack}
      />
    </Stack.Navigator>
  )
}


