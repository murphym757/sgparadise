
import React, { useState, useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import {
    useAuth,
    TouchableButton,
    TouchableButtonFont,
    MainFont,
    Container,
    MainSubFont,
    CurrentThemeContext
} from 'index'

export default function UserProfileScreen({navigation}) {
    const { 
        currentUser, 
        logOut, 
        addUserDataUsers, 
        updateUsernameFirestore, 
        updateUserEmailFirestore,
        updateUsernameAuth
     } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const userName = currentUser.displayName
    console.log("🚀 ~ file: userProfileScreen.js:25 ~ UserProfileScreen ~ userName:", userName)
    const userEmail = currentUser.email
    const newEmail = 'brickellLife@gmail.com'
    const newUsername = 'brickellLife'
    const userId = currentUser.uid
    const [error, setError] = useState('')

    function onUpdateUser() {
        navigation.navigate('Update Account')
    }
    
    async function onHandleLogout() {
        setError('')
        try {
            await logOut()
        } catch {
            setError('Failed to log out')
        }
    }
    
    function createUser() {
        logOut()
    }

    function changeUsername() {
        updateUsernameFirestore(userId, newUsername), 
        updateUsernameAuth(newUsername)
    }

    function unixTimestamp (date = Date.now()) {  
        return Math.floor(date / 1000)
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
          <Container style={{ flex: 1, justifyContent: 'center' }}>
            <MainSubFont>Account Page</MainSubFont>
            {currentUser !== null
                ?   <View>
                        <MainFont>{error}</MainFont>
                        <MainFont>{JSON.stringify(currentUser.lastLoginAt)}</MainFont>
                        <Container style={{alignItems: 'center'}}>
                            <MainFont>{userName}</MainFont>
                        </Container>
                        <TouchableButton 
                            onPress={() => onUpdateUser()}>
                            <TouchableButtonFont>Account</TouchableButtonFont>
                        </TouchableButton>
                        <TouchableButton 
                            onPress={() => onHandleLogout()}>
                            <TouchableButtonFont>Log Out</TouchableButtonFont>
                        </TouchableButton>
                        <TouchableButton 
                            onPress={() => addUserDataUsers(userId, userEmail)}>
                            <TouchableButtonFont>Add User Data to Firebase</TouchableButtonFont>
                        </TouchableButton>
                        <TouchableButton 
                            onPress={() => { changeUsername() }}>
                            <TouchableButtonFont>Change username in Firestore</TouchableButtonFont>
                        </TouchableButton>
                        <TouchableButton 
                            onPress={() => updateUserEmailFirestore(userId, newEmail)}>
                            <TouchableButtonFont>Update user email in Firebase</TouchableButtonFont>
                        </TouchableButton>
                </View>
                :   <View>
                        <MainFont>Not Logged In</MainFont>
                </View>
            }
          </Container>
      </SafeAreaView>
    )
}