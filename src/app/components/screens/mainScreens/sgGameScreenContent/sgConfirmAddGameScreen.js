import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { useTags } from 'auth/tagsContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFocused } from '@react-navigation/native'
import {
    Container,
    CurrentThemeContext,
    faBasketballBall,
    faBook,
    faChevronLeft,
    faCrosshairs,
    faFilter,
    faFistRaised,
    faFlagCheckered,
    faLayerGroup,
    faMap,
    faPuzzlePiece,
    faShieldAlt,
    faStar,
    firebase,
    FontAwesomeIcon,
    MainFont,
    MainHeading,
    MainHeadingButton,
    SafeAreaViewContainer,
    ScrollViewContainer,
    SgConsoleListScreen,
    sgSearchResultsScreen,
    SgSearchScreen,
    windowHeight
} from 'index'
import { 
    SgSelectedGameConfirmationScreen,
    SgSelectedGameCoverScreen,
    SgSelectedGameplayScreen,
    SgSelectedGameSetGameModesScreen,
    SgSelectedGameSetGenreScreen,
    SgSelectedGameSetSubgenreScreen,
    SgSelectedGameSummaryScreen
} from '../sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameScreensIndex'

export default function ConfirmAddGameScreen({navigation, route}) {
    const [ isLoading, setIsLoading] = useState(true)
    const { searchBar, gameName } = useSearchBar()
    const { selectedTags, tagsSelection} = useTags()
    const colors = useContext(CurrentThemeContext)
    const sgDB = firebase.firestore()
    
    // For Search Bar
    const [ chosenGenre, setChosenGenre ] = useState()
    const [ modalSelected, setModalSelected ] = useState(route.params?.modal)
    const [ searchBarTitle, setSearchBarTitle ] = useState('Search Games')
    const [ searchFilterSelected, setSearchFilterSelected ] = useState(false)
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchType, setSearchType ] = useState('sgIGDBSearch')
    const [ sgConsoleIcons, setSgConsoleIcons ] = useState([])
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
        })
        if(isFocused){  
            setModalSelected(false)
        }
        // Unsubscribe from events when no longer in use
        return () => subscriber()
    }, [isFocused])  

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


    function resetAll() {
        setChosenGenre(null)
        navigation.goBack()
    }
    function confirmGenreSelection(item){
        navigation.navigate('Page1')
        setChosenGenre(item)
    }
    

    function searchBarGoBack() {
        return (
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => resetAll()}>
                        <View style={{ marginTop: 10, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
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
        setSearchQuery(item)
    }



    function genreTagCollection() {
        return (
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={sgConsoleIcons}
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
                            <MainHeadingButton style={{justifyContent: 'center', alignItems: 'center',}}>{item}</MainHeadingButton>
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
                            <MainFont>What genre does {gameName} fall under?</MainFont>
                            {searchResults()}
                            {genreTagCollection()}
                            {searchFilterSelected == false
                                ?   <MainFont>Ocean Drive</MainFont>
                                :   tagsSelection(tagData)
                            }
                        </View>
                    </ScrollViewContainer>
                </Container>
        </SafeAreaViewContainer>
        )
    }
    
    function addGamePage10() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"This is the page where the user adds the game info to firebase"}</MainHeading>
            </View>
        )
    }


    function sgSearchStack() {
        const Stack = createStackNavigator()
        return (
            <Stack.Navigator headerMode="none" initialRouteName="Home">
                <Stack.Screen name="Home" component={SgConsoleListScreen} initialParams={{ addGameLinkPressed: true }} />
                <Stack.Screen name="Page1" component={SgSearchScreen} />
                <Stack.Screen name="Page2" component={sgSearchResultsScreen} />
                <Stack.Screen name="Page3" component={SgSelectedGameCoverScreen} />
                <Stack.Screen name="Page4" component={SgSelectedGameplayScreen} />
                <Stack.Screen name="Page5" component={SgSelectedGameSummaryScreen} />
                <Stack.Screen name="Page6" component={SgSelectedGameSetGenreScreen} />
                <Stack.Screen name="Page7" component={SgSelectedGameSetSubgenreScreen} />
                <Stack.Screen name="Page8" component={SgSelectedGameSetGameModesScreen} />
                <Stack.Screen name="Page9" component={SgSelectedGameConfirmationScreen} />
            </Stack.Navigator>
        )
    }

    return (
        sgSearchStack()
    )
}