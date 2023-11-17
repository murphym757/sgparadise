import React, { useState, useEffect, useContext } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import { firebaseSearchContext } from 'main/sgHomeScreenGames/sgHomeSearchScreen'
import { homeScreenActionContext } from 'main/sgHomeScreenGames/sgHomeActionGames'
import { homeScreenDatesContext } from 'main/sgHomeScreenGames/sgHomeDates'
import { homeScreenGenreContext } from 'main/sgHomeScreenContext'
import { homeScreenSpotlightGamesContext } from 'main/sgHomeScreenGames/sgSpotlightedGames'
import { SgGameListings } from 'main/sgHomeScreenGames/sgGameListingScreen'
import { sectionHeadingsContext } from 'main/sgHomeScreenGames/sgHomeGamesSectionHeadingContext'
import { loadingScreen } from 'auth/loadingScreen'
import { useLoader } from 'server/config/loaderContext'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { Image } from 'expo-image'
import {
    ContentContainer,
    CurrentThemeContext,
    SafeAreaViewContainer,
    ScrollViewContainer,
    Container,
    faStar,
    FontAwesomeIcon,
    MainHeadingLongTitle,
    MainFont,
    MainSubFont,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
    ViewTopRow,
    windowHeight,
} from 'index';
import { useIsFocused, useFocusEffect } from '@react-navigation/native'

export default function SgHomeScreen({ navigation, route }) {
    const { state, dispatch } = useLoader()
    const isLoading = state.isLoading
    const firebaseData = state.firebaseData
    const { 
        backArrow,
        currentUID, 
        currentUser, 
        displayData,
        sgDB,
        sgFirebaseConsolesCollection,
        sgFirebaseGamesCollectionSubGenre,
        sgFirebaseGenreCollection,
        toNewSection
    } = useAuth()
        console.log("🚀 ~ file: sgHomeScreen.js:48 ~ SgHomeScreen ~ currentUID:", currentUID)

    // For Spotlight Section
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [gameArrayTest, setGameArrayTest] = useState([])
    const [gameIndex, setGameIndex] = useState()
    const [homepageSearchBar, setHomepageSearchBar] = useState(true)
    const [searchBarTouched, setSearchBarTouched] = useState(false)
    const [userInfo, setUserInfo] = useState()
    console.log("🚀 ~ file: sgHomeScreen.js:56 ~ SgHomeScreen ~ userInfo:", userInfo)
    const { searchBar } = useSearchBar()
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const date = useContext(homeScreenDatesContext)
    const images = useContext(AppWideImageContext)
    const gameGroups = useContext(sectionHeadingsContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const sgGameSearch = useContext(firebaseSearchContext)
    const spotlights = useContext(homeScreenSpotlightGamesContext)
    const [spotlightGameConsoleName, setSpotlightGameConsoleName] = useState()
     // For the Spotlight Game
    const [spotlightArray, setSpotlightArray] = useState([])
    const [spotlightArrayTitle, setSpotlightArrayTitle] = useState('')
    const [spotlightArrayTagLine, setSpotlightArrayTagLine] = useState('')
     // For the consoles section
    const [consoleArray, setConsoleArray] = useState([])
    const [consoleArrayTitle, setConsoleArrayTitle] = useState('')
    // For the 1st Section
    const [gamesArray, setGamesArray] = useState([])
    const [gamesArrayTitle, setGamesArrayTitle] = useState('')
    const [gamesArrayDescription, setGamesArrayDescription] = useState('')
    // For the 2nd Section
    const [gamesArray2, setGamesArray2] = useState([])
    const [gamesArrayTitle2, setGamesArrayTitle2] = useState('')
    const [gamesArrayDescription2, setgamesArrayDescription2] = useState('')
    // For the 3rd Section
    const [gamesArray3, setgamesArray3] = useState([])
    const [gamesArrayTitle3, setgamesArrayTitle3] = useState('')
    const [gamesArrayDescription3, setgamesArrayDescription3] = useState('')
    // For the 4th Section
    const [gamesArray4, setgamesArray4] = useState([])
    const [gamesArrayTitle4, setgamesArrayTitle4] = useState('')
    const [gamesArrayDescription4, setgamesArrayDescription4] = useState('')
    // For the 5th Section
    const [gamesArray5, setgamesArray5] = useState([])
    const [gamesArrayTitle5, setgamesArrayTitle5] = useState('')
    const [gamesArrayDescription5, setgamesArrayDescription5] = useState('')

    const [gamesArray6, setgamesArray6] = useState([])
    const [gamesArrayTitle6, setgamesArrayTitle6] = useState('')
    const [gamesArrayDescription6, setgamesArrayDescription6] = useState('')

    const [genreArray, setGenreArray] = useState([])
    const [genreArrayTitle, setGenreArrayTitle] = useState('')


    const [homeScreenGameArray1, setHomeScreenGameArray1] = useState([])
    const [homeScreenGameArray2, setHomeScreenGameArray2] = useState([])
    const [homeScreenGameArray3, setHomeScreenGameArray3] = useState([])
    const [homeScreenGameArray4, setHomeScreenGameArray4] = useState([])
    const [homeScreenGameArray5, setHomeScreenGameArray5] = useState([])

    // Search Area
    const [searchActive, setSearchActive] = useState(false)


    // For Search Bar
    const [ searchBarCancel, setSearchBarCancel ] = useState('Search Games')
    const [ searchBarTitle, setSearchBarTitle ] = useState('Search Games')
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchType, setSearchType ] = useState('sgIGDBSearch')
    const actionGenreContext = useContext(homeScreenActionContext)
    const genreSpecFunc = useContext(homeScreenGenreContext)
    const navigationPass = navigation
    const toGameData = {
        navigationPass,
        nextPage: 'sgGamePage'
    }
    const toConsoleList = {
        navigationPass,
        nextPage: 'SgAddGameConfirm'
    }

    // Retrieves data before the page loads
    const passingSectionData = {
        navigation, 
        findLaymanConsoleName, 
        genreSpecFunc, 
        FontAwesomeIcon, 
        faStar, 
        colors
    }

    const spotlightData = {
        setSpotlightGameConsoleName, 
        setSpotlightArray, 
        setSpotlightArrayTitle, 
        setSpotlightArrayTagLine, 
        sgFirebaseGamesCollectionSubGenre, 
        genreSpecFunc
    }

    /*----------- */


    function dateCheck() {
        const d = new Date();
        let month = d.getMonth();
        if (month == 10) return doSomething('sgGenesis', setHomeScreenGameArray1)
    }


    //Todo: Add more 'displayData' functions to the 'doSomething' function to fill out the homepage
    function doSomething(sgConsole, setArrayForGames) {
        //* Top Ranked Games 'displayData' function
        //* Newly Added Games 'displayData' function
        //* Spotlighted Games 'displayData' function
        //* Genre Buttons Group 'displayData' function
        //* Genre Specific Games 'displayData' function
        //* Genre Specific Games 'displayData' function2
        //* Genre Specific Games 'displayData' function3
        displayData('sgAPI', sgConsole, 'gameSubgenre', 'Platformer', 'gameName', 'desc', setArrayForGames)
    }


    useFocusEffect(
        React.useCallback(() => {
            dispatch({ type: 'ACTIONS.LOAD_PAGE', payload: { isLoading: true }  })
            setTimeout(() => {
                setUserInfo(currentUID),
                dispatch({ type: 'ACTIONS.SUCCESS', payload: { isLoading: false }  }, dateCheck())
            }, 2000)
        }, [isFocused]))

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Sega Genesis'
        if (consoleName == 'sg1000') return 'Sega SG-1000'  
        if (consoleName == 'sgMS') return 'Sega Master System'
        if (consoleName == 'sgGG') return 'Sega Game Gear'
        if (consoleName == 'sgSat') return 'Sega Saturn'
        if (consoleName == 'sg32X') return 'Sega 32X'
        if (consoleName == 'sgCD') return 'Sega CD'
    }

    /*
// pass a function to map
const map1 = array1.map(x => findLaymanConsoleName(x).substring(5))

console.log(map1);

const str = 'AppDividend';
console.log('Original String:', str);

const newStr = str.substring(5)
console.log('After removing the first character:', newStr);
*/

    /*-----------*/
    // Links to the search page
    function confirmViewGames() {
        navigation.navigate('SgConsoleList',{
            searchType: searchType
        })
    }

    /*-----------*/
    // Renders on page
    function consolesSection() {
        Object.assign(passingSectionData, {gamesArray: consoleArray})
        return actionGenreContext.consolesListSet(passingSectionData)
    }

    function spotlightSection() {
        Object.assign(passingSectionData, {gamesArray: spotlightArray, consoleName: spotlightGameConsoleName})
        return actionGenreContext.spotlightGamesGen(passingSectionData)
    }
    function actionSection() {
        Object.assign(passingSectionData, {gamesArray})
        return actionGenreContext.beatEmUpListGameSet(passingSectionData)
    }

    function actionsasSection() {
        Object.assign(passingSectionData, {gamesArray: gamesArray2})
        return actionGenreContext.platformersListGameSet(passingSectionData)
    }
    /*-----------*/
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

    //* Homepage Game Listings
    function gameListingsData(item) {
        const imageData = {
            height: 200,
            width: 150,
            contentFit: 'cover',
            borderRadius: 10,
            source: item.firebaseCoverUrl,
            transition: 1000
        }
        return images.sgAPISearchCoverArtImage(imageData)
    }

    function gameListings(gameListingData) {
        const sectionTitle = gameListingData.sectionTitle
        const sectionDescription = gameListingData.sectionDescription
        
        return (
            <View>
                <MainHeadingLongTitle>{sectionTitle}</MainHeadingLongTitle>
                <MainSubFont>{sectionDescription}</MainSubFont>
                <FlatList
                    horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={gameListingData.listingArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{  
                            alignItems:'center',
                            justifyContent:'center',
                            margin: 10
                        }}>
                            <View style={{
                                margin: 5,
                                flexDirection: "row", 
                                justifyContent: "center"
                            }}> 
                                {gameListingsData(item)}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    function gameFullListings1(listingArray) {
        const gameListingData = {
            sectionTitle: 'Fuel Your Need for Speed!',
            sectionDescription: 'Race to the max in adrenaline-pumping video games!',
            listingArray: listingArray
        }
        return (
            gameListings(gameListingData)
        )
    }

    function gameFullListings2(listingArray) {
        const gameListingData = {
            sectionTitle: 'Dribble, Shoot, Score - Hoop Dreams Begin Here!',
            sectionDescription: 'Get ready to lace up, step onto the court, and make your hoop dreams a reality as you dribble, shoot, and score your way to victory in the most thrilling basketball games ever!',
            listingArray: listingArray
        }
        return (
            gameListings(gameListingData)
        )
    }

    function gameFullListings3(listingArray) {
        const gameListingData = {
            sectionTitle: 'This is different, once more',
            sectionDescription: 'Same here',
            listingArray: listingArray
        }
        return (
            gameListings(gameListingData)
        )
    }
        //TODO: Import the game listings from sgHomeGamesSectionHeadingContext.js (This is going to come from a separate file)
        //TODO: -----Important-----: This will require some real thinking here, but this will be a semi-complex function 


        function homePageGameListings() {
            return (
                <View>
                    {gameFullListings1(gamesArray3)}
                    {gameFullListings2(gamesArray4)}
                    {gameFullListings3(gamesArray5)}
                </View>
            )
        }
    //*-----Homepage Game Listings-----*/
    /*-----------*/

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
    
    function HomeOptions() {
        const pageLoadedHeader = {
            title: 'SGParadise home',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTransparent: true,
            label: false,
            headerTitle: isLoading == true
                ?   ''
                : (props) => (
                    homeScreenLogo(props)
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
        const pageUnloadedHeader = {
            title: '',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTransparent: true,
            label: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
        return isLoading !== true ? pageLoadedHeader : pageUnloadedHeader
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
            function gameGroup(sectionTitle, sectionDescription, homeScreenGameArray) {
                return (
                    <SgGameListings
                        sectionTitle={sectionTitle}
                        sectionDescription={sectionDescription}
                        images={images}
                        homeScreenGameArray={homeScreenGameArray}
                    />
                )
            }

            function newlyAddedGameGroup() {
                const newlyAddedSectionTitle = 'Newly Added Games'
                const newlyAddedSectionDescription = 'Check out the latest games added to the sgParadise!'
                return gameGroup (newlyAddedSectionTitle, newlyAddedSectionDescription, homeScreenGameArray1)
            }

            function homePageGameGroups() {
                return (
                    <View>
                        {newlyAddedGameGroup()}
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
                                        {spotlightSection()}
                                        {homePageGameListings()}
                                        {homepageButtonLayout()}
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



