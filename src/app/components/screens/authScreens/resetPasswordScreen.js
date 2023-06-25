import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import {
  Container,
  CurrentThemeContext,
  ResetPasswordValidationsContext,
  FormFieldsContext,
  useAuth,
} from 'index'

export default function ResetPasswordScreen({navigation}) {
  //* Context --- (Reset Password Screen)
    const colors = useContext(CurrentThemeContext)
    const { 
      sendVerificationCode, 
      validateForgotPasswordEmail 
    } = useAuth()
    const { 
      RegistrationFormFunction, 
      customSGFormFieldContainer, 
      errorMessageDataMain, 
      firebaseAuthUserDataFunctionButton
    } = useContext(FormFieldsContext)
    const {
      validationEmailForgotPasswordFunction
    } = useContext(ResetPasswordValidationsContext)
    
  //* State --- (Reset Password Screen)
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [userErrorEmailCheck, setUserErrorEmailCheck] = useState([])
    const [error, setError] = useState('')
    const [emailPassed, setEmailPassed] = useState(false)
    

  //* Validation Errors --- (Reset Password Screen)
    const forgotPasswordUserEmailValidationErrors = validateForgotPasswordEmail(email, emailPassed)

  //* Variables to passed as props --- (Reset Password Screen)
    const passingUserData = {
      email,
      forgotPasswordUserEmailValidationErrors,
      sendVerificationCode,
      setEmailPassed,
      setUserErrorEmailCheck,
      validationEmailForgotPasswordFunction
    }

  //* Functions --- (Reset Password Screen)
    function onFooterLinkPressLogin() {
      navigation.navigate('Login')
      setUserErrorEmailCheck([])
    }

    function onFooterLinkPressRegistration() {
      navigation.navigate('Registration')
      setUserErrorEmailCheck([])
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
          registerType={'forgotPassword'} 
          registerUser={false}
          functionButton={firebaseAuthUserDataFunctionButton('forgotPassword', 'Forgot Password', passingUserData, isLoading, colors)}
          emailTextField={customSGFormFieldContainer('Email', email, false, setEmail, colors)} 
          errorMessageDataRegisterEmail={errorMessageDataMain(userErrorEmailCheck, 'forgotPassword')}
          userErrorEmailCheck
          colors
          isLoading
          loginLink={() => onFooterLinkPressLogin(navigation)}
          signUpLink={() => onFooterLinkPressRegistration(navigation)}
        />
      </Container>
    </SafeAreaView>
  )
}

/*
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
*/