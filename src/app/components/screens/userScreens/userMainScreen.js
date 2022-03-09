import React from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native';

export default function UserAddGameScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                <MainFont>
                    Add Games
                </MainFont>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}