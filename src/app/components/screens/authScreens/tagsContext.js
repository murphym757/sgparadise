import React, { useContext, useState } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import {
    CurrentThemeContext,
    faTimesCircle,
    FontAwesomeIcon,
    MainFont,
    MainHeadingButton,
    ScrollViewContainer,
} from 'index'

const TagsContext = React.createContext()

export function useTags() {
    return useContext(TagsContext)
}

export function TagsProvider({ children }) {
    const colors = useContext(CurrentThemeContext)
    const [chosenTagsArray, setChosenTagsArray] = useState([])
    const tagsNewArray = Array.from(new Set(chosenTagsArray)) //Removes the ability to add dulicate
    const [resetData, setResetData] = useState(false)

    function selectedTags(initArray, deleArray, resetArray) {
        let initialSelectedArray = initArray
        let deletionSelectedArray = deleArray
        let currentSelectedTagsArray = []
        currentSelectedTagsArray = initialSelectedArray.filter(item => deletionSelectedArray.includes(item))
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
                    <Pressable style={{  
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
                        onPress={() => resetArray(item)}>
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
                    </Pressable>
                )}
            />
            </View>
            </ScrollViewContainer>
        )
    }

    function tagsSelection(initArray, deleArray) {
        let initialArray = initArray
        let deletionArray = deleArray
        let currentTagsArray = []
        currentTagsArray = initialArray.filter(item => !deletionArray.includes(item))
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
                        <Pressable 
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
                    </Pressable>
                    )}
                />
            )
    }

    function tagCollection(tagData, tagDataConfirmation) {
        let initArray = tagData
        let deletionArray = tagsNewArray
        let currentTagsArray = []
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
                    <Pressable 
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
                    onPress={() => tagDataConfirmation(item)}>
                        <MainHeadingButton style={{justifyContent: 'center', alignItems: 'center',}}>{item.tagName}</MainHeadingButton>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }}>
                            <FontAwesomeIcon 
                                icon={ item.tagIcon } color={colors.primaryColorLight} size={35} 
                            />
                        </View>
                </Pressable>
                )}
            />
        )
    }

    const value = {
        selectedTags,
        tagsSelection,
        tagCollection
    }   

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    )
}