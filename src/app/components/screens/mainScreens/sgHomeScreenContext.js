import React from 'react'
import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import { 
    MainFont, 
    MainHeading, 
    MainHeadingLongTitle, 
    ViewTopRow, 
    Container, 
    ContentContainer,
    CarouselCardBody,
    CarouselCardContainer,
    CarouselCardHeader,
    CarouselCardImage,
    SliderWidth,
    Styles
 } from 'index'
 import {FlatListSlider} from 'react-native-flatlist-slider'

// Links to the game page
function passDataToNextPage(navigation, item, consoleName) {
    return (
        navigation.navigate('sgGamePage', {
            collectionName: 'sgAPI',
            gamesCollection: 'games',
            consoleName,
            gameName: item.gameSlug
        })
    )
}

// Cover image
function detailedGameCover(item, coverHeight, coverWidth) {
    return (
        <View style={{
            width: '100%',
        }}>
            <Image
                style={{
                    height: coverHeight,
                    width: coverWidth,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                }}
                source={{
                    uri: `${item.firebaseCoverUrl}`,
                }}
            />
        </View>
    )
}

// Spotlight Gameplay Image 
function detailedGameScreenshot(item) {
    return (
        <View style={{
            width: '100%',
        }}>
            <Image
                style={{
                    height: 400,
                    width: SliderWidth,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                }}
                source={{
                    uri: `${item.firebaseScreenshot1Url}`,
                }}
            />
        </View>
    )
}

function sgGameListingSpotlight(passingSectionData, item, laymanConsoleName, consoleName) {
    const coverHeight = 100
    const coverWidth = 75
    return (
        <View style={{paddingBottom: 75, flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity style={{height:100, marginTop: 3, marginBottom: 100}}
                onPress={() => passDataToNextPage(passingSectionData.navigation, item, consoleName)}>
                <View style={{
                    position: 'relative'
                }}>
                <MainHeading style={{color: `${passingSectionData.colors.white}`, paddingBottom: 10}}>Spotlight</MainHeading>
                    {detailedGameScreenshot(item)}
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
                                {detailedGameCover(item, coverHeight, coverWidth)}
                            </View>
                            <View style={{paddingVertical: 25}}>
                                {item.gameName.length < 18
                                    ?   <ViewTopRow>
                                            <MainFont style={{color: `${passingSectionData.colors.white}`}}>{item.gameName}</MainFont>
                                    </ViewTopRow>
                                    :   <ViewTopRow>
                                        <MainFont style={{ flex: 1, color: `${passingSectionData.colors.white}` }}>{item.gameName.substring(0, 13) + '...'}</MainFont>
                                    </ViewTopRow>
                                }
                                <MainFont style={{color: `${passingSectionData.colors.white}`}}>{laymanConsoleName}</MainFont>
                                <MainFont style={{color: `${passingSectionData.colors.white}`}}>{item.gameReleaseDate}</MainFont>
                                <MainFont style={{color: `${passingSectionData.colors.white}`}}>{item.gameRating} <passingSectionData.FontAwesomeIcon icon={ passingSectionData.faStar } color={passingSectionData.colors.secondaryColor} size={15} /></MainFont>
                            </View>
                            <View style={{paddingVertical: 45, flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <MainHeading style={{color: `${passingSectionData.colors.white}`}}>GO</MainHeading>
                            </View>
                    </ViewTopRow>
                </View>
            </TouchableOpacity>
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
    const coverHeight = 150
    const coverWidth = 125
    return (
        <TouchableOpacity style={{height:100, marginTop: 3, marginBottom: 100}}
            onPress={() => passDataToNextPage(passingSectionData.navigation, item, consoleName)}>
            {detailedGameCover(item, coverHeight, coverWidth)}
            {item.gameName.length < 18
                ?   <ViewTopRow>
                        <MainFont>{item.gameName}</MainFont>
                </ViewTopRow>
                :   <ViewTopRow>
                    <MainFont style={{ flex: 1 }}>{item.gameName.substring(0, 13) + '...'}</MainFont>
                </ViewTopRow>
            }
            <MainFont>{item.gameReleaseDate}</MainFont>
            <MainFont>{item.gameRating} <passingSectionData.FontAwesomeIcon icon={ passingSectionData.faStar } color={passingSectionData.colors.secondaryColor} size={15} /></MainFont>
        </TouchableOpacity>
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
                <View>
                    <MainHeadingLongTitle>See All</MainHeadingLongTitle>
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

// Spotlight games are console specific with the intent to showcase the best game on each respective console
// Collect data primarily based on rating and in descending order
function dataCollector(passingGameData) {
    let setupGameData = passingGameData.setgamesArray
    let setupGameDataTitle = passingGameData.setgamesArrayTitle
    let setupGameDataDescription = passingGameData.setgamesArrayDescription
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

export const gameData = {
    sgGameSetSpotlight,
    sgGameSet,
    dataCollector
}

export const homeScreenGenreContext = React.createContext(gameData)