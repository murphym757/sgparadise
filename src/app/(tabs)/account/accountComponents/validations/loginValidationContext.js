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
        const validationErrors = emailData.loginEmailValidationErrors
        const setLoginErrorCheck = emailData.setLoginErrorEmailCheck
        const validationType = 'Email'
        return validationPromise(validationErrors, setLoginErrorCheck, firebaseAuthValue, validationType)
    }
//*-------------------*/

//*------------------------------------Login Password Validation------------------------------------*//

function passwordLoginValidationPromise(passwordData, firebaseAuthValue) {
    const validationErrors = passwordData.loginPasswordValidationErrors
    const setLoginErrorCheck = passwordData.setLoginErrorPasswordCheck
    const validationType = 'Password'
    return validationPromise(validationErrors, setLoginErrorCheck, firebaseAuthValue, validationType)
}
//*-------------------*/

//*------------------------------------Login Validation------------------------------------*//
function validationPromise(validationErrors, setLoginErrorCheck, firebaseAuthValue, validationType) {
    const matchPromise = new Promise((resolve, reject) => {
        if (validationErrors.length < 0) {
            setLoginErrorCheck(validationErrors)
        reject((`${validationType} validation failed:`, validationErrors));
    } else {
        setLoginErrorCheck(validationErrors)
        firebaseAuthValue.setCheckUserExistence(true)
        resolve(`${validationType} is valid!`)
    }
    })
    return matchPromise
}

function validationLoginFunction(firebaseAuthValue, emailData, passwordData) {
    Promise.all([emailLoginValidationPromise(emailData, firebaseAuthValue), passwordLoginValidationPromise(passwordData, firebaseAuthValue)]).then(() => {
    firebaseAuthValue.sgLogIn(emailData.email, passwordData.password)
    }).catch((err) => {
    }).finally(() => {
        console.log( "The Promise is settled, meaning it has been resolved or rejected. --- Login Email Validation")
    });
}
//*-------------------*/


const loginValidations = {
    emailValidationPromise,
    validationLoginFunction
}

export const loginValidationsContext = createContext(loginValidations)