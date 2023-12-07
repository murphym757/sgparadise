import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native'
import { ContentContainerMainHeading, MainHeading, ContentContainer, MainHeadingLongTitle, MainSubFont, faStar, MainFont, FontAwesomeIcon } from 'index';
    
    function charLengthSet(nameValue, nameLength, maxNameLength, nameLengthSet) {
        if (nameLength < maxNameLength) {
            return (
                <MainFont>{nameValue}</MainFont>
            )
        } else {
            return (
                <MainFont>{nameValue.substring(0, nameLengthSet) + '...'}</MainFont>
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
                        ? charLengthSet(item.gameName, item.gameName.length, 21, 21) 
                        : charLengthSet(item.gameName, item.gameName.length, 15, 15)
                    }
                    {}
                </View>
                <View style={{paddingVertical: 5}}>
                    <MainFont>{formattedReleaseDate(item.gameReleaseDate)}</MainFont>
                </View>
                <View style={{paddingVertical: 5}}>
                    <MainFont>{item.gameRating} <FontAwesomeIcon icon={ faStar } color={colors.secondaryColor} size={12} /></MainFont>
                </View>
                <View style={{paddingTop: 5}}>
                    <MainFont>{item.consoleName}</MainFont>
                </View>
            </View>
        )
    }

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
            {spotlightGrid === true ? (imageData.height = 300, imageData.width = 200) : null}
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
                            <TouchableOpacity 
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
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        )
    }

    //* Spotlight Section
        function spotlightImageData(spotlightGame, images) {
            const imageData = {
                height: 400,
                width: 400,
                contentFit: 'cover',
                borderRadius: 5,
                source: spotlightGame.firebaseScreenshot1Url,
                transition: 1000
            }
            return images.sgAPISearchCoverArtImage(imageData)
        }

        function spotlightGameGroup(spotlightDescription, spotlightGameName, LinearGradient, spotlightGame, images, colors) {
            return (
                <View style={{paddingVertical: 25}}> 
                    <MainHeading>{spotlightDescription}</MainHeading>
                    <ContentContainer style={{ position: "relative" }}>
                        {spotlightImageData(spotlightGame, images)}
                        <LinearGradient
                            // Background Linear Gradient
                            colors={[colors.primaryColor, 'transparent']}
                            style={{
                                position: 'absolute',
                                borderRadius: 5,
                                width: 400,
                                height: 400,
                                transition: 1000,
                            }}
                            locations={[1, 0.5]}
                        />
                    </ContentContainer>
                    <MainHeading style={{color: colors.secondaryFontColor}}>{spotlightGameName}</MainHeading>
                </View>
            )
        }
    //*---Spotlight Section

export const homeScreenListingData = {
    spotlightGameGroup,
    gameListings
}

export const homeScreenListingsContext = React.createContext(homeScreenListingData)