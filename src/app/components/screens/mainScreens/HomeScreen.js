
import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../authScreens/authContext'
import { // App Styling
    TouchableButton,
    TouchableButtonFont
  } from '../../../../../assets/styles/authScreensStyling'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

export default function HomeScreen({navigation}) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')

    function onUpdateUser() {
        navigation.navigate('Update User')
    }
    
    async function onHandleLogout() {
        setError('')
        try {
            await logOut()
            navigation.navigate('Login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            {currentUser !== null
                ?   <View>
                        <Text>{error}</Text>
                        <Text>{JSON.stringify(currentUser)}</Text>
                        <TouchableButton 
                            onPress={() => onUpdateUser()}>
                            <TouchableButtonFont>Update User</TouchableButtonFont>
                        </TouchableButton>
                        <TouchableButton 
                            onPress={() => onHandleLogout()}>
                            <TouchableButtonFont>Log Out</TouchableButtonFont>
                        </TouchableButton>
                </View>
                :   <View>
                        <Text>Not Logged In</Text>
                </View>
            }
            
        </View>
    )
}