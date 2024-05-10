import React, { createContext } from 'react'

function newUserEmailValidationPromise(emailData) {
    const newUserEmailPromise = new Promise((resolve, reject) => {
        if (emailData.newUserEmailValidationErrors.length > 0) {
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
            if (password == confirmPassword) {
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

function validationNewUserFunction(firebaseAuthValue, emailData, passwordData) {
    Promise.all([newUserEmailValidationPromise(emailData), newUserPasswordValidationPromise(passwordData)]).then(() => {
        firebaseAuthValue.sgAccountSignUp(emailData.email, passwordData.password, firebaseAuthValue.setCheckEmailExistence)
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