import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { confirmGameContext } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameContext'
import { firebase, PageContainer, SafeAreaViewContainer } from 'index'
import { useAuth } from 'auth/authContext'
// React Navigation
import { useIsFocused } from '@react-navigation/native'

export default function sgSelectedGameSetSubgenreScreen({route, navigation}) {
    const [ chosenName, setChosenName ] = useState()
    const [ chosenTagsArray, setChosenTagsArray ] = useState([])
    const [ gameArray, setGameArray ] = useState([])
    const [ isLoading, setIsLoading ] = useState()
    const [ tagSelected, setTagsSelected ] = useState(false)
    const { backToPreviousPage, forwardToNextPage } = useAuth()
    const confirmGame = useContext(confirmGameContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const nextPageNumber = 'Page8'
    const pageDescription = `What subgenre is ideal for ${gameName}?`
    const sgDB = firebase.firestore()
    const tagsNewArray = Array.from(new Set(chosenTagsArray))
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
        gameSummary,
        sortedGameName
    } = route.params
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
        gameNameImageCount,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating,
        gameReleaseDate,
        gameSlug,
        gameSubgenre: chosenName,
        gameSummary,
        sortedGameName
    }
    const navigationPass = navigation
    let tagArrayData = {
        chosenTagsArray,
        confirmTagSelection,
        gameArray,
        pageDescription,
        removeChosenTagData,
        tagSelected,
        tagsNewArray,
    }
    const buttonGroupData = { backToPreviousPage, forwardToNextPage, navigationPass, nextPageNumber, passingContent }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
            firebaseSubgenreCollection()
    }, [isFocused])

    function firebaseSubgenreCollection() {
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
        setChosenTagsArray(chosenSubgenreTagsArray => [...chosenSubgenreTagsArray, item])
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