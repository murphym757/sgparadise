import 'react-native-gesture-handler'
import React, { useState, useContext } from 'react'
if (!global.atob) { global.atob = decode }
if (!global.btoa) { global.btoa = encode }
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { CurrentThemeContext, faSearch, faHome, faUser, FontAwesomeIcon } from 'index'
import { decode, encode } from 'base-64'
import { LoginScreen, RegistrationScreen, ResetPasswordScreen } from 'auth/authScreensIndex'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { SgConsoleListScreen, GameScreen, ConfirmAddGameScreen, EditGameScreen } from 'main/sgGameScreenContent/sgGameScreenContentIndex'
import { SgHomeScreen } from 'main/sgHomeScreenIndex'
import { SgSearchHome, SgGameSearchScreen, SgIGDBGameSearchScreen } from 'main/sgGameSearchScreenContent/sgGameSearchScreenContentIndex'
import { useAuth } from 'auth/authContext'
import { useColorScheme } from 'react-native'
import { UserProfileScreen, UserSavesScreen, UpdateUserScreen } from 'user/userScreensIndex'


const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [ notLoggingIn, setNotLoggingIn ] = useState(false)
  const { currentUser } = useAuth()
  const colors = useContext(CurrentThemeContext)
  const ReactNavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryColor,
    },
  }
  const scheme = useColorScheme()
  const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
  });
  console.log("🚀 ~ file: screenRoutes.js:51 ~ tabBarListeners ~ tabBarListeners:", tabBarListeners)

  function SgUserStackNavbar() {
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
          name="Home"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={ faHome } color={color} size={size} />
            ),
          }}
          component={SgGameStack} // HomePage
          listeners={tabBarListeners}
        />
        <Tab.Screen
          name="Search"
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={ faSearch } color={color} size={size} />
            ),
          }}
          component={SgSearchStack}
          listeners={tabBarListeners}
        />
        <Tab.Screen
          name="UserProfileScreen"
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={ faUser } color={color} size={size} />
            ),
            screenOptions: { unmountOnBlur: true }
          }}
          component={SgAuthStack}
          listeners={tabBarListeners}
        />
      </Tab.Navigator>
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
      </NavigationContainer>
  )
}

