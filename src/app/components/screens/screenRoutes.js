import 'react-native-gesture-handler';
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {CurrentThemeContext} from '../../../../assets/styles/globalTheme'
import { 
  LoginScreen, 
  HomeScreen, 
  RegistrationScreen,
  UpdateUserScreen,
  ResetPasswordScreen
} from './index.js'
import{ useAuth } from './authScreens/authContext'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator()

export default function App() {
  const { currentUser } = useAuth()
  const colors = useContext(CurrentThemeContext) 

  return (
      <NavigationContainer>
        <Stack.Navigator>  
        { currentUser !== null
          ? (<>
            <Stack.Screen 
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen} 
            />
            <Stack.Screen 
              name="Update User" 
              options={{ headerShown: false }}
              component={UpdateUserScreen} 
            />
            </>)
          : (<>
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
            </>)
        }
        </Stack.Navigator>
      </NavigationContainer>
  );
}