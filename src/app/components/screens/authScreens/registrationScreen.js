import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuth } from './authContext'
import { firebase } from '../../../../server/config/config'
import { manualColorSet, loadingScreen } from './loadingScreen' //Loader
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

export default function RegistrationScreen({navigation}) {
  const { signUp, currentUser, failureAlert } = useAuth()
  const db = firebase.firestore()
  const [isLoading, setIsLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const appIcon = '../../../../../assets/images/icon.png'

    function onFooterLinkPress() {
        navigation.navigate('Login')
    }

    async function onRegisterPress() {
      if (password !== confirmPassword) {
          alert("Passwords do not match.")
          return
      }

      try {
        setError('')
        setIsLoading(true)
        await signUp(email, password)
          .then((res) => {
            const uid = res.user.uid
            const data = {
              id: uid,
              email,
              fullName,
            };
            db.collection('users')
              .doc(uid)
              .set(data)
              .then(() => {
                  navigation.navigate('Home')
              })
              .catch((err) => {
                  alert(err)
              });
        })
        .catch((err) => {
          setError(""+ err +"")
        })
      } catch {
        setError('Failed to create an account')
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
                    placeholder='Full Name'
                    placeholderTextColor={manualColorSet().backgroundColor}
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    color={manualColorSet().backgroundColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <CustomInputField
                    placeholder='E-mail'
                    placeholderTextColor={manualColorSet().backgroundColor}
                    onChangeText={(text) => setEmail(text)}
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
                    <TouchableButtonFont>Create account</TouchableButtonFont>
                </TouchableButton>
                <FooterView>
                    <FooterFont>Already got an account? <FooterLink onPress={onFooterLinkPress}>Log In</FooterLink></FooterFont>
                </FooterView>
              </KeyboardAwareScrollView>
          </View>
        }
      </SafeAreaView>
    )
}

/*
function onRegisterPress() {
  if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
  }
  firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
          const uid = response.user.uid
          const data = {
              id: uid,
              email,
              fullName,
          };
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .set(data)
              .then(() => {
                  navigation.navigate('Home', {user: data})
              })
              .catch((error) => {
                  alert(error)
              });
      })
      .catch((error) => {
          alert(error)
  })
} */