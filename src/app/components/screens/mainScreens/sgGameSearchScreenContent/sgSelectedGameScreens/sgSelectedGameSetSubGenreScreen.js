import React, { useState, useEffect, useContext } from 'react';
import { 
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
  import{
    windowHeight,
    MainFont,
    MainSubFont,
    MainHeading,
    MainHeadingButton,
    ScrollViewContainer
} from '../../../../../../../assets/styles/globalStyling'
import {CurrentThemeContext} from '../../../../../../../assets/styles/globalTheme'
// React Navigation
import { useIsFocused } from '@react-navigation/native';
import {
        SafeAreaViewContainer,
        Container,
        TouchableButton,
        TouchableButtonFont,
        TouchableButtonAlt,
        TouchableButtonFontAlt,
        CustomInputField,
        FontAwesomeIcon, faTimes
  } from '../../../index'
import { useTags } from '../../../authScreens/tagsContext'
import { firebase, gamesConfig } from '../../../../../../server/config/config'
import { useAuth } from '../../../authScreens/authContext'
  

    

export default function SgSelectedGameSetSubGenreScreen({route, navigation}) {
    const {
        unixTimestampConverter,
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    const {
        tagCollection,
        selectedTags
    } = useTags()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState()
    const { 
        involvesCompanies,
        gameRating, 
        gameCover,
        gameId,
        gameName,
        gameGenre,
        gameReleaseDate,
        gameStoryline,
        gameSummary,
        gameScreenshots
    } = route.params
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [ gameSubGenreArray, setGameSubGenreArray ]= useState([])
    const [ chosenSubGenreTagsArray, setChosenSubGenreTagsArray ] = useState([])
    const tagsNewSubGenreArray = Array.from(new Set(chosenSubGenreTagsArray))
    const [ subGenreTagsSelected, setSubGenreTagsSelected ] = useState(false)
    const [ chosenSubGenreName, setChosenSubGenreName ] = useState()

    function buttonGroup() {
        const pageNumber = 'Page8'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: gameId,
            gameName: gameName,
            gameGenre: gameGenre,
            gameSubGenre: chosenSubGenreName,
            gameReleaseDate: gameReleaseDate,
            gameStoryline: gameStoryline,
            gameSummary: gameSummary,
            gameScreenshots: gameScreenshots
        }
        const navigationPass = navigation
        return (
            <View>
                <TouchableButton onPress={() => forwardToNextPage(pageNumber, passingContent, navigationPass)}>
                    <TouchableButtonFont>Next Page</TouchableButtonFont>
                </TouchableButton>
                <TouchableButtonAlt style={{}} onPress={() => backToPreviousPage(navigationPass)}>
                    <TouchableButtonFontAlt>Previous Page</TouchableButtonFontAlt>
                </TouchableButtonAlt>
            </View>
        )
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
          setGameSubGenreArray(subGenreTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber();
      }

    async function chosenSubGenreTagData(item) {
        setChosenSubGenreTagsArray(chosenSubGenreTagsArray => [...chosenSubGenreTagsArray, item])
    }

    async function removeChosenSubGenreTagData(item) {
        setSubGenreTagsSelected(false)
        setChosenSubGenreTagsArray(tagsNewSubGenreArray.filter(tag => tag !== item))
    }

    function confirmTagSelection(item){
        setSubGenreTagsSelected(true),
        chosenSubGenreTagData(item),
        setChosenSubGenreName(String(item.tagName))
    }

      function gameGenreResults() { 
        return (
            <Container>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MainFont>What subgenre is ideal for {gameName}?</MainFont>
                {subGenreTagsSelected == false 
                    ?   <View></View>  
                    :   selectedTags(chosenSubGenreTagsArray, tagsNewSubGenreArray, removeChosenSubGenreTagData)
                }
            </View>
            <View>
                {subGenreTagsSelected == false 
                    ?   tagCollection(gameSubGenreArray, confirmTagSelection)
                    :   <View></View>
                }
            </View>
            <View>
                {subGenreTagsSelected == false 
                    ?   <View></View>
                    :   buttonGroup()
                }
            </View>
            </Container>
          ) 
    }

    return (
        <View style={{ flex: 1, paddingTop: windowHeight/20, paddingBottom: windowHeight/20, backgroundColor: colors.primaryColor }}>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {gameGenreResults()}
                </View>
            }
            </SafeAreaViewContainer>
        </View>
    )
}