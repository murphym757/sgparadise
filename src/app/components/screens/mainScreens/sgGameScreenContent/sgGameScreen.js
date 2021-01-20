import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'

import {
    CurrentThemeContext,
    FontAwesomeIcon,
    faChevronLeft
} from '../../index'
export default function GameScreen({navigation}) {
    const colors = useContext(CurrentThemeContext)
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <FontAwesomeIcon 
        icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
        onPress={() => navigation.goBack('Main')}
    />
        <Text>
            Game Page
        </Text>
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

