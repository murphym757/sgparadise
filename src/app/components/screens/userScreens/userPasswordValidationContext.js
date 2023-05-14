import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, FlatList, Text } from 'react-native';
import { useAuth, updatePasswordAuth } from 'auth/authContext'
import { CurrentThemeContext, Container, MainFont, useIconCreator, TouchableButton, TouchableButtonFont } from 'index';

function passwordValidationPromise(passingPasswordData) {
  const passwordMatchPromise = new Promise((resolve, reject) => {
    if (passingPasswordData.newPasswordValidationErrors.length > 0) {
      passingPasswordData.setErrorNewPasswordCheck(passingPasswordData.newPasswordValidationErrors)
      console.log('Password validation failed:', passingPasswordData.newPasswordValidationErrors);
    } else {
      if (passingPasswordData.newPassword == passingPasswordData.confirmNewPassword) {
        resolve('The password has been updated')
        passingPasswordData.setErrorNewPasswordCheck(null)
      } else {
        reject('The passwords do not match')
        passingPasswordData.setErrorNewPasswordCheck(passingPasswordData.newPasswordValidationErrors)
        passingPasswordData.setPasswordCheckStatus('rejected')
      }
    }
      return passwordMatchPromise
    })
  }

function validationPasswordFunction(passingPasswordData) {
  Promise.all([passwordValidationPromise(passingPasswordData)]).then(() => {
    passingPasswordData.setPasswordCheckStatus(passingPasswordData.newPasswordValidationErrors)
    changeFirebasePassword(passingPasswordData)
  }).catch((err) => {
  }).finally(() => {
    console.log( "The Promise is settled, meaning it has been resolved or rejectedssp[ldsl].")
  });
}

function ChangePasswordFunction(props) {
    const buttonStatement = 'Please enter your new password'
    return (
      <View>
          <MainFont>{buttonStatement}</MainFont>
          {props.passwordTextField}
          {props.confirmPasswordTextField}
          {props.errorPasswordCheck !== null 
            ? props.errorMessageDataMainPassword
            : null
          }
          {props.functionButton}
        </View>
    )
  }

  //Create a function that actually updates the password and then returns them to the main user screen
  function changeFirebasePassword(passingPasswordData) {
    passingPasswordData.changeUserPassword()
    passingPasswordData.navigation.navigate('User Profile')
  }

  
  //?------------------------------------Password Validation------------------------------------*//
const passwordValidations = {
    ChangePasswordFunction,
    passwordValidationPromise,
    validationPasswordFunction
}
  
export const PasswordValidationsContext = React.createContext(passwordValidations)