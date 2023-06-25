import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { MainFont } from 'index';

//*------------------------------------Update User Information Validation------------------------------------*//

    // Username Change Form
    function ChangeUsernameFunction(props) {
        const buttonStatement = 'Please enter your new username'
        return (
            <View>
                <MainFont>{buttonStatement}</MainFont>
                {props.usernameTextField}
                {props.functionButton}
            </View>
        )
    }
    /*------*/
 // Update email
 function changeUserEmail(passingEmailData) {// The user needs to be logged out and back in to see the new email
    if (passingEmailData.currentUser !== null) {
      const userId = passingEmailData.currentUser.uid 
      passingEmailData.updateUserEmailFirestore(userId, passingEmailData.newEmail) //Opposed to saving the email to firestore, you should save the uid to firestore
      passingEmailData.updateEmailAuth(passingEmailData.email, passingEmailData.setCheckEmailExistence)
    }
  }
  
  function newEmailValidationPromise(passingEmailData) {
    const newEmailMatchPromise = new Promise((resolve, reject) => {
      if (passingEmailData.newEmailValidationErrors.length < 0) {
        passingEmailData.setErrorNewEmailCheck(passingEmailData.newEmailValidationErrors)
        reject(('Email validation failed:', passingEmailData.newEmailValidationErrors));
      } else {
        passingEmailData.setErrorNewEmailCheck(passingEmailData.newEmailValidationErrors)
        resolve('Email is valid!')
      } 
    })
  
    return newEmailMatchPromise
  }
  
  function validationNewEmailFunction(passingEmailData) {
    Promise.all([newEmailValidationPromise(passingEmailData)]).then(() => {
      passingEmailData.setErrorNewEmailCheck(passingEmailData.newEmailValidationErrors)
      changeUserEmail(passingEmailData)
    }).catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejectedss.")
    });
  }
  /*------*/
//*-------------------*/

//*------------------------------------Change Password Validation------------------------------------*//
//* Change Password Validation
function passwordValidationPromise(passingPasswordData) {
  const passwordMatchPromise = new Promise((resolve, reject) => {
    if (passingPasswordData.newPasswordValidationErrors.length < 0) {
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
  //*-------------------*/

  //*------------------------------------Change Email Validation------------------------------------*//
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
  //*-------------------*/


const updateUserInfoValidations = {
    changeUserEmail,
    ChangeUsernameFunction,
    validationNewEmailFunction,
    validationPasswordFunction,
    ChangePasswordFunction,
    ChangeEmailFunction
}

export const UpdateUserInfoValidationsContext = React.createContext(updateUserInfoValidations)