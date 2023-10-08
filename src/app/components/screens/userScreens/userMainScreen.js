
import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, Text } from 'react-native';
import { useAuth } from 'auth/authContext'
import { useIconCreator } from 'user/userIconContext'
import {
  CustomInputField,
  faTimes, 
  firebase, 
  FontAwesomeIcon, 
  FooterFont,
  FooterLink, 
  FooterView,
  TouchableButton,
  TouchableButtonFont,
  CurrentThemeContext,
  MainFont,
  MainSubFont,
  Container
} from 'index'

export default function UserMainScreen({navigation}) {
    const { 
      currentUser, 
      updateProfile,
      deleteAccountAuth, 
      deleteAccountDb, 
      updateEmail, 
      updatePassword, 
      reauthenticateUser,
      successAlert, 
      failureAlert,
      backArrow,
      toNewSection
    } = useAuth()
    const { 
      sgIconCreator,
      sgColorPicker
      } = useIconCreator()
    const sgDB = firebase.firestore()
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    console.log("🚀 ~ file: userUpdateScreen.js:41 ~ UpdateUserScreen ~ email:", email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userProvidedPassword, setUserProvidedPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState(currentUser.displayName)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [errorEmailCheck, setErrorEmailCheck] = useState('')
    const [errorPasswordCheck, setErrorPasswordCheck] = useState('')
    const [errorPasswordAuthCheck, setErrorPasswordAuthCheck] = useState('')
    const [testError, setTestError] = useState('')
    const [authButtonPressed, setAuthButtonPressed] = useState(false)
    const [changeIconButtonPressed, setChangeIconButtonPressed] = useState(false)
    const [changePersonalInfoButtonPressed, setChangePersonalInfoButtonPressed] = useState(false)
    const [userIcon, setUserIcon] = useState('')
    const sgIconName = 'Felix'
    const sgIconEyes = ["bulging"]
    console.log(currentUser.uid)

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }
  ``
    useEffect(() => {
      setUserId(`${currentUser.uid}`)
      pageLoader()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
          <Container style={{ flex: 1 }}>
            <MainFont>userName</MainFont>
          </Container>
      </SafeAreaView>
    )
}