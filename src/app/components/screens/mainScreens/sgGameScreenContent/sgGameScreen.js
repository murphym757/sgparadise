import React, { useState, useEffect, useContext } from 'react';
import { View, Image, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet, ActivityIndicator } from 'react-native';

import {
    BackButtonBottomLayer,
    BackButtonTopLayer,
    Card,
    CardContent,
    CenterContent,
    Container,
    ContentContainer,
    CurrentThemeContext,
    faChevronLeft,
    faCircle,
    FontAwesomeIcon,
    GamePageImageBackground,
    LinkedContentGeneralInfoView,
    LinkedContentGenreView,
    MainFont,
    MainFontArrayLinks,
    MainFontLink,
    MainFontLinkView,
    MainHeading,
    MainHeadingLongTitle,
    MainSubFont,
    PageContainer,
    SafeAreaViewContainer,
    Styles,
    useAuth,
    ViewTopRow
} from 'index'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderBackButton } from '@react-navigation/elements'

export default function GameScreen({navigation}) {
    const { 
        sgDB, 
        sgImageStorage, 
        currentUser, 
        currentUID,
        updateGameViewCount,
        updateGameViewCountReset
    } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [currentGameArray, setCurrentGameArray] = useState([])
    
    const [consoleName, setConsoleName] = useState('sgGenesis')
    const [gameName, setGameName] = useState('streets-of-rage-2')
    const [gameGenre, setGameGenre] = useState('') //For recommended related games
    const [gameSubgenre, setGameSubgenre] = useState('') //For recommended related games
    const [gameReleaseDate, setGameReleaseDate] = useState('') //For recommended related games
    const [gameScreenshot1, setGameScreenshot1] = useState([])
    const [gameScreenshot2, setGameScreenshot2] = useState([])
    const [gameScreenshot3, setGameScreenshot3] = useState([])
    const gameScreenshots = [gameScreenshot1.toString(), gameScreenshot2.toString(), gameScreenshot3.toString()]
    const [gameHomeScreenShot, setGameHomeScreenShot] = useState('')
    const [gamePageNewHomeScreen, setGamePageNewHomeScreen] = useState('')
    const [gamePageView, setGamePageViews]  = useState('')
    const collectionName = 'sgAPI'
    const gamesCollection = 'games'
    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setIsLoading(false)
                    )
              }, 2000)
              getCurrentGameData()
            }, [])
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
        if(currentUID !== undefined) 
            return 
                displayData(collectionName)
    }, [isFocused])

    async function getCurrentGameData() {
        let currentGameData = []
        let currentGameGenre = ''
        let currentGameSubgenre = ''
        let currentGameReleaseDate = ''
        let currentGameHomeScreenshot = ''
        let currentGameScreenshot1 = []
        let currentGameScreenshot2 = []
        let currentGameScreenshot3 = []
        const gameRef = sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName)
        gameRef.get().then((doc) => {
            if (doc.exists) {
                currentGameData.push(doc.data())
                currentGameScreenshot1.push(doc.data().firebaseScreenshot1Url)
                currentGameScreenshot2.push(doc.data().firebaseScreenshot2Url)
                currentGameScreenshot3.push(doc.data().firebaseScreenshot3Url)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setCurrentGameArray(currentGameData)
        setGameScreenshot1(currentGameScreenshot1)
        setGameScreenshot2(currentGameScreenshot2)
        setGameScreenshot3(currentGameScreenshot3)
    }

    function BackArrow() {
        return (
            <Container style={{paddingTop: 40}}>
                <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor }}> 
                    <BackButtonTopLayer>
                        <FontAwesomeIcon 
                            icon={ faCircle } color={colors.primaryFontColor} size={50}
                            onPress={() => navigation.goBack('Main')}
                        />
                    </BackButtonTopLayer>
                    <BackButtonBottomLayer>
                        <FontAwesomeIcon 
                            icon={ faChevronLeft } color={colors.secondaryColor} size={25} 
                            onPress={() => navigation.goBack('Main')}
                        />
                    </BackButtonBottomLayer>
                </View>
            </Container>
        )
    }

    // Detailed Data for returnedGameInfo()
    function detailedGameName(item) {
        setGameHomeScreenShot(item.firebaseScreenshot1Url)
        return (
            <CardContent>
                {item.gameName.length < 29
                    ?   <MainHeading>{item.gameName}</MainHeading>
                    :   <MainHeadingLongTitle>{item.gameName}</MainHeadingLongTitle>
                }
            </CardContent>
        )
    }

    function detailedGameReleaseDate(item) {
        return (
            <CardContent>
                <MainSubFont>{`Release Date`}</MainSubFont>
                <MainFont>{item.gameReleaseDate}</MainFont>
            </CardContent>
        )
    }

    function detailedGameImage(item) {
        return (
            <CardContent>
                <View style={{
                    width: '100%',
                    height: undefined,
                }}>
                    <Image
                        style={{
                            height: 150,
                            width: 125,
                            resizeMode: 'stretch',
                            borderRadius: 5,
                        }}
                        source={{
                            uri: `${item.firebaseCoverUrl}`,
                        }}
                    />
                </View>
            </CardContent>
        )
    }

    function detailedGameViews(item) {
        return (
            <CardContent>
                <MainSubFont>{`Views`}</MainSubFont>
                <MainFont>{item.views + 1}</MainFont>
            </CardContent>
        )
    }

    function sortInfoByStringLength(unsortedArray) {
        const sortedArray = unsortedArray.sort((a, b) => a.length - b.length)
        const sortedMap = [...new Map(sortedArray.map(i => [i]))]
        return (
            sortedMap
        )
    }

    function detailedPublishers(item) {
        const linkedData = item.gamePublishers
        const linkedDataTitleSingular = `Publisher`
        const linkedDataTitlePlural = `Publishers`
        const unsortedArray = [...item.gamePublishers]
        return (
            mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray)
        )
    }

    function detailedDevelopers(item) {
        const linkedData = item.gameDevelopers
        const linkedDataTitleSingular = `Developer`
        const linkedDataTitlePlural = `Developers`
        const unsortedArray = [...item.gameDevelopers]
        return (
            mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray)
        )
    }

    function detailedGameRating(item) {
        return (
            <CardContent>
                <MainSubFont>{`Rating`}</MainSubFont>
                <MainFont>{item.gameRating} Stars</MainFont>
            </CardContent>
        )
    }

    function detailedPostCreator(item) {
        return (
            <CardContent>
                <MainSubFont>{`Posted Creator`}</MainSubFont>
                <MainFont>{item.postCreator}</MainFont>
            </CardContent>
        )
    }

    function detailedGameInfo(item) {
        return (
            <Container>
                <View style={{paddingTop: 15}}>
                    <View style={{paddingBottom: 15}}>
                        {detailedGameName(item)}
                    </View>
                    <ViewTopRow style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedGameImage(item)}
                        </View>
                        <View style={{paddingTop: 15}}>
                            {detailedGameReleaseDate(item)}
                            {detailedGameRating(item)}
                            {detailedGameViews(item)}
                        </View>
                    </ViewTopRow>
                    <ViewTopRow style={{paddingTop: 25}}>
                        {detailedPostCreator(item)}
                    </ViewTopRow>
                    {isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            </Container>
        )
    }

    function returnedGameInfo() {
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{paddingRight: 20}}>
                        <Card style={Styles.CardStyle}>
                            {detailedGameInfo(item)}
                        </Card>
                    </View>
                )}
            />
        )
    }

    /*----------------------------------------------*/
    // Detailed Data for returnedGamePubDev()

    function detailedGamePubDevInfo(item) {
        return (
            <Container>
                <View>
                    <View style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedPublishers(item)}
                        </View>
                    </View>
                    <View style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedDevelopers(item)}
                        </View>
                    </View>
                    {isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            </Container>
        )
    }

    function returnedGamePubDevInfo() {
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{paddingHorizontal: 20}}>
                        <Card style={Styles.CardStyle}>
                            {detailedGamePubDevInfo(item)}
                        </Card>
                    </View>
                )}
            />
        )
    }

    /*----------------------------------------------*/

    // Detailed Data for returnedGameSummary()
    function detailedGameSummary(item) {
        return (
            <View>
                <MainFont>{item.gameSummary}</MainFont>
            </View>
        )
    }

    function detailedGameSummaryInfo(item) {
        return (
            <Container>
                <View style={{paddingTop: 20}}>
                    <CenterContent>
                        <MainSubFont>{`Description`}</MainSubFont>
                    </CenterContent>
                    <View style={{paddingTop: 15}}>
                    <MainFont>{detailedGameSummary(item)}</MainFont>
                    </View>
                    {isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            </Container>
        )
    }

    function returnedGameSummary() {
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{paddingHorizontal: 20}}>
                        <Card style={Styles.CardStyle}>
                            {detailedGameSummaryInfo(item)}
                        </Card>
                    </View>
                )}
            />
        )
    }
    /*----------------------------------------------*/
    // Detailed Data for returnedGameScreenshots()
    function selectedGameScreenshot(item) {
        return (
            setIsLoading(true),
            setTimeout(() => {
                    setIsLoading(false),
                    setGamePageNewHomeScreen(item)
              }, 2000)
        )
    }
    function detailedGameScreenshot(item) {
        return (
            <View style={{paddingTop: 20}}>
                <View style={{height: 110}}>
                    <CenterContent>
                        <MainSubFont>{`Choose One`}</MainSubFont>
                    </CenterContent>
                    <View style={{paddingTop: 15}}>
                        {gameScreenshots.map((item) =>
                            <TouchableOpacity
                                onPress={() => selectedGameScreenshot(item)}>
                                    <View style={{marginVertical: 5}}>
                                        {gamePageNewHomeScreen == item
                                            ?    <Image
                                                    style={{
                                                        height: 75,
                                                        width: 155,
                                                        resizeMode: 'stretch',
                                                        borderRadius: 20,
                                                        borderWidth: 7,
                                                        borderColor: colors.secondaryColor,
                                                    }}
                                                    source={{
                                                        uri: `${item}`,
                                                    }}
                                                />
                                            :    <Image
                                                    style={{
                                                        height: 75,
                                                        width: 155,
                                                        resizeMode: 'stretch',
                                                        borderRadius: 20
                                                    }}
                                                    source={{
                                                        uri: `${item}`,
                                                    }}
                                                />
                                        }  
                                    </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }

    function detailedGameScreenshotInfo(item) {
        return (
            <Container>
                <View>
                    {detailedGameScreenshot(item)}
                    {isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            </Container>
        )
    }

    function returnedGameScreenshots(item) {
        return (
            <View style={{paddingHorizontal: 20}}>
                <Card style={Styles.CardStyle}>
                    {detailedGameScreenshotInfo(item)}
                </Card>
            </View>
        )
    }

    /*----------------------------------------------*/

     // Detailed Data for returnedGameGenresAndModes()
    function linkedContent(linkedData, linkedDataTitleSingular) {
        return (
            <LinkedContentGenreView>
                <CenterContent>
                    <MainSubFont>{linkedDataTitleSingular}</MainSubFont>
                </CenterContent>
                <MainFontLinkView>
                    <MainFontLink>{linkedData}</MainFontLink>
                </MainFontLinkView>
            </LinkedContentGenreView>
        )
    }
    function mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray) {
        return (
            <LinkedContentGenreView>
                <CenterContent>
                    {linkedData.length > 1
                        ?   <MainSubFont>{linkedDataTitlePlural}</MainSubFont>
                        :   <MainSubFont>{linkedDataTitleSingular}</MainSubFont>
                    }
                </CenterContent>
                <MainFontLinkView>
                    {sortInfoByStringLength(unsortedArray).map((item) => (
                        <MainFontArrayLinks>{item}</MainFontArrayLinks>
                    ))}
                </MainFontLinkView>
            </LinkedContentGenreView>
        )
    }
    function detailedGameGenre(item) {
        const linkedDataTitleSingular = `Genre`
        const linkedData = item.gameGenre
        return (
            linkedContent(linkedData, linkedDataTitleSingular)
        )
    }
    function detailedGameSubgenre(item) {
        const linkedDataTitleSingular = `Subgenre`
        const linkedData = item.gameSubgenre
        return (
            linkedContent(linkedData, linkedDataTitleSingular)
        )
    }

    function detailedGameModes(item) {
        const linkedData = item.gameModes
        const linkedDataTitleSingular = `Game Mode`
        const linkedDataTitlePlural = `Game Modes`
        const unsortedArray = [...item.gameModes]
        return (
            mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray)
        )
    }

    function detailedGameGenresAndModesInfo(item) {
        return (
            <Container>
                <View>
                    <ViewTopRow style={{justifyContent: 'space-between'}}>
                        <View>
                            <View>
                                {detailedGameGenre(item)}
                            </View>
                            <View style={{paddingVertical: 20}}>
                                {detailedGameSubgenre(item)}
                            </View>
                            <View>
                                {detailedGameModes(item)}
                            </View>
                        </View>
                    </ViewTopRow>
                    {isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            </Container>
        )
    }

    function returnedGameGenresAndModes() {
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{paddingHorizontal: 20}}>
                        <Card style={Styles.CardStyle}>
                            {detailedGameGenresAndModesInfo(item)}
                        </Card>
                    </View>
                )}
            />
        )
    }
     /*----------------------------------------------*/

    function gamePageScrollView() {
        return (
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                    {returnedGameInfo()}
                    {returnedGameSummary()}
                    {returnedGameScreenshots()}
                    {returnedGamePubDevInfo()}
                    {returnedGameGenresAndModes()}
            </ScrollView>
        )
    }

    function preDeterminedGameHomeScreen() {
        let image = { uri: gameHomeScreenShot };
        return (
            <GamePageImageBackground source={image} resizeMode="cover" imageStyle={{opacity: 0.45}}>
                {isLoading == true
                    ? <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                        <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    </SafeAreaView>
                    : <View>
                        <View style={{position: 'relative', paddingTop: 400}}>
                            {gamePageScrollView()}
                        </View>
                    </View>
                }
            </GamePageImageBackground>
        )
    }

    function updatedGameHomeScreen() {
        let image = { uri: gamePageNewHomeScreen };
        return (
            <GamePageImageBackground source={image} resizeMode="cover" imageStyle={{opacity: 0.45}}>
                {isLoading == true
                    ? <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                        <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    </SafeAreaView>
                    : <View style={{position: 'relative'}}>
                        <View style={{position: 'relative', paddingTop: 400}}>
                            {gamePageScrollView()}
                        </View>
                    </View>
                }
            </GamePageImageBackground>
        )
    }
    
    function gamePageStructure() {
        if (gamePageNewHomeScreen == '') return preDeterminedGameHomeScreen()
        if (gamePageNewHomeScreen != '') return updatedGameHomeScreen()
    }
    
    function selectedGameStack() {
        const Stack = createStackNavigator()
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={gamePageStructure}
                    options={{
                        title: '',
                        headerTransparent: true,
                        label: false,
                        headerLeft: isLoading == true
                            ?   ''
                            : (props) => (
                                <TouchableOpacity onPress={() => {
                                    navigation.goBack('Main')
                                    updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) // The view count is updated here, but falsely updated on the page. The process was done this way because there was next to no way to properly updated the state in Firebase and have that number represented on the page.
                                }}>
                                    <BackArrow {...props} />
                                </TouchableOpacity>
                            )
                    
                    }}
                />
            </Stack.Navigator>
        )
    }

  return (
    selectedGameStack()
  )
}