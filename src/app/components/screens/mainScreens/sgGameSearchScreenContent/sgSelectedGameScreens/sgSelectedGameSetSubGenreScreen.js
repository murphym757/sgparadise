import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
// React Navigation
import { useIsFocused } from '@react-navigation/native';
import { confirmGameContext, CurrentThemeContext, firebase, PageContainer, SafeAreaViewContainer, useAuth, windowHeight } from '../../../index';

export default function SgSelectedGameSetSubGenreScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    const colors = useContext(CurrentThemeContext)
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
        gameReleaseDate,
        gameStoryline,
        gameSummary,
        gameScreenshots
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
        involvesCompanies: involvesCompanies,
        gameRating: gameRating, 
        gameCover: gameCover,
        gameId: gameId,
        gameName: gameName,
        gameSlug: gameSlug,
        gameGenre: gameGenre,
        gameSubGenre: chosenName,
        gameReleaseDate: gameReleaseDate,
        gameStoryline: gameStoryline,
        gameSummary: gameSummary,
        gameScreenshots: gameScreenshots
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
          firebaseSubGenreCollection()
      }, [isFocused]);  

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
      return () => subscriber();
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