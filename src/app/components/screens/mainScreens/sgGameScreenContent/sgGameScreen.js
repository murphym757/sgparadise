import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';

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
    console.log("🚀 ~ file: sgGameScreen.js ~ line 27 ~ GameScreen ~ currentGameArray", currentGameArray)
    
    const [consoleName, setConsoleName] = useState('sgGenesis')
    const [gameName, setGameName] = useState('streets-of-rage-2')
    const [gameGenre, setGameGenre] = useState('') //For recommended related games
    const [gameSubGenre, setGameSubGenre] = useState('') //For recommended related games
    const [gameReleaseDate, setGameReleaseDate] = useState('') //For recommended related games
    const [gameHomeScreenShot, setGameHomeScreenShot] = useState('')
    console.log("🚀 ~ file: sgGameScreen.js ~ line 46 ~ GameScreen ~ gameHomeScreenShot", gameHomeScreenShot)
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
        let currentGameSubGenre = ''
        let currentGameReleaseDate = ''
        let currentGameHomeScreenshot = ''
        const gameRef = sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName)
        gameRef.get().then((doc) => {
            if (doc.exists) {
                currentGameData.push(doc.data())
                currentGameGenre.push(doc.data().gameGenre)
                currentGameSubGenre.push(doc.data().gameSubGenre)
                currentGameReleaseDate.push(doc.data().gameReleaseDate)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setCurrentGameArray(currentGameData)
        setGameGenre(currentGameGenre)
        setGameSubGenre(currentGameSubGenre)
        setGameReleaseDate(currentGameReleaseDate)
        
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

    function returnedGameFlatlist(gameFunction) {
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
                                <MainFont>{item.gameName}</MainFont>
                                <MainFont>{item.gameSummary}</MainFont>
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

    function returnedGameScreenshots() {
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
                                <MainFont>{item.firebaseScreenshot1Url}</MainFont>
                                <MainFont>{item.firebaseScreenshot2Url}</MainFont>
                                <MainFont>{item.firebaseScreenshot3Url}</MainFont>
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
                                <MainFont>{item.gameSubGenre}</MainFont>
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
                    {returnedGameInfo()}
            </ScrollView>
        )
    }
    
    function gamePageStructure() {
        const image = { uri: gameHomeScreenShot };
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