import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { ContentContainer } from "../../styles/homeStyles"

export function GameOfTheMonth(props) {
    const { 
        colors, 
        currentMonth, 
        spotlightGame, 
        spotlightGameNameLength, 
        homeScreenListings, 
        LinearGradient, 
        images 
    } = props
    function gameGroupSpotlightCollection(gameGroupCollectionGameName, gameGroupCollectionTitle) {
        return homeScreenListings.spotlightGameGroup(gameGroupCollectionGameName, gameGroupCollectionTitle, spotlightGameNameLength, LinearGradient, spotlightGame, images, colors) 
    }
    function spotlightGameCollection() {
        const sgSpotlightSectionTitle = `${currentMonth}'s Game of the Month`
        const sgSpotlightedGameName = spotlightGame.gameName
        return gameGroupSpotlightCollection(sgSpotlightedGameName, sgSpotlightSectionTitle)
    }
    return (
        <View>
            {spotlightGameCollection()}
        </View>
    )
}