import React from 'react'
import { MainFont, MainHeadingLongTitle, ViewTopRow } from 'index';

function mayGames(gameData1, gameData2){
    beatEmUpList(gameData1)
    platformersList(gameData2)
}

function beatEmUpList(gameData1) {
    const consoleName = 'sgGenesis'
    const gameRefSpecificRelatedData = 'Beat ‘em Up'
    const passingGameData = {
        setgamesArray: gameData1.setgamesArray,
        setgamesArrayTitle: gameData1.setgamesArrayTitle,
        setgamesArrayDescription: gameData1.setgamesArrayDescription,
        consoleName,
        gameRefSpecificRelatedData
    }
        return (
            gameData1.sgFirebaseGamesCollectionSubGenre(gameData1.genreSpecFunc.dataCollector(passingGameData))
        )
}

function platformersList(gameData2) {
    const consoleName = 'sgGenesis'
    const gameRefSpecificRelatedData = 'Platformer'
    const passingGameData = {
        setgamesArray: gameData2.setgamesArray2,
        setgamesArrayTitle: gameData2.setgamesArrayTitle2,
        setgamesArrayDescription: gameData2.setgamesArrayDescription2,
        consoleName,
        gameRefSpecificRelatedData
    }
        return (
            gameData2.sgFirebaseGamesCollectionSubGenre(gameData2.genreSpecFunc.dataCollector(passingGameData))
        )
}

export const gameData = {
    mayGames
}

export const homeScreenDatesContext = React.createContext(gameData)