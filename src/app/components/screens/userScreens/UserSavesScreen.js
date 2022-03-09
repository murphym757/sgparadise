import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useAuth } from 'auth/authContext'
import { MainFont } from 'index';

export default function UserSavesScreen() {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
        {currentUser !== null
        ?   <View style={{ flex: 1 }}>
                <MainFont>Saves Screen</MainFont>
                <MainFont>Logged In</MainFont>
            </View>
        :   <View style={{ flex: 1 }}>
                <MainFont>Saves Screen</MainFont>
                <MainFont>Not Logged In</MainFont>
            </View>
        } 
    </SafeAreaView>
  )
}