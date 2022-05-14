import React from 'react'
import { MainFont, MainHeadingLongTitle, ViewTopRow } from 'index';

function mayGames(gameData1, gameData2){
    beatEmUpList(gameData1)
    platformersList(gameData2)
}

 // Determines the number of the current week and what game is going to be displayed
 function findWeekofYear(setSpotlightGameName) {
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
    return setSpotlightGameName(currentSpotlightedGame.gameName)
}

// Each Console gets roughly 7 games each (Subject to change based on images and info provided)

// First Quarter
const game1 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 1,
    gameName: 'girls-garden'
}
const game2 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 2,
    gameName: 'myst'
}
const game3 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 3,
    gameName: 'wwf-wrestleMania-the-arcade-game'
}
const game4 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 4,
    gameName: 'pitfall-the-mayan-adventure'
}
const game5 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 5,
    gameName: 'lemmings'
}
const game6 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 6,
    gameName: 'make-my-video-marky-mark-and-the-funky-bunch'
}

const game7 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 7,
    gameName: 'nba-jam-tournament-edition'
}

const game8 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 8,
    gameName: 'taz-mania'
}

const game9 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 9,
    gameName: 'toy-story'
}

const game10 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 10,
    gameName: 'jungle-book'
}

const game11 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 11,
    gameName: 'die-hard-arcade'
}

const game12 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 12,
    gameName: 'brutal-unleashed-above-the-claw'
}

const game13 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 13,
    gameName: 'quake'
}

// Second Quarter
const game14 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 14,
    gameName: 'knuckles-chaotix'
}

const game15 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 15,
    gameName: 'sonic-the-hedgehog-2'
}

const game16 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 16,
    gameName: 'michael-jacksons-moonwalker'
}

const game17 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 17,
    gameName: 'gangster-town'
}

const game18 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 18,
    gameName: 'golden-axe'
}

const game19 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 19,
    gameName: 'ys-the-vanished-omens'
}

const game20 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 20,
    gameName: 'hustle-chumy'
}

const game21 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 21,
    gameName: 'disneys-pocahontas'
}
const game22 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 22,
    gameName: 'toughman-contest'
}
const game23 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 23,
    gameName: 'black-onyx'
}
const game24 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 24,
    gameName: 'Golvellius'
}
const game25 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 25,
    gameName: 'spider-man-venom-maximum-carnage'
}
const game26 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 26,
    gameName: 'taleSpin'
}

// Third Quarter
const game27 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 27,
    gameName: 'alex-kidd-in-miracle-world'
}

const game28 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 28,
    gameName: 'panzer-dragoon'
}

const game29 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 29,
    gameName: 'pitfall-the-mayan-adventure'
}

const game30 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 30,
    gameName: 'congo-bongo'
}

const game31 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 31,
    gameName: 'fantasy-zone'
}

const game32 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 32,
    gameName: 'resident-evil'
}

const game33 = {
    consoleName: 'sgSat',
    gameOfSpotlight: 33,
    gameName: 'doom'
}

const game34 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 34,
    gameName: 'crime-patrol'
}

const game35 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 35,
    gameName: 'wonder-boy'
}

const game36 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 36,
    gameName: 'outrun'
}

const game37 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 37,
    gameName: 'final-fight-cd'
}

const game38 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 38,
    gameName: 'sonic-the-hedgehog-2'
}

const game39 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 39,
    gameName: 'road-rash'
}

// Fourth Quarter
const game40 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 40,
    gameName: 'ninja-princess'
}

const game41 = {
    consoleName: 'sg1000',
    gameOfSpotlight: 41,
    gameName: 'dragon-wang'
}

const game42 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 42,
    gameName: 'cloud-master'
}

const game43 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 43,
    gameName: 'tiny-toon-adventures-busters-hidden-treasure'
}

const game44 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 44,
    gameName: 'virtua-fighter'
}

const game45 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 45,
    gameName: 'streets-of-rage-2'
}

const game46 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 46,
    gameName: 'earthworm-jim'
}

const game47 = {
    consoleName: 'sgMS',
    gameOfSpotlight: 47,
    gameName: 'hoshi-wo-sagasite'
}

const game48 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 48,
    gameName: 'sonic-cd'
}

const game49 = {
    consoleName: 'sgCD',
    gameOfSpotlight: 49,
    gameName: 'secret-of-monkey-island'
}

const game50 = {
    consoleName: 'sg32X',
    gameOfSpotlight: 50,
    gameName: 'cosmic-carnage'
}

const game51 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 51,
    gameName: 'lion-king'
}

const game52 = {
    consoleName: 'sgGenesis',
    gameOfSpotlight: 52,
    gameName: 'sonic-&-knuckles'
}

export const gameData = {
    findWeekofYear,
}

export const homeScreenSpotlightGamesContext = React.createContext(gameData)