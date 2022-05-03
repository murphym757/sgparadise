import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from 'auth/authContext'
import { MainHeadingLongTitle, MainFont, ViewTopRow } from 'index';
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeActionGames({ navigation }) {
    const {sgDB} = useAuth()
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [gamesArray, setgamesArray] = useState([])
    const [gamesArrayTitle, setgamesArrayTitle] = useState('')
    const [gamesArrayDescription, setgamesArrayDescription] = useState('')
    const navigationPass = navigation
    const toGameData = {
        navigationPass,
        nextPage: 'sgGamePage'
    }
    const toConsoleList = {
        navigationPass,
        nextPage: 'SgAddGameConfirm'
    }
    useEffect(() => {
      getGameDatasgGenesisBuddyBeatEmUp()
    }, [isFocused])

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Sega Genesis'
        if (consoleName == 'sg1000') return 'Sega 1000'  
        if (consoleName == 'sgMS') return 'Sega Master System'
        if (consoleName == 'sgGG') return 'Sega Game Gear'
        if (consoleName == 'sgSat') return 'Sega Saturn'
        if (consoleName == 'sg32X') return 'Sega 32X'
        if (consoleName == 'sgCD') return 'Sega Cd'
    }

    function passDataToNextPage(item) {
        return (
            navigation.navigate('sgGamePage', {
                collectionName: 'sgAPI',
                gamesCollection: 'games',
                consoleName: 'sgGenesis',
                gameName: item.gameSlug
            })
        )
    }

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

    async function sgFirebaseGamesCollection(passingData) {
        function snapshotDecider(shopshot) {
            const snapshotType = shopshot
            if (snapshotType.empty) {
                console.log('No matching documents.')
            return
            }  
            snapshotType.forEach(doc => {
                passingData.sgFirebaseFoundGames.push(doc.data(), {groupTitle: passingData.titleForRelatedData, groupDescription: passingData.descriptionForRelatedData})
            });
        }
        const gameRef = sgDB.collection(passingData.collectionName)
                            .doc(passingData.consoleName)
                            .collection(passingData.gamesCollection)
                            .orderBy(passingData.gamesCollectionOrderBy, passingData.gamesCollectionOrderDirection)
                            .limit(passingData.gamesCollectionOrderLimit)
        const snapshotSubGenre = await gameRef.where(passingData.gameRefSpecificData, '==', passingData.gameRefSpecificRelatedData).get()
        const snapshotGenre = await gameRef.get()
        if (passingData.genreSpecificFunction == true) {
            snapshotDecider(snapshotSubGenre)
        } else {
            snapshotDecider(snapshotGenre)
        }
        passingData.setupGameData(passingData.sgFirebaseFoundGames)
    }

    function getGameDatasgGenesisBuddyBeatEmUp() {
        let setupGameData = setgamesArray
        let setupGameDataTitle = setgamesArrayTitle
        let setupGameDataDescription = setgamesArrayDescription
        let beatEmUpGames = []
        let sgFirebaseFoundGames = beatEmUpGames
        const collectionName = 'sgAPI'
        const consoleName = 'sgGenesis'
        const laymanConsoleName = findLaymanConsoleName(consoleName)
        const gamesCollection = 'games'
        const gamesCollectionOrderBy = 'gameRating'
        const gamesCollectionOrderDirection = 'desc'
        const gamesCollectionOrderLimit = 5
        const gameRefSpecificData = 'gameSubgenre'
        const gameRefSpecificRelatedData = 'Beat ‘em Up'
        const titleForRelatedData = `Buddy Beat 'em Ups`
        const descriptionForRelatedData = `When it comes to Beat 'em Ups, this is the cream of the crop for ${laymanConsoleName} games`
        const passingData = {
            setupGameData,
            setupGameDataTitle,
            setupGameDataDescription,
            sgFirebaseFoundGames,
            collectionName,
            consoleName,
            gamesCollection,
            gamesCollectionOrderBy,
            gamesCollectionOrderDirection,
            gamesCollectionOrderLimit,
            gameRefSpecificData,
            gameRefSpecificRelatedData,
            titleForRelatedData,
            descriptionForRelatedData
        }
        sgFirebaseGamesCollection(passingData)
    }

    function beatEmUpList() {
        return (
            <View>
                <ViewTopRow style={{justifyContent: 'space-between'}}>
                    <View>
                        {/*<MainHeadingLongTitle>{gamesArray[1].groupTitle}</MainHeadingLongTitle>*/}
                    </View>
                    <View>
                        <MainHeadingLongTitle>See All</MainHeadingLongTitle>
                    </View>
                </ViewTopRow>
                {/*<MainFont>{gamesArray[1].groupDescription}</MainFont>*/}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={gamesArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                    <View>
                        {beatEmUpListGame(item)}
                    </View>
                    )}
                />
            </View>
        )
    }

    function beatEmUpListGame(item) {
        return (
            <TouchableOpacity style={{height:100, marginTop: 3, marginBottom: 10}}
                onPress={() => passDataToNextPage(item)}>
                {detailedGameImage(item)}
                <MainFont>{item.gameName}</MainFont>
                <MainFont>{item.gameReleaseDate}</MainFont>
                <MainFont>{item.gameRating} Stars</MainFont>
            </TouchableOpacity>
        )
    }

  return (
    <View>
        {beatEmUpList()}
    </View>
  )
}