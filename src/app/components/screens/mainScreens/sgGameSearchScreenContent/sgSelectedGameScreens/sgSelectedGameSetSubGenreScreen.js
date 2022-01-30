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
        selectedParentTag,
        selectedTags,
        tagsSelection,
        chosenTagsArray,
        parentGenreSelected,
        childGenreSelected,
        chosenGenre,
        childTagCollection,
        parentTagCollection
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
    const [sgSubGenreIcons, setSgSubGenreIcons] = useState([])
    const [ gameSubGenre, setGameSubGenre ]= useState([])
    console.log("🚀 ~ file: sgSelectedGameSetSubGenreScreen.js ~ line 69 ~ SgSelectedGameSetSubGenreScreen ~ gameSubGenre", gameSubGenre)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read

    function buttonGroup() {
        const pageNumber = 'Page8'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: gameId,
            gameName: gameName,
            gameGenre: gameGenre,
            gameSubGenre: gameSubGenre,
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
        .collection('sgAPI').doc('sgTags').collection('genreTags').doc(chosenGenre).collection('genreSpecificTags').orderBy('tagName', 'asc')
        .onSnapshot(querySnapshot => {
          const subGenreTags = []
          querySnapshot.forEach(documentSnapshot => {
            subGenreTags.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })
          })
          setGameSubGenre(subGenreTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber();
      }

      function gameGenreResults() { 
        return (
            <Container>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MainFont>What subgenre is ideal for {gameName}?</MainFont>
                {childGenreSelected == false 
                    ?   <View></View>  
                    :   selectedTags()
                }
            </View>
            <View>
                {childGenreSelected == false 
                    ?   childTagCollection(gameSubGenre)
                    :   <View></View>
                }
            </View>
            <View>
                {childGenreSelected == false 
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