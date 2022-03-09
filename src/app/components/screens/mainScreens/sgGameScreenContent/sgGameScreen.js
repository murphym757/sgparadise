import React, { useContext } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';

import {
    CurrentThemeContext,
    FontAwesomeIcon,
    faChevronLeft
} from 'index'
export default function GameScreen({navigation}) {
    const colors = useContext(CurrentThemeContext)
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <FontAwesomeIcon 
        icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
        onPress={() => navigation.goBack('Main')}
    />
        <MainFont>
            Game Page
        </MainFont>
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

