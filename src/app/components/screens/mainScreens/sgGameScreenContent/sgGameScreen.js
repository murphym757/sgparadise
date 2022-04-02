import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';

import {
    BackButtonBottomLayer,
    BackButtonTopLayer,
    Container,
    ContentContainer,
    CurrentThemeContext,
    faChevronLeft,
    faCircle,
    FontAwesomeIcon,
    MainFont,
    PageContainer,
    SafeAreaViewContainer,
    useAuth
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
    const [gameName, setGameName] = useState('sonic-and-knuckles')
    const [gameGenre, setGameGenre] = useState('') //For recommended related games
    const [gameSubGenre, setGameSubGenre] = useState('') //For recommended related games
    const [gameReleaseDate, setGameReleaseDate] = useState('') //For recommended related games
    const collectionName = 'sgAPI'
    const gamesCollection = 'games'
    
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
                    <Container>
                        <View style={{ flex: 1 }}>
                            <ContentContainer>
                                <MainFont>{item.gameName}</MainFont>
                                <MainFont>{item.gameReleaseDate}</MainFont>
                                <MainFont>{item.gamePublishers}</MainFont>
                                <MainFont>{item.gameDevelopers}</MainFont>
                                <MainFont>{item.gameRating}</MainFont>
                                <MainFont>{item.postCreator}</MainFont>
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
                    <Container>
                        <View style={{ flex: 1 }}>
                            <ContentContainer>
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
            <ScrollView>
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
            </ScrollView>
        )
    }
    
    function gamePageStructure() {
        return (
            <PageContainer>
                {isLoading == true
                    ? <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                        <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    </SafeAreaView>
                    : <View>
                        {backArrow()}
                        <View style={{position: 'relative'}}>
                            {returnedGameInfo()}
                        </View>
                    </View>
                }
            </PageContainer>
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