import React from 'react'

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

//*-------------------*/

//*------------------------------------Login Email Validation------------------------------------*//

  function emailLoginValidationPromise(passingUserData) {
    const loginEmailMatchPromise = new Promise((resolve, reject) => {
      if (passingUserData.emailValidationErrors.length < 0) {
        passingUserData.setUserErrorEmailCheck(passingUserData.emailValidationErrors)
        reject(('Email validation failed:', passingUserData.emailValidationErrors));
      } else {
        passingUserData.setUserErrorEmailCheck(passingUserData.emailValidationErrors)
        passingUserData.setCheckUserExistence(true)
        //? There is no need to set the password check to true because the password is not being checked here
        resolve('Email is valid!')
      } 
    })
    return loginEmailMatchPromise
  }

  function validationEmailLoginFunction(passingUserData) {
    Promise.all([emailLoginValidationPromise(passingUserData)]).then(() => {
      passingUserData.logIn(passingUserData.email, passingUserData.password, passingUserData.setCheckUserExistence, passingUserData.setCheckPasswordExistence)
    }).catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected. --- Login Email Validation")
    });
  }

//*-------------------*/

const loginValidations = {
  emailValidationPromise,
  validationEmailLoginFunction,
  
}

export const LoginValidationsContext = React.createContext(loginValidations)