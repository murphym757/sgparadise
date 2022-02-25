
import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../authScreens/authContext'
import { // App Styling
    TouchableButton,
    TouchableButtonFont
  } from '../../../../../assets/styles/authScreensStyling'

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
            <MainFont>Account Screen</MainFont>
            {currentUser !== null
                ?   <View>
                        <MainFont>{error}</MainFont>
                        <MainFont>{JSON.stringify(currentUser)}</MainFont>
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
                        <MainFont>Not Logged In</MainFont>
                </View>
            }
            
        </View>
    )
}