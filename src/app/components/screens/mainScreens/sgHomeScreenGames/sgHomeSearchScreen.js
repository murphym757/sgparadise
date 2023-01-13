import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { CurrentThemeContext, MainFontPills, MainHeading } from 'index'
import Accordion from 'react-native-collapsible/Accordion';


// Goes on separate page dedicated to home screen search functionality
const actionTagsArray = {
    numColumns: 3,
    genreName: 'Action',
    subGenreNames: [
        `Beat ‘em Up`,
        `Fighting`,
        `Platformer`,
        `Shooter`,
    ]
}
const educationalTagsArray = {
    numColumns: 3,
    genreName: 'Educational',
    subGenreNames: [
        `Art`,
        `Child Friendly`,
        `Religious`,
        `Trivia`
    ]
}
const rpgTagsArray = {
    numColumns: 1,
    genreName: 'RPG',
    subGenreNames: [
        `JRPG`,
        `Open World`,
        `Tactical`
    ]
}
const simulationTagsArray = {
    numColumns: 4,
    genreName: 'Simulation',
    subGenreNames: [
        `Boating`,
        `City Builder`,
        `Construction-Management`,
        `Flight`,
        `Life`,
        `Racing`,
        `Trains`,
        `Vehicular Combat`
    ]
}
const sportsTagsArray = {
    numColumns: 5,
    genreName: 'Sports',
    subGenreNames: [
        `Baseball`,
        `Basketball`,
        `Boxing`,
        `Cricket`,
        `Football`,
        `Handball`,
        `Karate`,
        `Olympics`,
        `Pool-Billiards`,
        `Racing`,
        `Rugby`,
        `Soccer`,
        `Tennis`,
        `Wrestling`
    ]
}
const strategyTagsArray = {
    numColumns: 2,
    genreName: 'Strategy',
    subGenreNames:  [
        `Board Game`,
        `Gambling`,
        `Puzzle`,
        `Tower Defense`,
        `Turn Based`
    ]
}
function searchGenre(passedTagArray) {
    const colors = useContext(CurrentThemeContext)
    const tagsArray = passedTagArray
    return (
        <View style={{paddingVertical: 25}}>
                <MainHeading>{tagsArray.genreName}</MainHeading>
                <FlatList
                    horizontal={false}
                    scrollEnabled={false}
                    data={tagsArray.subGenreNames}
                    numColumns={Math.ceil(tagsArray.subGenreNames.length / passedTagArray.numColumns)}
                    ItemSeparatorComponent={() => <View style={{ width: 100 }} />}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems:'center',
                            justifyContent:'center',
                            paddingHorizontal: 2,
                            paddingVertical: 4
                        }}>
                            <TouchableOpacity 
                                style={{ 
                                    flexShrink:1,
                                    width: item.length * 18, 
                                    margin: 1,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderColor:'rgba(0,0,0,0.2)',
                                    backgroundColor: colors.secondaryColor,
                                    height: 40, 
                                    padding: 1,
                                    marginTop: 3
                                }} 
                            onPress={() => chosenTagData(item)}>
                                <View style={{
                                    margin: 10,
                                    flexDirection: "row", justifyContent: "center"
                                }}>
                                    <MainFontPills style={{paddingHorizontal: 5}}>{item}</MainFontPills>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
        </View>
        
    )
}

function searchLanding(consolesSection) {
    return (
        <View style={{paddingBottom: 175}}>
            {consolesSection()}
            {searchGenre(actionTagsArray)}
            {searchGenre(educationalTagsArray)}
            {searchGenre(rpgTagsArray)}
            {searchGenre(simulationTagsArray)}
            {searchGenre(sportsTagsArray)}
            {searchGenre(strategyTagsArray)}
        </View>
    )
}

function searchTagsCollection(consolesSection, searchActive) {
    return (
        <View style={{paddingBottom: 175}}>
            {searchActive == false
                ?   <View>
                </View>
                :   <View>
                        <MainHeading>No errors :)</MainHeading>
                </View>
            }
        </View>
    )
}

export const firebaseSearch = {
    searchTagsCollection,
}

export const firebaseSearchContext = React.createContext(firebaseSearch)
/*-----*/