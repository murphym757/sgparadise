import React from 'react'
import { MainFont, MainHeadingLongTitle, ViewTopRow } from 'index';

function mayGames(gameData1, gameData2){
    beatEmUpList(gameData1)
    platformersList(gameData2)
}

 // Determines the number of the current week and what game is going to be displayed
 function findWeekofYear(spotlightData) {
    const currentdate = new Date();
    const oneJan = new Date(currentdate.getFullYear(),0,1);
    let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    const sgSpotlights52Weeks = [
        game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12, game13, 
        game14, game15, game16, game17, game18, game19, game20, game21, game22, game23, game24, game25, 
        game26, game27, game28, game29, game30, game31, game32, game33, game34, game35, game36, game37, 
        game38, game39, game40, game41, game42, game43, game44, game45, game46, game47, game48, game49, 
        game50, game51, game52
    ]
    const currentSpotlightedGame = sgSpotlights52Weeks[result]
    const gameRefSpecificData = 'gameSlug'
    const gamesCollectionOrderLimit = 1
    const passingGameData = {
        setGamesArray: spotlightData.setSpotlightArray,
        setGamesArrayTitle: spotlightData.setSpotlightArrayTitle,
        setGamesArrayDescription: spotlightData.setSpotlightArrayTagLine,
        consoleName: currentSpotlightedGame.consoleName,
        gameRefSpecificData,
        gameRefSpecificRelatedData: currentSpotlightedGame.gameSlug,
        gamesCollectionOrderLimit
    }
        return (
            spotlightData.sgFirebaseGamesCollectionSubGenre(spotlightData.genreSpecFunc.dataCollector(passingGameData)),
            spotlightData.setSpotlightGameConsoleName(currentSpotlightedGame.consoleName)
        )
}

// Each Console gets roughly 7 games each (Subject to change based on images and info provided)
function sgSpotlight(spotlightData) {
    
}

// First Quarter
const game1 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 1,
    gameSlug: 'girls-garden'
}
const game2 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 2,
    gameSlug: 'myst'
}
const game3 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 3,
    gameSlug: 'wwf-wrestleMania-the-arcade-game'
}
const game4 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 4,
    gameSlug: 'pitfall-the-mayan-adventure'
}
const game5 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 5,
    gameSlug: 'lemmings'
}
const game6 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 6,
    gameSlug: 'make-my-video-marky-mark-and-the-funky-bunch'
}

const game7 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 7,
    gameSlug: 'nba-jam-tournament-edition'
}

const game8 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 8,
    gameSlug: 'taz-mania'
}

const game9 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 9,
    gameSlug: 'toy-story'
}

const game10 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 10,
    gameSlug: 'jungle-book'
}

const game11 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 11,
    gameSlug: 'die-hard-arcade'
}

const game12 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 12,
    gameSlug: 'brutal-unleashed-above-the-claw'
}

const game13 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 13,
    gameSlug: 'quake'
}

// Second Quarter
const game14 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 14,
    gameSlug: 'knuckles-chaotix'
}

const game15 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 15,
    gameSlug: 'sonic-the-hedgehog-2'
}

const game16 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 16,
    gameSlug: 'michael-jacksons-moonwalker'
}

const game17 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 17,
    gameSlug: 'gangster-town'
}

const game18 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 18,
    gameSlug: 'golden-axe'
}

const game19 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 19,
    gameSlug: 'ys-the-vanished-omens'
}

const game20 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 20,
    gameSlug: 'hustle-chumy'
}

const game21 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 21,
    gameSlug: 'disneys-pocahontas'
}
const game22 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 22,
    gameSlug: 'toughman-contest'
}
const game23 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 23,
    gameSlug: 'the-black-onyx'
}
const game24 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 24,
    gameSlug: 'Golvellius'
}
const game25 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 25,
    gameSlug: 'spider-man-venom-maximum-carnage'
}
const game26 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 26,
    gameSlug: 'taleSpin'
}

// Third Quarter
const game27 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 27,
    gameSlug: 'alex-kidd-in-miracle-world'
}

const game28 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 28,
    gameSlug: 'panzer-dragoon'
}

const game29 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 29,
    gameSlug: 'pitfall-the-mayan-adventure'
}

const game30 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 30,
    gameSlug: 'congo-bongo'
}

const game31 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 31,
    gameSlug: 'fantasy-zone'
}

const game32 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 32,
    gameSlug: 'resident-evil'
}

const game33 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 33,
    gameSlug: 'doom'
}

const game34 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 34,
    gameSlug: 'crime-patrol'
}

const game35 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 35,
    gameSlug: 'wonder-boy'
}

const game36 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 36,
    gameSlug: 'outrun'
}

const game37 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 37,
    gameSlug: 'final-fight-cd'
}

const game38 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 38,
    gameSlug: 'sonic-the-hedgehog-2'
}

const game39 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 39,
    gameSlug: 'road-rash'
}

// Fourth Quarter
const game40 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 40,
    gameSlug: 'ninja-princess'
}

const game41 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 41,
    gameSlug: 'dragon-wang'
}

const game42 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 42,
    gameSlug: 'cloud-master'
}

const game43 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 43,
    gameSlug: 'tiny-toon-adventures-busters-hidden-treasure'
}

const game44 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 44,
    gameSlug: 'virtua-fighter'
}

const game45 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 45,
    gameSlug: 'streets-of-rage-2'
}

const game46 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 46,
    gameSlug: 'earthworm-jim'
}

const game47 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 47,
    gameSlug: 'hoshi-wo-sagasite'
}

const game48 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 48,
    gameSlug: 'sonic-cd'
}

const game49 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 49,
    gameSlug: 'secret-of-monkey-island'
}

const game50 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 50,
    gameSlug: 'cosmic-carnage'
}

const game51 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 51,
    gameSlug: 'lion-king'
}

const game52 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 52,
    gameSlug: 'sonic-&-knuckles'
}

export const gameData = {
    findWeekofYear,
}

export const homeScreenSpotlightGamesContext = React.createContext(gameData)