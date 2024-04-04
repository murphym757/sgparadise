import React from "react"
import { View } from "react-native"

//* Game Collections
import { GameCollections } from './gameCollections'

function gamePageGameCollectionSection(bottomHalfHomeScreenContent, genreGroup) {
    function gameGroupCollection(gameGroupCollectionTitle, gameGroupCollectionDescription, homeScreenGameArray, spotlightGrid) {
        const sectionTitle = gameGroupCollectionTitle
        const sectionDescription = gameGroupCollectionDescription
        return bottomHalfHomeScreenContent.gameListings(sectionTitle, sectionDescription, homeScreenGameArray, bottomHalfHomeScreenContent.images, spotlightGrid, bottomHalfHomeScreenContent.colors)
    }
    //* Top Rated Games Section
    function topRatedSection() {
        const sgCollectionTitle = 'Top Rated Games'
        const sgCollectionDescription = 'Check out the top rated games on the sgParadise!'
        return gameGroupCollection(sgCollectionTitle, sgCollectionDescription, bottomHalfHomeScreenContent.homeScreenGameArray1, true)
    }

    //* Newly Added Games Section
    function newlyAddedSection() {
        const sgCollectionTitle = 'Newly Added Games'
        const sgCollectionDescription = 'Check out the latest games added to the sgParadise!'
        return gameGroupCollection(sgCollectionTitle, sgCollectionDescription, bottomHalfHomeScreenContent.homeScreenGameArray5, false)
    }

    //* Genre Specific Games Section 1
    function genreSpecificGameGroup(passedProp, passedPropIndex, homeScreenGameArray) {
        const genreSpecificSectionTitle = bottomHalfHomeScreenContent.sectionPassedData(passedProp, passedPropIndex)[1]
        const genreSpecificSectionDescription = bottomHalfHomeScreenContent.sectionPassedData(passedProp, passedPropIndex)[2]
        return gameGroupCollection(genreSpecificSectionTitle, genreSpecificSectionDescription, homeScreenGameArray, false)
    }

    //* Genre Specific Games Section 2
    function genreSpecificSection1() {
        return genreSpecificGameGroup(
            genreGroup[0].genreName, 
            genreGroup[0].genreProvidedIndex, 
            bottomHalfHomeScreenContent.homeScreenGameArray2
        )
    }
    function genreSpecificSection2() {
        return genreSpecificGameGroup(
            genreGroup[1].genreName, 
            genreGroup[1].genreProvidedIndex, 
            bottomHalfHomeScreenContent.homeScreenGameArray3
        )
    }

    //* Genre Specific Games Section 3
    function genreSpecificSection3() {
        return genreSpecificGameGroup(
            genreGroup[2].genreName, 
            genreGroup[2].genreProvidedIndex, 
            bottomHalfHomeScreenContent.homeScreenGameArray4
        )
    }        
    return (
        <View>
            {topRatedSection()}
            {newlyAddedSection()}
            {genreSpecificSection1()}
            {genreSpecificSection2()}
            {genreSpecificSection3()}
        </View>
    )
}

export const bottomHalfHomeScreenData = {
    gamePageGameCollectionSection,
}

export const bottomHalfHomeScreenContext = React.createContext(bottomHalfHomeScreenData)