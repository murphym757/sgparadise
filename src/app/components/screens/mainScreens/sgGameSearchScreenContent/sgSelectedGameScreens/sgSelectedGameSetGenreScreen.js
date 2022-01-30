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
        selectedParentTag,
        tagsSelection,
        chosenTagsArray,
        parentGenreSelected,
        chosenGenre,
        parentTagCollection
    } = useTags()
        console.log("🚀 ~ file: sgSelectedGameSetGenreScreen.js ~ line 52 ~ SgSelectedGameSetGenreScreen ~ selectedParentTag", selectedParentTag)
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
    const [ gameGenre, setGameGenre ]= useState([])
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read

    function buttonGroup() {
        const pageNumber = 'Page7'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: gameId,
            gameName: gameName,
            gameGenre: gameGenre,
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

    parentGenreSelected

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
          setGameGenre([])
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
          setGameGenre(genreTags)
        })
      // Unsubscribe from events when no longer in use
      return () => subscriber();
      }

      function textFunction() {
        const pageNumber = 'Page7'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: gameId,
            gameName: gameName,
            gameGenre: gameGenre,
            gameReleaseDate: gameReleaseDate,
            gameStoryline: gameStoryline,
            gameSummary: gameSummary,
            gameScreenshots: gameScreenshots
        }
        const navigationPass = navigation
        forwardToNextPage(pageNumber, passingContent, navigationPass)

      }

        function gameGenreResults() { 
            return (
                <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainFont>What genre does {gameName} fall under?</MainFont>
                    {parentGenreSelected == false 
                        ?   <View></View>  
                        :   selectedParentTag()
                    }
                </View>
                <View>
                    {parentGenreSelected == false 
                        ?   parentTagCollection(gameGenre)
                        :   <View></View>
                    }
                </View>
                <View>
                    {parentGenreSelected == false 
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