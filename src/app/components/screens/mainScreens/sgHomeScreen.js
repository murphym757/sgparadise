import React, { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import { homeScreenListingsContext } from 'main/sgHomeScreenGames/sgGameListingScreen'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { loadingScreen } from 'auth/loadingScreen'
import { monthlyGameListingsContext } from 'main/sgHomeScreenGames/sgGameMonthlyListingsContext'
import { sectionHeadingsContext } from 'main/sgHomeScreenGames/sgHomeGamesSectionHeadingContext'
import { SgGameListings } from 'main/sgHomeScreenGames/sgGameListingScreen'
import { useAuth } from 'auth/authContext'
import { useLoader } from 'server/config/loaderContext'
import {
    Container,
    ContentContainer,
    CurrentThemeContext,
    MainFont,
    SafeAreaViewContainer,
    ScrollViewContainer,
    TouchableButton,
    TouchableButtonFont,
} from 'index'

export default function SgHomeScreen({ navigation, route }) {
    const { currentUID, currentUser, displayData, displayTopNewlyData, getGameDataSpotlight, toNewSection } = useAuth()
    const { state, dispatch } = useLoader()
    const isLoading = state.isLoading
    const d = new Date()
    let month = d.getMonth()
    
    // For Spotlight Section
    const [currentMonth, setCurrentMonth] = useState()
    const [homeScreenGameArray1, setHomeScreenGameArray1] = useState([])
    const [homeScreenGameArray2, setHomeScreenGameArray2] = useState([])
    const [homeScreenGameArray3, setHomeScreenGameArray3] = useState([])
    const [homeScreenGameArray4, setHomeScreenGameArray4] = useState([])
    const [homeScreenGameArray5, setHomeScreenGameArray5] = useState([])
    const [spotlightGame, setSpotlightGame] = useState([])
    const [userInfo, setUserInfo] = useState()
    const colors = useContext(CurrentThemeContext)
    const homeScreenListings = useContext(homeScreenListingsContext)
    const images = useContext(AppWideImageContext)
    const monthlyGameListings = useContext(monthlyGameListingsContext)
    const sectionHeadings = useContext(sectionHeadingsContext)

    function sectionPassedData(passedDataGenre, passedDataIndex) {
        if (passedDataGenre === 'Action') return [
            sectionHeadings.actionSectionHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            sectionHeadings.actionSectionHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            sectionHeadings.actionSectionHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
        if (passedDataGenre === 'Educational') return [
            sectionHeadings.educationalSectionHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            sectionHeadings.educationalSectionHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            sectionHeadings.educationalSectionHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
        if (passedDataGenre === 'RPG') return [
            sectionHeadings.rpgSectionHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            sectionHeadings.rpgSectionHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            sectionHeadings.rpgSectionHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
        if (passedDataGenre === 'Simulation') return [
            sectionHeadings.simulationSectionHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            sectionHeadings.simulationSectionHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            sectionHeadings.simulationSectionHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
        if (passedDataGenre === 'Sports') return [
            sectionHeadings.sportsSectionHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            sectionHeadings.sportsSectionHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            sectionHeadings.sportsSectionHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
        if (passedDataGenre === 'Strategy') return [
            sectionHeadings.strategySectionHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            sectionHeadings.strategySectionHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            sectionHeadings.strategySectionHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
    }

    function monthlyGameData(consoleOfMonth, gameOfTheMonth, genreOfTheMonth, nameOfMonth) {
        return (
            homePageStructure(consoleOfMonth,  genreOfTheMonth[0].genreName, genreOfTheMonth[0].genreProvidedIndex, genreOfTheMonth[1].genreName, genreOfTheMonth[1].genreProvidedIndex, genreOfTheMonth[2].genreName, genreOfTheMonth[2].genreProvidedIndex), 
            getGameDataSpotlight(consoleOfMonth, setSpotlightGame, gameOfTheMonth),
            setCurrentMonth(nameOfMonth)
        )
    }

    function dateCheck() {
        if (month == 0) return monthlyGameData('sgGenesis', '', monthlyGameListings.genreGroupJan, 'January')
        if (month == 1) return monthlyGameData('sg32X', '', monthlyGameListings.genreGroupFeb, 'February')
        if (month == 2) return monthlyGameData('sgGenesis', '', monthlyGameListings.genreGroupMar, 'March')
        if (month == 3) return monthlyGameData('sgMS', '', monthlyGameListings.genreGroupApr, 'April')
        if (month == 4) return monthlyGameData('sgSat', '', monthlyGameListings.genreGroupMay, 'May')
        if (month == 5) return monthlyGameData('sgGenesis', '', monthlyGameListings.genreGroupJun, 'June')
        if (month == 6) return monthlyGameData('sgCD', '', monthlyGameListings.genreGroupJul, 'July')
        if (month == 7) return monthlyGameData('sgGG', '', monthlyGameListings.genreGroupAug, 'August')
        if (month == 8) return monthlyGameData('sgGenesis', '', monthlyGameListings.genreGroupSep, 'September')
        if (month == 9) return monthlyGameData('sg1000', '', monthlyGameListings.genreGroupOct, 'October')
        if (month == 10) return monthlyGameData('sgGenesis', 'streets-of-rage-2', monthlyGameListings.genreGroupNov, 'November')
        if (month == 11) return monthlyGameData('sgGenesis', 'sonic-the-hedgehog-2', monthlyGameListings.genreGroupDec, 'December')
    }


    //* Structure of the Home Page
        function homePageStructure(sgConsole, sgGenre1, sgGenre1Index, sgGenre2, sgGenre2Index, sgGenre3, sgGenre3Index) {
            //* Console and Genre Buttons Group 'displayData' function --- Need to be completed
            
            {topRatedCollection(sgConsole)}
            {newlyAddedCollection(sgConsole)}
            {genreSpecificCollection(sgConsole, sectionPassedData(sgGenre1, sgGenre1Index)[0], setHomeScreenGameArray2)}
            {genreSpecificCollection(sgConsole, sectionPassedData(sgGenre2, sgGenre2Index)[0], setHomeScreenGameArray3)}
            {genreSpecificCollection(sgConsole, sectionPassedData(sgGenre3, sgGenre3Index)[0], setHomeScreenGameArray4)}
        }

        function topRatedCollection(sgConsole) {
            return displayTopNewlyData(sgConsole, true, 4, 'gameRating', setHomeScreenGameArray1)
        }
        function newlyAddedCollection(sgConsole) {
            return displayTopNewlyData(sgConsole, false, null, 'createdAt', setHomeScreenGameArray5)
        }
        function genreSpecificCollection(sgConsole, sgSpecificGenre, setHomeScreenGameArray) {
            return displayData('sgAPI', sgConsole, 'gameSubgenre', sgSpecificGenre, 'gameName', 'desc', setHomeScreenGameArray)
        }
    //*----Structure of the Home Page----*/

    //* IMPORTANT: This is the function runs twice, but the timeOutId is only called once. This is a work around for the app running twice
        useEffect(() => {
            dispatch({ type: 'ACTIONS.LOAD_PAGE', payload: { isLoading: true } })
            const timeoutId = setTimeout(() => {
                setUserInfo(currentUID)
                dispatch({ type: 'ACTIONS.SUCCESS', payload: { isLoading: false }})
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

            //* Spotlight Section
                function gameGroupSpotlightCollection(gameGroupCollectionTitle, gameGroupCollectionDescription) {
                    const sectionTitle = gameGroupCollectionTitle
                    const sectionDescription = gameGroupCollectionDescription
                    return homeScreenListings.spotlightGameGroup(sectionTitle, sectionDescription, LinearGradient, spotlightGame, images, colors) 
                }
                function spotlightGameCollection() {
                    const sgSpotlightTitle = `${currentMonth}'s Game of the Month`
                    const sgSpotlightedGameName = spotlightGame.gameName
                    return gameGroupSpotlightCollection(sgSpotlightTitle, sgSpotlightedGameName)
                }
            //*---Spotlight Section---//
            

            //* General Content Section
                function gameGroupCollection(gameGroupCollectionTitle, gameGroupCollectionDescription, homeScreenGameArray, spotlightGrid) {
                    const sectionTitle = gameGroupCollectionTitle
                    const sectionDescription = gameGroupCollectionDescription
                    return homeScreenListings.gameListings(sectionTitle, sectionDescription, homeScreenGameArray, images, spotlightGrid, colors)
                }

                //* Top Rated Games
                function topRatedGamesCollection() {
                    const sgCollectionTitle = 'Top Rated Games'
                    const sgCollectionDescription = 'Check out the top rated games on the sgParadise!'
                    return gameGroupCollection(sgCollectionTitle, sgCollectionDescription, homeScreenGameArray1, true)
                }

                //* Newly Added Games
                function newlyAddedGamesCollection() {
                    const sgCollectionTitle = 'Newly Added Games'
                    const sgCollectionDescription = 'Check out the latest games added to the sgParadise!'
                    return gameGroupCollection(sgCollectionTitle, sgCollectionDescription, homeScreenGameArray5, false)
                }

                //* Genre Specific Games
                function genreSpecificGameGroup(passedProp, passedPropIndex, homeScreenGameArray) {
                    const genreSpecificSectionTitle = sectionPassedData(passedProp, passedPropIndex)[1]
                    const genreSpecificSectionDescription = sectionPassedData(passedProp, passedPropIndex)[2]
                    return gameGroupCollection(genreSpecificSectionTitle, genreSpecificSectionDescription, homeScreenGameArray, false)
                }
            //*---General Content Section---//

            //* Genre Sections
                function homePageGameGroups(genreGroup) {
                    return (
                        <View>
                            {spotlightGameCollection()}
                            {topRatedGamesCollection()}
                            {newlyAddedGamesCollection()}
                            {genreSpecificGameGroup(genreGroup[0].genreName, genreGroup[0].genreProvidedIndex, homeScreenGameArray2)}
                            {genreSpecificGameGroup(genreGroup[1].genreName, genreGroup[1].genreProvidedIndex, homeScreenGameArray3)}
                            {genreSpecificGameGroup(genreGroup[2].genreName, genreGroup[2].genreProvidedIndex, homeScreenGameArray4)}
                        </View>
                    )
                }

                function homepageMonthlyGameGroups() {
                    if (month == 0) return homePageGameGroups(monthlyGameListings.genreGroupJan)
                    if (month == 1) return homePageGameGroups(monthlyGameListings.genreGroupFeb)
                    if (month == 2) return homePageGameGroups(monthlyGameListings.genreGroupMar)
                    if (month == 3) return homePageGameGroups(monthlyGameListings.genreGroupApr)
                    if (month == 4) return homePageGameGroups(monthlyGameListings.genreGroupMay)
                    if (month == 5) return homePageGameGroups(monthlyGameListings.genreGroupJun)
                    if (month == 6) return homePageGameGroups(monthlyGameListings.genreGroupJul)
                    if (month == 7) return homePageGameGroups(monthlyGameListings.genreGroupAug)
                    if (month == 8) return homePageGameGroups(monthlyGameListings.genreGroupSep)
                    if (month == 9) return homePageGameGroups(monthlyGameListings.genreGroupOct)
                    if (month == 10) return homePageGameGroups(monthlyGameListings.genreGroupNov)
                    if (month == 11) return homePageGameGroups(monthlyGameListings.genreGroupDec)
                }
            //*---Genre Sections---//
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
                                        {homepageMonthlyGameGroups()}
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


