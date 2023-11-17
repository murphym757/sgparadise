import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native'
import { MainHeadingLongTitle, MainSubFont } from 'index';

export function SgGameListings(props) {
    const sectionTitle = props.sectionTitle
    const sectionDescription = props.sectionDescription
    const homeScreenGameArray = props.homeScreenGameArray
    const images = props.images
    //* Game Listing images
        function gameListingImageData(item) {
            const imageData = {
                height: 200,
                width: 150,
                contentFit: 'cover',
                borderRadius: 10,
                source: item.firebaseCoverUrl,
                transition: 1000
            }
            return images.sgAPISearchCoverArtImage(imageData)
        }
    //*-----Game Listing images-----*//

    function gameListings() {
        return (
            <View>
                <MainHeadingLongTitle>{sectionTitle}</MainHeadingLongTitle>
                <MainSubFont>{sectionDescription}</MainSubFont>
                <FlatList
                    horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={homeScreenGameArray} //* <------This is where the array goes. Pass it in here
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{  
                            alignItems:'center',
                            justifyContent:'center',
                            margin: 10
                        }}>
                            <View style={{
                                margin: 5,
                                flexDirection: "row", 
                                justifyContent: "center"
                            }}> 
                                {gameListingImageData(item)}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    return (
        gameListings()
    )
}