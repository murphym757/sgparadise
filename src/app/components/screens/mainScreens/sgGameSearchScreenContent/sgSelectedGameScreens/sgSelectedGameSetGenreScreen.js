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
        selectedTags,
        tagsSelected
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
    const gameDataType = "Genres"
    const [ gameGenreArray, setGameGenreArray ]= useState([])
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read

    function buttonGroup() {
        const pageNumber = 'Page7'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: gameId,
            gameName: gameName,
            gameGenre: gameGenreArray,
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

        function gameGenreResults() { 
            return (
                <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainFont>What genre does {gameName} fall under?</MainFont>
                    {tagsSelected == false 
                        ?   <View></View>  
                        :   selectedTags()
                    }
                </View>
                <View>
                    {tagsSelected == false 
                        ?   tagCollection(gameGenreArray, gameDataType)
                        :   <View></View>
                    }
                </View>
                <View>
                    {tagsSelected == false 
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