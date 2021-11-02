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
import { useGenres } from '../sgGameScreenContent/sgTagsIndex'

export default function ConfirmAddGameScreen({navigation, route}, props) {
    const colors = useContext(CurrentThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const { searchBar, searchResults } = useSearchBar()
    const { selectedTags, tagsSelection, genreTagCollection } = useGenres()
    // For Search Bar
    const [searchType, setSearchType] = useState('sgDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchFilterSelected, setSearchFilterSelected] = useState(false)
    const [resetData, setRestData] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
    })

    function resetAll() {
        setRestData(true)
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

    return (
        <SafeAreaViewContainer>
                {searchBarGoBack()}
                <Container>
                    {selectedTags(resetData)}
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

