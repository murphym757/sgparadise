import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { FormFieldsContext } from 'user/userScreenFormFieldsContext'
import { LoginValidationsContext } from 'user/loginValidationContext'
import { UpdateUserInfoValidationsContext } from 'user/updateUserInfoValidationContext'
import { useAuth } from 'auth/authContext'

import { Container, CurrentThemeContext } from 'index'

export default function LoginScreen({navigation, route}) {
   //* Context --- (Login Screen)
    const { logIn, validateLoginEmail  } = useAuth()
    const { RegistrationFormFunction, customSGFormFieldContainer, errorMessageDataMain, firebaseAuthUserDataFunctionButton } = useContext(FormFieldsContext)
    const { validationEmailLoginFunction } = useContext(LoginValidationsContext)
    const { validationPasswordFunction } = useContext(UpdateUserInfoValidationsContext)
    const colors = useContext(CurrentThemeContext)

  //* State --- (Login Screen)
    const [checkPasswordExistence, setCheckPasswordExistence] = useState(null)
    const [checkUserExistence, setCheckUserExistence] = useState(null)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [password, setPassword] = useState('')
    const [userErrorEmailCheck, setUserErrorEmailCheck] = useState([])
    const [userErrorPasswordCheck, setUserErrorPasswordCheck] = useState([])

  //* Validation Errors --- (Login Screen)
    const emailValidationErrors = validateLoginEmail(email, checkUserExistence, checkPasswordExistence)

  //* Variables to passed as props --- (Login Screen)
    const passingUserData = {
      logIn,
      emailValidationErrors,
      email,
      password,
      setUserErrorEmailCheck,
      setUserErrorPasswordCheck,
      setCheckUserExistence,
      setCheckPasswordExistence,
      validationEmailLoginFunction,
      validationPasswordFunction
    }

  //* Functions --- (Login Screen)
    function onFooterLinkPressRegistration(navigation) {
      navigation.navigate('Registration')
      setUserErrorEmailCheck([])
      setUserErrorPasswordCheck([])
    }

    function onFooterLinkPressResetPassword(navigation) {
      navigation.navigate('Reset Password')
      setUserErrorEmailCheck([])
      setUserErrorPasswordCheck([])
    }

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }

  useEffect(() => {
    pageLoader()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
      <Container style={{ flex: 1, justifyContent: 'center' }}>
        <RegistrationFormFunction
          registerType={'login'}
          registerUser={false}
          functionButton={firebaseAuthUserDataFunctionButton('login', 'Log In', passingUserData, isLoading, colors)}
          emailTextField={customSGFormFieldContainer('Email', email, false, setEmail, colors)}
          passwordTextField={customSGFormFieldContainer('Password', password, true, setPassword, colors)}
          errorMessageDataRegisterEmail={errorMessageDataMain(userErrorEmailCheck, 'email')}
          errorMessageDataRegisterPassword={errorMessageDataMain(userErrorPasswordCheck, 'password')}
          userErrorEmailCheck
          userErrorPasswordCheck
          colors
          isLoading
          signUpLink={() => onFooterLinkPressRegistration(navigation)}
          resetPasswordLink={() => onFooterLinkPressResetPassword(navigation)}
        />
      </Container>
    </SafeAreaView>
  )
}