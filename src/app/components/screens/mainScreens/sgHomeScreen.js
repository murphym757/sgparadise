import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { AppWideImageContext } from 'main/sgImageContext'
import { homeScreenSpotlightGamesContext } from 'main/sgHomeScreenGames/sgSpotlightedGames'
import { SgGameListings } from 'main/sgHomeScreenGames/sgGameListingScreen'
import { sectionHeadingsContext } from 'main/sgHomeScreenGames/sgHomeGamesSectionHeadingContext'
import { loadingScreen } from 'auth/loadingScreen'
import { useLoader } from 'server/config/loaderContext'
import { useAuth } from 'auth/authContext'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import {
    ContentContainer,
    CurrentThemeContext,
    SafeAreaViewContainer,
    ScrollViewContainer,
    Container,
    MainFont,
    TouchableButton,
    TouchableButtonFont,
} from 'index';
import { useFocusEffect } from '@react-navigation/native';

export default function SgHomeScreen({ navigation, route }) {
    const { state, dispatch } = useLoader()
    const isLoading = state.isLoading
    const { 
        currentUID, 
        currentUser, 
        displayData,
        toNewSection,
        getGameDataSpotlight
    } = useAuth()
    
        console.log("🚀 ~ file: sgHomeScreen.js:48 ~ SgHomeScreen ~ currentUID:", currentUID)

    // For Spotlight Section
    const [userInfo, setUserInfo] = useState()
    console.log("🚀 ~ file: sgHomeScreen.js:56 ~ SgHomeScreen ~ userInfo:", userInfo)
    const colors = useContext(CurrentThemeContext)
    const images = useContext(AppWideImageContext)

    const [currentMonth, setCurrentMonth] = useState()
    const [spotlightGame, setSpotlightGame] = useState([])
    console.log("🚀 ~ file: sgHomeScreen.js:43 ~ SgHomeScreen ~ spotlightGame:", spotlightGame)
    const [homeScreenGameArray1, setHomeScreenGameArray1] = useState([])
    const [homeScreenGameArray2, setHomeScreenGameArray2] = useState([])
    const [homeScreenGameArray3, setHomeScreenGameArray3] = useState([])
    const [homeScreenGameArray4, setHomeScreenGameArray4] = useState([])
    const [homeScreenGameArray5, setHomeScreenGameArray5] = useState([])


    function dateCheck() {
        const d = new Date();
        let month = d.getMonth();
        //* Make this the second argument different to reflect the latest entries
        if (month == 10) return (
            doSomething('sgGenesis', 'Platformer', 'Platformer', "Beat ‘em Up", 'Basketball'), 
            getGameDataSpotlight('sgGenesis', setSpotlightGame, 'streets-of-rage-3'),
            setCurrentMonth('November')
        )
    }


    //Todo: Add more 'displayData' functions to the 'doSomething' function to fill out the homepage
    function doSomething(sgConsole, sgSpotlightedGame, sgSpecificGenre1, sgSpecificGenre2, sgSpecificGenre3) {
        //* Top Ranked Games 'displayData' function
        //* Newly Added Games 'displayData' function
        //* Spotlighted Games 'displayData' function
        //* Genre Buttons Group 'displayData' function
        //* Genre Specific Games 'displayData' function
        //* Genre Specific Games 'displayData' function2
        //* Genre Specific Games 'displayData' function3
        
        //? Set this up to take only the latest 5 games added to the database
            {displayData('sgAPI', sgConsole, 'gameSubgenre', sgSpotlightedGame, 'gameName', 'desc', setHomeScreenGameArray1)}
        //? Set this up to take only the latest 5 games added to the database ---- ^^^
        {genreSpecificCollection(sgConsole, sgSpecificGenre1, setHomeScreenGameArray2)}
        {genreSpecificCollection(sgConsole, sgSpecificGenre2, setHomeScreenGameArray3)}
        {genreSpecificCollection(sgConsole, sgSpecificGenre3, setHomeScreenGameArray4)}
    }

    function genreSpecificCollection(sgConsole, sgSpecificGenre, setHomeScreenGameArray) {
        return (
            displayData('sgAPI', sgConsole, 'gameSubgenre', sgSpecificGenre, 'gameName', 'desc', setHomeScreenGameArray)
        )
    }


    //* IMPORTANT: This is the function runs twice, but the timeOutId is only called once. This is a work around for the app running twice
        useEffect(() => {
            dispatch({ type: 'ACTIONS.LOAD_PAGE', payload: { isLoading: true } })
            const timeoutId = setTimeout(() => {
                setUserInfo(currentUID)
                dispatch({ type: 'ACTIONS.SUCCESS', payload: { isLoading: false } })
                dateCheck()
            }, 2000)
        
            return () => clearTimeout(timeoutId)
        }, [currentUID, dispatch])
    //*-----------------------------------*/

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Sega Genesis'
        if (consoleName == 'sg1000') return 'Sega SG-1000'  
        if (consoleName == 'sgMS') return 'Sega Master System'
        if (consoleName == 'sgGG') return 'Sega Game Gear'
        if (consoleName == 'sgSat') return 'Sega Saturn'
        if (consoleName == 'sg32X') return 'Sega 32X'
        if (consoleName == 'sgCD') return 'Sega CD'
    }


    //TODO: Add logos to.env file and cirlculate them through the app that way

    function logoGif() {
        const link = 'https://firebasestorage.googleapis.com/v0/b/sgparadise-auth-production.appspot.com/o/appLogos%2FmainTheme%2FnightTheme%2FnightTheme%2FnightThemeSgParadise.gif?alt=media&token=0d6f1db6-dbf8-4181-be72-91cab71a2851&_gl=1*kxrvs8*_ga*OTg1NzQyMDE1LjE2MzAxNzEwODE.*_ga_CW55HF8NVT*MTY5NzE0Njg0OS4zMjguMS4xNjk3MTUxMzM3LjUyLjAuMA..'
        return (
            <View>
                <Image
                    style={{width: 400, height: 400}}
                    source={{uri: link}} />
            </View>
        )
    }

    function homeScreenLogo() {
        const logoLink = 'https://reactnative.dev/img/tiny_logo.png'
        const logoImageData = {
            height: 45,
            width: 45,
            borderRadius: 5,
            contentFit: 'cover',
            transition: 1000,
            logoLink: logoLink
        }
        return images.HeaderLogo(logoImageData)
    }

    /*-----------------------------------*/

    //TODO: Restructure code on this page to be more readable
    //TODO: Minimize code on this page (Remove unnecessary code)

    //* sgHomeScreen.js
        //* Buttons 
            function buttonHomePage(buttonFunction, buttonTitle) {
                return (
                    <TouchableButton onPress={buttonFunction}>
                        <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
                    </TouchableButton>
                )
            }
            function homepageButtonLayout() {
                return (
                    currentUID !== null && currentUID !== undefined
                        ? <View>
                            {buttonHomePage(() => toNewSection(toConsoleList.nextPage, toConsoleList.navigationPass), 'Add Game')}
                            {buttonHomePage(() => confirmViewGames(), 'View All Games')}
                        </View>
                        : <View>
                            {buttonHomePage(() => navigation.navigate('Auth', { screen: 'SgAuthStack' }), 'Log In')}
                        </View>
                    
                )
            }
        //*-----Buttons-----*/
        //* Game Groups
            function gameGroup(sectionTitle, sectionDescription, homeScreenGameArray, spotlightGrid) {
                return (
                    <View>
                        <SgGameListings
                            sectionTitle={sectionTitle}
                            sectionDescription={sectionDescription}
                            images={images}
                            homeScreenGameArray={homeScreenGameArray}
                            colors={colors}
                            spotlightGrid={spotlightGrid}
                        />
                    </View>
                )
            }
            function spotlightImageData() {
                const imageData = {
                    height: 400,
                    width: 400,
                    contentFit: 'cover',
                    borderRadius: 5,
                    source: spotlightGame.firebaseScreenshot1Url,
                    transition: 1000
                }
                return images.sgAPISearchCoverArtImage(imageData)
            }

            function spotlightGameGroup() {
                return (
                    
                    <View style={{paddingVertical: 25}}> 
                        <MainFont>{currentMonth}'s Game of the Month</MainFont>
                        <ContentContainer style={{ position: "relative" }}>
                            {spotlightImageData()}
                            <LinearGradient
                                // Background Linear Gradient
                                colors={[colors.primaryColor, 'transparent']}
                                style={{
                                    position: 'absolute',
                                    borderRadius: 5,
                                    width: 400,
                                    height: 400,
                                    transition: 1000,
                                }}
                                locations={[1, 0.5]}
                            />
                        </ContentContainer>
                        <MainFont>{spotlightGame.gameName}</MainFont>
                    </View>
                    
                )
            }

            function newlyAddedGameGroup() {
                const spotlightGrid = true
                const newlyAddedSectionTitle = 'Newly Added Games'
                const newlyAddedSectionDescription = 'Check out the latest games added to the sgParadise!'
                return gameGroup (newlyAddedSectionTitle, newlyAddedSectionDescription, homeScreenGameArray1, spotlightGrid)
            }

            function genreSpecificGameGroup1() {
                const spotlightGrid = false
                const genreSpecificSectionTitle = 'Platformer'
                const genreSpecificSectionDescription = 'Check out the latest games added to the sgParadise!'
                return gameGroup (genreSpecificSectionTitle, genreSpecificSectionDescription, homeScreenGameArray2, spotlightGrid)
            }

            function genreSpecificGameGroup2() {
                const spotlightGrid = false
                const genreSpecificSectionTitle = 'Beat ‘em Up'
                const genreSpecificSectionDescription = 'Check out the latest games added to the sgParadise!'
                return gameGroup (genreSpecificSectionTitle, genreSpecificSectionDescription, homeScreenGameArray3, spotlightGrid)
            }

            function genreSpecificGameGroup3() {
                const spotlightGrid = false
                const genreSpecificSectionTitle = 'Basketball'
                const genreSpecificSectionDescription = 'Check out the latest games added to the sgParadise!'
                return gameGroup (genreSpecificSectionTitle, genreSpecificSectionDescription, homeScreenGameArray4, spotlightGrid)
            }

            function homePageGameGroups() {
                return (
                    <View>
                        {newlyAddedGameGroup()}
                        {genreSpecificGameGroup1()}
                        {genreSpecificGameGroup2()}
                        {genreSpecificGameGroup3()}
                    </View>
                )
            }
        //*-----Game Groups-----*/

        //* Main Section
            function homepageMainSection() {
                return (
                    <SafeAreaViewContainer>
                        <ScrollViewContainer showsVerticalScrollIndicator={false}>
                            {isLoading !== true 
                                ? <Container>
                                        <MainFont>Logo</MainFont>
                                        {homepageButtonLayout()}
                                        {spotlightGameGroup()}
                                        {homePageGameGroups()}
                                    </Container>
                                :   <ContentContainer>
                                        {loadingScreen()}
                                    </ContentContainer>
                            }
                        </ScrollViewContainer>
                    </SafeAreaViewContainer>
                )
            }
        //*-----Main Section-----*/
    //*-----sgHomeScreen.js-----*/
    
    //* Not Logged In User
        //? Shows user uploaded data (Game Related)
        //? Shows Button set to login screen
    //*-----------------------------------*/

    //* Logged In User
        //? Shows user uploaded data (Game Related)
        //? Shows Button set to add game screen
    //*-----------------------------------*/

    

    console.log("Within the HomeScreen Main Function------------------")
    return (
        homepageMainSection()
    )
}


