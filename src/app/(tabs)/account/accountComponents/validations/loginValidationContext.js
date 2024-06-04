import React, { createContext } from 'react'


    function validationPromiseUpdateUser(dataGroup) {
        const matchPromise = new Promise((resolve, reject) => {
            if (dataGroup.validationErrors.length > 0) {
                dataGroup.onChangeErrorCheck(dataGroup.validationErrors)
                console.log(`${dataGroup.groupName} validation failed:`, dataGroup.validationErrors)
                reject(`${dataGroup.groupName} validation failed`)
            } else {
                if (dataGroup.newValue !== dataGroup.currentValue || dataGroup.newValue !== '') {
                    dataGroup.onChangeErrorCheck(null)
                    resolve(`The ${dataGroup.groupName} has been updated`)
                } else {
                    dataGroup.onChangeErrorCheck(dataGroup.validationErrors)
                    reject(`The ${dataGroup.groupName} is still the same`)
                }
                console.log(`${dataGroup.groupName} is valid!`)
            }
        });
        return matchPromise
    }

    //! This is the function that is used to validate the user's email and username, but there still is an error here
    function validationUpdateUserFunction(dataGroup) {
        validationPromiseUpdateUser(dataGroup).then(() => {
            dataGroup.firebaseAuthValueFunction();
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            console.log("The Promise is settled, meaning it has been resolved or rejected. --- Login Email Validation");
        });
    }
//* This is the function is used to reauthenticate the user via checking email and password (universal such be on other screens)

    function emailValidationPromise(emailData) {
        return validationUpdateUserFunction(emailData)
    }

    //*-------------------*/

//* Used for changing s logged in user's username

    function usernameValidationPromise(usernameData) {
        return validationUpdateUserFunction(usernameData)
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
        if (validationErrors.length > 0) {
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
    usernameValidationPromise,
    validationLoginFunction
}

export const loginValidationsContext = createContext(loginValidations)