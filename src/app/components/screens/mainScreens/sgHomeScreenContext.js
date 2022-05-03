import React from 'react'
import { View, Image, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet, ActivityIndicator } from 'react-native';

import {
    Card,
    CardContent,
    CenterContent,
    Container,
    GamePageImageBackground,
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
const collectionName = 'sgAPI'
const consoleName = 'sgGenesis'
//const laymanConsoleName = findLaymanConsoleName(consoleName)
const gamesCollection = 'games'
const gamesCollectionOrderBy = 'gameRating'
const gamesCollectionOrderDirection = 'desc'
const gamesCollectionOrderLimit = 5
const gameRefSpecificData = 'gameSubgenre'

function findLaymanConsoleName(consoleName) {
    if (consoleName == 'sgGenesis') return 'Sega Genesis'
    if (consoleName == 'sg1000') return 'Sega 1000'  
    if (consoleName == 'sgMS') return 'Sega Master System'
    if (consoleName == 'sgGG') return 'Sega Game Gear'
    if (consoleName == 'sgSat') return 'Sega Saturn'
    if (consoleName == 'sg32X') return 'Sega 32X'
    if (consoleName == 'sgCD') return 'Sega Cd'
}

function sgFirebaseGamesListGame(item, detailedGameImage, passDataToNextPage) {
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
    let setupGameData = setGamesArray1
    let setupGameDataTitle = setGamesArray1Title
    let setupGameDataDescription = setGamesArray1Description
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
    const genreSpecificFunction = true
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
        genreSpecificFunction,
        titleForRelatedData,
        descriptionForRelatedData
    }
    sgFirebaseGamesCollection(passingData)
}

// Action Game Functions

// Genre Wide Function
/*--------------------------*/

/*--------------------------*/

// Educational Game Functions
// Genre Wide Function
/*--------------------------*/

/*--------------------------*/

// RPG Game Functions
// Genre Wide Function
/*--------------------------*/

/*--------------------------*/

// Simulation Game Functions
// Genre Wide Function
/*--------------------------*/

/*--------------------------*/

// Sports Game Functions
// Genre Wide Function
/*--------------------------*/

/*--------------------------*/

// Strategy Game Functions
// Genre Wide Function
/*--------------------------*/

/*--------------------------*/


export const gameData = {
    sgFirebaseGamesListGame
}

export const homeScreenGenreContext = React.createContext(gameData)