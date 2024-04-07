import React, { useContext } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import {
    MainFont,
    MainHeading,
    MainHeadingLongTitle,
    PlatformCard,
    SliderWidth,
    ViewTopRow
} from 'index';

// Links to the game page
function passDataToNextPage(navigation, item, consoleName) {
    return (
        navigation.navigate('sgGamePage', {
            collectionName: 'sgAPI',
            consoleName,
            gameName: item.gameSlug,
            gameGenre: item.gameGenre,
            gameImageCount: item.firebaseGameNameImageCount,
            gamesCollection: 'games'
        })
    )
}

function charLengthSet(nameValue, nameLength, maxNameLength, nameLengthSet) {
    if (nameLength < maxNameLength) {
        return (
            <MainFont>{nameValue}</MainFont>
        )
    } else {
        return (
            <MainFont>{nameValue.substring(0, nameLengthSet) + '...'}</MainFont>
        )
    }
}


function sgGameListingSpotlight(passingSectionData, item, laymanConsoleName, consoleName) {
    function gameCoverSpotlightHomeScreen() {
        const imageData = {
            height: coverHeight,
            width: coverWidth,
            contentFit: 'stretch',
            borderRadius: 5,
            transition: 1000
        }
        return images.detailedGameCover(imageData, coverLink)
    }
    function gameScreenshotSpotlightHomeScreen(item) {
        const imageDataScreenshot = {
            height: screenshotHeight,
            width: SliderWidth,
            contentFit: 'stretch',
            borderRadius: 5,
            transition: 1000
        }
        return images.detailedGameScreenshot(imageDataScreenshot, item)
    }
    const images = useContext(AppWideImageContext)
    const coverLink = item.firebaseCoverUrl
    const coverHeight = 100
    const coverWidth = 75
    const screenshotHeight = 400
    const nameValue = item.gameName
    
    return (
        <View style={{paddingBottom: 75, flex: 1, flexDirection: 'column'}}>
            <Pressable style={{height:100, marginTop: 3, marginBottom: 100}}
                onPress={() => passDataToNextPage(passingSectionData.navigation, item, consoleName)}>
                <View style={{
                    position: 'relative'
                }}>
                <MainHeading style={{color: `${passingSectionData.colors.black}`, paddingBottom: 10}}>Spotlight</MainHeading>
                    {gameScreenshotSpotlightHomeScreen(item)}
                </View>
                
                <View style={{
                    paddingTop: 200,
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',
                    flex: 1,
                    position: 'absolute',
                    padding: 15
                }}>
                    <View style={{
                        position: 'relative',
                        height: coverHeight + 25,
                        width: 355,
                        backgroundColor: `${passingSectionData.colors.imageOpacityOverlay}`,
                        borderRadius: 5,
                        opacity: 0.95
                    }}/>
                        <ViewTopRow style={{paddingTop: 215, position: 'absolute', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 25}}>
                            <View style={{paddingRight: 15, paddingVertical: 5}}>
                                {gameCoverSpotlightHomeScreen(imageData, coverLink)}
                            </View>
                            <View style={{paddingVertical: 25}}>
                                {charLengthSet(nameValue, nameValue.length, 18, 13)}
                                <MainFont style={{color: `${passingSectionData.colors.white}`}}>{laymanConsoleName}</MainFont>
                                <MainFont style={{color: `${passingSectionData.colors.white}`}}>{item.gameReleaseDate}</MainFont>
                                <MainFont style={{color: `${passingSectionData.colors.white}`}}>{item.gameRating} <passingSectionData.FontAwesomeIcon icon={ passingSectionData.faStar } color={passingSectionData.colors.secondaryColor} size={15} /></MainFont>
                            </View>
                            <View style={{paddingVertical: 45, flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <MainHeading style={{color: `${passingSectionData.colors.white}`}}>GO</MainHeading>
                            </View>
                    </ViewTopRow>
                </View>
            </Pressable>
        </View>
    )
}

function sgGameSetSpotlight(passingSectionData, laymanConsoleName, consoleName) {
    return (
        <View style={{paddingTop: 25, paddingBottom: 200, flex: 1, flexDirection: 'column'}}>
            {passingSectionData.gamesArray.map((item) => (
                <View>
                    {sgGameListingSpotlight(passingSectionData, item, laymanConsoleName, consoleName)}
                </View>
            ))}
        </View>
    )
}

// Data beneath cover
function sgGameListing(passingSectionData, item, consoleName) {
    function gameCoverListingHomeScreen() {
        const imageData = {
            height: coverHeight,
            width: coverWidth,
            contentFit: 'stretch',
            borderRadius: 5,
            transition: 1000
        }
        return images.detailedGameCover(imageData, coverLink)
    }
    const images = useContext(AppWideImageContext)
    const coverLink = item.firebaseCoverUrl
    const coverHeight = 150
    const coverWidth = 125
    const nameValue = item.gameName
    return (
        <Pressable style={{height:125, marginTop: 3, marginBottom: 100}}
            onPress={() => passDataToNextPage(passingSectionData.navigation, item, consoleName)}>
            {gameCoverListingHomeScreen()}
            <View style={{paddingVertical: 5}}>
                {charLengthSet(nameValue, nameValue.length, 18, 13)}
            </View>
            <MainFont>{item.gameReleaseDate}</MainFont>
            <MainFont>{item.gameRating} <passingSectionData.FontAwesomeIcon icon={ passingSectionData.faStar } color={passingSectionData.colors.secondaryColor} size={15} /></MainFont>
        </Pressable>
    )
}

function sgConsoleSet(passingSectionData, titleForRelatedData) {
    function gameCoverListingHomeScreen(item) {
        const imageData = {
            height: coverHeight,
            width: coverWidth,
            contentFit: 'stretch',
            borderRadius: 5,
            transition: 1000
        }
        return images.detailedPlatformLogo(item, imageData)
    }
    const images = useContext(AppWideImageContext)
    const coverHeight = 80
    const coverWidth = 200
    return (
        <View>
            <MainHeading>{titleForRelatedData}</MainHeading>
            <FlatList
                contentContainerStyle={{}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={passingSectionData.gamesArray}
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={() => <View style={{ width: 35 }} />}
                keyExtractor={tem >d}tmd
                renderItem={({ item }) => (
                    <View>
                        <ViewTopRow>
                            <PlatformCard>
                                <View style={{
                                    flex: 1, 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {gameCoverListingHomeScreen(item)}
                                </View>
                            </PlatformCard>
                        </ViewTopRow>
                    </View>
                )}
            />
        </View>
    )
}

// Contains both the cover image and the data that belongs to each 
function sgGameSet(passingSectionData, titleForRelatedData, descriptionForRelatedData, consoleName) {
    return (
        <View style={{paddingVertical: 25, flex: 1, flexDirection: 'column'}}>
            <ViewTopRow style={{justifyContent: 'space-between'}}>
                <View>
                    <MainHeadingLongTitle>{titleForRelatedData}</MainHeadingLongTitle>
                </View>
            </ViewTopRow>
            <MainFont>{descriptionForRelatedData}</MainFont>
            <FlatList
                contentContainerStyle={{}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={passingSectionData.gamesArray}
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={() => <View style={{ width: 35 }} />}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <View>
                    {sgGameListing(passingSectionData, item, consoleName)}
                </View>
                )}
            />
        </View>
    )
}

// Retrieves the data and sets the data 

// Spotlight games are console specific with the intent to showcase the best game on each respective 
function dataCollectorConsole(passingGameData) {
    let setupGameData = passingGameData.setGamesArray
    let setupGameDataTitle = passingGameData.setGamesArrayTitle
    const collectionName = 'sgAPI'
    const consolesCollectionOrderBy = 'systemConsoleLifespanStart'
    const consolesCollectionOrderDirection = 'asc'

    const collectiveGameData = {
        setupGameData,
        setupGameDataTitle,
        collectionName,
        consolesCollectionOrderBy,
        consolesCollectionOrderDirection,
        gameRefSpecificData: passingGameData.gameRefSpecificData,
        gameRefSpecificRelatedData: passingGameData.gameRefSpecificRelatedData
    }
    return collectiveGameData
}
// Collect data primarily based on rating and in descending order
function dataCollector(passingGameData) {
    let setupGameData = passingGameData.setGamesArray
    let setupGameDataTitle = passingGameData.setGamesArrayTitle
    let setupGameDataDescription = passingGameData.setGamesArrayDescription
    const collectionName = 'sgAPI'
    const gamesCollection = 'games'
    const gamesCollectionOrderBy = 'gameRating'
    const gamesCollectionOrderDirection = 'desc'
    
    const collectiveGameData = {
        setupGameData,
        setupGameDataTitle,
        setupGameDataDescription,
        consoleName: passingGameData.consoleName,
        collectionName,
        gamesCollection,
        gamesCollectionOrderBy,
        gamesCollectionOrderDirection,
        gamesCollectionOrderLimit: passingGameData.gamesCollectionOrderLimit,
        gameRefSpecificData: passingGameData.gameRefSpecificData,
        gameRefSpecificRelatedData: passingGameData.gameRefSpecificRelatedData
    }
    return collectiveGameData
}

function dataActionGenreCollector(passingGameData) {
    let setupGenreData = passingGameData.setGenreArray
    let setupGenreDataTitle = passingGameData.setGenreArrayTitle
    const collectionName = 'sgAPI'
    const tagDoc = 'sgTags'
    const genresCollection = 'genreTags'
    const genreSpecificCollection = 'genreSpecificTags'
    const genresCollectionOrderBy = 'tagName'
    const genresCollectionOrderDirection = 'desc'
    
    const collectiveGameData = {
        setupGenreData,
        setupGenreDataTitle,
        genreName: passingGameData.genreName,
        collectionName,
        tagDoc,
        genresCollection,
        genreSpecificCollection,
        genresCollectionOrderBy,
        genresCollectionOrderDirection
    }
    return collectiveGameData
}

export const gameData = {
    sgConsoleSet,
    sgGameSetSpotlight,
    sgGameSet,
    charLengthSet,
    dataCollector,
    dataCollectorConsole,
    dataActionGenreCollector
}

export const homeScreenGenreContext = React.createContext(gameData)