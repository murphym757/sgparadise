import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native'
import { MainHeadingLongTitle, MainSubFont } from 'index';

export function SgGameListings(images, gameGroups) {
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

    function gameListings(gameListingData) {
        const sectionTitle = gameListingData.sectionTitle
        const sectionDescription = gameListingData.sectionDescription
        
        return (
            <View>
                <MainHeadingLongTitle>{sectionTitle}</MainHeadingLongTitle>
                <MainSubFont>{sectionDescription}</MainSubFont>
                <FlatList
                    horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={gameListingData.listingArray}
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

    function gameListingStructure(sectionHeadingsGenre, sectionHeadingsSubGenre, listingArray) {
        const currentGameListing = sectionHeadingsGenre.find(obj => obj.sectionHeadingData.sectionSubGenre === sectionHeadingsSubGenre)
        const gameListingData = {
            sectionTitle: currentGameListing.sectionHeadingData.sectionTitle,
            sectionDescription: currentGameListing.sectionHeadingData.sectionDescription,
            listingArray: listingArray
        }
        return (
            gameListings(gameListingData)
        )
    }

    //* Array of games to be passed to gameListingStructure
        function gameListingArray(arrayOfGames) {
            const listingSections = arrayOfGames
            const detailedListingSections = [
                { id: 1, listingSection: listingSections[0] },
                { id: 2, listingSection: listingSections[1] },
                { id: 3, listingSection: listingSections[2] },
                { id: 4, listingSection: listingSections[3] },
                { id: 5, listingSection: listingSections[4] },
            ];
        
            return detailedListingSections.map((detailedListingSection) => (
                <React.Fragment key={detailedListingSection.id}>
                    {detailedListingSection.listingSection}
                </React.Fragment>
            ));
        }
    //*-----Array of Games-----*//

    //* IMPORTANT: This is the only item that actually changes
    //* While low, there is a possibility that this function will return the same game listing multiple times
    function randomlyReturnGameListings() {
        const sectionHeadingsArray = [
            gameGroups.actionSectionHeadings,
            gameGroups.educationalSectionHeadings,
            gameGroups.strategySectionHeadings,
            gameGroups.sportsSectionHeadings,
            gameGroups.rpgSectionHeadings,
            gameGroups.simulationSectionHeadings
        ];
        
        const randomGameListings = [];
        
        for (let i = 0; i < 5; i++) {
            const randomSectionHeadings = sectionHeadingsArray[Math.floor(Math.random() * sectionHeadingsArray.length)];
            const randomSubGenre = randomSectionHeadings[Math.floor(Math.random() * randomSectionHeadings.length)].sectionHeadingData.sectionSubGenre;
            const gameListing = gameListingStructure(randomSectionHeadings, randomSubGenre);
            randomGameListings.push(gameListing);
        }
        
        return randomGameListings;
    }

    return (
        gameListingArray(randomlyReturnGameListings())
    )
}