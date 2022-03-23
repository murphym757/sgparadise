import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
// React Navigation
import { useIsFocused } from '@react-navigation/native'
import { confirmGameContext, firebase, PageContainer, SafeAreaViewContainer, useAuth } from 'index'

export default function SgSelectedGameSetSubGenreScreen({route, navigation}) {
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
        gameGenre,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        gameSlug,
        gameSummary
    } = route.params
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [ gameArray, setGameArray ]= useState([])
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray))
    const [tagSelected, setTagsSelected] = useState(false)
    const [chosenName, setChosenName] = useState()
    const pageDescription = `What subgenre is ideal for ${gameName}?`
    const nextPageNumber = 'Page8'
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
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameSlug,
        gameSubGenre: chosenName,
        gameSummary
    }
    console.log("🚀 ~ file: sgSelectedGameSetSubGenreScreen.js ~ line 46 ~ SgSelectedGameSetSubGenreScreen ~ passingContent", passingContent)
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
          firebaseSubGenreCollection()
      }, [isFocused])  

      function firebaseSubGenreCollection() {
        const subscriber = sgDB
        .collection('sgAPI').doc('sgTags').collection('genreTags').doc(gameGenre).collection('genreSpecificTags').orderBy('tagName', 'asc')
        .onSnapshot(querySnapshot => {
          const subGenreTags = []
          querySnapshot.forEach(documentSnapshot => {
            subGenreTags.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })
          })
          setGameArray(subGenreTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber()
      }

    async function chosenTagData(item) {
        setChosenTagsArray(chosenSubGenreTagsArray => [...chosenSubGenreTagsArray, item])
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