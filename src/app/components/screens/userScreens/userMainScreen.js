import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'


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
  );
}