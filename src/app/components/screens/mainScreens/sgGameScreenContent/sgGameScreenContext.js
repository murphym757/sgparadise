import React from 'react'
import { View, Image, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet, ActivityIndicator } from 'react-native';

import {
    Card,
    CardContent,
    CenterContent,
    Container,
    faChevronLeft,
    faCircle,
    GameNameBig,
    GameDescriptorSmall,
    GameDescriptorSmallAlt,
    GamePageImageBackground,
    LinksCard,
    LinkedContentGenreView,
    MainFont,
    MainFontArrayLinks,
    MainFontLink,
    MainFontLinkView,
    MainHeading,
    MainHeadingLongTitle,
    MainSubFont,
    SafeAreaViewLoader,
    Styles,
    ViewTopRow
} from 'index'

// Detailed Data for linking data

function linkedContent(linkedData, linkedDataTitleSingular, chosenDataOption) {
    const keySearchDataArray = false
    return (
        <LinkedContentGenreView>
            <CenterContent>
                <GameDescriptorSmall>{linkedDataTitleSingular}</GameDescriptorSmall>
            </CenterContent>
            <MainFontLinkView>
                <TouchableOpacity onPress={() => chosenDataOption(linkedData, keySearchDataArray)}>
                    <MainFontLink>{linkedData}</MainFontLink>
                </TouchableOpacity>
            </MainFontLinkView>
        </LinkedContentGenreView>
    )
}
function mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption) {
    const keySearchDataArray = true
    return (
        <LinkedContentGenreView>
            <CenterContent>
                {linkedData.length > 1
                    ?   <GameDescriptorSmall>{linkedDataTitlePlural}</GameDescriptorSmall>
                    :   <GameDescriptorSmall>{linkedDataTitleSingular}</GameDescriptorSmall>
                }
            </CenterContent>
            <MainFontLinkView>
                {sortInfoByStringLength(unsortedArray).map((item) => (
                    <TouchableOpacity onPress={() => chosenDataOption(item[0], keySearchDataArray)}>
                        <MainFontArrayLinks>{item}</MainFontArrayLinks>
                    </TouchableOpacity>
                ))}
            </MainFontLinkView>
        </LinkedContentGenreView>
    )
}
/*----------------------------------------------*/
//* FIrst Page of Game Screen
    function detailedGameName(item, setGameHomeScreenCover, setGameHomeScreenShot) {
        setGameHomeScreenCover(item.firebaseCoverUrl)
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

    function detailedGameCover(item) {
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
                            url: `${item.firebaseCoverUrl}`,
                        }}
                    />
                </View>
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
//*----------------------------------------------*/

//* Second Page of Game Screen
    //* Detailed Data for returnedGameInfo()
        function detailedGameInfoSlide1(sectionTitle, sectionData) {
            return (
                <CardContent>
                    <GameDescriptorSmall>{sectionTitle}</GameDescriptorSmall>
                    <GameDescriptorSmallAlt>{sectionData}</GameDescriptorSmallAlt>
                </CardContent>
            )
        }
        function detailedGameReleaseDate(item) {
            const sectionTitle = `Release Date`
            const sectionData = item.gameReleaseDate
            return (
                detailedGameInfoSlide1(sectionTitle, sectionData)
            )
        }

        function detailedGameViews(item) {
            const sectionTitle = `Views`
            const sectionData = item.views + 1
            return (
                detailedGameInfoSlide1(sectionTitle, sectionData)
            )
        }

        function detailedGameRating(item) {
            const sectionTitle = `Rating`
            const sectionData = item.gameRating + ' Stars'
            return (
                detailedGameInfoSlide1(sectionTitle, sectionData)
            )
        }


        function detailedGameInfo(item, isLoading, setGameHomeScreenCover, setGameHomeScreenShot) {
            return (
                <Container>
                    <View style={{paddingTop: 20}}>
                        <View>
                            {detailedGameReleaseDate(item)}
                        </View>
                        <View style={{paddingVertical: 50}}>
                            {detailedGameRating(item)}
                        </View>
                        <View>
                            {detailedGameViews(item)}
                        </View>
                    </View>
                </Container>
            )
        }

        function returnedGameInfo(currentGameArray, isLoading, setGameHomeScreenCover, setGameHomeScreenShot) {
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
                            {detailedGameInfo(item, isLoading, setGameHomeScreenCover, setGameHomeScreenShot)}
                        </View>
                    )}
                />
            )
        }
    //*----------------------------------------------*/

    //* Detailed Data for returnedGameSummary()
    function detailedGameInfoSlide2(sectionData) {
        return (
            <CardContent>
                <GameDescriptorSmallAlt>{sectionData}</GameDescriptorSmallAlt>
            </CardContent>
        )
    }
        function detailedGameSummary(item) {
            const sectionData = item.gameSummary
            return (
                detailedGameInfoSlide2(sectionData)
            )
        }

        function detailedGameSummaryInfo(item) {
            return (
                <Container style={{paddingTop: 20, paddingHorizontal: 20}}>
                    {detailedGameSummary(item)}
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
                        <View>
                            <Card style={Styles.CardStyle}>
                                {detailedGameSummaryInfo(item)}
                            </Card>
                        </View>
                    )}
                />
            )
        }
    //*----------------------------------------------*/
    //* Detailed Data for returnedGameScreenshots()
        function detailedGameScreenshot(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, colors) {
            return (
                <View style={{paddingTop: 20, paddingHorizontal: 40}}>
                    <View style={{height: 110}}>
                        <View>
                            <GameDescriptorSmall>Choose One</GameDescriptorSmall>
                            {gameScreenshots.map((item) =>
                                <TouchableOpacity
                                    onPress={() => selectedGameScreenshot(item, selectedGameScreenshot)}>
                                        <View style={{marginVertical: 5}}>
                                            {gameHomeNewScreenShot == item
                                                ?    <Image
                                                        style={{
                                                            height: 70,
                                                            width: 100,
                                                            resizeMode: 'stretch',
                                                            borderRadius: 5,
                                                            borderWidth: 7,
                                                            borderColor: colors.secondaryColor,
                                                        }}
                                                        source={{
                                                            url: `${item}`,
                                                        }}
                                                    />
                                                :    <Image
                                                        style={{
                                                            height: 70,
                                                            width: 100,
                                                            resizeMode: 'stretch',
                                                            borderRadius: 5
                                                        }}
                                                        source={{
                                                            url: `${item}`,
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

        function returnedGameScreenshots(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, colors) {
            return (
                <View>
                    {detailedGameScreenshot(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, colors)}
                </View>
            )
        }
    //*----------------------------------------------*/
    //* Detailed Data for returnedGamePubDev()
        function sortInfoByStringLength(unsortedArray) {
            const sortedArray = unsortedArray.sort((a, b) => a.length - b.length)
            const sortedMap = [...new Map(sortedArray.map(i => [i]))]
            return sortedMap
        }

        function detailedPublishers(item, chosenDataOption) {
            const linkedData = item.gamePublishers
            const linkedDataTitleSingular = `Publisher`
            const linkedDataTitlePlural = `Publishers`
            const unsortedArray = [...item.gamePublishers]
            return (
                mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption)
            )
        }

        function detailedDevelopers(item, chosenDataOption) {
            const linkedData = item.gameDevelopers
            const linkedDataTitleSingular = `Developer`
            const linkedDataTitlePlural = `Developers`
            const unsortedArray = [...item.gameDevelopers]
            return (
                mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption)
            )
        }

        function detailedGamePubDevInfo(item, chosenDataOption) {
            return (
                <Container>
                    <View>
                        {detailedPublishers(item, chosenDataOption)}
                    </View>
                    <View>
                        {detailedDevelopers(item, chosenDataOption)}
                    </View>
                </Container>
            )
        }

        function returnedGamePubDevInfo(currentGameArray, chosenDataOption) {
            return (
                <FlatList
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={currentGameArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <LinksCard>
                                {detailedGamePubDevInfo(item, chosenDataOption)}
                            </LinksCard>
                        </View>
                    )}
                />
            )
        }
    //*----------------------------------------------*/
    //* Detailed Data for returnedGameGenresAndModes()
        function detailedGameGenre(item, chosenDataOption) {
            const linkedDataTitleSingular = `Genre`
            const linkedData = item.gameGenre
            return (
                linkedContent(linkedData, linkedDataTitleSingular, chosenDataOption)
            )
        }
        function detailedGameSubgenre(item, chosenDataOption) {
            const linkedDataTitleSingular = `Subgenre`
            const linkedData = item.gameSubgenre
            return (
                linkedContent(linkedData, linkedDataTitleSingular, chosenDataOption)
            )
        }

        function detailedGameModes(item, chosenDataOption) {
            const linkedData = item.gameModes
            const linkedDataTitleSingular = `Game Mode`
            const linkedDataTitlePlural = `Game Modes`
            const unsortedArray = [...item.gameModes]
            return (
                mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption)
            )
        }

        function detailedGameGenresAndModesInfo(item, chosenDataOption) {
            return (
                <Container>
                    <View>
                        {detailedGameGenre(item, chosenDataOption)}
                    </View>
                    <View style={{paddingVertical: 20}}>
                        {detailedGameSubgenre(item, chosenDataOption)}
                    </View>
                    <View>
                        {detailedGameModes(item, chosenDataOption)}
                    </View>
                </Container>
            )
        }

        function returnedGameGenresAndModes(currentGameArray, chosenDataOption) {
            return (
                <FlatList
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={currentGameArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <LinksCard>
                                {detailedGameGenresAndModesInfo(item, chosenDataOption)}
                            </LinksCard>
                        </View>
                    )}
                />
            )
        }
    //*----------------------------------------------*/
    function upperHalfOfGamePageImageSelector(item, image, preDeterminedImage){ 
        function imageStructure(imageChosen) {
            const gameScreenshot = imageChosen
            return (
                <Image
                    style={{
                        height: 250,
                        width: 375,
                        resizeMode: 'stretch',
                        borderRadius: 20,
                    }}
                    source={{
                        url: `${gameScreenshot}`,
                    }}
                />
            )
        }
        return (
            <View style={{alignContent: 'center', alignItems: 'center'}}>
                <View style={{paddingBottom: 20}}>
                    {image == ''
                        ? imageStructure(preDeterminedImage)
                        : imageStructure(image)
                    }
                </View>
                <View style={{paddingTop: 20}}>
                    <GameNameBig style={{fontSize: 18 }}>{item. gameName}</GameNameBig>
                </View>
            </View>
        )
    }
    function upperHalfOfGamePage(currentGameArray, gameScreenshots, image) {
        const gameScreenshot = image
        return (
            <Container style={{paddingVertical: 20}}>
                <FlatList
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={currentGameArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        upperHalfOfGamePageImageSelector(item, image, gameScreenshots[0])
                    )}
                />
                
            </Container>
        )
    }

    //*  Change Background image
    //TODO: Repurpose so this simply displays the image and keep the background the same for all games
    //TODO: Remove 'GamePageImageBackground' all together
    
    function preDeterminedGameHomeScreen(currentGameArray, gameScreenshots, gameHomeScreenCover, gameHomeScreenShot, gamePageScrollView, isLoading, colors) {
        let image = { url: gameHomeScreenShot };
        return (
            <View>
                {isLoading == true
                    ? <View style={{ backgroundColor: colors.primaryColor }}>
                        <SafeAreaViewLoader>
                            <ActivityIndicator size="large" hidesWhenStopped="true"/>
                        </SafeAreaViewLoader>
                    </View>
                    :  <View style={{position: 'relative', paddingTop: 100}}>
                        {upperHalfOfGamePage(currentGameArray, gameScreenshots, gameHomeScreenShot)}
                        {gamePageScrollView()}
                </View>
                }
            </View>
        )
    }

    function updatedGameHomeScreen(currentGameArray, gameScreenshots, gameHomeNewScreenShot, gamePageScrollView, isLoading, colors) {
        let image = { url: gameHomeNewScreenShot };
        return (
            <View>
                {isLoading == true
                    ? <View style={{ backgroundColor: colors.primaryColor }}>
                        <SafeAreaViewLoader>
                            <ActivityIndicator size="large" hidesWhenStopped="true"/>
                        </SafeAreaViewLoader>
                    </View>
                    : <View style={{position: 'relative'}}>
                        <View style={{position: 'relative', paddingTop: 100}}>
                            {upperHalfOfGamePage(currentGameArray, gameScreenshots, gameHomeNewScreenShot)}
                            {gamePageScrollView()}
                        </View>
                    </View>
                }
            </View>
        )
    }
//*--------------------Second Page of Game Screen--------------------------*/
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