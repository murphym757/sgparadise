import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'

function appWideGeneralImageStyling(imageProp1, imageProp2, imageProp3) {
    //* imageProp1 = Everything besides Source
    //* imageProp2 = Source
    //* imageProp3 = Only for marginVertical
    return (
        <View>
            <Image
                style={{
                    height: imageProp1.height,
                    width: imageProp1.width,
                    borderRadius: imageProp1.borderRadius,
                    marginVertical: imageProp3
                }}
                source={ `${imageProp2}`}
                contentFit={`${imageProp1.contentFit}`}
                transition={imageProp1.transition}
            />
        </View>
    )
}

// Header Logo (Header)
function HeaderLogo(logoImageData) {
    return appWideGeneralImageStyling(logoImageData, logoImageData.logoLink, null)
}

// Cover image (Home Screen) 
function detailedGameCover(imageData, coverLink) {
    return appWideGeneralImageStyling(imageData, coverLink, null)
}

// Platform Logo (Home Screen) 
function detailedPlatformLogo(item, imageData) {
    return appWideGeneralImageStyling(imageData, item, null)
}

// Spotlight Gameplay Image (Home Screen) 
function detailedGameScreenshot(imageDataScreenshot, item) {
    return appWideGeneralImageStyling(imageDataScreenshot, item, null)
}

// Game Page Cover Image
function gamePageCoverImage(imageData, imageChosen) {
    return appWideGeneralImageStyling(imageData, imageChosen, null)
}

// Game Page Gameplay Image Big Display
function gamePageGameplayImageBigDisplay(imageData, imageChosen) {
    return appWideGeneralImageStyling(imageData, imageChosen, null)
}

// Game Cover Image for Confirmation Screen (Confirmation Screen)
function gameCoverImageConfirmationScreen(imageData) {
    return appWideGeneralImageStyling(imageData, imageData.source, imageData.marginVertical)
}

// Game Page Gameplay Images
function gamePageGameplayImages(imageData, item) {
    return (
        <View>
            <Image
                style={{
                    height: imageData.height,
                    width: imageData.width,
                    borderRadius: imageData.borderRadius,
                    borderWidth: imageData.borderWidth,
                    borderColor: imageData.borderColor,
                }}
                source={`${item}`}
                contentFit={`${imageData.contentFit}`}
                transition={imageData.transition}
            />
        </View>
    )
}

function gameSelectionImageStyling(imageData, item, setIsLoading) {
    return (
        <Image
            style={{
                height: imageData.height,
                width: imageData.width,
                marginVertical: imageData.marginVertical,
                borderRadius: imageData.borderRadius,
                borderWidth: imageData,
                borderColor: imageData.borderColor,
            }}
            source={ `https://images.igdb.com/igdb/image/upload/t_1080p/${item}.jpg` }
            contentFit={`${imageData.contentFit}`}
            transition={imageData.transition}
            onLoadStart={() => {setIsLoading(true)}}
            onLoadEnd={() => {setIsLoading(false)}}
        />
    )
}

// Choose (and Chosen) images to display (Gameplay images to upload)
function gameSelectionPageGameplayImages(imageData, item, setIsLoading) {
    return gameSelectionImageStyling(imageData, item, setIsLoading)
}

// Cover image (Gameplay images to upload)
function gameSelectionCoverImage(imageData, item, setIsLoading) {
    return gameSelectionImageStyling(imageData, item, setIsLoading)
}

// Console List
function consoleListImageStyling(imageData, item, setIsLoading) {
    return (
        <Image
            style={{
                height: imageData.height,
                width: imageData.width,
                marginVertical: imageData.marginVertical,
            }}
            source={ `${item.systemLogoSelectedDay}` }
            contentFit={`${imageData.contentFit}`}
            transition={imageData.transition}
            onLoadStart={() => {setIsLoading(true)}}
            onLoadEnd={() => {setIsLoading(false)}}
        />
    )
}

function basicImageStyling(imageData) {
    return (
        <Image
            style={{
                height: imageData.height,
                width: imageData.width,
            }}
            source={ `${imageData.source}` }
            transition={imageData.transition}
        />
    )
}

//Game Search Screen (Choose Console)
function chooseConsoleImage(imageData) {
    return basicImageStyling(imageData)
}

//IGDB Game Search Console List
function igdbConsoleListImage(imageData) {
    return basicImageStyling(imageData)
}

//sgAPI SetImage
function sgAPISetImage(imageData) {
    return basicImageStyling(imageData)
}


function sgAPISearchGameImage(imageData) {
    return (
        <Image
            style={{
                height: imageData.height,
                width: imageData.width,
                marginHorizontal: imageData.marginHorizontal,
                marginTop: imageData.marginTop,
                borderTopLeftRadius: imageData.borderTopLeftRadius,
                borderTopRightRadius: imageData.borderTopRightRadius,
                zIndex: imageData.zIndex,
            }}
            source={ `${imageData.source}` }
            contentFit={`${imageData.contentFit}`}
            transition={imageData.transition}
        />
    )
}

function sgAPISearchCoverArtImage(imageData) {
    return (
        <Image 
            style={{ 
                height: imageData.height,
                width: imageData.width,
                borderRadius: imageData.borderRadius,
                justifyContent: imageData.justifyContent
            }}
            source={ `${imageData.source}` }
            contentFit={`${imageData.contentFit}`}
            transition={imageData.transition}
        />
    )
}

export const imageData = {
    HeaderLogo,
    detailedGameCover,
    detailedPlatformLogo,
    detailedGameScreenshot,
    gamePageCoverImage,
    gameCoverImageConfirmationScreen,
    gamePageGameplayImages,
    gamePageGameplayImageBigDisplay,
    gameSelectionPageGameplayImages,
    gameSelectionCoverImage,
    consoleListImageStyling,
    chooseConsoleImage,
    igdbConsoleListImage,
    sgAPISetImage,
    sgAPISearchGameImage,
    sgAPISearchCoverArtImage
}

export const AppWideImageContext = React.createContext(imageData)