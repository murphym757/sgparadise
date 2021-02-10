import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { imagesConfig } from '../../../../../server/config/config'

// App Styling
import {
    Container,
    MainFont,
    TestImageDB,
    SearchGameTitle,
    SearchGameData
} from '../../index'

export function consoleImages() {
    let currentTime = new Date();
    let time = currentTime.getHours();
    const dayImages = [
        { id: '0', systemLogo: imagesConfig.sgallDayImage, systemLogoSelected: imagesConfig.sgallDayImagePicked, gbId:[6,141,31,29,5,8], igdbId: [29,84,30,78,35,64] },
        { id: '1', systemLogo: imagesConfig.sggDayImage, systemLogoSelected: imagesConfig.sggDayImagePicked, gbId: 6, igdbId: 29 },
        { id: '2', systemLogo: imagesConfig.sg1000DayImage, systemLogoSelected: imagesConfig.sg1000DayImagePicked, gbId: 141, igdbId: 84 },
        { id: '3', systemLogo: imagesConfig.sg32xDayImage, systemLogoSelected: imagesConfig.sg32xDayImagePicked, gbId: 31, igdbId: 30 },
        { id: '4', systemLogo: imagesConfig.sgcdDayImage, systemLogoSelected: imagesConfig.sgcdDayImagePicked, gbId: 29, igdbId: 78 },
        { id: '5', systemLogo: imagesConfig.sgggDayImage, systemLogoSelected: imagesConfig.sgggDayImagePicked, gbId: 5, igdbId: 35 },
        { id: '6', systemLogo: imagesConfig.sgmsDayImage, systemLogoSelected: imagesConfig.sgmsDayImagePicked, gbId: 8, igdbId: 64  },
      ];
    const nightImages = [
        { id: '0', systemLogo: imagesConfig.sgallNightImage, systemLogoSelected: imagesConfig.sgallNightImagePicked, gbId:[6,141,31,29,5,8], igdbId: [29,84,30,78,35,64] },
        { id: '1', systemLogo: imagesConfig.sggNightImage, systemLogoSelected: imagesConfig.sggNightImagePicked, gbId: 6, igdbId: 29  },
        { id: '2', systemLogo: imagesConfig.sg1000NightImage, systemLogoSelected: imagesConfig.sg1000NightImagePicked, gbId: 141, igdbId: 84 },
        { id: '3', systemLogo: imagesConfig.sg32xNightImage, systemLogoSelected: imagesConfig.sg32xNightImagePicked, gbId: 31, igdbId: 30 },
        { id: '4', systemLogo: imagesConfig.sgcdNightImage, systemLogoSelected: imagesConfig.sgcdNightImagePicked, gbId: 29, igdbId: 78 },
        { id: '5', systemLogo: imagesConfig.sgggNightImage, systemLogoSelected: imagesConfig.sgggNightImagePicked, gbId: 5, igdbId: 35 },
        { id: '6', systemLogo: imagesConfig.sgmsNightImage, systemLogoSelected: imagesConfig.sgmsNightImagePicked, gbId: 8, igdbId: 64 },
    ];
    if (time >= 17 || time < 7) {
        return nightImages
      } else {
        return dayImages
      }
   }

  export function setImage(imageWidth, imageHeight, imageUrl) {
    return (
        <Image
            style={{
                width: imageWidth,
                height: imageHeight
            }}
            source={{
                uri: "" + imageUrl + "",
            }}
        />
    )
}

export function modalConfirmation(confirmationPadding, imageConfirmation, buttonFontColor, resetConfirmation, setConfirmation) {
  return (
      <View style={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between'
      }}>
          <MainFont>You have selected</MainFont>
          <View style={{ padding: confirmationPadding }}>{imageConfirmation}</View>
          <MainFont style={{}}>Are you sure?</MainFont>
          <View style={{ flexDirection: 'row' }}>
              <Button
                  onPress={() => resetConfirmation}
                  title="No"
                  color={buttonFontColor}
              />
              <Button
                  onPress={() => setConfirmation}
                  title="Yes"
                  color={buttonFontColor}
              />
          </View>
      </View>
      
  )
}

export function consoleIconList(systemLogos) {
    return (
        <View>
            <View style={{flexDirection:'row'}}>
            </View>
            <Container>  
                <FlatList
                    data={systemLogos}
                    keyboardShouldPersistTaps='always' 
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                    renderItem={({ item }) => (
                    <View style={{
                        flex: 1,
                        margin: 5,
                        minWidth: 100,
                        maxWidth: 150,
                        height: 200,
                        maxHeight:304,
                    }}>
                        <TouchableOpacity onPress={() => setGameId(item)}>
                            <Image
                                style={{
                                    width: 150,
                                    height: 200
                                }}
                                source={{
                                    uri: "https://images.igdb.com/igdb/image/upload/t_1080p/" + item.image_id + ".jpg", 
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </Container>
        </View>
    )
}

export function searchGameIcon(colors, item) {
        return (
            <View>
                <View>
                    <Image
                        source={{
                            uri: item.gameImages.gameplay[0]
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
                            uri: item.gameImages.coverArt
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