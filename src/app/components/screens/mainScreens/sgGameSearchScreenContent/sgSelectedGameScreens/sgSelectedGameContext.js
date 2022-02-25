import React from 'react';
import { View, Image } from 'react-native';
import {
    Container,
    ContentContainer,
    CustomInputField,
    MainFont,
    MainHeading,
    MainHeadingLongTitle,
    MainSubFont,
    TouchableButton,
    TouchableButtonAlt,
    TouchableButtonDelete,
    TouchableButtonFont,
    TouchableButtonFontAlt,
    TouchableButtonFontDelete,
    useTags,
    ViewSortColumn,
    ViewSortRow
} from '../../../index';
import { AirbnbRating } from 'react-native-ratings';

function starRatingSystem(buttonGroupData, updatedGameRating, setUpdatedGameRating, colors) {
    return (
        <View>
            {buttonGroupData.passingContent.gameName.length < 29
                ?   <MainHeading>{buttonGroupData.passingContent.gameName}</MainHeading>
                :   <MainHeadingLongTitle>{buttonGroupData.passingContent.gameName}</MainHeadingLongTitle>
            }
            <MainSubFont>{buttonGroupData.passingContent.gameReleaseDate}</MainSubFont>
            {updatedGameRating == undefined
                ?   <MainFont>{"Tap to rate: "}</MainFont>
                :   <View>
                    {updatedGameRating == 1
                        ?   <MainFont>{`Tap to rate: ${updatedGameRating} Star`}</MainFont>
                        :   <MainFont>{`Tap to rate: ${updatedGameRating} Stars`}</MainFont>
                    }
                </View>
            }
                    <AirbnbRating
                        selectedColor={colors.secondaryColor}
                        unSelectedColor={colors.primaryColorAlt}
                        ratingContainerStyle={{
                            alignItems: 'left'
                        }}
                        count={5}
                        onFinishRating={setUpdatedGameRating}
                        showRating={false}
                        reviews={["Bad", "Mediocre", "Good", "Exceptional", "Classic"]}
                        defaultRating={0}
                        size={25}
                    />
        </View>
    )
}

function gameSummaryResults(buttonGroupData, updatedGameSummary, setUpdatedGameSummary, windowHeight, colors) {
    return (
        <Container>
            <ContentContainer>
                <MainFont>{buttonGroupData.pageDescription}</MainFont>
            </ContentContainer>
            <CustomInputField
                style={{ height:200, textAlignVertical: 'top', padding: windowHeight/50 }}
                multiline={true}
                blurOnSubmit={true}
                numberOfLines={4}
                placeholderTextColor={colors.primaryColor}
                onChangeText={(text) => setUpdatedGameSummary(buttonGroupData.charLimit(text, 500))}
                value={(buttonGroupData.charLimit(updatedGameSummary, 500))}
                color={colors.primaryColor}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <MainFont>({updatedGameSummary.length}/500)</MainFont>
            {buttonGroup(buttonGroupData)}
        </Container>
    )
}

function gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, undefined) {
    return (
        <Container>
            <View style={{paddingBottom: 25}}><MainFont>{tagArrayData.pageDescription}</MainFont></View>
            <ViewSortColumn style={{alignItems: 'center', paddingLeft: windowHeight/15, paddingRight: windowHeight/15, paddingBottom: 25}}>
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
                                uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${buttonGroupData.passingContent.gameCover[0].image_id}.jpg`,
                            }}
                        />
                    </View>
                    <View style={{width: 200, paddingLeft: windowHeight/20, height: undefined}}>
                        <ViewSortRow><MainSubFont>{buttonGroupData.passingContent.gameId}</MainSubFont></ViewSortRow>
                        <ViewSortRow style={{paddingTop: windowHeight/25}}><MainSubFont>{buttonGroupData.passingContent.gameGenre}</MainSubFont></ViewSortRow>
                        <ViewSortRow style={{paddingTop: windowHeight/50}}><MainSubFont>{buttonGroupData.passingContent.gameSubGenre}</MainSubFont></ViewSortRow>
                        <ViewSortRow style={{paddingTop: windowHeight/50, paddingBottom: windowHeight/50}}>
                            <MainSubFont>{buttonGroupData.passingContent.gameRating} Stars</MainSubFont>
                        </ViewSortRow>
                        <ViewSortRow><MainSubFont>{buttonGroupData.passingContent.gameReleaseDate}</MainSubFont></ViewSortRow>
                    </View>
                </View>
            </ViewSortColumn>
            <ContentContainer>
                <ViewSortRow><MainSubFont>{buttonGroupData.passingContent.gameSummary}</MainSubFont></ViewSortRow>
            </ContentContainer>
            <View>
                {buttonGroup(buttonGroupData)}
            </View>
        </Container>
    )
}

function gameResults(tagArrayData, buttonGroupData) {
    const { selectedTags, tagCollection } = useTags() 
    return (
        <Container>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MainFont>{tagArrayData.pageDescription}</MainFont>
                {tagArrayData.tagSelected == undefined 
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
                    :   <View>{buttonGroup(buttonGroupData)}</View>
                }
            </View>
        </Container>
      ) 
}

function gameModesResults(tagArrayData, buttonGroupData) {
    const { selectedTags, tagCollection } = useTags() 
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

function gameplayResults(buttonGroupData, imageCount, pageDescription, pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar, chooseImagesList, resetChosenGameplayData, chosenImagesList) { 
    return (
        <Container>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {imageCount < 1
                    ?   chosenImages(pageDescription, buttonGroupData, resetChosenGameplayData, chosenImagesList)
                    :   chooseImages(pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar, chooseImagesList)
                }
            </View>
        </Container>
      ) 
}

function imgWordingSelector(imageCount) {
    const imgSingular = 'more image'
    const imgPlural = 'images'
    if (imageCount == 1) return imgSingular
    if (imageCount != 1) return imgPlural
}

function chooseImages(pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar, chooseImagesList){
    return (
        <View> 
            {gameNameLastChar == 's'
                ?   <MainFont>{pageDescriptionPluralForS} </MainFont>
                :   <MainFont>{pageDescriptionPlural} </MainFont>
            } 
            {chooseImagesList()}
        </View>
    )
}

function chosenImages(pageDescription, buttonGroupData, resetChosenGameplayData, chosenImagesList){
    return (
        <View>
            <MainFont>{pageDescription}</MainFont>
            {chosenImagesList()}
            {buttonGroupImages(buttonGroupData, resetChosenGameplayData)}
        </View>
    )
}

function buttonGroupImages(buttonGroupData, resetChosenGameplayData) {
    return (
        <View>
            <TouchableButtonDelete onPress={() => resetChosenGameplayData()}>
                <TouchableButtonFontDelete>Clear Images</TouchableButtonFontDelete>
            </TouchableButtonDelete>
            <TouchableButton onPress={() => buttonGroupData.forwardToNextPage(buttonGroupData.nextPageNumber, buttonGroupData.passingContent, buttonGroupData.navigationPass)}>
                <TouchableButtonFont>Next Page</TouchableButtonFont>
            </TouchableButton>
            <TouchableButtonAlt style={{}} onPress={() => buttonGroupData.backToPreviousPage(buttonGroupData.navigationPass)}>
                <TouchableButtonFontAlt>Previous Page</TouchableButtonFontAlt>
            </TouchableButtonAlt>
        </View>
    )
}

export const confirmGame = {
    gameConfirmationResults,
    gameSummaryResults,
    gameModesResults,
    gameResults,
    starRatingSystem,
    buttonGroup,
    gameplayResults,
    imgWordingSelector,
    chooseImages,
    chosenImages,
    buttonGroupImages
}

export const confirmGameContext = React.createContext(confirmGame)