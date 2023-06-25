import React from 'react'

//*------------------------------------New User Email Validation------------------------------------*//

  function newUserEmailValidationPromise(passingNewUserData) {
    const newUserEmailPromise = new Promise((resolve, reject) => {
      if (passingNewUserData.newUserEmailValidationErrors.length < 0) {
        passingNewUserData.setNewUserErrorEmailCheck(passingNewUserData.newUserEmailValidationErrors)
        reject(('Email validation failed:', passingNewUserData.newUserEmailValidationErrors));
      } else {
        passingNewUserData.setNewUserErrorEmailCheck(passingNewUserData.newUserEmailValidationErrors)
        resolve('Email is valid!')
      } 
    })
    return newUserEmailPromise
  }

  function newUserPasswordValidationPromise(passingNewUserData) {
    const passwordMatchPromise = new Promise((resolve, reject) => {
      if (passingNewUserData.newUserPasswordValidationErrors.length > 0) {
        passingNewUserData.setNewUserErrorPasswordCheck(passingNewUserData.newUserPasswordValidationErrors)
        console.log('Password validation failed:', passingNewUserData.newUserPasswordValidationErrors);
      } else {
        if (passingNewUserData.password == passingNewUserData.confirmPassword) {
          resolve('The password has been updated')
          passingNewUserData.setNewUserErrorPasswordCheck(null)
        } else {
          reject('The passwords do not match')
          passingNewUserData.setNewUserErrorPasswordCheck(passingNewUserData.newUserPasswordValidationErrors)
          passingNewUserData.setPasswordCheckStatus('rejected')
        }
      }
        return passwordMatchPromise
    })
  }

  function validationNewUserFunction(passingNewUserData) {
    Promise.all([newUserEmailValidationPromise(passingNewUserData), newUserPasswordValidationPromise(passingNewUserData)]).then(() => {
      passingNewUserData.signUp(passingNewUserData.email, passingNewUserData.password, passingNewUserData.setCheckEmailExistence)
    }).catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected. --- New User Email Validation")
    });
  }

//*-------------------*/

const registrationValidations = {
  validationNewUserFunction
}

export const RegistrationValidationsContext = React.createContext(registrationValidations)