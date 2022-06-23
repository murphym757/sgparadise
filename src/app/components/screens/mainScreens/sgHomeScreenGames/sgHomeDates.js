import React from 'react'
import { MainFont, MainHeadingLongTitle, ViewTopRow } from 'index';

function mayGames(consoleData, gameData1, gameData2, gameData3){
    consoleList(consoleData)
    beatEmUpList(gameData1)
    platformersList(gameData2)
    actionList(gameData3)
}

function consoleList(consoleData) {
    const passingGameData = {
        setGamesArray: consoleData.setConsoleArray,
        setGamesArrayTitle: consoleData.setConsoleArrayTitle
    }
        return (
            consoleData.sgFirebaseConsolesCollection(consoleData.genreSpecFunc.dataCollectorConsole(passingGameData))
        )
}

function beatEmUpList(gameData1) {
    const consoleName = 'sgGenesis'
    const gameRefSpecificData = 'gameSubgenre'
    const gameRefSpecificRelatedData = 'Beat ‘em Up'
    const gamesCollectionOrderLimit = 5
    const passingGameData = {
        setGamesArray: gameData1.setGamesArray,
        setGamesArrayTitle: gameData1.setGamesArrayTitle,
        setGamesArrayDescription: gameData1.setGamesArrayDescription,
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
        setGamesArray: gameData2.setGamesArray2,
        setGamesArrayTitle: gameData2.setGamesArrayTitle2,
        setGamesArrayDescription: gameData2.setgamesArrayDescription2,
        consoleName,
        gameRefSpecificData,
        gameRefSpecificRelatedData,
        gamesCollectionOrderLimit
    }
        return (
            gameData2.sgFirebaseGamesCollectionSubGenre(gameData2.genreSpecFunc.dataCollector(passingGameData))
        )
}


function actionList(gameData3) {
    const genreName = 'Action'
    const passingGameData = {
        setGenreArray: gameData3.setGenreArray,
        setGenreArrayTitle: gameData3.setGenreArrayTitle,
        genreName
    }
        return (
            gameData3.sgFirebaseGenreCollection(gameData3.genreSpecFunc.dataActionGenreCollector(passingGameData))
        )
 }
 

export const gameData = {
    mayGames
}

export const homeScreenDatesContext = React.createContext(gameData)