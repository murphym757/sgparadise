import React from 'react'

// Homepage Section Functions
function beatEmUpListGameSet(passingSectionData) {
    Object.assign(passingSectionData, 
        {
            titleForRelatedData: titleForRelatedData,
            descriptionForRelatedData: descriptionForRelatedData
        });
   const consoleName = 'sgGenesis'
   const laymanConsoleName = passingSectionData.findLaymanConsoleName(consoleName)
   const titleForRelatedData = `Buddy Beat 'em Ups`
   const descriptionForRelatedData = `When it comes to Beat 'em Ups, this is the cream of the crop for ${laymanConsoleName} games`
   return passingSectionData.genreSpecFunc.sgGameSet(passingSectionData, titleForRelatedData, descriptionForRelatedData)
}



export const gameData = {
    beatEmUpListGameSet
}

export const homeScreenActionContext = React.createContext(gameData)