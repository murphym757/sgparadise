import React, { createContext } from 'react'

//* This is the function is used to reauthenticate the user via checking email and password (universal such be on other screens)

  function emailValidationPromise(emailData) {
    const emailMatchPromise = new Promise((resolve, reject) => {
      if (emailData.emailValidationErrors.length < 0) {
        emailData.setErrorEmailCheck(emailData.emailValidationErrors)
        console.log('Email validation failed:', emailData.emailValidationErrors);
      } else {
        if (emailData.email == currentUser.email) {
          resolve('The email has been updated')
          emailData.setErrorEmailCheck(null)
        } else {
          reject('The email is still the same')
          emailData.setErrorEmailCheck(emailData.emailValidationErrors)
          emailData.setEmailCheckStatus('rejected')
        }
        console.log('Email is valid!');
      }
    })
    return emailMatchPromise
  }

//*-------------------*/

//*------------------------------------Login Email Validation------------------------------------*//

  function emailLoginValidationPromise(emailData, firebaseAuthValue) {
    const loginEmailMatchPromise = new Promise((resolve, reject) => {
      if (emailData.loginEmailValidationErrors.length < 0) {
        emailData.setLoginErrorEmailCheck(emailData.loginEmailValidationErrors)
        reject(('Email validation failed:', emailData.loginEmailValidationErrors));
      } else {
        emailData.setLoginErrorEmailCheck(emailData.loginEmailValidationErrors)
        firebaseAuthValue.setCheckUserExistence(true)
        //? There is no need to set the password check to true because the password is not being checked here
        resolve('Email is valid!')
      } 
    })
    return loginEmailMatchPromise
  }

  function validationEmailLoginFunction(firebaseAuthValue, emailData, passwordData) {
    Promise.all([emailLoginValidationPromise(emailData, firebaseAuthValue)]).then(() => {
      firebaseAuthValue.sgLogIn(emailData.email, passwordData.password)
    }).catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected. --- Login Email Validation")
    });
  }

//*-------------------*/


const loginValidations = {
  validationEmailLoginFunction
}

export const loginValidationsContext = createContext(loginValidations)