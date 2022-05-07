import React from 'react'
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { MainFont, MainHeadingLongTitle, ViewTopRow } from 'index';

// Links to the game page
function passDataToNextPage(navigation, item) {
    return (
        navigation.navigate('sgGamePage', {
            collectionName: 'sgAPI',
            gamesCollection: 'games',
            consoleName: 'sgGenesis',
            gameName: item.gameSlug
        })
    )
}

// Cover image
function detailedGameImage(item) {
    return (
        <View style={{
            width: '100%',
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
    )
}

// Data beneath cover
function sgGameListing(passingSectionData, item) {
    return (
        <TouchableOpacity style={{height:100, marginTop: 3, marginBottom: 100}}
            onPress={() => passDataToNextPage(passingSectionData.navigation, item)}>
            {detailedGameImage(item)}
            <MainFont>{item.gameName}</MainFont>
            <MainFont>{item.gameReleaseDate}</MainFont>
            <MainFont>{item.gameRating} <passingSectionData.FontAwesomeIcon icon={ passingSectionData.faStar } color={passingSectionData.colors.secondaryColor} size={15} /></MainFont>
        </TouchableOpacity>
    )
}

// Contains both the cover image and the data that belongs to each 
function sgGameSet(passingSectionData, titleForRelatedData, descriptionForRelatedData) {
    return (
        <View>
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
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={passingSectionData.gamesArray}
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={() => <View style={{ width: 35 }} />}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <View>
                    {sgGameListing(passingSectionData, item)}
                </View>
                )}
            />
        </View>
    )
}

// Retrieves the data and sets the data 
function dataCollector(passingGameData) {
    let setupGameData = passingGameData.setgamesArray
    let setupGameDataTitle = passingGameData.setgamesArrayTitle
    let setupGameDataDescription = passingGameData.setgamesArrayDescription
    const collectionName = 'sgAPI'
    const gamesCollection = 'games'
    const gamesCollectionOrderBy = 'gameRating'
    const gamesCollectionOrderDirection = 'desc'
    const gamesCollectionOrderLimit = 5
    const gameRefSpecificData = 'gameSubgenre'
    const collectiveGameData = {
        setupGameData,
        setupGameDataTitle,
        setupGameDataDescription,
        consoleName: passingGameData.consoleName,
        collectionName,
        gamesCollection,
        gamesCollectionOrderBy,
        gamesCollectionOrderDirection,
        gamesCollectionOrderLimit,
        gameRefSpecificData,
        gameRefSpecificRelatedData: passingGameData.gameRefSpecificRelatedData
    }
    return collectiveGameData
}

export const gameData = {
    sgGameSet,
    dataCollector
}

export const homeScreenGenreContext = React.createContext(gameData)