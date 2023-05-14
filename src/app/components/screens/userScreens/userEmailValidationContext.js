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
function emailValidationPromise(passingEmailData) {
  const emailMatchPromise = new Promise((resolve, reject) => {
    if (passingEmailData.emailValidationErrors.length < 0) {
      passingEmailData.setErrorEmailCheck(passingEmailData.emailValidationErrors)
      console.log('Email validation failed:', passingEmailData.emailValidationErrors);
    } else {
      if (passingEmailData.email == passingEmailData.currentUser.email) {
        resolve('The email has been updated')
        passingEmailData.setErrorEmailCheck(null)
      } else {
        reject('The email is still the same')
        passingEmailData.setErrorEmailCheck(passingEmailData.emailValidationErrors)
        passingEmailData.setEmailCheckStatus('rejected')
      }
      console.log('Email is valid!');
    }
  })
  return emailMatchPromise
}
//*------------------------------------Email Validation------------------------------------*//
 // Update email
 function changeUserEmail(passingEmailData) {// The user needs to be logged out and back in to see the new email
  if (passingEmailData.currentUser !== null) {
    const userId = passingEmailData.currentUser.uid 
    passingEmailData.updateUserEmailFirestore(userId, passingEmailData.newEmail) //Opposed to saving the email to firestore, you should save the uid to firestore
    updateEmailAuth(passingEmailData)
  }
}

//* This function is used to update the user's email address
function updateEmailAuth(passingEmailData) {
  const auth = passingEmailData.getAuth();
  const user = auth.currentUser;
  console.log("🚀 ~ file: userEmailValidationContext.js:84 ~ updateEmailAuth ~ user:", user)
  return passingEmailData.updateEmail(auth.currentUser, passingEmailData.newEmail).then(() => {
  // Email updated!
  // ...
  if(passingEmailData.checkEmailExistence === true) return (passingEmailData.setCheckEmailExistence(false))
  console.log("Email updated successfully!")
  }).catch((error) => {
    passingEmailData.setCheckEmailExistence(true)
  })
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

//* Validation for email (email already exists?)
function emailExistencePromise(passingEmailData) {
  const emailExistPromise = new Promise((resolve, reject) => {
    if (passingEmailData.checkEmailExistence === true) {
      passingEmailData.setErrorNewEmailCheck(passingEmailData.newEmailValidationErrors)
      reject('Email already exist:', passingEmailData.newEmailValidationErrors);
    } else {
      passingEmailData.setErrorNewEmailCheck(passingEmailData.newEmailValidationErrors)
      resolve('Email is valid!');
    } 
  })
  return emailExistPromise
}

function validationEmailExistenceFunction(passingEmailData) {
  Promise.all([emailExistencePromise(passingEmailData)]).then(() => {
    passingEmailData.setErrorEmailCheck(passingEmailData.emailValidationErrors)
    validationNewEmailFunction(passingEmailData)
    //navigation.goBack()
  })
  .catch((err) => {
  }).finally(() => {
    console.log( "The Promise is settled, meaning it has been resolved or rejected.")
  });
}
//*-------------------*/

//*------------------------------------Update Email Validation------------------------------------*//


const emailValidations = {
  UserEmailValidation,
  ChangeEmailFunction,
  emailValidationPromise,
  validationNewEmailFunction,
  validationEmailExistenceFunction,
  changeUserEmail
}

export const EmailValidationsContext = React.createContext(emailValidations)