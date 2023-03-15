
import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import {
    useAuth,
    TouchableButton,
    TouchableButtonFont,
    MainFont,
    CurrentThemeContext
} from 'index'

export default function UserProfileScreen({navigation}) {
    const { currentUser, logOut } = useAuth()
    console.log("🚀 ~ file: UserProfileScreen.js:14 ~ UserProfileScreen ~ currentUser:", currentUser)
    const colors = useContext(CurrentThemeContext)
    const [error, setError] = useState('')

    function onUpdateUser() {
        navigation.navigate('Update Account')
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
                        <MainFont>{JSON.stringify(currentUser.uid)}</MainFont>
                        <MainFont>{JSON.stringify(currentUser.email)}</MainFont>
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