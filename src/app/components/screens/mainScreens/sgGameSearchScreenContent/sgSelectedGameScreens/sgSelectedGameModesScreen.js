import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
// React Navigation
import { useIsFocused } from '@react-navigation/native'
import { confirmGameContext, firebase, PageContainer, SafeAreaViewContainer, useAuth } from '../../../index'

export default function SgSelectedGameSetGameModesScreen({route, navigation}) {
    const {
        unixTimestampConverter,
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState()
    const { 
        involvesCompanies,
        gameRating, 
        gameCover,
        gameId,
        gameName,
        gameSlug,
        gameGenre,
        gameSubGenre,
        gameReleaseDate,
        gameStoryline,
        gameSummary,
        gameScreenshots
    } = route.params
    const isFocused = useIsFocused()
    const [ gameArray, setGameArray ]= useState([])
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray))
    const [modeTagsSelected, setModeTagsSelected] = useState(false)
    const pageDescription = `Finally, what some of the gaming mechanics present in ${gameName}?`
    const nextPageNumber = 'Page9'
    const passingContent = {
        involvesCompanies: involvesCompanies,
        gameRating: gameRating, 
        gameCover: gameCover,
        gameId: gameId,
        gameName: gameName,
        gameSlug: gameSlug,
        gameGenre: gameGenre,
        gameSubGenre: gameSubGenre,
        gameReleaseDate: gameReleaseDate,
        gameModes: chosenTagsArray,
        gameStoryline: gameStoryline,
        gameSummary: gameSummary,
        gameScreenshots: gameScreenshots
    }
    const navigationPass = navigation
    let tagArrayData = {
        pageDescription, 
        modeTagsSelected, 
        chosenTagsArray,
        tagsNewArray, 
        removeChosenTagData, 
        gameArray, 
        confirmTagSelection, 
    }
    const buttonGroupData = {
        forwardToNextPage, 
        backToPreviousPage, 
        nextPageNumber, 
        passingContent, 
        navigationPass
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
          firebaseGameModeCollection()
      }, [isFocused]);  

      function firebaseGameModeCollection() {
        const subscriber = sgDB
        .collection('sgAPI').doc('sgTags').collection('gameModeTags').orderBy('tagName', 'asc')
        .onSnapshot(querySnapshot => {
          const gameModeTags = []
          querySnapshot.forEach(documentSnapshot => {
            gameModeTags.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })
          })
          setGameArray(gameModeTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber();
      }

    async function chosenTagData(item) {
        setChosenTagsArray(chosenGameModesTagsArray => [...chosenGameModesTagsArray, item])
    }

    async function removeChosenTagData(item) {
        setModeTagsSelected(false)
        setChosenTagsArray(tagsNewArray.filter(tag => tag !== item))
    }

    function confirmTagSelection(item){
        setModeTagsSelected(true),
        chosenTagData(item)
    }

    return (
        <PageContainer>
            <SafeAreaViewContainer>
                {isLoading == undefined
                    ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    : <View>
                        {confirmGame.gameModesResults(tagArrayData, buttonGroupData)}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}