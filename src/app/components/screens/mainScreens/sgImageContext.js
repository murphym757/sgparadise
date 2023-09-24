import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { 
    MainFont, 
    MainHeading, 
    MainHeadingLongTitle, 
    ViewTopRow, 
    Container, 
    ContentContainer,
    CarouselCardBody,
    CarouselCardContainer,
    CarouselCardHeader,
    CarouselCardImage,
    PlatformCard,
    SliderWidth,
    Styles
} from 'index'

function gamePageCoverImage(imageData, imageChosen) {
    return (
        <View>
            <Image
                style={{
                    height: imageData.height,
                    width: imageData.width,
                    borderRadius: imageData.borderRadius,
                }}
                source={`${imageChosen}`}
                contentFit={`${imageData.contentFit}`}
                transition={imageData.transition}
            />
        </View>
    )
}

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

export const imageData = {
    gamePageCoverImage,
    gamePageGameplayImages
}

export const AppWideImageContext = React.createContext(imageData)