import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { 
  Container,
  RegistrationValidationsContext,
  CurrentThemeContext,
  FormFieldsContext,
  useAuth
} from 'index'

export default function RegistrationScreen({navigation}) {
  //* Context --- (Registration Screen)
    const colors = useContext(CurrentThemeContext)
    const { signUp, validateRegisterEmail, validateRegisterPassword } = useAuth()
    const { validationNewUserFunction } = useContext(RegistrationValidationsContext)  
    const { 
      RegistrationFormFunction, 
      customSGFormFieldContainer, 
      errorMessageDataMain, 
      firebaseAuthUserDataFunctionButton 
    } = useContext(FormFieldsContext)

  //* State --- (Registration Screen)
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newUserErrorEmailCheck, setNewUserErrorEmailCheck] = useState([])
    const [checkEmailExistence, setCheckEmailExistence] = useState(false)
    const [newUserErrorPasswordCheck, setNewUserErrorPasswordCheck] = useState([])
    const [passwordCheckStatus, setPasswordCheckStatus] = useState('fulfilled')

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
      setNewUserErrorEmailCheck,
      setNewUserErrorPasswordCheck,
      setPasswordCheckStatus,
      setCheckEmailExistence,
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
  })

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