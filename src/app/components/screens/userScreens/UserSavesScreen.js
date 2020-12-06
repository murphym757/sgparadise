import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling
import {
  MainContainer,
  MainFont
} from '../index.js'

export default function UserSavesScreen() {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
        {currentUser !== null
        ?   <View style={{ flex: 1 }}>
                <MainFont>Saves Screen</MainFont>
                <Text>Logged In</Text>
            </View>
        :   <View style={{ flex: 1 }}>
                <MainFont>Saves Screen</MainFont>
                <Text>Not Logged In</Text>
            </View>
        } 
    </SafeAreaView>
  );
}