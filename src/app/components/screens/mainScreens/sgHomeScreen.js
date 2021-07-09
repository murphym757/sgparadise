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
import { firebase } from '../../../../server/config/config';
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
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
} from '../index.js'


// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { db, currentUser, currentUID, logOut } = useAuth()
    const [error, setError] = useState('')
    const [searchType, setSearchType] = useState('sgDBSearch')
    const colors = useContext(CurrentThemeContext)
    const [addGame, setGame] = useState('')
    const [need, setNeed] = useState('')
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [entities, setEntities] = useState([])
    const [userInfo, setUserInfo] = useState()
    const entityRef  = db.collection('games')
  
    async function getTestDoc() {
        const testDoc = await db.collection('testCollect')
            .doc('bscOg6nL1akXjGIpk1oz').get()
            console.log(testDoc)
    }

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false)
                    )
              }, 2000)
            })
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
    })

    function sgGameSearchbar() {
        return (
            <SearchBar 
                searchType={searchType}
            />
        )
    }

    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
    {isLoading !== true 
        ?   <Container>
                {sgGameSearchbar({ navigation })}
                    <MainFont onPress={() => navigation.navigate('SgConsoleList')}>Home Screen</MainFont>
                    {currentUser !== null
                        ?   <View>
                                <GeneralFontColor>Logged In</GeneralFontColor>
                                <GeneralFontColor>{userInfo}</GeneralFontColor>
                            </View>
                        :   <View>
                                <GeneralFontColor>Not Logged In</GeneralFontColor>
                                <GeneralFontColor onPress={() => navigation.navigate('SgAddGameConfirm',{ itemId: 86})}>
                                    TO Games
                                </GeneralFontColor>
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
        :   <View>
                <GeneralFontColor>Loading Screen</GeneralFontColor>
            </View>
    }
    </SafeAreaView>
  );
}