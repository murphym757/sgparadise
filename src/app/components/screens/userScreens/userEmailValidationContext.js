import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, FlatList, Text } from 'react-native';
import { useAuth } from 'auth/authContext'
import { CurrentThemeContext, Container, MainFont, useIconCreator, TouchableButton, TouchableButtonFont } from 'index';

function UserEmailValidation() {
    const { 
      sgIconCreator,
      sgColorPicker
      } = useIconCreator()
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const [errorNewEmailCheck, setErrorNewEmailCheck] = useState(null)
    const [errorEmailCheck, setErrorEmailCheck] = useState(null)
    const [emailCheckStatus, setEmailCheckStatus] = useState('fulfilled')
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(null)
    return (
      <MainFont>This is where the email validation code goes</MainFont>
    )
}

function EmailFirebaseChangeButton(props) {
  const colors = useContext(CurrentThemeContext)
  return (
    <TouchableButton style={{backgroundColor:colors.secondaryColor }}
      disabled={props.isLoading}
      onPress={() => {props.validationFunc, props.verifyButtonConfirmPressed, props.verifyButtonEmailPressed, props.verifyButtonPasswordPressed}}>
      <TouchableButtonFont>{props.buttonTitle}</TouchableButtonFont>
    </TouchableButton>
  )
}

function ChangeEmailFunction(props) {
  const buttonStatement = 'Please enter your new email address'
  return (
    <View>
        <MainFont>{buttonStatement}</MainFont>
        {props.emailTextField}
        {props.errorNewEmailCheck !== null 
          ? props.errorMessageDataMainEmail
          : null
        }
        {props.functionButton}
      </View>
  )
}


//* This is the function is used to reauthenticate the user via checking email and password (universal such be on other screens)

//*------------------------------------Email Validation Context------------------------------------*//


const emailValidations = {UserEmailValidation, EmailFirebaseChangeButton, ChangeEmailFunction}

export const EmailValidationsContext = React.createContext(emailValidations)