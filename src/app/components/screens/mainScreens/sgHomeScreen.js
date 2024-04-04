import React, { useState, useContext, useEffect } from 'react'
import { View, FlatList, Pressable } from 'react-native'
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
    ContentRow,
    CurrentThemeContext,
    imagesConfig,
    MainFont,
    MiniButton,
    MiniButtonFont,
    SafeAreaViewContainer,
    ScrollViewContainer,
    TouchableButton,
    TouchableButtonFont,
} from 'index'

//* First days of 2024 todos
//TODO1: Make every image clickable and go to their respective game page
//TODO2: Make the spotlight section clickable and go to the game page (Todo1)
//TODO3: Make the console specific buttons clickable and go to their respective console page (Todo1)
//TODO4: Add the logo to  (and throughout) the app
//TODO6: Place Log In button on the bottom of the page
//TODO7: Add game to the database (maybe 15-20 games across all consoles)

export default function SgHomeScreen({ navigation, route }) {
    const { currentUID, currentUser, displayTopNewlyData, getGameDataSpotlight, toNewSection } = useAuth()
    const { state, dispatch } = useLoader()
    const isLoading = state.isLoading
    const d = new Date()
    let month = d.getMonth()
    
    // For Spotlight Section
    const [activeButton, setActiveButton] = useState(null)
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

    function sectionHeadingsArray(passedDataIndex, genreTitleHeadings) {
        return [
            genreTitleHeadings[passedDataIndex].sectionHeadingData.sectionSubGenre,
            genreTitleHeadings[passedDataIndex].sectionHeadingData.sectionTitle,
            genreTitleHeadings[passedDataIndex].sectionHeadingData.sectionDescription
        ]
    }

    function sectionPassedData(passedDataGenre, passedDataIndex) {
        if (passedDataGenre === 'Action') return (sectionHeadingsArray(passedDataIndex, sectionHeadings.actionSectionHeadings))
        if (passedDataGenre === 'Educational') return (sectionHeadingsArray(passedDataIndex, sectionHeadings.educationalSectionHeadings))
        if (passedDataGenre === 'RPG') return (sectionHeadingsArray(passedDataIndex, sectionHeadings.rpgSectionHeadings))
        if (passedDataGenre === 'Simulation') return (sectionHeadingsArray(passedDataIndex, sectionHeadings.simulationSectionHeadings))
        if (passedDataGenre === 'Sports') return (sectionHeadingsArray(passedDataIndex, sectionHeadings.sportsSectionHeadings))
        if (passedDataGenre === 'Strategy') return (sectionHeadingsArray(passedDataIndex, sectionHeadings.strategySectionHeadings))
    }

    //* Important: I have to reset the homeScreenGameArray's to an empty array before setting the new data. If I don't, the data will not update
    function monthlyGameData(consoleOfMonth, gameOfTheMonth, genreOfTheMonth, nameOfMonth) {
        return (
            activeButton !== null 
            ? homePageStructure(activeButton,  genreOfTheMonth[0].genreName, genreOfTheMonth[0].genreProvidedIndex, genreOfTheMonth[1].genreName, genreOfTheMonth[1].genreProvidedIndex, genreOfTheMonth[2].genreName, genreOfTheMonth[2].genreProvidedIndex)
            : homePageStructure(consoleOfMonth,  genreOfTheMonth[0].genreName, genreOfTheMonth[0].genreProvidedIndex, genreOfTheMonth[1].genreName, genreOfTheMonth[1].genreProvidedIndex, genreOfTheMonth[2].genreName, genreOfTheMonth[2].genreProvidedIndex), 
            getGameDataSpotlight(consoleOfMonth, setSpotlightGame, gameOfTheMonth),
            setCurrentMonth(nameOfMonth),
            setHomeScreenGameArray2([]),
            setHomeScreenGameArray3([]),
            setHomeScreenGameArray4([])
        )
    }

    function dateCheck() {
        if (month == 0) return monthlyGameData('sgGenesis', 'sonic-the-hedgehog-2', monthlyGameListings.genreGroupJan, 'January')
        //if (month == 0) return monthlyGameData('sgGenesis', '', monthlyGameListings.genreGroupJan, 'January')
        if (month == 1) return monthlyGameData('sgGenesis', 'streets-of-rage-2', monthlyGameListings.genreGroupFeb, 'February')
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
        }, [currentUID, dispatch, activeButton])
    //*-----------------------------------*/

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Genesis'
        if (consoleName == 'sg1000') return 'SG-1000'  
        if (consoleName == 'sgMS') return 'Master System'
        if (consoleName == 'sgGG') return 'Game Gear' //? Possibly remove this
        if (consoleName == 'sgSat') return 'Saturn'
        if (consoleName == 'sg32X') return '32X'
        if (consoleName == 'sgCD') return 'CD'
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
            //* Buttons for the homepage
            //? "sg{buttonIcon}Icon" is a placeholder for the icon name when calling "imagesConfig.sgGENIcon" from index.js
                function homepagesDefinerButtonIcon(sgIcon) {
                    const imageData = {
                        height: 40,
                        width: 40,
                        contentFit: 'cover',
                        borderRadius: 5,
                        source: sgIcon,
                        transition: 1000
                    }
                    return images.sgAPISearchCoverArtImage(imageData)
                }
                function homepagesDefinerButton(buttonIcon, buttonTitle, miniStyling) {
                    return (
                        <View style={{paddingVertical: 20}}>
                            <MiniButton style={{backgroundColor: miniStyling.backgroundColor, borderColor: miniStyling.borderColor}}>
                                <ContentRow style={{paddingHorizontal: 10}}>
                                    {homepagesDefinerButtonIcon(buttonIcon)}
                                    <MiniButtonFont style={{padding: 10, color: miniStyling.color}}>{buttonTitle}</MiniButtonFont>
                                </ContentRow>
                            </MiniButton>
                        </View>
                    )
                }
            //*---Buttons for the homepage---//
        //*-----Buttons-----*/
        //* Game Groups
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

            //* Console Icon Section
                //TODO: Make the onPress function go to the console page
                function sgConsoleIconButtonGroup() {
                    const consoleListArray = [
                        {id: 'sgGenesis', consoleName: 'Genesis', consoleIcon: imagesConfig.sgGENIcon},
                        {id: 'sg1000', consoleName: 'SG-1000', consoleIcon: imagesConfig.sg1000Icon},
                        {id: 'sgMS', consoleName: 'Master System', consoleIcon: imagesConfig.sgMSIcon},
                        {id: 'sgGG', consoleName: 'Game Gear', consoleIcon: imagesConfig.sgGGIcon},
                        {id: 'sgSat', consoleName: 'Saturn', consoleIcon: imagesConfig.sgSATIcon},
                        {id: 'sg32X', consoleName: '32X', consoleIcon: imagesConfig.sg32XIcon},
                        {id: 'sgCD', consoleName: 'CD', consoleIcon: imagesConfig.sgCDIcon}
                    ]
                    const handleButtonPress = (buttonId) => {
                        setActiveButton(buttonId);
                        console.log(`Button ${buttonId} pressed`);
                    };
                    const defaultStyling = {
                        backgroundColor: colors.primaryColor,
                        borderColor: colors.secondaryFontColor,
                        color: colors.secondaryColor
                    }
                    const activeStyling = {
                        backgroundColor: colors.secondaryColor,
                        borderColor: colors.secondaryFontColor,
                        color: colors.primaryColor
                    }
                    const renderItem = ({ item }) => {
                        const isPressed = activeButton === item.id
                        const itemStyle = isPressed ? activeStyling : defaultStyling

                        return (
                            <View>
                                <Pressable onPress={() => handleButtonPress(item.id)}>
                                    {homepagesDefinerButton(item.consoleIcon, item.consoleName, itemStyle)}
                                </Pressable>
                            </View>
                        )
                    }
                    
                    return (
                        <FlatList
                            contentContainerStyle={{}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={consoleListArray}
                            keyboardShouldPersistTaps="always"
                            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    );
                }
            //*---Console Icon Section---//

            
            
            //* Genre Sections
            function homePageGameGroupHeader() {
                return (
                    activeButton !== null 
                        ? consoleHomePageStructure() 
                        : spotlightGameCollection()
                    
                )
            }

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
            //*-----Console Page-----*/
                function homePageGameGroups(genreGroup) {
                    return (
                        <View>
                            {homePageGameGroupHeader()}
                            {sgConsoleIconButtonGroup()}
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
                                        {homepageMonthlyGameGroups()}
                                        {homepageButtonLayout()}
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


