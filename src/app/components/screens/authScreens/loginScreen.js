import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import {
  CurrentThemeContext,
  CustomInputField,
  faTimes,
  FontAwesomeIcon,
  FooterFont,
  FooterLink,
  FooterView,
  TouchableButton,
  TouchableButtonFont,
  useAuth,
} from 'index'

export default function LoginScreen({navigation, route}) {
    const { sgDB, logIn, currentUser, successAlert, failureAlert } = useAuth()
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const appIcon = '../../../../../assets/images/icon.png'
    const colors = useContext(CurrentThemeContext)

    function onFooterRegsLinkPress() {
        navigation.navigate('Registration')
    }

    function onFooterResLinkPress() {
      navigation.navigate('Reset Password')
  }

    async function onLoginPress() {
      try {
        setError('')
        setIsLoading(true)
        await logIn(email, password)
          .then((res) => {
            const uid = res.user.uid
            sgDB.collection('users')
            .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return
                    }
                    navigation.navigate('Home')
                })
                .catch(err => {
                    alert(err)
                })
          })
        .catch((err) => {
          setError(`${err}`)
        })
      } catch {
        setError('Failed to log in')
      }
      setIsLoading(false)
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
        <View style={{ flex: 1 }}>
          <View style={{ paddingLeft: 20 }}>
            <FontAwesomeIcon 
              icon={ faTimes } color={colors.primaryFontColor} size={50} 
              onPress={() => navigation.navigate('Main', { screen: 'SgUserStackNavbar' })}
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
          <TouchableButton
              onPress={() => onLoginPress()}>
              <TouchableButtonFont>Log in</TouchableButtonFont>
          </TouchableButton>
          <FooterView>
              <FooterFont>Forgot Password? <FooterLink onPress={onFooterResLinkPress}>Reset Password</FooterLink></FooterFont>
          </FooterView>
          <FooterView>
              <FooterFont>Don't have an account? <FooterLink onPress={onFooterRegsLinkPress}>Sign up</FooterLink></FooterFont>
          </FooterView>
      </View>
      </SafeAreaView>
    )
}