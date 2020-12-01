import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

export default function SgHomeScreen() {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor  }}>
        <ScrollView 
            scrollEventThrottle={16}
        >
        <View style={{ flex: 1 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text>
                        Home Page
                    </Text>
                    {currentUser !== null
                        ?   <View>
                                <Text>Logged In</Text>
                        </View>
                        :   <View>
                                <Text>Not Logged In</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
    