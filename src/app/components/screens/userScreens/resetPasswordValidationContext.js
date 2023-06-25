import React from 'react'

//*------------------------------------Forgot Password Email Validation------------------------------------*//

  function emailForgotPasswordValidationPromise(passingUserData) {
    const forgotPasswordEmailMatchPromise = new Promise((resolve, reject) => {
      if (passingUserData.forgotPasswordUserEmailValidationErrors.length < 0) {
        passingUserData.setUserErrorEmailCheck(passingUserData.forgotPasswordUserEmailValidationErrors)
        passingUserData.setEmailPassed(false)
        reject(('Email validation failed:', passingUserData.forgotPasswordUserEmailValidationErrors));
      } else {
        passingUserData.setUserErrorEmailCheck(passingUserData.forgotPasswordUserEmailValidationErrors)
        passingUserData.setEmailPassed(true)
        resolve('Email is valid!')
      } 
    })
    return forgotPasswordEmailMatchPromise
  }
    
  function validationEmailForgotPasswordFunction(passingUserData) {
    Promise.all([emailForgotPasswordValidationPromise(passingUserData)]).then(() => {
      passingUserData.setUserErrorEmailCheck(passingUserData.forgotPasswordUserEmailValidationErrors)
      passingUserData.sendVerificationCode(passingUserData.email)
    }).catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected. --- Forgot Password Email Validation")
    });
  }
  
//*-------------------*/


const resetPasswordValidations = {
  validationEmailForgotPasswordFunction
}

export const ResetPasswordValidationsContext = React.createContext(resetPasswordValidations)