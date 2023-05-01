import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { MainFont } from 'index';

//* User Validations Context
  function ChangeFirebaseIdentityButton(changeType) {
    const buttonTitle = 'Verify Identity'
    return (
      changeType === 'email'
        ? <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {validationNewEmailFunction(), setVerifyConfirmationButtonPressed(true), setVerifyEmailButtonPressed(true), setVerifyPasswordButtonPressed(false)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
          </TouchableButton>
        : <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {console.log('password'), setVerifyPasswordButtonPressed(true), setVerifyEmailButtonPressed(false)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
          </TouchableButton>
    )
  }

  function ChangeFunction(props) {
    const buttonStatement = 'Please enter your email address and password to verify your identity'
    return (
      <View>
          <MainFont>{buttonStatement}</MainFont>
          {props.emailTextField}
          {props.passwordTextField}
          {props.errorEmailCheck !== null 
            ? props.errorMessageDataMainEmail
            : null
          }
          {props.errorPasswordAuthCheck.length !== 0 
            ? props.errorMessageDataMainPassword
            : null
          }
          {props.functionButton}
        </View>
    )
  }
//*------------------------------------User Validations Context------------------------------------*//


const userValidations = {ChangeFunction, ChangeFirebaseIdentityButton}

export const UserValidationsContext = React.createContext(userValidations)