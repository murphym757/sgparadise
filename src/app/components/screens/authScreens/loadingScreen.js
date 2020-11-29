import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native' //Loader

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
    let currentTime = new Date();
    let time = currentTime.getHours();
    if (time >= 17 || time < 7) {
      return night;
    } else {
      return day;
    }
  }

export function loadingScreen() {
    const baseLink = "../../../../../assets/images/"
    const dayImage = baseLink + "lottieLoadingDay.json"
    const nightImage = baseLink + "lottieLoadingNight.json"

    function loadingIcon() {
      let currentTime = new Date();
      let time = currentTime.getHours();
      if (time >= 17 || time < 7) {
        return <LottieView 
          source={require(nightImage)}
          style={{ width: 200, height: 200, }}
          autoPlay 
          loop
        />
      } else {
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
