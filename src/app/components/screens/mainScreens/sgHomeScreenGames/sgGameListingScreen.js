import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native'
import { MainHeadingLongTitle, MainSubFont, faStar, MainFont, FontAwesomeIcon } from 'index';

export function SgGameListings(props) {
    const sectionTitle = props.sectionTitle
    const sectionDescription = props.sectionDescription
    const homeScreenGameArray = props.homeScreenGameArray
    const images = props.images
    const color = props.colors
    const spotlightGrid = props.spotlightGrid
    const genreSpecFunc = props.genreSpecFunc
    //* Game Listing images
        function gameListingImageData(item) {
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

    function gameListingTextData(item) {
        return (
            <View>
                <View style={{paddingVertical: 5}}>
                    {spotlightGrid === true 
                        ? charLengthSet(item.gameName, item.gameName.length, 35, 35) 
                        : charLengthSet(item.gameName, item.gameName.length, 17, 17)
                    }
                    {}
                </View>
                <View style={{paddingVertical: 5}}>
                    <MainFont>{formattedReleaseDate(item.gameReleaseDate)}</MainFont>
                </View>
                <View style={{paddingVertical: 5}}>
                    <MainFont>{item.gameRating} <FontAwesomeIcon icon={ faStar } color={color.secondaryColor} size={12} /></MainFont>
                </View>
                <View style={{paddingTop: 5}}>
                    <MainFont>{item.consoleName}</MainFont>
                </View>
            </View>
        )
    }

    function gameListings() {
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
                                    {gameListingImageData(item)}
                                    {gameListingTextData(item)}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        )
    }

    return (
        gameListings()
    )
}