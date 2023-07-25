import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { MainFont, TouchableButton, TouchableButtonFont } from 'index';

//*------------------------------------Update User Information Validation------------------------------------*//
    //*------------------------------------Update Username Validation------------------------------------*//

  function updateUsernameValidationPromise(passingUsernameData) {
    const usernameUpdatePromise = new Promise((resolve, reject) => {
      if (passingUsernameData.newUsernameValidationErrors.length > 0) {
        passingUsernameData.setErrorNewUsernameCheck(passingUsernameData.newUsernameValidationErrors)
        reject(('Username validation failed:', passingUsernameData.newUsernameValidationErrors));
      } else {
        passingUsernameData.setErrorNewUsernameCheck(passingUsernameData.newUsernameValidationErrors)
        passingUsernameData.setCheckUsernameExistence(true)
        resolve('Username is valid!')
      } 
    })
    return usernameUpdatePromise
  }

  function validationUpdateUsernameFunction(passingUsernameData) {
    Promise.all([updateUsernameValidationPromise(passingUsernameData)]).then(() => {
      const userId = passingUsernameData.currentUser.uid
      passingUsernameData.updateUsernameFirestore(userId, passingUsernameData.newUsername), 
      passingUsernameData.updateUsernameAuth(passingUsernameData.newUsername)
    }).catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected. --- Login Email Validation")
    });
  }

//*-------------------*/

  // Chnage usernameFunction
  function changeUsername(passingUsernameData) {
    if ( passingUsernameData.currentUser !== null) {
      const userId = passingUsernameData.currentUser.uid
      passingUsernameData.updateUsernameFirestore(userId, newUsername), 
      passingUsernameData.updateUsernameAuth(newUsername)
      console.log('Username has been updated')
    }
  }
  //----------/
 // Update email
  function changeUserEmail(passingEmailData) {// The user needs to be logged out and back in to see the new email
    if (passingEmailData.currentUser !== null) {
      const userId = passingEmailData.currentUser.uid 
      passingEmailData.updateUserEmailFirestore(userId, passingEmailData.newEmail) //Opposed to saving the email to firestore, you should save the uid to firestore
      passingEmailData.updateEmailAuth(passingEmailData.newEmail, passingEmailData.setCheckEmailExistence)
    }
  }
  
  function newEmailValidationPromise(passingEmailData) {
    const newEmailMatchPromise = new Promise((resolve, reject) => {
      if (passingEmailData.newEmailValidationErrors.length > 0) {
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
    passingPasswordData.changeUserPassword(passingPasswordData)
    passingPasswordData.navigation.navigate('User Profile') //* This line of code allows the user to go straight back to the "Main" user screen, opposed to showing (and asking) for the user's confirmation on the change
  }).catch((err) => {
  }).finally(() => {
    console.log( "The Promise is settled, meaning it has been resolved or rejectedssp[ldsl].")
  });
}


  //TODO: Create a function that actually updates the password and then returns them to the main user screen
  function changeFirebasePassword(passingPasswordData) {
    passingPasswordData.changeUserPassword()
    passingPasswordData.navigation.navigate('User Profile')
  }
  //*-------------------*/

const updateUserInfoValidations = {
    changeUserEmail,
    validationUpdateUsernameFunction,
    validationNewEmailFunction,
    validationPasswordFunction
}

export const UpdateUserInfoValidationsContext = React.createContext(updateUserInfoValidations)