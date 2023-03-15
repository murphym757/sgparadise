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
  useAuth
} from 'index'

export default function RegistrationScreen({navigation}) {
  const { sgDB, signUp, currentUser, failureAlert } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const appIcon = '../../../../../assets/images/icon.png'
  const colors = useContext(CurrentThemeContext)

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
            }
            sgDB.collection('users')
              .doc(uid)
              .set(data)
              .then(() => {
                  navigation.navigate('Home')
              })
              .catch((err) => {
                  alert(err)
              })
        })
        .catch((err) => {
          setError(`${err}`)
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
                <TouchableButtonFont>Create account</TouchableButtonFont>
            </TouchableButton>
            <FooterView>
                <FooterFont>Already got an account? <FooterLink onPress={onFooterLinkPress}>Log In</FooterLink></FooterFont>
            </FooterView>
        </View>
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
          }
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .set(data)
              .then(() => {
                  navigation.navigate('Home', {user: data})
              })
              .catch((error) => {
                  alert(error)
              })
      })
      .catch((error) => {
          alert(error)
  })
} */