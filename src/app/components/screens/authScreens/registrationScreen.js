import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { Container, CurrentThemeContext } from 'index'
import { FormFieldsContext } from 'user/userScreenFormFieldsContext'
import { RegistrationValidationsContext } from 'user/registrationValidationContext'
import { useAuth } from 'auth/authContext'

export default function RegistrationScreen({navigation}) {
  //* Context --- (Registration Screen)
    const { customSGFormFieldContainer, errorMessageDataMain, firebaseAuthUserDataFunctionButton, RegistrationFormFunction } = useContext(FormFieldsContext)
    const { signUp, validateRegisterEmail, validateRegisterPassword } = useAuth()
    const { validationNewUserFunction } = useContext(RegistrationValidationsContext)
    const colors = useContext(CurrentThemeContext)

  //* State --- (Registration Screen)
    const [ checkEmailExistence, setCheckEmailExistence ] = useState(false)
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ newUserErrorEmailCheck, setNewUserErrorEmailCheck] = useState([])
    const [ newUserErrorPasswordCheck,  ] = useState([])
    const [ password, setPassword ] = useState('')
    const [ passwordCheckStatus, setPasswordCheckStatus ] = useState('fulfilled')
  
    //* Validation Errors --- (Registration Screen)
    const newUserEmailValidationErrors = validateRegisterEmail(email, checkEmailExistence)
    const newUserPasswordValidationErrors = validateRegisterPassword(password, confirmPassword)

  //* Variables to passed as props --- (Registration Screen)
    const passingUserData = {
      checkEmailExistence,
      confirmPassword,
      dataCollection: 'registerUser',
      email,
      newUserEmailValidationErrors,
      newUserPasswordValidationErrors,
      password,
      setCheckEmailExistence,
      setNewUserErrorEmailCheck,
      setNewUserErrorPasswordCheck,
      setPasswordCheckStatus,
      signUp,
      validationNewUserFunction
    }

  //* Functions --- (Registration Screen)
    function onFooterLinkPressLogin() {
      navigation.navigate('Login')
      setNewUserErrorEmailCheck([])
      setNewUserErrorPasswordCheck([])
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
          registerType={'signUp'}
          registerUser={true}
          functionButton={firebaseAuthUserDataFunctionButton('signUp', 'Create Account', passingUserData, isLoading, colors)}
          emailTextField={customSGFormFieldContainer('Email', email, false, setEmail, colors)}
          passwordTextField={customSGFormFieldContainer('Password', password, true, setPassword, colors)}
          confirmPasswordTextField={customSGFormFieldContainer('Confirm Password', confirmPassword, true, setConfirmPassword, colors)}
          errorMessageDataRegisterEmail={errorMessageDataMain(newUserErrorEmailCheck, 'email')}
          errorMessageDataRegisterPassword={errorMessageDataMain(newUserErrorPasswordCheck, 'password')}
          userErrorEmailCheck={newUserErrorEmailCheck}
          userErrorPasswordCheck={newUserErrorPasswordCheck}
          colors
          isLoading
          loginLink={() => onFooterLinkPressLogin(navigation)}
        />
      </Container>
    </SafeAreaView>
  )
}