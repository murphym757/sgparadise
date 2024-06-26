import React from 'react'
import { View } from 'react-native'
import { useTags } from 'auth/tagsContext'
import {
    CenterContent,
    Container,
    ContentContainer,
    CustomInputField,
    firebase,
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
    ViewSortColumn,
    ViewSortRow,
} from 'index';
import { AirbnbRating } from 'react-native-ratings'

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
                            alignItems: 'flex-start'
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
    const stackName = ''
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
            {updatedGameSummary !== undefined
                ?   <MainFont>({updatedGameSummary.length}/500)</MainFont>
                :   <MainFont></MainFont>
            }
            {buttonGroup(buttonGroupData, stackName)}
        </Container>
    )
}

function gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, undefined, confirmationGameCoverImage) {
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
                        {confirmationGameCoverImage(buttonGroupData)}
                    </View>
                    <View style={{width: 200, paddingLeft: windowHeight/20, height: undefined}}>
                        <ViewSortRow><MainSubFont>{buttonGroupData.passingContent.gameId}</MainSubFont></ViewSortRow>
                        <ViewSortRow style={{paddingTop: windowHeight/25}}><MainSubFont>{buttonGroupData.passingContent.gameGenre}</MainSubFont></ViewSortRow>
                        <ViewSortRow style={{paddingTop: windowHeight/50}}><MainSubFont>{buttonGroupData.passingContent.gameSubgenre}</MainSubFont></ViewSortRow>
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
        </Container>
    )
}

function gameResults(tagArrayData, buttonGroupData) {
    const { selectedTags, tagCollection } = useTags()
    const stackName = ''
    return (
        <Container>
            <CenterContent>
                <MainFont>{tagArrayData.pageDescription}</MainFont>
                {tagArrayData.tagSelected == undefined 
                    ?   <View></View>  
                    :   selectedTags(tagArrayData.chosenTagsArray, tagArrayData.tagsNewArray, tagArrayData.removeChosenTagData)
                }
            </CenterContent>
            <View>
                {tagArrayData.tagSelected == false 
                    ?   tagCollection(tagArrayData.gameArray, tagArrayData.confirmTagSelection)
                    :   <View></View>
                }
            </View>
            <View>
                {tagArrayData.tagSelected == false 
                    ?   <View></View>
                    :   <View>{buttonGroup(buttonGroupData, stackName)}</View>
                }
            </View>
        </Container>
      ) 
}

function gameModesResults(tagArrayData, buttonGroupData) {
    const { selectedTags, tagCollection } = useTags() 
    const stackName = ''
    let currentTagsArray = []
    currentTagsArray = initArray.filter(item => !deletionArray.includes(item))
    let deletionArray = tagArrayData.tagsNewArray
    let initArray = tagArrayData.gameArray

    return (
        <Container>
            <CenterContent>
                <MainFont>{tagArrayData.pageDescription}</MainFont>
                {selectedTags(tagArrayData.chosenTagsArray, tagArrayData.tagsNewArray, tagArrayData.removeChosenTagData)}
            </CenterContent>
            <View>
                {tagCollection(currentTagsArray, tagArrayData.confirmTagSelection)}
            </View>
            <View>
                {tagArrayData.modeTagsSelected == false 
                    ?   <View></View>
                    :   buttonGroup(buttonGroupData, stackName)
                }
            </View>
        </Container>
      ) 
}

function buttonGroup(buttonGroupData, confirmationPage, stackName) {
    return (
        <View>
            <TouchableButton onPress={() => buttonGroupData.forwardToNextPage(buttonGroupData.nextPageNumber, buttonGroupData.passingContent, buttonGroupData.navigationPass)}>
                {confirmationPage == true
                    ?   <TouchableButtonFont>Upload Game</TouchableButtonFont>
                    :   <TouchableButtonFont>Next Page</TouchableButtonFont>
                }
            </TouchableButton>
            <TouchableButtonAlt style={{}} onPress={() => buttonGroupData.backToPreviousPage(buttonGroupData.navigationPass, stackName)}>
                <TouchableButtonFontAlt>Previous Page</TouchableButtonFontAlt>
            </TouchableButtonAlt>
        </View>
    )
}

function imgWordingSelector(imageCount) {
    const imgSingular = 'more image'
    const imgPlural = 'images'
    if (imageCount == 1) return imgSingular
    if (imageCount != 1) return imgPlural
}

function chooseImages(pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar){
    return (
        <View> 
            {gameNameLastChar == 's'
                ?   <MainFont>{pageDescriptionPluralForS} </MainFont>
                :   <MainFont>{pageDescriptionPlural} </MainFont>
            } 
        </View>
    )
}

function chosenImages(pageDescription){
    return (
        <View>
            <MainFont>{pageDescription}</MainFont>
        </View>
    )
}

function buttonGroupImages(buttonGroupData, resetChosenGameplayData) {
    const stackName = ''
    return (
        <View>
            <TouchableButtonDelete onPress={() => resetChosenGameplayData()}>
                <TouchableButtonFontDelete>Clear Images</TouchableButtonFontDelete>
            </TouchableButtonDelete>
            {buttonGroup(buttonGroupData, stackName)}
        </View>
    )
}

function coverImageCapture(passingImageData) {
    const coverArtFileName = passingImageData.coverArtFileName
    const coverArtFileRoute = `${folderName}/${firebaseStorageConsoleName}/${subFolderName}/${sortedGameName}/${gameNameFolder}/${coverArtFolder}/${coverArtFileName}.${fileType}`
    const coverArtFolder = passingImageData.coverArtFolder
    const coverUrl = passingImageData.coverUrl
    const fileType = passingImageData.fileType
    const firebaseStorageConsoleName = passingImageData.firebaseStorageConsoleName
    const folderName = passingImageData.folderName
    const gameNameFolder = passingImageData.gameNameFolder
    const sortedGameName = passingImageData.sortedGameName
    const subFolderName = passingImageData.subFolderName
    fetch(coverUrl)
        .then(res => {
            return res.blob()
        })
        .then(blob => {
            //uploading blob to firebase storage
            firebase.storage().ref().child(coverArtFileRoute).put(blob).then(function(snapshot) {
                return snapshot.ref.getDownloadURL()
            })
            .then(url => {
                passingImageData.setFirebaseCoverUrl(url) 
            }) 
        })
        .catch(error => {
        console.error(error)
        })
}

    function screenshotUpload(passingImageData) {
        let sgGameScreenshot1Data = {...passingImageData, imageNumber: 1, imageName: passingImageData.gameScreenshot1, imageUrl: passingImageData.screenshot1Url, gameNameCharCount: passingImageData.gameNameFolder.length}
        let sgGameScreenshot2Data = {...passingImageData, imageNumber: 2, imageName: passingImageData.gameScreenshot2, imageUrl: passingImageData.screenshot2Url, gameNameCharCount: passingImageData.gameNameFolder.length}
        let sgGameScreenshot3Data = {...passingImageData, imageNumber: 3, imageName: passingImageData.gameScreenshot3, imageUrl: passingImageData.screenshot3Url, gameNameCharCount: passingImageData.gameNameFolder.length}
        // Create 3 separate if/else statement that only returns the number of available images. 
        //Do this by passing a prop (through all these functions) that indicate the imageCount
        if(passingImageData.gameNameImageCount == 1) {
            const screenShotDataArray = [sgGameScreenshot1Data];
            return (     
                screenShotDataArray.forEach(setFirebaseScreenShotData)
            )
        }
        if(passingImageData.gameNameImageCount == 2) {
            const screenShotDataArray = [sgGameScreenshot1Data, sgGameScreenshot2Data];
            return (     
                screenShotDataArray.forEach(setFirebaseScreenShotData)
            )
        }
        if(passingImageData.gameNameImageCount == 3) {
            const screenShotDataArray = [sgGameScreenshot1Data, sgGameScreenshot2Data, sgGameScreenshot3Data];
            return (     
                screenShotDataArray.forEach(setFirebaseScreenShotData)
            )
        }
    }

    function setFirebaseScreenShotData(item) {
        screenshotImageCapture(item)
    }

    function screenshotImageCapture(item) {
        const fileType = item.fileType
        const firebaseStorageConsoleName = item.firebaseStorageConsoleName
        const folderName = item.folderName
        const gameNameFolder = item.gameNameFolder
        const gameNameLength = item.gameNameCharCount
        const screenshotFileName = `${gameNameFolder.substring(0, gameNameLength)}-(screenshot${item.imageNumber})`
        const screenshotFileRoute = `${folderName}/${firebaseStorageConsoleName}/${subFolderName}/${sortedGameName}/${gameNameFolder}/${screenshotFolder}/${screenshotFileName}.${fileType}`
        const screenshotFolder = item.screenshotFolder
        const screenshotUrl = item.imageUrl
        const sortedGameName = item.sortedGameName
        const subFolderName = item.subFolderName
        fetch(screenshotUrl)
            .then(res => {
                return res.blob()
            })
            .then(blob => {
                //uploading blob to firebase storage
                firebase.storage().ref().child(screenshotFileRoute).put(blob).then(function(snapshot) {
                    return snapshot.ref.getDownloadURL()
                })
                .then(url => {
                    if (item.imageNumber == 1) return item.setFirebaseScreenshot1Url(url)
                    if (item.imageNumber == 2) return item.setFirebaseScreenshot2Url(url)
                    if (item.imageNumber == 3) return item.setFirebaseScreenshot3Url(url)
                }) 
            })
            .catch(error => {
            console.error(error)
            })
    }

export const confirmGame = {
    buttonGroup,
    buttonGroupImages,
    chooseImages,
    chosenImages,
    coverImageCapture,
    gameConfirmationResults,
    gameModesResults,
    gameResults,
    gameSummaryResults,
    imgWordingSelector,
    screenshotUpload,
    starRatingSystem,
}

export const confirmGameContext = React.createContext(confirmGame)