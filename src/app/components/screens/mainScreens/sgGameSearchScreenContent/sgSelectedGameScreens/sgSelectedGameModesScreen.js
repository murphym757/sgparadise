import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useAuth } from 'auth/authContext'
import { confirmGameContext } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameContext'
// React Navigation
import { useIsFocused } from '@react-navigation/native'
import { firebase, PageContainer, SafeAreaViewContainer } from 'index'

export default function SgSelectedGameSetGameModesScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState()
    const { 
        consoleName,
        firebaseConsoleName,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameGenre,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameImageCount,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameSlug,
        gameSubgenre,
        gameSummary,
        sortedGameName
    } = route.params
    const isFocused = useIsFocused()
    const [ gameArray, setGameArray ]= useState([])
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray))
    const [modeTagsSelected, setModeTagsSelected] = useState(false)
    const pageDescription = `Finally, what some of the gaming mechanics present in ${gameName}?`
    const nextPageNumber = 'Page9'
    const passingContent = {
        consoleName,
        firebaseConsoleName,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameGenre,
        gameId,
        gameModes: chosenTagsArray,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameImageCount,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameSlug,
        gameSubgenre,
        gameSummary,
        sortedGameName
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
      }, [isFocused])  

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
      return () => subscriber()
      }

    async function chosenTagData(item) {
        setChosenTagsArray(chosenGameModesTagsArray => [...chosenGameModesTagsArray, item])
    }

    async function removeChosenTagData(item) {
        if (chosenTagsArray == null) {
            setModeTagsSelected(false)
        } else {
            setModeTagsSelected(true)
        }
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