import React from 'react'
import { MainFont, MainHeadingLongTitle, ViewTopRow } from 'index';

function mayGames(spotlightData, gameData1, gameData2){
    spotlightMay(spotlightData)
    beatEmUpList(gameData1)
    platformersList(gameData2)
}

function spotlightMay(spotlightData) {
    const consoleName = 'sgGenesis'
    const gameRefSpecificData = 'gameName'
    const gameRefSpecificRelatedData = 'Streets of Rage'
    const gamesCollectionOrderLimit = 1
    const passingGameData = {
        setgamesArray: spotlightData.setSpotlightArray,
        setgamesArrayTitle: spotlightData.setSpotlightArrayTitle,
        setgamesArrayDescription: spotlightData.setSpotlightArrayTagLine,
        consoleName,
        gameRefSpecificData,
        gameRefSpecificRelatedData,
        gamesCollectionOrderLimit
    }
        return (
            spotlightData.sgFirebaseGamesCollectionSubGenre(spotlightData.genreSpecFunc.dataCollector(passingGameData))
        )
}

function beatEmUpList(gameData1) {
    const consoleName = 'sgGenesis'
    const gameRefSpecificData = 'gameSubgenre'
    const gameRefSpecificRelatedData = 'Beat ‘em Up'
    const gamesCollectionOrderLimit = 5
    const passingGameData = {
        setgamesArray: gameData1.setgamesArray,
        setgamesArrayTitle: gameData1.setgamesArrayTitle,
        setgamesArrayDescription: gameData1.setgamesArrayDescription,
        consoleName,
        gameRefSpecificData,
        gameRefSpecificRelatedData,
        gamesCollectionOrderLimit
    }
        return (
            gameData1.sgFirebaseGamesCollectionSubGenre(gameData1.genreSpecFunc.dataCollector(passingGameData))
        )
}

function platformersList(gameData2) {
    const consoleName = 'sgGenesis'
    const gameRefSpecificData = 'gameSubgenre'
    const gameRefSpecificRelatedData = 'Platformer'
    const gamesCollectionOrderLimit = 5
    const passingGameData = {
        setgamesArray: gameData2.setgamesArray2,
        setgamesArrayTitle: gameData2.setgamesArrayTitle2,
        setgamesArrayDescription: gameData2.setgamesArrayDescription2,
        consoleName,
        gameRefSpecificData,
        gameRefSpecificRelatedData,
        gamesCollectionOrderLimit
    }
        return (
            gameData2.sgFirebaseGamesCollectionSubGenre(gameData2.genreSpecFunc.dataCollector(passingGameData))
        )
}

export const gameData = {
    mayGames
}

export const homeScreenDatesContext = React.createContext(gameData)