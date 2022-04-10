import React, { useState, useEffect, useContext } from 'react';
import { View, Image, ScrollView, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';

import {
    BackButtonBottomLayer,
    BackButtonTopLayer,
    Card,
    CardContent,
    Container,
    ContentContainer,
    CurrentThemeContext,
    faChevronLeft,
    faCircle,
    FontAwesomeIcon,
    GamePageImageBackground,
    MainFont,
    MainHeading,
    MainHeadingLongTitle,
    MainSubFont,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    ViewTopRow
} from 'index'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default function GameScreen({navigation}) {
    const { 
        sgDB, 
        sgImageStorage, 
        currentUser, 
        currentUID,
        updateGameViewCount
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
    const collectionName = 'sgAPI'
    const gamesCollection = 'games'
    const styles = StyleSheet.create({
        cardStyle: {
            flexGrow: 1,
            flex: 1
        }
        });
    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setIsLoading(false),
                    updateGameViewCount(collectionName, consoleName, gamesCollection, gameName)
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

    function backArrow() {
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

    function sortInfoByStringLength(unsortedArray) {
        const sortedArray = unsortedArray.sort((a, b) => a.length - b.length)
        const sortedMap = [...new Map(sortedArray.map(i => [i]))]
        return (
            sortedMap
        )
    }

    function detailedPublishers(item) {
        const unsortedArray = [...item.gamePublishers]
        return (
            <CardContent>
                {item.gamePublishers.length > 1
                    ?   <MainSubFont>{`Publishers`}</MainSubFont>
                    :   <MainSubFont>{`Publisher`}</MainSubFont>
                }
                {sortInfoByStringLength(unsortedArray).map((gamePublisher) => (
                    <MainFont>{gamePublisher}</MainFont>
                ))}
            </CardContent>
        )
    }

    function detailedDevelopers(item) {
        const unsortedArray = [...item.gameDevelopers]
        return (
            <CardContent>
                {item.gameDevelopers.length > 1
                    ?   <MainSubFont>{`Developers`}</MainSubFont>
                    :   <MainSubFont>{`Developer`}</MainSubFont>
                }
                {sortInfoByStringLength(unsortedArray).map((gameDeveloper) => (
                      <MainFont>{gameDeveloper}</MainFont>
                  ))}
            </CardContent>
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
                <View style={{paddingTop: 35}}>
                    {detailedGameName(item)}
                    {detailedGameReleaseDate(item)}
                    <ViewTopRow style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedPublishers(item)}
                        </View>
                        <View>
                            {detailedDevelopers(item)}
                        </View>
                    </ViewTopRow>
                    {detailedGameRating(item)}
                    {detailedPostCreator(item)}
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
                    <Card style={styles.cardStyle}>
                        {detailedGameInfo(item)}
                    </Card>
                )}
            />
        )
    }

    /*----------------------------------------------*/

    // Detailed Data for returnedGameSummary()
    function detailedGameSummary(item) {
        return (
            <View style={{paddingTop:5}}>
                <MainFont>{item.gameSummary}</MainFont>
            </View>
        )
    }

    function detailedGameSummaryInfo(item) {
        return (
            <Container>
                <View style={{paddingTop: 35}}>
                    {detailedGameSummary(item)}
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
                        <Card style={styles.cardStyle}>
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
            setGamePageNewHomeScreen(item)
        )
    }
    function detailedGameScreenshot(item) {
        return (
            <View style={{paddingTop:5}}>
                <View style={{height: 110}}>
                {gameScreenshots.map((item) =>
                    <TouchableOpacity
                        onPress={() => selectedGameScreenshot(item)}>
                            <View style={{marginVertical: 5}}>
                                <Image
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
                                
                            </View>
                    </TouchableOpacity>
                )}
                </View>
            </View>
        )
    }

    function detailedGameScreenshotInfo(item) {
        return (
            <Container>
                <View style={{paddingTop: 35}}>
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
                        <Card style={styles.cardStyle}>
                            {detailedGameScreenshotInfo(item)}
                        </Card>
                    </View>
        )
    }

    /*----------------------------------------------*/

     // Detailed Data for returnedGameGenresAndModes()
    function detailedGameGenre(item) {
        return (
            <View style={{paddingTop:5}}>
                <MainSubFont>{`Genre`}</MainSubFont>
                <MainFont>{item.gameGenre}</MainFont>
            </View>
        )
    }
    function detailedGameSubgenre(item) {
        return (
            <View style={{paddingTop:5}}>
                <MainSubFont>{`Subgenre`}</MainSubFont>
                <MainFont>{item.gameSubgenre}</MainFont>
            </View>
        )
    }

    function detailedGameModes(item) {
        return (
            <View style={{paddingTop:5}}>
                <MainSubFont>{`Game Modes`}</MainSubFont>
                <MainFont>{`The game modes array goes here`}</MainFont>
            </View>
        )
    }

    function detailedGameGenresAndModesInfo(item) {
        return (
            <Container>
                <View style={{paddingTop: 35}}>
                    <ViewTopRow style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedGameGenre(item)}
                        </View>
                    </ViewTopRow>
                    <ViewTopRow style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedGameSubgenre(item)}
                        </View>
                    </ViewTopRow>
                    <ViewTopRow style={{justifyContent: 'space-between'}}>
                        <View>
                            {detailedGameModes(item)}
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
                        <Card style={styles.cardStyle}>
                        {detailedGameGenresAndModesInfo(item)}
                        </Card>
                    </View>
                )}
            />
        )
    }
     /*----------------------------------------------*/

    function returnedGameImages() {
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Container>
                        <View style={{ flex: 1 }}>
                            <ContentContainer>
                                <MainFont>{item.gameCoverURL}</MainFont>
                                {/* Game Logo from Firebase */}
                                {isLoading && (
                                    <ActivityIndicator size="large" />
                                )}
                            </ContentContainer>
                        </View>
                    </Container>
                )}
            />
        )
    }

    function returnedGameGameDescription() {
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Container>
                        <View style={{ flex: 1 }}>
                            <ContentContainer>
                                <MainFont>{item.gameGenre}</MainFont>
                                <MainFont>{item.gameSubgenre}</MainFont>
                                <MainFont>{item.gameModes}</MainFont>
                                {isLoading && (
                                    <ActivityIndicator size="large" />
                                )}
                            </ContentContainer>
                        </View>
                    </Container>
                )}
            />
        )
    }

    function gamePageScrollView() {
        return (
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                    {returnedGameInfo()}
                    {returnedGameSummary()}
                    {returnedGameScreenshots()}
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
                        {backArrow()}
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
                    : <View>
                        {backArrow()}
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
            <Stack.Navigator headerMode="none" initialRouteName="Home">
                <Stack.Screen name="Home" component={gamePageStructure} />
            </Stack.Navigator>
        )
    }

  return (
    selectedGameStack()
  )
}