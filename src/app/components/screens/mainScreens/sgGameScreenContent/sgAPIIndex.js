import React, { useContext } from 'react';
import { View, Button } from 'react-native'
import { AppWideImageContext, SearchGameTitle, SearchGameData } from 'index';

export function setImage(imageWidth, imageHeight, imageUrl) {
    const images = useContext(AppWideImageContext)
    const imageData = {
        height: imageHeight,
        width: imageWidth,
        source: imageUrl,
        transition: 1000
    }
    return images.sgAPISetImage(imageData)
}

export function modalConfirmation(resetConfirmation, setConfirmation) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button
                onPress={() => resetConfirmation}
                title="No"
            />
            <Button
                onPress={() => setConfirmation}
                title="Yes"
            />
        </View>
    )
}

function searchGameImage(item) {
    const images = useContext(AppWideImageContext)
    const imageData = {
        height: 180,
        width: null,
        marginHorizontal: 20,
        marginTop: 20,
        contentFit: 'cover',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 3,
        source: item.gameImages.gameplay[0],
        transition: 1000
    }
    return images.sgAPISearchGameImage(imageData)
}

function searchGameCoverImage(item) {
    const images = useContext(AppWideImageContext)
    const imageData = {
        height: 150,
        width: 120,
        borderRadius: 25 / 2,
        justifyContent: 'flex-end',
        source: item.gameImages.coverArt,
        contentFit: 'stretch',
        transition: 1000
    }
    return images.sgAPISearchCoverArtImage(imageData)
}

export function searchGameIcon(colors, item) {
    return (
        <View>
            <View>
                {searchGameImage(item)}
            </View>
            <View style={{ 
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                flexWrap:'wrap',
                height: 180,
                opacity: 0.65,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                backgroundColor: colors.primaryColorLight,
                zIndex: 2,
                width: '90.5%',
                position: 'absolute',
                right: 0
            }}/>
            <View style={{ 
                marginLeft: 20,
                marginRight: 20,
                marginTop: 200,
                flexWrap:'wrap',
                height: 120,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: colors.primaryColorLight,
                zIndex: 2,
                width: '90.5%',
                position: 'absolute',
                right: 0
            }}/>

            {/* Top Row */}
                <View style={{flexDirection:'row', zIndex: 4, position: 'absolute', marginTop: 35, paddingLeft: 260}}> 
                    {searchGameCoverImage(item)}
                </View>
            {/* ------- */}
            {/* Bottom Row */}
                <View style={{flexDirection:'row', zIndex: 4, position: 'absolute', marginTop: 210}}> 
                    <View style={{ flex: 1 }}>
                        <View style={{flexDirection:'row'}}>
                            <SearchGameTitle style={{flex:1, textAlign: 'left', marginLeft: 40, fontSize: (item.name).length <= 20 ? 15 : 9}}>{item.name}</SearchGameTitle>
                            <SearchGameData style={{flex:1, textAlign: 'right', marginRight: 40}}>{item.platform}</SearchGameData>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <SearchGameData style={{flex:1, textAlign: 'left', marginLeft: 40}}>{item.releaseDate}</SearchGameData>
                            <SearchGameData style={{flex:1, textAlign: 'right', marginRight: 40}}>{item.publisher}</SearchGameData>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <SearchGameData style={{flex:1, textAlign: 'left', marginLeft: 40}}>{item.rating}</SearchGameData>
                        </View>
                    </View>
                </View>
                {/* ------- */}
            </View>
    )
}
    