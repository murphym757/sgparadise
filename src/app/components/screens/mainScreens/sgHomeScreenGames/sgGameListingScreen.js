import React from 'react';
import { View, Pressable, FlatList, Dimensions } from 'react-native'
import { ContentContainerMainHeading, MainHeading, ContentContainer, MainHeadingLongTitle, MainSubFont, faStar, MainFont, FontAwesomeIcon } from 'index';
    
    function charLengthSet(nameValue, nameLength, maxNameLength, nameLengthSet, FontOption, fontColor) {
        if (nameLength < maxNameLength) {
            return (
                <FontOption style={{color: fontColor}}>{nameValue}</FontOption>
            )
        } else {
            return (
                <FontOption style={{color: fontColor}}>{nameValue.substring(0, nameLengthSet) + '...'}</FontOption>
            )
        }
    }

    function formattedReleaseDate(item) {
        const date = item
        const parts = date.split("/")
        const month = parseInt(parts[0], 10).toString()
        const day = parseInt(parts[1], 10).toString()
        const year = parts[2].substring(2)
        const formattedDate = `${month}/${day}/${year}`

        return formattedDate
    }
    function gameListingTextData(item, spotlightGrid, colors) {
        return (
            <View>
                <View style={{paddingVertical: 5}}>
                    {spotlightGrid === true 
                        ? charLengthSet(item.gameName, item.gameName.length, 21, 21, MainFont, colors.primaryFontColor) 
                        : charLengthSet(item.gameName, item.gameName.length, 15, 15, MainFont, colors.primaryFontColor)
                    }
                    {}
                </View>
                <View style={{paddingVertical: 5}}>
                    <MainFont>{formattedReleaseDate(item.gameReleaseDate)}</MainFont>
                </View>
                <View style={{paddingVertical: 5}}>
                    <MainFont>{item.gameRating} <FontAwesomeIcon icon={ faStar } color={colors.secondaryFontColor} size={12} /></MainFont>
                </View>
                <View style={{paddingTop: 5}}>
                    <MainFont>{item.consoleName}</MainFont>
                </View>
            </View>
        )
    }

    //* Image Resizing
        function imageResize(screenWidth, imageData, height, width) {
            const windowWidth = Dimensions.get('window').width
            return (
                windowWidth === screenWidth ? (imageData.height = height, imageData.width = width) : null
            )
        }
    //*-----Image Resizing-----*//

    //* Game Listing images
        function gameListingImageData(item, images, spotlightGrid) {
            const imageData = {
                height: 200,
                width: 150,
                contentFit: 'cover',
                borderRadius: 5,
                source: item.firebaseCoverUrl,
                transition: 1000
            }
            {imageResize(1024, imageData, 300, 200)}   
            return images.sgAPISearchCoverArtImage(imageData)
        }
    //*-----Game Listing images-----*//
    function gameListings(sectionTitle, sectionDescription, homeScreenGameArray, images, spotlightGrid, colors) {
        return (
            <View>
                <View style={{paddingVertical: 10}}> 
                    <MainHeadingLongTitle>{sectionTitle}</MainHeadingLongTitle>
                    <MainSubFont>{sectionDescription}</MainSubFont>
                    <FlatList
                        horizontal={true}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={homeScreenGameArray} //* <------This is where the array goes. Pass it in here
                        keyboardShouldPersistTaps="always"
                        renderItem={({ item }) => ( //* <-------This is a entire set of game listings
                            <Pressable 
                                key={item.id} 
                                style={{  
                                alignItems:'center',
                                justifyContent:'center',
                                margin: 10
                            }}>
                                <View style={{ //* <-------This is a single game listing
                                    margin: 5,
                                    //flexDirection: "row", 
                                    justifyContent: "center"
                                }}> 
                                    {gameListingImageData(item, images, spotlightGrid)}
                                    {gameListingTextData(item, spotlightGrid, colors)}
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
        )
    }

    //* Spotlight Section
        function spotlightImageData(spotlightGame, images) {
            const imageData = {
                height: 200,
                width: 380,
                contentFit: 'cover',
                borderRadius: 10,
                source: spotlightGame.firebaseScreenshot1Url,
                transition: 1000
            }
            {imageResize(1024, imageData, 487, 922)}
            return images.sgAPISearchCoverArtImage(imageData)
        }

        //* Work on the appearance of the spotlight section, specifically the font structure and placement
        function setImageSize() {
            const deviceWidths = [
                1024,
                768,
                428,
                390,
                414,
                414,
                414,
                375,
                375,
                375,
                375,
                320
            ];
            return deviceWidths
        }
        function gameOfTheMonthHeadingSection(spotlightGameName, spotlightGameNameLength, MainHeading, colors, spotlightDescription) {
            const windowWidth = Dimensions.get('window').width
            return (
                <View style={{
                    position: 'absolute', 
                    bottom: 0, 
                    zIndex: 1, 
                    paddingBottom: windowWidth === 1024 ? 25 : null || windowWidth === 768 ? 12.5 : null
                }}>
                    <MainHeading style={{
                        color: colors.offWhite,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                    {(spotlightGameName === undefined) 
                        ? spotlightGameName
                        : charLengthSet(spotlightGameName, spotlightGameNameLength, 52, 52, MainHeading, colors.offWhite)}
                    </MainHeading>
                    <MainSubFont style={{color: colors.secondaryColor}}>
                        {spotlightDescription}
                    </MainSubFont>
                </View>
            )
        }
        function spotlightGameGroup(spotlightGameName, spotlightDescription, spotlightGameNameLength, LinearGradient, spotlightGame, images, colors) {
            const windowWidth = Dimensions.get('window').width
            const universalBorderRadius = 10
            return (
            <ContentContainer style={{ paddingTop: 25, position: 'relative' }}> 
                    <View style={{ position: "relative", overflow: 'hidden', borderTopLeftRadius: universalBorderRadius, borderTopRightRadius: universalBorderRadius }}>
                        {spotlightImageData(spotlightGame, images)}
                        <LinearGradient
                            // Background Linear Gradient
                            colors={[colors.primaryColor, 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', colors.primaryColor, colors.primaryColor]}
                            style={{
                                position: 'absolute',
                                borderRadius: universalBorderRadius,
                                height: windowWidth === 1024 ? 487 : 200,
                                width: windowWidth === 1024 ? 922 :  380,
                                transition: 1000,
                            }}
                            locations={[1, 0.4, 0.6, 0.8, 0.8, 0.8, 0.9, 1]}
                        />
                        {gameOfTheMonthHeadingSection(spotlightGameName, spotlightGameNameLength, MainHeading, colors, spotlightDescription)}
                    </View>
                </ContentContainer>
            )
        }
    //*---Spotlight Section

export const homeScreenListingData = {
    spotlightGameGroup,
    gameListings
}

export const homeScreenListingsContext = React.createContext(homeScreenListingData)