import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import{
    MainFont,
    ScrollViewContainer
} from '../../../../../assets/styles/globalStyling'
import {CurrentThemeContext} from '../../../../../assets/styles/globalTheme'
import {
    FontAwesomeIcon,
    MainHeadingButton,
    faTimesCircle,
} from '../index'

const TagsContext = React.createContext()

export function useTags() {
    return useContext(TagsContext)
}

export function TagsProvider({ children }) {
    const colors = useContext(CurrentThemeContext)
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray)); //Removes the ability to add dulicate
    const [chosenTag, setChosenTag] = useState()
    const [tagsSelected, setTagsSelected] = useState(false)
    const [genreTagsSelected, setGenreTagsSelected] = useState(false)
    const [subGenreTagsSelected, setSubGenreTagsSelected] = useState(false)
    const [gameModeTagsSelected, setGameModeTagsSelected] = useState(false)
    const [editgenreTags, setEditgenreTags] = useState([])
    const [deletedTag, setdeleteTag] = useState()
    const [resetData, setResetData] = useState(false)

    // Adding and removing tags from a game
    async function chosenTagData(item) {
        setChosenTagsArray(chosenTagsArray => [...chosenTagsArray, item])
    }

    async function removeChosenTagData(item) {
        setTagsSelected(false)
        setChosenTagsArray(tagsNewArray.filter(tag => tag !== item))
    }

    async function removeAllChosenTagData(item) {
        setChosenTagsArray([])
    }

    function selectedTags() {
        let initSelectedArray = chosenTagsArray
        let deletionSelectedArray = tagsNewArray
        let currentSelectedTagsArray = []
        currentSelectedTagsArray = initSelectedArray.filter(item => deletionSelectedArray.includes(item))
        if (resetData == true) return setChosenTagsArray(null)
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
                            <MainFont style={{paddingHorizontal: 5}}>{item.tagName}</MainFont>
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

    function tagsSelection(tagData) {
        let initArray = tagData
        let deletionArray = tagsNewArray
        let currentTagsArray = [];
        currentTagsArray = initArray.filter(item => !deletionArray.includes(item))
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
                            <MainFont style={{paddingHorizontal: 5}}>{item.tagName}</MainFont>
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

    function tagCollection(tagData, tagDataType) {
        let iceCreeam = tagDataType
        console.log("🚀 ~ file: tagsContext.js ~ line 148 ~ tagCollection ~ iceCreeam", iceCreeam)
        let initArray = tagData
        let deletionArray = tagsNewArray
        let currentTagsArray = [];
        currentTagsArray = initArray.filter(item => !deletionArray.includes(item))
        return (
            <FlatList
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentTagsArray}
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
                    onPress={() => confirmTagSelection(item)}>
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

    function confirmTagSelection(item){
        setTagsSelected(true)
        chosenTagData(item)
        setChosenTag(item.tagName)
    }

    


    const value = {
        selectedTags,
        tagsSelection,
        tagCollection,
        tagsSelected,
        chosenTag,
        chosenTagsArray,
    }   

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    )
}