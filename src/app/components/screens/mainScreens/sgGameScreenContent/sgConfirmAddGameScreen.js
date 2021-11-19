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

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
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
    const colors = useContext(CurrentThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const { searchBar, searchResults } = useSearchBar()
    // For Search Bar
    const [searchType, setSearchType] = useState('sgDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchFilterSelected, setSearchFilterSelected] = useState(false)
    const [resetData, setResetData] = useState(false)

    const [genreTags, setGenreTags] = useState([
        {
            genreName: "Adventure",
            genreIcon: faStar,
        },
        {
            genreName: "Educational",
            genreIcon: faBook,
        },
        {
            genreName: "Fighting",
            genreIcon: faFistRaised,
        },
        {
            genreName: "Platformer",
            genreIcon: faLayerGroup,
        },
        {
            genreName: "Puzzle",
            genreIcon: faPuzzlePiece,
        },
        {
            genreName: "Racing",
            genreIcon: faFlagCheckered,
        },
        {
            genreName: "RPG",
            genreIcon: faShieldAlt,
        },
        {
            genreName: "Shooter",
            genreIcon: faCrosshairs,
        },
        {
            genreName: "Simulation",
            genreIcon: faMap,
        },
        {
            genreName: "Sports",
            genreIcon: faBasketballBall,
        }
    ])

    const [chosenGenre, setChosenGenre] = useState()

    const [chosenTag, setChosenTag] = useState()

    const [editgenreTags, setEditgenreTags] = useState([])

    const [deletedTag, setdeleteTag] = useState()

    // Genre Tags Section
    // Chosen Tags (The user chose these tags)
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray)); //Removes the ability to add dulicate
    let initSelectedArray = genreTags
    let deletionSelectedArray = tagsNewArray
    let currentSelectedTagsArray = []
    currentSelectedTagsArray = initSelectedArray.filter(item => deletionSelectedArray.includes(item))
    
    // Available Tags
    let initArray = genreTags
    let deletionArray = tagsNewArray
    let currentTagsArray = [];
    currentTagsArray = initArray.filter(item => !deletionArray.includes(item))
    /*---------------------------*/


    const Root = createStackNavigator();
    const ModalStack = createStackNavigator();


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
    })

    async function chosenTagData(item) {
        setChosenTagsArray(chosenTagsArray => [...chosenTagsArray, item])
    }

    async function removeChosenTagData(item) {
        setChosenTagsArray(tagsNewArray.filter(tag => tag !== item))
    }
    
    function confirmGenreSelection(item){
        navigation.navigate('Modal')
        setChosenGenre(item.genreName)
    }
    
    function selectedTags(resetData) {
        if (resetData == true) {
            return setChosenTagsArray(null)
        } else {
            return (
                <ScrollViewContainer
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                <View>
               <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    data={currentSelectedTagsArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{  
                            margin: 3,
                            borderWidth: 1,
                            borderRadius: 50,
                            alignItems:'center',
                            justifyContent:'center',
                            borderColor: colors.secondaryColor,
                            backgroundColor: colors.secondaryColor,
                            height:40, 
                            padding: 3,
                            marginTop: 3,
                            marginBottom: 10
                            }}
                            onPress={() => removeChosenTagData(item)}>
                            <View style={{
                                margin: 10,
                                flexDirection: "row", justifyContent: "center"
                            }}>
                                <MainFont style={{paddingHorizontal: 5}}>{item.genreName}</MainFont>
                                <FontAwesomeIcon
                                    style={{paddingHorizontal: 5}} 
                                    icon={ faTimesCircle } color={colors.primaryFontColor} size={16}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
                </View>
               </ScrollViewContainer>
           )
        }
     }
 
     function tagsSelection() {
         return (
             <FlatList
             columnWrapperStyle={{flexDirection : "row", flexWrap : "wrap"}}
             numColumns={5}
             horizontal={false}
             scrollEnabled={false}
             data={currentTagsArray}
             keyboardShouldPersistTaps="always"
             keyExtractor={item => item.id}
             renderItem={({ item }) => (
                 <TouchableOpacity 
                    style={{  
                        margin: 3,
                        borderWidth: 1,
                        borderRadius: 50,
                        alignItems:'center',
                        justifyContent:'center',
                        borderColor:'rgba(0,0,0,0.2)',
                        backgroundColor: colors.secondaryColor,
                        height:50, 
                        padding: 3,
                        marginTop: 3
                    }} 
                    onPress={() => chosenTagData(item)}>
                    <View style={{
                        margin: 10,
                        flexDirection: "row", justifyContent: "center"
                    }}>
                        <MainFont style={{paddingHorizontal: 5}}>{item.genreName}</MainFont>
                        <FontAwesomeIcon
                        style={{paddingHorizontal: 5}} 
                        icon={ faTimesCircle } color={colors.primaryFontColor} size={16}
                    />
                 </View>
             </TouchableOpacity>
             )}
         />
         )
      }
 
    function genreTagCollection() {
        return (
             <FlatList
                 columnWrapperStyle={{justifyContent: 'space-between'}}
                 numColumns={2}
                 showsHorizontalScrollIndicator={false}
                 scrollEnabled={false}
                 data={genreTags}
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
                         <MainHeadingButton style={{justifyContent: 'center', alignItems: 'center',}}>{item.genreName}</MainHeadingButton>
                         <View style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }}>
                             <FontAwesomeIcon 
                                icon={ item.genreIcon } color={colors.primaryColorLight} size={35} 
                            /> 
                         </View>
                 </TouchableOpacity>
                 )}
             />
         )
     }


    function resetAll() {
        setResetData(true)
        setChosenGenre(null)
        navigation.goBack()
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
        setSearchQuery(item.genreName)
    }

    function chooseGameOptions() {
        return(
            <SafeAreaViewContainer>
                {searchBarGoBack()}
                <Container>
                    {selectedTags()}
                    <ScrollViewContainer>
                        <View style={{paddingBottom: windowHeight/4}}>
                            <Text>This is where youll confirm your chose</Text>
                            {searchResults()}
                            {genreTagCollection()}
                            {searchFilterSelected == false
                                ?   <Text>Ocean Drive</Text>
                                :   tagsSelection()
                            }
                        </View>
                    </ScrollViewContainer>
                </Container>
        </SafeAreaViewContainer>
        )
    }

    function sgModalScreen() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{chosenGenre}</MainHeading>
            </View>
        );
    }

    return (
        <Root.Navigator headerMode="none" initialRouteName="Home">
            <Root.Screen name="Home" component={chooseGameOptions} />
            <Root.Screen name="Modal" component={sgModalScreen} />
        </Root.Navigator>
    )
}

