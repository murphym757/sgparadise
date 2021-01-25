import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Image
} from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import {
    SearchGameTitle,
    SearchGameData
} from '../../index'

export default function SgSearchQuery(props) {
    const colors = useContext(CurrentThemeContext)
    let gameCharacterLength = (props.name).length
    const gameNameFont = gameCharacterLength <= 20 ? 15 : 9

    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            marginBottom: 120
          }}>
            <View>
                <Image 
                    source={{uri: "" + props.gameplayImage + ""}}
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
                    source={{uri: "" + props.coverArt + ""}}
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
                        <SearchGameTitle style={{flex:1, textAlign: 'left', marginLeft: 40, fontSize: gameNameFont}}>{props.name}</SearchGameTitle>
                        <SearchGameData style={{flex:1, textAlign: 'right', marginRight: 40}}>{props.platform}</SearchGameData>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <SearchGameData style={{flex:1, textAlign: 'left', marginLeft: 40}}>{props.releaseDate}</SearchGameData>
                        <SearchGameData style={{flex:1, textAlign: 'right', marginRight: 40}}>{props.publisher}</SearchGameData>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <SearchGameData style={{flex:1, textAlign: 'left', marginLeft: 40}}>{props.rating}</SearchGameData>
                    </View>
                </View>
            </View>
        </View>
    )
}