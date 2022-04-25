import React from 'react'
import { View, Image, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet, ActivityIndicator } from 'react-native';

import {
    Card,
    CardContent,
    MainFont,
    MainSubFont,
    Styles,
    Container,
    LinkedContentGenreView,
    MainFontLinkView,
    MainFontLink,
    MainFontArrayLinks,
    CenterContent,
    MainHeading,
    MainHeadingLongTitle,
    GamePageImageBackground,
    ViewTopRow
} from 'index'

// Detailed Data for linking data
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
/*----------------------------------------------*/
// Detailed Data for returnedGameInfo()
function detailedGameReleaseDate(item) {
    return (
        <CardContent>
            <MainSubFont>{`Release Date`}</MainSubFont>
            <MainFont>{item.gameReleaseDate}</MainFont>
        </CardContent>
    )
}

function detailedGameName(item, setGameHomeScreenShot) {
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

function detailedGameInfo(item, isLoading, setGameHomeScreenShot) {
    return (
        <Container>
            <View style={{paddingTop: 15}}>
                <View style={{paddingBottom: 15}}>
                    {detailedGameName(item, setGameHomeScreenShot)}
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
            </View>
        </Container>
    )
}

function returnedGameInfo(currentGameArray, isLoading, setGameHomeScreenShot) {
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
                        {detailedGameInfo(item, isLoading, setGameHomeScreenShot)}
                    </Card>
                </View>
            )}
        />
    )
}
/*----------------------------------------------*/
 // Detailed Data for returnedGamePubDev()
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
            </View>
        </Container>
    )
}

function returnedGamePubDevInfo(currentGameArray) {
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
                        {detailedGamePubDevInfo(item, currentGameArray)}
                    </Card>
                </View>
            )}
        />
    )
}
/*----------------------------------------------*/
 // Detailed Data for returnedGameGenresAndModes()
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
            </View>
        </Container>
    )
}

function returnedGameGenresAndModes(currentGameArray) {
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
                        {detailedGameGenresAndModesInfo(item, currentGameArray)}
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
            </View>
        </Container>
    )
}

function returnedGameSummary(currentGameArray) {
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
 
function detailedGameScreenshot(gameScreenshots, gamePageNewHomeScreen, selectedGameScreenshot, colors) {
    return (
        <View style={{paddingTop: 20}}>
            <View style={{height: 110}}>
                <CenterContent>
                    <MainSubFont>{`Choose One`}</MainSubFont>
                </CenterContent>
                <View style={{paddingTop: 15}}>
                    {gameScreenshots.map((item) =>
                        <TouchableOpacity
                            onPress={() => selectedGameScreenshot(item, gamePageNewHomeScreen, selectedGameScreenshot)}>
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

function detailedGameScreenshotInfo(item, gameScreenshots, gamePageNewHomeScreen, selectedGameScreenshot, colors) {
    return (
        <Container>
            <View>
                {detailedGameScreenshot(item, gameScreenshots, gamePageNewHomeScreen, selectedGameScreenshot, colors)}
            </View>
        </Container>
    )
}

function returnedGameScreenshots(item, gameScreenshots, gamePageNewHomeScreen, selectedGameScreenshot, colors) {
    return (
        <View style={{paddingHorizontal: 20}}>
            <Card style={Styles.CardStyle}>
                {detailedGameScreenshotInfo(item, gameScreenshots, gamePageNewHomeScreen, selectedGameScreenshot, colors)}
            </Card>
        </View>
    )
}

/*----------------------------------------------*/

 // Change Background image
 function preDeterminedGameHomeScreen(gameHomeScreenShot, gamePageScrollView, isLoading, colors) {
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

function updatedGameHomeScreen(gamePageNewHomeScreen, gamePageScrollView, isLoading, colors) {
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

export const uploadedGame = {
    returnedGameInfo,
    returnedGamePubDevInfo,
    returnedGameGenresAndModes,
    returnedGameSummary,
    returnedGameScreenshots,
    preDeterminedGameHomeScreen,
    updatedGameHomeScreen
}

export const gameScreenContext = React.createContext(uploadedGame)