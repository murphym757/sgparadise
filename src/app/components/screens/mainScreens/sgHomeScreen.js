import React, { useState, useEffect, useContext } from 'react'
import { View, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { loadingScreen } from 'auth/loadingScreen'
import {
    ContentContainer,
    SafeAreaViewContainer,
    ScrollViewContainer,
    Container,
    SgHomeActionGames,
    MainFont,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
    ViewTopRow
} from 'index'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { 
        currentUser, 
        currentUID, 
        displayData,
        toNewSection } = useAuth()
    const { 
        searchBar,  
        gamesFilterListName,
        testDb,
        } = useSearchBar()
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [collectionName, setCollectionName] = useState('sgAPI')

    // For Search Bar
    const [searchType, setSearchType] = useState('sgIGDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const chosenDb = testDb
    const navigationPass = navigation
    const toGameData = {
        navigationPass,
        nextPage: 'sgGamePage'
    }
    const toConsoleList = {
        navigationPass,
        nextPage: 'SgAddGameConfirm'
    }

    //For Udemy, please ignore this
    function logItems(n) {
        for(let i=0; i < n; i++) {
            console.log(i)
        }
    }

    /*----------- */

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false)
                    )
              }, 2000)
              getGameDatasgGenesisBuddyBeatEmUp()
            }, [])
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
        if(currentUID !== undefined) 
            return 
                displayData(collectionName),
                logItems(10)
               
    }, [isFocused])
    
    function searchResults() {
        return (
            <FlatList
                data={gamesFilterListName(chosenDb)}
                keyboardShouldPersistTaps="always" 
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <View style={{
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <TouchableOpacity onPress={() => chosenGame(item)}>
                        <MainFont>{item.name}</MainFont>
                    </TouchableOpacity>
                </View>
                )}
            />
        ) 
    }

    function confirmViewGames() {
        navigation.navigate('SgConsoleList',{
            searchType: searchType
        })
    }

    function homepageButtonLayout() {
        if (currentUser !== null) return (
            <View>
                <TouchableButton onPress={() => toNewSection(toConsoleList.nextPage, toConsoleList.navigationPass)}>
                    <TouchableButtonFont>Add Game</TouchableButtonFont>
                </TouchableButton>
                <TouchableButton onPress={() => confirmViewGames()}>
                    <TouchableButtonFont>View All Games</TouchableButtonFont>
                </TouchableButton>
            </View>
        )
        if (currentUser === null) return (
            <View>
                <GeneralFontColor>Not Logged In</GeneralFontColor>
                <GeneralFontColor onPress={() => navigation.navigate('SgAddGameConfirm',{ itemId: 86})}>
                    TO Games
                </GeneralFontColor>
                <TouchableButton
                    onPress={() => navigation.navigate('Auth', { screen: 'sgAuthStack' })}>
                    <TouchableButtonFont>Log in</TouchableButtonFont>
                </TouchableButton>
            </View>
        )
    }

    function actionGameSelector() {
        return <SgHomeActionGames navigation = {navigation} />
    }

  return (
    <SafeAreaViewContainer>
        {isLoading !== true 
            ?   <Container>
                    {searchBar(searchBarTitle, searchType, searchQuery)}
                    <ScrollViewContainer>
                        {searchResults()}
                        {actionGameSelector()}
                        {homepageButtonLayout()}
                    </ScrollViewContainer>
                </Container>
            :   <ContentContainer>
                    {loadingScreen()}
                </ContentContainer>
        }
    </SafeAreaViewContainer>
  )
}