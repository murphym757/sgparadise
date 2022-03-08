import React, { useState, useEffect, useContext } from 'react';
import { 
    View,
    ActivityIndicator
} from 'react-native'
// React Navigation
import { useIsFocused } from '@react-navigation/native';
import {
        confirmGameContext,
        firebase,
        PageContainer,
        SafeAreaViewContainer,
        useAuth
  } from '../../../index'
  
export default function SgSelectedGameSetGenreScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    const confirmGame = useContext(confirmGameContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState()
    const { 
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameScreenshots,
        gameSlug,
        gameSummary
    } = route.params
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [ gameArray, setGameArray ]= useState([])
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray))
    const [tagSelected, setTagsSelected] = useState(false)
    const [chosenName, setChosenName] = useState()
    const pageDescription = `What genre does ${gameName} fall under?`
    const nextPageNumber = 'Page7'
    const passingContent = {
        consoleName: consoleName,
        firebaseConsoleName: firebaseConsoleName,
        firebaseStorageConsoleName: firebaseStorageConsoleName,
        gameCover: gameCover,
        gameDevelopers: gameDevelopers,
        gameGenre: chosenName,
        gameId: gameId,
        gameName: gameName,
        gameNameBRZ: gameNameBRZ,
        gameNameEUR: gameNameEUR,
        gameNameJPN: gameNameJPN,
        gamePublishers: gamePublishers,
        gameRating: gameRating, 
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots,
        gameSlug: gameSlug,
        gameSummary: gameSummary
    }
    const navigationPass = navigation
    let tagArrayData = {
        pageDescription, 
        tagSelected, 
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
          firebaseGenreCollection()
      }, [isFocused]);  

      function firebaseGenreCollection() {
        const subscriber = sgDB
        .collection('sgAPI').doc('sgTags').collection('genreTags').orderBy('tagName', 'asc')
        .onSnapshot(querySnapshot => {
          const genreTags = []
          querySnapshot.forEach(documentSnapshot => {
              genreTags.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })
          })
          setGameArray(genreTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber();
      }

    async function chosenTagData(item) {
        setChosenTagsArray(chosenGenreTagsArray => [...chosenGenreTagsArray, item])
    }

    async function removeChosenTagData(item) {
        setTagsSelected(false)
        setChosenTagsArray(tagsNewArray.filter(tag => tag !== item))
    }

    function confirmTagSelection(item){
        setTagsSelected(true),
        chosenTagData(item),
        setChosenName(String(item.tagName))
    }

    return (
        <PageContainer>
            <SafeAreaViewContainer>
                {isLoading == undefined
                    ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    : <View>
                        {confirmGame.gameResults(tagArrayData, buttonGroupData)}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}