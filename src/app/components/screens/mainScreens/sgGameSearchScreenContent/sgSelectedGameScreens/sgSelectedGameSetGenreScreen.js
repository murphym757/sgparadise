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
  

    

export default function SgSelectedGameSetGenreScreen({route, navigation}) {
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
        gameReleaseDate,
        gameStoryline,
        gameSummary,
        gameScreenshots
    } = route.params
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [ gameGenreArray, setGameGenreArray ]= useState([])
    const [chosenGenreTagsArray, setChosenGenreTagsArray] = useState([])
    const tagsNewGenreArray = Array.from(new Set(chosenGenreTagsArray))
    const [genreTagsSelected, setGenreTagsSelected] = useState(false)
    const [chosenGenreName, setChosenGenreName] = useState()

    function buttonGroup() {
        const pageNumber = 'Page7'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: gameId,
            gameName: gameName,
            gameGenre: chosenGenreName,
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
          setGameGenreArray(genreTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber();
      }

    async function chosenGenreTagData(item) {
        setChosenGenreTagsArray(chosenGenreTagsArray => [...chosenGenreTagsArray, item])
    }

    async function removeChosenGenreTagData(item) {
        setGenreTagsSelected(false)
        setChosenGenreTagsArray(tagsNewGenreArray.filter(tag => tag !== item))
    }

    function confirmTagSelection(item){
        setGenreTagsSelected(true),
        chosenGenreTagData(item),
        setChosenGenreName(String(item.tagName))
    }

        function gameGenreResults() { 
            return (
                <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainFont>What genre does {gameName} fall under?</MainFont>
                    {genreTagsSelected == false 
                        ?   <View></View>  
                        :   selectedTags(chosenGenreTagsArray, tagsNewGenreArray, removeChosenGenreTagData)
                    }
                </View>
                <View>
                    {genreTagsSelected == false 
                        ?   tagCollection(gameGenreArray, confirmTagSelection)
                        :   <View></View>
                    }
                </View>
                <View>
                    {genreTagsSelected == false 
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