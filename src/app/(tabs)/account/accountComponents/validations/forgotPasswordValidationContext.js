import React, { createContext } from 'react'

//*------------------------------------Forgot Password Email Validation------------------------------------*//

    function emailForgotPasswordValidationPromise(forgotPasswordData) {
        const forgotPasswordEmailMatchPromise = new Promise((resolve, reject) => {
        if (forgotPasswordData.forgotPasswordEmailValidationErrors.length < 0) {
            forgotPasswordData.setForgotPasswordErrorEmailCheck(forgotPasswordData.forgotPasswordEmailValidationErrors)
            forgotPasswordData.setEmailPassed(false)
            reject(('Email validation failed:', forgotPasswordData.forgotPasswordEmailValidationErrors));
        } else {
            forgotPasswordData.setForgotPasswordErrorEmailCheck(forgotPasswordData.forgotPasswordEmailValidationErrors)
            forgotPasswordData.setEmailPassed(true)
            resolve('Email is valid!')
        } 
        })
        return forgotPasswordEmailMatchPromise
    }
        
    function validationEmailForgotPasswordFunction(firebaseAuthValue, forgotPasswordData) {
        Promise.all([emailForgotPasswordValidationPromise(forgotPasswordData)]).then(() => {
        forgotPasswordData.setForgotPasswordErrorEmailCheck(forgotPasswordData.forgotPasswordEmailValidationErrors)
            firebaseAuthValue.sendVerificationCode(forgotPasswordData.forgotPasswordEmail)
        }).catch((err) => {
        }).finally(() => {
        console.log( "The Promise is settled, meaning it has been resolved or rejected. --- Forgot Password Email Validation")
        });
    }
    
//*-------------------*/


const resetPasswordValidations = {
    validationEmailForgotPasswordFunction
}

export const forgotPasswordValidationContext = createContext(resetPasswordValidations)