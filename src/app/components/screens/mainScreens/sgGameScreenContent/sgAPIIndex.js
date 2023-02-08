import React from 'react'
import { View, Button, Image } from 'react-native'
import { SearchGameTitle, SearchGameData } from 'index';

export function setImage(imageWidth, imageHeight, imageUrl) {
  return (
      <Image
          style={{
              width: imageWidth,
              height: imageHeight
          }}
          source={{
              url: `${imageUrl}`,
          }}
      />
  )
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

export function searchGameIcon(colors, item) {
        return (
            <View>
                <View>
                    <Image
                        source={{
                            url: item.gameImages.gameplay[0]
                        }}
                        style={{ 
                        height: 180,
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 20,
                        flexWrap:'wrap',
                        resizeMode: 'cover', 
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        zIndex: 3
                    }}/>
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
                    <Image 
                        source={{
                            url: item.gameImages.coverArt
                        }}
                        style={{ 
                        height: 150, 
                        width: 120, 
                        resizeMode: 'stretch', 
                        borderRadius: 25 / 2,
                        justifyContent: 'flex-end'}}
                    />
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
            </View>
        )
    }
    