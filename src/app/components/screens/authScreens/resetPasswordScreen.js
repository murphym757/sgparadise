import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import {CurrentThemeContext} from '../../../../../assets/styles/globalTheme';
import { useAuth } from './authContext'
import { firebase } from '../../../../server/config/config';
import { manualColorSet, loadingScreen } from './loadingScreen' //Loader
// App Styling
import {
    FormHeadingFontContainer,
    FormHeadingFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FooterView,
    FooterFont,
    FooterLink
  } from '../../../../../assets/styles/authScreensStyling';
  
//FontAwesome
import { FontAwesomeIcon, faTimes } from '../index'

export default function ResetPasswordScreen({navigation}) {
    const { resetPassword, successAlert, failureAlert } = useAuth()
    const db = firebase.firestore()
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('Forgotten your password? Enter your e-mail address below, and we\'ll send you an e-mail allowing you to reset it.')
    const [error, setError] = useState('')
    const appIcon = '../../../../../assets/images/icon.png'
    const colors = useContext(CurrentThemeContext)

    function onFooterLinkPress() {
        navigation.navigate('Login')
    }

    async function onLoginPress() {
      try {
        setError('')
        setIsLoading(true)
        await resetPassword(email)
        setMessage('Check your inbox for further instructions')
      } catch {
        setError('Failed to reset password')
      }
      setIsLoading(false)
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
      pageLoader()
    })

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}> 
        {isLoading == true 
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loadingScreen()}
          </View>
          : <View style={{ flex: 1 }}>
              <View style={{ paddingLeft: 20 }}>
                <FontAwesomeIcon 
                  icon={ faTimes } color={colors.primaryFontColor} size={50} 
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
              <FormHeadingFontContainer>
                <FormHeadingFont>Password Reset</FormHeadingFont>
              </FormHeadingFontContainer>
              <View>
                {message !== ''
                    ? successAlertMessage(message)
                    : <View>
                    </View>
                }
                {error !== ''
                    ? failureAlertMessage(error)
                    : <View></View>
                }
                </View>
              <CustomInputField
                  placeholder='E-mail'
                  placeholderTextColor={colors.primaryColor}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  color={colors.primaryColor}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TouchableButton
                  onPress={() => onLoginPress()}>
                  <TouchableButtonFont>Reset Password</TouchableButtonFont>
              </TouchableButton>
              <FooterView>
                  <FooterFont>
                    <FooterLink onPress={onFooterLinkPress}>
                        Log In
                    </FooterLink>
                  </FooterFont>
              </FooterView>
          </View>
        }
      </SafeAreaView>
    )
}