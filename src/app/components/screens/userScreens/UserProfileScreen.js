
import React, { useState, useContext } from 'react'
import { SafeAreaView, View} from 'react-native'
import { responsivePxSize } from 'assets/styles/globalStyling'
import { useAuth } from 'auth/authContext'
import {
    Container,
    CurrentThemeContext,
    MainFont,
    MainSubFont,
    TouchableButton,
    TouchableButtonFont,
    ViewSortColumn,
    ViewSortRow,
    windowHeight
} from 'index'

console.log('Outside the UserProfileScreen function------------------')

export default function UserProfileScreen({navigation}) {
    const [ error, setError ] = useState('')
    const { currentUser, logOut } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const newEmail = 'brickellLife@gmail.com'
    const newUsername = 'brickellLife'
    const userComments = 35
    const userLikedPosts = 20
    const userLikes = 44
    const userPosts = 21
    console.log('Within the UserProfileScreen function------------------')

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

    //* User Contribution Section
        function displayUserDataTop(int) {
            const displayInt = int
            return (
                <View style={{alignItems: 'center'}}>
                    <MainFont>{displayInt}</MainFont>
                </View>
            )
        }

        function displayUserDataBottom(string) {
            const displayString = string
            return (
                <View>
                    <MainFont>{displayString}</MainFont>
                </View>
            )
        }

        function displayUserData(int, string) {
            return (
                <ViewSortColumn style={{paddingHorizontal: responsivePxSize(20)}}>
                    {displayUserDataTop(int)}
                    {displayUserDataBottom(string)}
                </ViewSortColumn>
            )
        }

        function displayUserDataSection() {
            return (
                <ViewSortRow style={{justifyContent: 'center', paddingVertical: responsivePxSize(50)}}>
                    {displayUserData(userPosts, 'Posts')}
                    {displayUserData(userComments, 'Comments')}
                    {displayUserData(userLikes, 'Likes')}
                    {displayUserData(userLikedPosts, 'Liked Posts')}
                </ViewSortRow>
            )
        }
    //*

    //* User Info Section
        function displayUserInfo() {
            return (
                <Container style={{alignItems: 'center'}}>
                    <View style={{paddingVertical: responsivePxSize(20)}}>
                        <MainFont>Image Goes Here</MainFont>
                    </View>
                    <View style={{paddingTop: responsivePxSize(20), paddingBottom: responsivePxSize(5)}}>
                        <MainFont>{currentUser.displayName}</MainFont>
                    </View>
                </Container>
            )
        }
    //*

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
            <Container style={{ flex: 1, justifyContent: 'center' }}>
                <MainSubFont>Account Page</MainSubFont>
                {currentUser !== null
                    ?   <View>
                            <MainFont>{error}</MainFont>
                            <MainFont>{JSON.stringify(currentUser.lastLoginAt)}</MainFont>
                            {displayUserInfo()}
                            {displayUserDataSection()}
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
            </Container>
        </SafeAreaView>
    )
}