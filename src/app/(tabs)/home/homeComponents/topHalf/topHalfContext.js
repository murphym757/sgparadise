import React from "react"
import { View } from "react-native"

//* Console Buttons
import { ConsoleButtonList } from './consoleButtonList'

//* Game of the Month
import { GameOfTheMonth } from './gameOfTheMonth'


function gamePageLinkGameOfTheMonth(topHalfHomeScreenContent, pageLink) {
    function gameOfTheMonthSection() {
        return (
            <GameOfTheMonth 
                colors={topHalfHomeScreenContent.colors}
                currentMonth={topHalfHomeScreenContent.currentMonth} 
                spotlightGame={topHalfHomeScreenContent.spotlightGame}
                spotlightGameNameLength={topHalfHomeScreenContent.spotlightGameNameLength}
                homeScreenListings={topHalfHomeScreenContent.homeScreenListings}
                LinearGradient={topHalfHomeScreenContent.LinearGradient}
                images={topHalfHomeScreenContent.images}
            />
        )
    }        
    const linkContent = gameOfTheMonthSection()
    const gameData = {
        gameSlug: topHalfHomeScreenContent.spotlightGame.gameSlug,
        gameName: topHalfHomeScreenContent.spotlightGame.gameName,
        gameReleaseDate: topHalfHomeScreenContent.spotlightGame.gameReleaseDate,
        gameRating: topHalfHomeScreenContent.spotlightGame.gameRating
    }
    const linkedData = {
        currentPageTitle: topHalfHomeScreenContent.currentPageTitle,
        nextPagePath: topHalfHomeScreenContent.nextPagePath,
        linkContent,
        gameData
    }
    return (
        <View>
            {pageLink(linkedData)}
            <ConsoleButtonList 
                colors={topHalfHomeScreenContent.colors} 
                imagesConfig={topHalfHomeScreenContent.imagesConfig} 
                activeButton={topHalfHomeScreenContent.activeButton} 
                setActiveButton={topHalfHomeScreenContent.setActiveButton}
            />
        </View>
    )
}

export const topHalfHomeScreenData = {
    gamePageLinkGameOfTheMonth,
}

export const topHalfHomeScreenContext = React.createContext(topHalfHomeScreenData)