
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from '../authScreens/authContext'
import { firebase } from '../../../../server/config/config';
import { // App Styling
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FooterView,
    FooterFont,
    FooterLink
  } from '../../../../../assets/styles/authScreensStyling'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader
//FontAwesome
import { FontAwesomeIcon, faTimes } from '../index'

export default function UpdateUserScreen({navigation}) {
    const { 
      currentUser, 
      deleteAccountAuth, 
      deleteAccountDb, 
      updateEmail, 
      updatePassword, 
      successAlert, 
      failureAlert
    } = useAuth()
    const db = firebase.firestore()
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
  console.log(email)
    function cancelUpdate() {
        navigation.navigate('Home')
    }

    function onRegisterPress() {
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        const promises =[]
        setIsLoading(true)
        setError("")
        if (email !== currentUser.email) {
          promises.push(updateEmail(email))
        }
        if (password !== '') {
          promises.push(updatePassword(password))
        }

        Promise.all(promises)
        .then(() =>{
          navigation.navigate('Home')
        })
        .catch((err) => {
          setError(""+ err +"")
        })
        .finally(() => {
          setIsLoading(false)
        })
      }

    function onDeleteAccountPress() {
      const promises =[]
      setIsLoading(true)
      setError("")
      promises.push(deleteAccountAuth())
      promises.push(deleteAccountDb(userId))
      Promise.all(promises)
        .then(() =>{
          navigation.navigate('Login')
        })
        .catch((err) => {
          setError(""+ err +"")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    

    function successAlertMessage(message) {
        return successAlert(message)
      }
  
    function failureAlertMessage(error) {
      return failureAlert(error)
    }

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }
  
    useEffect(() => {
      setEmail("" + currentUser.email +"")
      setUserId("" + currentUser.uid +"")
      pageLoader()
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor }}>
        {isLoading == true 
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {loadingScreen()}
          </View>
          : <View style={{ flex: 1 }}>
              <View style={{ paddingLeft: 20 }}>
                <FontAwesomeIcon 
                  icon={ faTimes } color={manualColorSet().fontColor} size={50} 
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
              <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
              >
                <View>
                  {error !== ''
                    ? failureAlertMessage(error)
                    : <View></View>
                  }
                </View>
                <CustomInputField
                    placeholder='E-mail'
                    placeholderTextColor={manualColorSet().backgroundColor}
                    onChangeText={(text) => setEmail(text)}
                    required
                    value={email}
                    color={manualColorSet().backgroundColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <CustomInputField
                    placeholderTextColor={manualColorSet().backgroundColor}
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    color={manualColorSet().backgroundColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <CustomInputField
                    placeholderTextColor={manualColorSet().backgroundColor}
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    color={manualColorSet().backgroundColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableButton 
                    disabled={isLoading}
                    onPress={() => onRegisterPress()}>
                    <TouchableButtonFont>Update</TouchableButtonFont>
                </TouchableButton>
                <TouchableButton style={{backgroundColor: manualColorSet().warningColor }}
                    disabled={isLoading}
                    onPress={() => onDeleteAccountPress()}>
                    <TouchableButtonFont>Delete</TouchableButtonFont>
                </TouchableButton>
                <FooterView>
                    <FooterFont><FooterLink onPress={cancelUpdate}>Cancel</FooterLink></FooterFont>
                </FooterView>
              </KeyboardAwareScrollView>
          </View>
        }
      </SafeAreaView>
    )
}