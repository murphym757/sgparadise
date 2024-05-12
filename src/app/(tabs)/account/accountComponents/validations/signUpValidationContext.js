import React, { createContext } from 'react'

function newUserUsernameValidationPromise(usernameData) {
    const usernameMatchPromise = new Promise((resolve, reject) => {
        if (usernameData.newUserUsernameValidationErrors.length < 0) {
            usernameData.setNewUserErrorUsernameCheck(usernameData.newUserUsernameValidationErrors)
            reject('Username validation failed:', usernameData.newUserUsernameValidationErrors)
        } else {
            usernameData.setNewUserErrorUsernameCheck(usernameData.newUserUsernameValidationErrors)
            resolve('Username is valid!')
        }
    })
    return usernameMatchPromise

}

function newUserEmailValidationPromise(emailData) {
    const newUserEmailPromise = new Promise((resolve, reject) => {
        if (emailData.newUserEmailValidationErrors.length < 0) {
            emailData.setNewUserErrorEmailCheck(emailData.newUserEmailValidationErrors)
            reject('Email validation failed:', emailData.newUserEmailValidationErrors)
        } else {
            emailData.setNewUserErrorEmailCheck(emailData.newUserEmailValidationErrors)
            resolve('Email is valid!')
        } 
    })
    return newUserEmailPromise
}

function newUserPasswordValidationPromise(passwordData) {
    const passwordMatchPromise = new Promise((resolve, reject) => {
        if (passwordData.newUserPasswordValidationErrors.length > 0) {
            passwordData.setNewUserErrorPasswordCheck(passwordData.newUserPasswordValidationErrors)
        } else {
            if (passwordData.password == passwordData.confirmPassword) {
                resolve('The password has been updated')
                passwordData.setNewUserErrorPasswordCheck(null)
            } else {
                reject('The passwords do not match')
                passwordData.setNewUserErrorPasswordCheck(passwordData.newUserPasswordValidationErrors)
                passwordData.setPasswordCheckStatus('rejected')
            }
        }
    })
    return passwordMatchPromise
}

function validationNewUserFunction(firebaseAuthValue, usernameData, emailData, passwordData) {
    Promise.all([newUserUsernameValidationPromise(usernameData), newUserEmailValidationPromise(emailData), newUserPasswordValidationPromise(passwordData)]).then(() => {
        firebaseAuthValue.sgAccountSignUp(emailData.email, passwordData.password)
    }).catch((err) => {
        console.error(err)
    }).finally(() => {
        console.log( "The Promise is settled, meaning it has been resolved or rejected. --- New User Email Validation")
    })
}

const signUpValidations = {
    validationNewUserFunction
}

export const signValidationsContext = createContext(signUpValidations)