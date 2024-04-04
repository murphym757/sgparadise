import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'

//* Expo
import { useFonts } from 'expo-font'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'

import { CurrentThemeContext, imagesConfig, Container, MainFont } from 'index'
import { SgHomeScreen } from 'main/sgHomeScreenIndex'
import { ActivityIndicator, Button } from 'react-native-paper'

import { useAuth } from 'auth/authContext'
import { homeScreenListingsContext } from 'main/sgHomeScreenGames/sgGameListingScreen'
import { monthlyGameListingsContext } from 'main/sgHomeScreenGames/sgGameMonthlyListingsContext'
import { sectionHeadingsContext } from 'main/sgHomeScreenGames/sgHomeGamesSectionHeadingContext'
import { AppWideImageContext } from 'main/sgImageContext'
import { useLoader } from 'server/config/loaderContext'
import { GameCollections } from './homeComponents/bottomHalf/gameCollections'

import { topHalfHomeScreenContext } from './homeComponents/topHalf/topHalfContext'

import { bottomHalfHomeScreenContext } from './homeComponents/bottomHalf/bottomHalfContext'

//* Game of the Month
import { gameOfMonthContext } from './homeComponents/topHalf/gameOfMonthContext'

//* Games Sections

//* User Status Buttons

SplashScreen.preventAutoHideAsync()

export default function Page() {
    const { currentUID, currentUser, displayTopNewlyData, getGameDataSpotlight, toNewSection } = useAuth()
    const { state, dispatch } = useLoader()
    const isLoading = state.isLoading
    const colors = useContext(CurrentThemeContext)
    const gameOfMonthData = useContext(gameOfMonthContext)
    const homeScreenListings = useContext(homeScreenListingsContext)
    const images = useContext(AppWideImageContext)
    const monthlyGameListings = useContext(monthlyGameListingsContext)
    const sectionHeadings = useContext(sectionHeadingsContext)
    const topHalfHomeScreenData = useContext(topHalfHomeScreenContext)
    const bottomHalfHomeScreenData = useContext(bottomHalfHomeScreenContext)
    const [activeButton, setActiveButton] = useState()
    const [currentMonth, setCurrentMonth] = useState()
    const [homeScreenGameArray1, setHomeScreenGameArray1] = useState([])
    const [homeScreenGameArray2, setHomeScreenGameArray2] = useState([])
    const [homeScreenGameArray3, setHomeScreenGameArray3] = useState([])
    const [homeScreenGameArray4, setHomeScreenGameArray4] = useState([])
    const [homeScreenGameArray5, setHomeScreenGameArray5] = useState([])
    const [spotlightGame, setSpotlightGame] = useState([])
    console.log("🚀 ~ Page ~ spotlightGame:", spotlightGame)
    const [spotlightGameNameLength, setSpotlightGameNameLength] = useState()
    const [userInfo, setUserInfo] = useState()
    const [fontsLoaded, fontError] = useFonts({
        'SpartanBlack': require('../../../../assets/fonts/spartanFonts/Spartan-Black.ttf'),
        'SpartanBold':require('../../../../assets/fonts/spartanFonts/Spartan-Bold.ttf'),
        'SpartanExtraBold': require('../../../../assets/fonts/spartanFonts/Spartan-ExtraBold.ttf'),
        'SpartanExtraLight': require('../../../../assets/fonts/spartanFonts/Spartan-ExtraLight.ttf'),
        'SpartanLight': require('../../../../assets/fonts/spartanFonts/Spartan-Light.ttf'),
        'SpartanMedium': require('../../../../assets/fonts/spartanFonts/Spartan-Medium.ttf'),
        'SpartanRegular': require('../../../../assets/fonts/spartanFonts/Spartan-Regular.ttf'),
        'SpartanSemiBold': require('../../../../assets/fonts/spartanFonts/Spartan-SemiBold.ttf'),
        'SpartanThin': require('../../../../assets/fonts/spartanFonts/Spartan-Thin.ttf'),
        'LemonMilkBold': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-Bold.otf'),
        'LemonMilkBoldItalic': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-BoldItalic.otf'),
        'LemonMilkLight': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-Light.otf'),
        'LemonMilkLightItalic': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-LightItalic.otf'),
        'LemonMilkMedium': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-Medium.otf'),
        'LemonMilkMediumItalic': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-MediumItalic.otf'),
        'LemonMilkRegular': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-Regular.otf'),
        'LemonMilkRegularItalic': require('../../../../assets/fonts/lemonMilkFonts/LEMONMILK-RegularItalic.otf')
    })
    const currentPageTitle = 'Home'

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            padding: 24,
        },
        main: {
            flex: 1,
            justifyContent: "center",
            maxWidth: 960,
            marginHorizontal: "auto",
        },
        title: {
            color: colors.primaryColorAlt,
            fontFamily: 'SpartanBlack',
            fontSize: 64,
        },
        subtitle: {
            fontSize: 36,
            color: colors.secondaryColor,
        },
    });
    //* Passes data between the top half and bottom half of the home screen
    function monthlyGameData(consoleOfMonth, gameOfTheMonth, genreOfTheMonth, nameOfMonth) {
        function determineHOmeScreenListings() {
            return activeButton !== null && activeButton !== undefined
                ? homePageStructure(
                    activeButton, 
                    genreOfTheMonth[0].genreName, 
                    genreOfTheMonth[0].genreProvidedIndex, 
                    genreOfTheMonth[1].genreName, 
                    genreOfTheMonth[1].genreProvidedIndex, 
                    genreOfTheMonth[2].genreName, 
                    genreOfTheMonth[2].genreProvidedIndex
                )
                : homePageStructure(
                    consoleOfMonth, 
                    genreOfTheMonth[0].genreName, 
                    genreOfTheMonth[0].genreProvidedIndex, 
                    genreOfTheMonth[1].genreName, 
                    genreOfTheMonth[1].genreProvidedIndex, 
                    genreOfTheMonth[2].genreName, 
                    genreOfTheMonth[2].genreProvidedIndex
                )
        }
        function spotlightGameSetup() {
            return getGameDataSpotlight(consoleOfMonth, setSpotlightGame, setSpotlightGameNameLength, gameOfTheMonth)
        }
        function currentMonthSetup() {
            return setCurrentMonth(nameOfMonth)
        }
        function GenreSpecificArraySection1() {
            return setHomeScreenGameArray2([])
        }
        function GenreSpecificArraySection2() {
            return setHomeScreenGameArray3([])
        }
        function GenreSpecificArraySection3() {
            return setHomeScreenGameArray4([])
        }
        return (
            determineHOmeScreenListings(),
            spotlightGameSetup(),
            currentMonthSetup(),
            GenreSpecificArraySection1(),
            GenreSpecificArraySection2(),
            GenreSpecificArraySection3() 
        )
    }
    
    //* IMPORTANT: This should be one of the only places where the data is loaded (throughout the app, to reduce data usage)
    useEffect(() => {
        dispatch({ type: 'ACTIONS.LOAD_PAGE', payload: { isLoading: true } })
        const timeoutId = setTimeout(() => {
            dispatch({ type: 'ACTIONS.SUCCESS', payload: { isLoading: false }})
        }, 2000)
    
        return () => clearTimeout(timeoutId)
    }, [dispatch, activeButton]) // Only re-run the effect if `activeButton` changes
    
    useEffect(() => {
        if (!isLoading) {
            setUserInfo(currentUID)
            gameOfMonthData.dateCheck(monthlyGameListings, monthlyGameData)
        }
    }, [isLoading]) // Run when isLoading changes

    //* Loader
        function activityIndicator() {
            return (
                <ActivityIndicator animating={true} size={100} color={colors.secondaryColor} />
            )
        }
    //*----Loader----*/

    //* Bottom Half of the Home Page (The data below runs as the page loads)
        function sectionHeadingsArray(passedDataIndex, genreTitleHeadings) {
            const { sectionSubGenre, sectionTitle, sectionDescription } = genreTitleHeadings[passedDataIndex].sectionHeadingData
            return [sectionSubGenre, sectionTitle, sectionDescription]
        }
        
        function sectionPassedData(passedDataGenre, passedDataIndex) {
            const sectionHeadingsMap = {
                'Action': sectionHeadings.actionSectionHeadings,
                'Educational': sectionHeadings.educationalSectionHeadings,
                'RPG': sectionHeadings.rpgSectionHeadings,
                'Simulation': sectionHeadings.simulationSectionHeadings,
                'Sports': sectionHeadings.sportsSectionHeadings,
                'Strategy': sectionHeadings.strategySectionHeadings
            }
        
            return sectionHeadingsArray(passedDataIndex, sectionHeadingsMap[passedDataGenre]);
        }
        function homePageStructure(sgConsole, sgGenre1, sgGenre1Index, sgGenre2, sgGenre2Index, sgGenre3, sgGenre3Index) {
            //* Console and Genre Buttons Group 'displayData' function --- Need to be completed
            //TODO: Fix bug where the console buttons change the data shown for 'newly added' and 'top rated', but not for the genre specific data
            {topRatedCollection(sgConsole)}
            {newlyAddedCollection(sgConsole)}
            {genreSpecificCollection(sgConsole, sectionPassedData(sgGenre1, sgGenre1Index)[0], setHomeScreenGameArray2)}
            {genreSpecificCollection(sgConsole, sectionPassedData(sgGenre2, sgGenre2Index)[0], setHomeScreenGameArray3)}
            {genreSpecificCollection(sgConsole, sectionPassedData(sgGenre3, sgGenre3Index)[0], setHomeScreenGameArray4)}
        }

        function topRatedCollection(sgConsole) {
            return displayTopNewlyData(sgConsole, true, 4, '>', 'gameRating', 'gameRating', setHomeScreenGameArray1)
        }
        function newlyAddedCollection(sgConsole) {
            return displayTopNewlyData(sgConsole, false, null, null, null, 'createdAt', setHomeScreenGameArray5)
        }
        function genreSpecificCollection(sgConsole, sgSpecificGenre, setHomeScreenGameArray) {
            return displayTopNewlyData(sgConsole, true, sgSpecificGenre, '==', 'gameSubgenre', 'gameName', setHomeScreenGameArray)
        }
    //*----Bottom Half of the Home Page----*/

        //* Console Page (Maybe move this to a different file)
                    //TODO: Create another call to the firebase cloud for just console data
                        function consoleHomePageStructure() {
                            return (
                                <Container>
                                        <Pressable onPress={() => setActiveButton(null)}>
                                            <MainFont>Back Button</MainFont>
                                        </Pressable>
                                    <MainFont>Console Name</MainFont>
                                    <MainFont>Console Release Date</MainFont>
                                    <MainFont>Console Generation</MainFont>
                                    <MainFont>Console Timeline</MainFont>
                                    <MainFont>Console Description</MainFont>
                                </Container>
                            )
                        }

    //* This is a link to the next page, with a parameter of referring the name of this current page.
    function pageLink(linkedData) {
        return (
            <Link 
                href={{
                    pathname: linkedData.nextPagePath, 
                    params: { 
                        backHeaderTitle: linkedData.currentPageTitle,
                        ...linkedData.gameData == null 
                            ? null 
                            :   {
                                consoleName: linkedData.gameData.consoleName,
                                firebaseCoverUrl: linkedData.gameData.firebaseCoverUrl,
                                firebaseScreenshot1Url: linkedData.gameData.firebaseScreenshot1Url,
                                firebaseScreenshot2Url: linkedData.gameData.firebaseScreenshot2Url,
                                firebaseScreenshot3Url: linkedData.gameData.firebaseScreenshot3Url,
                                gameDevelopers: linkedData.gameData.gameDevelopers,
                                gameGenre: linkedData.gameData.gameGenre,
                                gameModes: linkedData.gameData.gameModes,
                                gameName: linkedData.gameData.gameName,
                                gamePublishers: linkedData.gameData.gamePublishers,
                                gameRating: linkedData.gameData.gameRating,
                                gameReleaseDate: linkedData.gameData.gameReleaseDate,
                                gameSlug: linkedData.gameData.gameSlug,
                                gameSubgenre: linkedData.gameData.gameSubgenre,
                                gameSummary: linkedData.gameData.gameSummary,
                                postCreator: linkedData.gameData.postCreator,
                                views: linkedData.gameData.views
                            }
                    }
                }} 
                style={{color: colors.primaryFontColor}}>
                {linkedData.linkContent}
            </Link>
        )
    }

    function pageContent() {
        //* Provide the following:
        //* 1. The current page title, to know where the back button will take the user
        //* 2. THe page path for the next page
        //* 3. THe data that will be on the page 
        const nextPagePath = "/home/next-page-gamePage"
        const linkContent = 'Go to game page'
        const gameData = null
        const linkedData = {
            currentPageTitle,
            nextPagePath,
            linkContent,
            gameData
        }
        return (
            <View>
                <Text style={styles.title}>Hello Worlds</Text>
                <Text style={styles.subtitle}>This is the first page of your app.</Text>
            </View>
        )
    }

    function materialButton2() {
        return (
            <Button
                style={{buttonColor: colors.primaryColor, backgroundColor: colors.secondaryColor}}
                icon="camera" 
                mode="contained" 
                onPress={() => console.log('Pressed')}>
                    Press me
            </Button>
        )
    }

    //* Add game of Sign Up Button
    function addGameButton() {
        return (
            <View>
                <Text style={{color: colors.primaryColorAlt}}>Add Game</Text>
            </View>
        )
    }

    //* Top Half of the Home Page
        function homePageTop() {
            const topHalfHomeScreenContent = {
                activeButton,
                colors,
                currentMonth,
                homeScreenListings,
                images,
                imagesConfig,
                LinearGradient,
                setActiveButton,
                spotlightGame,
                spotlightGameNameLength,
                currentPageTitle,
                nextPagePath: "/home/next-page-gamePage"
            }
            return (
                <View>
                    {isLoading
                        ? activityIndicator()
                        : <View>
                            {topHalfHomeScreenData.gamePageLinkGameOfTheMonth(topHalfHomeScreenContent, pageLink)}
                            {activeButton ? <Text style={{color: colors.primaryColorAlt}}>Button {activeButton} pressed</Text> : null}
                        </View>
                    }
                </View>
            )
        }
    //*----Top Half of the Home Page----*/      
    function homePageGameGroups(genreGroup) {
        const bottomHalfHomeScreenContent = {
            colors: colors,
            gameListings: homeScreenListings.gameListings,
            homeScreenGameArray1: homeScreenGameArray1,
            homeScreenGameArray2: homeScreenGameArray2,
            homeScreenGameArray3: homeScreenGameArray3,
            homeScreenGameArray4: homeScreenGameArray4,
            homeScreenGameArray5: homeScreenGameArray5,
            images: images,
            sectionPassedData: sectionPassedData,
        }
        return (
            <View>
                {bottomHalfHomeScreenData.gamePageGameCollectionSection(bottomHalfHomeScreenContent, genreGroup)}
            </View>
        )
    }
    
    function homepageMonthlyGameGroups() {
        const d = new Date()
        let month = d.getMonth()
        const monthGroups = [
            monthlyGameListings.genreGroupJan,
            monthlyGameListings.genreGroupFeb,
            monthlyGameListings.genreGroupMar,
            monthlyGameListings.genreGroupApr,
            monthlyGameListings.genreGroupMay,
            monthlyGameListings.genreGroupJun,
            monthlyGameListings.genreGroupJul,
            monthlyGameListings.genreGroupAug,
            monthlyGameListings.genreGroupSep,
            monthlyGameListings.genreGroupOct,
            monthlyGameListings.genreGroupNov,
            monthlyGameListings.genreGroupDec
        ]
    
        return homePageGameGroups(monthGroups[month]);
    }

    //* Bottom Half of the Home Page
    function homePageBottom() {
        const sharedStyles = {
            title: styles.title,
        }
        return (
            <View>
                {homepageMonthlyGameGroups()}
                {materialButton2()}
            </View>
        )
    }

    //*The function below will feature the spotlight game, the various games of 5 seperate sections, and a set of buttons based on the user's status
    //TODO: Render the game of the month, the 5 sections of games, and the buttons
    function mainPageLayout() {
        const onLayoutRootView = useCallback(async () => {
            if (fontsLoaded || fontError) { await SplashScreen.hideAsync() }
        }, [fontsLoaded, fontError])
    
        if (!fontsLoaded && !fontError) { return null }

        console.log('Test config for later')
        return (
            <View style={styles.container} onLayout={onLayoutRootView}>
                <Stack.Screen />
                <View style={styles.main}>
                    {isLoading
                        ?   activityIndicator()
                        :   <SafeAreaView>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {pageContent()}
                                    {homePageTop()}
                                    {homePageBottom()}
                                </ScrollView>
                            </SafeAreaView>
                    }
                </View>
            </View>
        )
    }

    function newMainPageLayout() {
        return (
            <View style={styles.container}>
            <Stack.Screen />
                <View style={styles.main}>
                    <SgHomeScreen />
                </View>
            </View>
        )
    }

    return (
        mainPageLayout()
    )
}