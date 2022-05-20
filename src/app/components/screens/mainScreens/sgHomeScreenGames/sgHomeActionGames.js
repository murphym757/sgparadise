import React from 'react'

// Homepage Section Functions
function spotlightGamesGen(passingSectionData) {
   const consoleName = 'sgGenesis'
   const laymanConsoleName = passingSectionData.findLaymanConsoleName(consoleName)
   const titleForRelatedData = `Spotlight`
   const descriptionForRelatedData = `When it comes to Beat 'em Ups, this is the cream of the crop for ${laymanConsoleName} games`
   return passingSectionData.genreSpecFunc.sgGameSetSpotlight(passingSectionData, laymanConsoleName, consoleName)
}

function beatEmUpListGameSet(passingSectionData) {
   const consoleName = 'sgGenesis'
   const laymanConsoleName = passingSectionData.findLaymanConsoleName(consoleName)
   const titleForRelatedData = `Buddy Beat 'em Ups`
   const descriptionForRelatedData = `When it comes to Beat 'em Ups, this is the cream of the crop for ${laymanConsoleName} games`
   return passingSectionData.genreSpecFunc.sgGameSet(passingSectionData, titleForRelatedData, descriptionForRelatedData, consoleName)
}

function platformersListGameSet(passingSectionData) {
   const consoleName = 'sgGenesis'
   const laymanConsoleName = passingSectionData.findLaymanConsoleName(consoleName)
   const titleForRelatedData = `Satur-Plats`
   const descriptionForRelatedData = `When it comes to Platformers, this is the cream of the crop for ${laymanConsoleName} games`
   return passingSectionData.genreSpecFunc.sgGameSet(passingSectionData, titleForRelatedData, descriptionForRelatedData, consoleName)
}




export const gameData = {
   spotlightGamesGen,
    beatEmUpListGameSet,
    platformersListGameSet
}

export const homeScreenActionContext = React.createContext(gameData)