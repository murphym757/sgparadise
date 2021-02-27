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
    SearchBar,
    AddGameScreen,
    ConfirmAddGameScreen,
    SgConsoleListScreen,
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
    const [searchType, setSearchType] = useState('sgDBSearch')
    const colors = useContext(CurrentThemeContext)
  
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
            <Stack.Screen 
                name="SgConsoleList"
                options={{ headerShown: false }}
                component={SgConsoleListScreen} 
            />
            <Stack.Screen 
                name="SgAddGame"
                options={{ headerShown: false }}
                component={AddGameScreen} 
            />
        </Stack.Navigator>
    }

    function sgGameSearchbar() {
        return (
            <SearchBar 
                searchType={searchType}
            />
        )
    }

    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        {sgGameSearchbar({ navigation })}
        <Container>
            <MainFont onPress={() => navigation.navigate('SgConsoleList')}>Home Screen</MainFont>
            {currentUser !== null
                ?   <View>
                        <Text>Logged In</Text>
                    </View>
                :   <View>
                        <Text>Not Logged In</Text>
                        <Text onPress={() => navigation.navigate('SgAddGameConfirm',{ 
                                itemId: 86
                            },
                          )}>TO Games</Text>
                        <TouchableButton
                            onPress={() => navigation.navigate('Auth', { screen: 'sgAuthStack' })}>
                            <TouchableButtonFont>Log in</TouchableButtonFont>
                        </TouchableButton>
                        <TouchableButton
                            onPress={() => navigation.navigate('SgConsoleList')}>
                        <TouchableButtonFont>Add Game</TouchableButtonFont>
                        </TouchableButton>
                    </View>
            }
        </Container>
    </SafeAreaView>
  );
}