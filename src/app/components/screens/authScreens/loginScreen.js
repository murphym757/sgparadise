import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import {
  Container,
  CurrentThemeContext,
  FormFieldsContext,
  LoginValidationsContext,
  UpdateUserInfoValidationsContext,
  useAuth,
} from 'index'

export default function LoginScreen({navigation, route}) {
   //* Context --- (Login Screen)
    const colors = useContext(CurrentThemeContext)
    const { logIn, validateLoginEmail  } = useAuth()
    const { validationEmailLoginFunction } = useContext(LoginValidationsContext)
    const { validationPasswordFunction } = useContext(UpdateUserInfoValidationsContext)
    const { 
      RegistrationFormFunction, 
      customSGFormFieldContainer, 
      errorMessageDataMain, 
      firebaseAuthUserDataFunctionButton
    } = useContext(FormFieldsContext)
    
  //* State --- (Login Screen)
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userErrorEmailCheck, setUserErrorEmailCheck] = useState([])
    const [userErrorPasswordCheck, setUserErrorPasswordCheck] = useState([])
    const [checkUserExistence, setCheckUserExistence] = useState(null)
    const [checkPasswordExistence, setCheckPasswordExistence] = useState(null)
    
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
  })

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