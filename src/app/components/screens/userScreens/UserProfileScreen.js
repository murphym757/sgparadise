
import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../authScreens/authContext'
import { // App Styling
    TouchableButton,
    TouchableButtonFont
  } from '../../../../../assets/styles/authScreensStyling'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

export default function UserProfileScreen({navigation}) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState('')

    function onUpdateUser() {
        navigation.navigate('UserProfileScreen')
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
        <View style={{ flex: 1, backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Account Screen</Text>
            {currentUser !== null
                ?   <View>
                        <Text>{error}</Text>
                        <Text>{JSON.stringify(currentUser)}</Text>
                        <TouchableButton 
                            onPress={() => onUpdateUser()}>
                            <TouchableButtonFont>Account</TouchableButtonFont>
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