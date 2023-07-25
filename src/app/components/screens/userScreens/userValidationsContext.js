import React from 'react';
import { View } from 'react-native'
import { 
  MainFont,
  TouchableButton,
  TouchableButtonFont
 } from 'index'

 //*------------------------------------User Validations Context------------------------------------*//
  // User Validations Context (Not used yet)
  function ChangeFirebaseIdentityButton(props) {
    const buttonTitle = 'Verify Identity'
    return (
      props.changeType === 'email'
        ? <TouchableButton style={{backgroundColor: props.colors.secondaryColor }}
            disabled={props.isLoading}
            onPress={() => {
              props.validationNewEmailFunction(), 
              props.setVerifyConfirmationButtonPressed(true), 
              props.setVerifyEmailButtonPressed(true), 
              props.setVerifyPasswordButtonPressed(false)
            }}
          >
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
          </TouchableButton>
        : <TouchableButton style={{backgroundColor: props.colors.secondaryColor }}
            disabled={props.isLoading}
            onPress={() => {
              console.log('password'), 
              props.setVerifyPasswordButtonPressed(true), 
              setVerifyEmailButtonPressed(false)
            }}
          >
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
          </TouchableButton>
    )
  }
  //----------/

  // Verify Identity Button
  function ChangeFunction(props) {
    const buttonStatement = 'Please enter your email address and password to verify your identity'
    return (
      <View>
          <MainFont>{buttonStatement}</MainFont>
          {props.textField}
          {props.textField2}
          {props.errorCheck !== null 
            ? props.errorMessageDataMainEmail
            : null
          }
          {props.errorAuthCheck.length !== 0 
            ? props.errorMessageDataMainPassword
            : null
          }
          {props.functionButton}
        </View>
    )
  }
  //----------/
//*------------------------------------User Validations Context------------------------------------*//


const userValidations = {
  ChangeFunction, 
  ChangeFirebaseIdentityButton
}

export const UserValidationsContext = React.createContext(userValidations)