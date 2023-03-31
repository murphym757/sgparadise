
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
        updateProfile
     } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const userName = currentUser.displayName
    const userEmail = currentUser.email
    const newEmail = 'musicLover786@gmail.com'
    const newUsername = 'musicLover786'
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
                            onPress={() => { updateUsernameFirestore(userId, newUsername), updateProfile(newUsername) }}>
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