
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
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
    const sgDB = firebase.firestore()
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: 20 }}>
              <FontAwesomeIcon 
                icon={ faTimes } color={colors.primaryFontColor} size={50} 
                onPress={() => navigation.navigate('Home')}
              />
            </View>
              <View>
                {error !== ''
                  ? failureAlertMessage(error)
                  : <View></View>
                }
              </View>
              <CustomInputField
                  placeholder='E-mail'
                  placeholderTextColor={colors.primaryColor}
                  onChangeText={(text) => setEmail(text)}
                  required
                  value={email}
                  color={colors.primaryColor}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <CustomInputField
                  placeholderTextColor={colors.primaryColor}
                  secureTextEntry
                  placeholder='Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  color={colors.primaryColor}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <CustomInputField
                  placeholderTextColor={colors.primaryColor}
                  secureTextEntry
                  placeholder='Confirm Password'
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  color={colors.primaryColor}
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
          </View>
      </SafeAreaView>
    )
}