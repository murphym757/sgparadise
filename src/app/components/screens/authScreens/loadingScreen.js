import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native' //Loader
import {
    dayTime,
    nightTime
} from '../index'

export function manualColorSet() {
    const day = {
      fontColor: 'rgb(31, 37, 41)',
      backgroundColor: 'rgb(224, 218, 214)',
      warningColor: 'rgb(103, 162, 162)' 
    }
    const night = {
      fontColor: 'rgb(224, 218, 214)',
      backgroundColor: 'rgb(31, 37, 41)',
      warningColor: 'rgb(103, 162, 162)' 
    }
    if (nightTime) {return night}
    if (dayTime) {return day}
  }

export function loadingScreen() {
    const baseLink = "../../../../../assets/images/"
    const dayImage = baseLink + "lottieLoadingDay.json"
    const nightImage = baseLink + "lottieLoadingNight.json"

    function loadingIcon() {
      if (nightTime) {
        return <LottieView 
          source={require(nightImage)}
          style={{ width: 200, height: 200, }}
          autoPlay 
          loop
        />
      }
      if (dayTime) {
        return <LottieView 
          source={require(dayImage)}
          style={{ width: 200, height: 200, }}
          autoPlay 
          loop
        />
      }
    }
    return (
        <View style={{backgroundColor: manualColorSet()}}>
            {loadingIcon()}
        </View>
    )
}
