import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import{
    windowHeight,
    MainFont,
    MainSubFont,
    MainHeading,
    MainHeadingButton,
    ScrollViewContainer
} from '../../../../../../assets/styles/globalStyling'
import { useTags } from '../../authScreens/tagsContext'
import { firebase, gamesConfig } from '../../../../../server/config/config'


// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
    sgGenresScreen,
    SafeAreaViewContainer,
    Container,
    ContentContainer,
    SearchGameTitle,
    SearchGameData,
    FontAwesomeIcon,
    faChevronLeft,
    faTimesCircle,
    faFilter,
    faStar,
    faBook,
    faFistRaised,
    faLayerGroup,
    faPuzzlePiece,
    faFlagCheckered,
    faShieldAlt,
    faCrosshairs,
    faMap,
    faBasketballBall
} from '../../index'
import { useSearchBar } from '../sgGameSearchScreenContent/searchIndex'
import SgConsoleListScreens from './sgConsoleListScreen'

export default function ConfirmAddGameScreen({navigation, route}, props) {
    const {
        selectedTags,
        tagsSelection} = useTags()
    const colors = useContext(CurrentThemeContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState(true)
    const { searchBar, searchResults } = useSearchBar()
    // For Search Bar
    const [searchType, setSearchType] = useState('sgDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchFilterSelected, setSearchFilterSelected] = useState(false)
    const [sgConsoleIcons, setSgConsoleIcons] = useState([])
    console.log(sgConsoleIcons)
    const [chosenGenre, setChosenGenre] = useState()
    const [modalSelected, setModalSelected] = useState(route.params?.modal)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
        const subscriber = sgDB
          .collection('sgAPI').doc('sgTags').collection('genreTags').orderBy('tagName', 'asc')
          .onSnapshot(querySnapshot => {
            const consoles = []
            querySnapshot.forEach(documentSnapshot => {
                consoles.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              })
            })
      
            setSgConsoleIcons(consoles)
          });
          if(isFocused){  
            setModalSelected(false)
        }
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, [isFocused]);  

    const [genreTags, setGenreTags] = useState([
        {
            tagName: "Adventure",
            tagIcon: faStar,
        },
        {
            tagName: "Educational",
            tagIcon: faBook,
        },
        {
            tagName: "Fighting",
            tagIcon: faFistRaised,
        },
        {
            tagName: "Platformer",
            tagIcon: faLayerGroup,
        },
        {
            tagName: "Puzzle",
            tagIcon: faPuzzlePiece,
        },
        {
            tagName: "Racing",
            tagIcon: faFlagCheckered,
        },
        {
            tagName: "RPG",
            tagIcon: faShieldAlt,
        },
        {
            tagName: "Shooter",
            tagIcon: faCrosshairs,
        },
        {
            tagName: "Simulation",
            tagIcon: faMap,
        },
        {
            tagName: "Sports",
            tagIcon: faBasketballBall,
        }
    ])

    const tagData = sgConsoleIcons

    // Genre Tags Section
    // Chosen Tags (The user chose these tags)
   
    
    
    // Available Tags
    
    /*---------------------------*/


    const Root = createStackNavigator();
    const ModalStack = createStackNavigator();


    function resetAll() {
        setChosenGenre(null)
        navigation.goBack()
    }
    function confirmGenreSelection(item){
        navigation.navigate('Page1')
        setChosenGenre(item.tagName)
    }
    

    function searchBarGoBack() {
        return (
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => resetAll()}>
                        <View style={{ marginTop: 10, alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                            <FontAwesomeIcon 
                                icon={ faChevronLeft } color={colors.primaryFontColor} size={50}
                            />
                        </View>
                        </TouchableOpacity>
                    <View style={{
                        width: 300
                    }}>
                        {searchBar(searchBarTitle, searchType, searchQuery)}  
                    </View>
                    <TouchableOpacity onPress={() => setSearchFilterSelected(true)}>
                    <View style={{ paddingLeft: 10, marginTop: 20, alignItems: 'right', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                        <FontAwesomeIcon 
                            icon={ faFilter } color={colors.primaryFontColor} size={30}
                        />
                    </View>
                </TouchableOpacity>
                </View> 
        )
    }

    function setDBWithGenre(item) {
        setSearchQuery(item.tagName)
    }



    function genreTagCollection() {
        return (
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={tagData}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                        style={{ 
                            flex: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            margin: 3,
                            borderRadius: 10,
                            width: 100 * 2,
                            height: 100,
                            backgroundColor: colors.secondaryColor,
                        }} 
                        onPress={() => confirmGenreSelection(item)}>
                            <MainHeadingButton style={{justifyContent: 'center', alignItems: 'center',}}>{item.tagName}</MainHeadingButton>
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }}>
                                <FontAwesomeIcon 
                                    icon={ item.tagIcon } color={colors.primaryColorLight} size={35} 
                                />
                            </View>
                    </TouchableOpacity>
                    )}
                />
            )
        }

    function chooseGameOptions() {
        return(
            <SafeAreaViewContainer>
                {searchBarGoBack()}
                <Container>
                    {selectedTags(tagData)}
                    <ScrollViewContainer>
                        <View style={{paddingBottom: windowHeight/4}}>
                            <Text>This is where youll confirm your chose</Text>
                            {searchResults()}
                            {genreTagCollection()}
                            {searchFilterSelected == false
                                ?   <Text>Ocean Drive</Text>
                                :   tagsSelection(tagData)
                            }
                        </View>
                    </ScrollViewContainer>
                </Container>
        </SafeAreaViewContainer>
        )
    }

    function addGamePage1() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 1"}</MainHeading>
            </View>
        );
    }
    function addGamePage2() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 2"}</MainHeading>
            </View>
        );
    }
    function addGamePage3() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 3"}</MainHeading>
            </View>
        );
    }
    function addGamePage4() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 4"}</MainHeading>
            </View>
        );
    }
    function addGamePage5() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 5"}</MainHeading>
            </View>
        );
    }

    return (
        <Root.Navigator headerMode="none" initialRouteName="Home">
            <Root.Screen name="Home" component={chooseGameOptions} />
            <Root.Screen name="Page1" component={addGamePage1} />
            <Root.Screen name="Page2" component={addGamePage2} />
            <Root.Screen name="Page3" component={addGamePage3} />
            <Root.Screen name="Page4" component={addGamePage4} />
            <Root.Screen name="Page5" component={addGamePage5} />
        </Root.Navigator>
    )
}

