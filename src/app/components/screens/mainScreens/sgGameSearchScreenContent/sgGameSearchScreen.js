import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image, 
    ScrollView, 
    SafeAreaView 
} from 'react-native'
import axios from 'axios'


export default function SgGameSearchScreen({navigation, route}) {
    const [userSearchSelected, setUserSearchSelected] = useState(false)
    const [addGameSelected, setAddGameSelected] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Text>Search bar goes here</Text>
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                <Text>
                    Add Games
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}