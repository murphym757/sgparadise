import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import{
    MainFont,
    MainSubFont,
    ScrollViewContainer
} from '../../../../../assets/styles/globalStyling'
import {CurrentThemeContext} from '../../../../../assets/styles/globalTheme'
import {
    Container,
    FontAwesomeIcon,
    MainHeadingButton,
    TouchableButton,
    TouchableButtonFont,
    TouchableButtonAlt,
    TouchableButtonFontAlt,
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
                    </TouchableOpacity>
                )}
            />
            </View>
            </ScrollViewContainer>
        )
    }

    function tagsSelection(initArray, deleArray) {
        let initialArray = initArray
        let deletionArray = deleArray
        let currentTagsArray = [];
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

    function tagCollection(tagData, tagDataConfirmation) {
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
                    onPress={() => tagDataConfirmation(item)}>
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

    function gameResults(tagArrayData, buttonGroupData) { 
        return (
            <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainFont>{tagArrayData.pageDescription}</MainFont>
                    {tagArrayData.tagSelected == false 
                        ?   <View></View>  
                        :   selectedTags(tagArrayData.chosenTagsArray, tagArrayData.tagsNewArray, tagArrayData.removeChosenTagData)
                    }
                </View>
                <View>
                    {tagArrayData.tagSelected == false 
                        ?   tagCollection(tagArrayData.gameArray, tagArrayData.confirmTagSelection)
                        :   <View></View>
                    }
                </View>
                <View>
                    {tagArrayData.tagSelected == false 
                        ?   <View></View>
                        :   buttonGroup(buttonGroupData)
                    }
                </View>
            </Container>
          ) 
    }

    function gameModesResults(tagArrayData, buttonGroupData) { 
        let initArray = tagArrayData.gameArray
        let deletionArray = tagArrayData.tagsNewArray
        let currentTagsArray = [];
        currentTagsArray = initArray.filter(item => !deletionArray.includes(item))
        
        return (
            <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainFont>{tagArrayData.pageDescription}</MainFont>
                    {selectedTags(tagArrayData.chosenTagsArray, tagArrayData.tagsNewArray, tagArrayData.removeChosenTagData)}
                </View>
                <View>
                    {tagCollection(currentTagsArray, tagArrayData.confirmTagSelection)}
                </View>
                <View>
                    {tagArrayData.modeTagsSelected == false 
                        ?   <View></View>
                        :   buttonGroup(buttonGroupData)
                    }
                </View>
            </Container>
          ) 
    }

    function gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, undefined) {
        return (
            <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{paddingBottom: 25}}><MainFont>{tagArrayData.pageDescription}</MainFont></View>
                    <View style={{flexDirection: 'column', alignItems: 'center', paddingLeft: windowHeight/15, paddingRight: windowHeight/15, paddingBottom: 25}}>
                        <View style={{paddingBottom: 25}}><MainSubFont>{tagArrayData.passingContent.gameName}</MainSubFont></View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                paddingLeft: windowHeight/20,
                                width: 200,
                                height: undefined,
                            }}>
                                <Image
                                    style={{
                                        height: 200,
                                        width: 150,
                                        marginVertical: 15,
                                        resizeMode: 'stretch',
                                        borderRadius: 25,
                                    }}
                                    source={{
                                        uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${tagArrayData.passingContent.gameCover[0].image_id}.jpg`,
                                    }}
                                />
                            </View>
                            <View style={{width: 200, paddingLeft: windowHeight/20, height: undefined}}>
                                <View><MainSubFont>{tagArrayData.passingContent.gameId}</MainSubFont></View>
                                <View><MainSubFont>{tagArrayData.passingContent.gameGenre}</MainSubFont></View>
                                <View><MainSubFont>{tagArrayData.passingContent.gameRating}</MainSubFont></View>
                                <View><MainSubFont>{tagArrayData.passingContent.gameReleaseDate}</MainSubFont></View>
                                <View><MainSubFont>{tagArrayData.passingContent.gameStoryline}</MainSubFont></View>
                                <View><MainSubFont>{tagArrayData.passingContent.gameSubGenre}</MainSubFont></View>
                            </View>
                        </View>
                    </View>
                    <MainSubFont>{tagArrayData.passingContent.gameSummary}</MainSubFont>
                </View>
                <View>
                    {buttonGroup(buttonGroupData)}
                </View>
            </Container>
        )
    }

    function buttonGroup(buttonGroupData) {
        return (
            <View>
                <TouchableButton onPress={() => buttonGroupData.forwardToNextPage(buttonGroupData.nextPageNumber, buttonGroupData.passingContent, buttonGroupData.navigationPass)}>
                    <TouchableButtonFont>Next Page</TouchableButtonFont>
                </TouchableButton>
                <TouchableButtonAlt style={{}} onPress={() => buttonGroupData.backToPreviousPage(buttonGroupData.navigationPass)}>
                    <TouchableButtonFontAlt>Previous Page</TouchableButtonFontAlt>
                </TouchableButtonAlt>
            </View>
        )
    }

    const value = {
        selectedTags,
        tagsSelection,
        tagCollection,
        gameResults,
        gameModesResults,
        gameConfirmationResults
    }   

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    )
}