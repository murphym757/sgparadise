
import React, { useState, useEffect, useContext } from 'react'
import { 
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import{
    MainFont,
    MainHeadingButton,
    ScrollViewContainer
} from '../../../../../../assets/styles/globalStyling'
import {
    FontAwesomeIcon,
    faTimesCircle,
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

const TagsContext = React.createContext()

export function useGenres() {
    return useContext(TagsContext)
}

export function TagsProvider({ children }) {
    const colors = useContext(CurrentThemeContext)
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
    console.log('This is the genre you just chose: ' + chosenGenre) 

    const [chosenTag, setChosenTag] = useState()
    console.log('This is the tag you just chose: ' + chosenTag) 

    const [deletedTag, setdeleteTag] = useState()
    console.log('This is the tag you just deleted: ' + deletedTag) 

    const [chosenTagsArray, setChosenTagsArray] = useState([])
    console.log('This is the tags you are working with: ' + chosenTagsArray)
    
    

    async function chosenGenreData(item) {
        function removeFromArray(original, genreTags) {
            return original.filter(value => !genreTags.includes(value))
        }
        setChosenGenre([item]),
        setChosenTagsArray([item])
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
                    data={chosenTagsArray}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{  
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
                            }}>
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
                        </View>
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
             data={genreTags}
             keyboardShouldPersistTaps="always"
             keyExtractor={item => item.id}
             renderItem={({ item }) => (
                 <View style={{  
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
                  }}>
                 <View style={{
                     margin: 10,
                     flexDirection: "row", justifyContent: "center"
                 }}>
                 <TouchableOpacity onPress={() => chosenGenreData(item)}>
                     <MainFont style={{paddingHorizontal: 5}}>{item.genreName}</MainFont>
                     <FontAwesomeIcon
                     style={{paddingHorizontal: 5}} 
                     icon={ faTimesCircle } color={colors.primaryFontColor} size={16}
                 />
                 </TouchableOpacity>
                 </View>
             </View>
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
                     <View style={{ 
                         flex: 1, 
                         justifyContent: 'center', 
                         alignItems: 'center', 
                         margin: 3,
                         borderRadius: 10,
                         width: 100 * 2,
                         height: 100,
                         backgroundColor: colors.secondaryColor, 
                     }}>
                     <TouchableOpacity onPress={() => setChosenGenre(item.genreName)}>
                         <MainHeadingButton style={{width: '100%'}}>{item.genreName}</MainHeadingButton>
                         <View style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }}>
                             <FontAwesomeIcon 
                                     icon={ item.genreIcon } color={colors.primaryColorLight} size={35} 
                                 /> 
                         </View>
                     </TouchableOpacity>
                 </View>
                 )}
             />
         )
     }

     const value = {
        selectedTags,
        tagsSelection,
        genreTagCollection
    }

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    )
}