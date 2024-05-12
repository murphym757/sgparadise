import React, { createContext } from 'react'
import { bannedWords } from 'server/sgProfanityFilter.js'

    //* Validation for email, password, and username

        //*Email Validation
        
            //? Checks for the following criteria:
                //? Starts with one or more characters that are not whitespace or @
                //? Followed by @ symbol
                //? Followed by one or more characters that are not whitespace or @
                //? Followed by a dot
                //? Ends with one or more characters that are not whitespace or @
    

                function validateForgotPasswordEmail(email, emailPassed) {
                    const errors = [];
    
                    if (!email) {
                        errors.push('Email is required');
                    }
    
                    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        errors.push('Invalid email format');
                    }
                    
                    if (emailPassed === true) {
                        errors.push('Verification email sent successfully');
                    }
    
                    return errors;
                }
    
                function validateRegisterEmail(email, emailExist) {
                    const errors = [];
    
                    if (!email) {
                        errors.push('Email is required');
                    }
    
                    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        errors.push('Invalid email format');
                    }
    
                    if (emailExist === true)  {
                        errors.push('This email is already in use')
                    } 
    
                    return errors;
                }
    
                //* Used for updating email (opposed to actually logging the user in)
                function validateLoginEmail(email, userExist, passwordExist) {
                    const errors = [];
                
                    if (!email) {
                        errors.push('Email is required');
                    }
                
                    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        errors.push('Invalid email format');
                    } 
                    if (userExist === false)  {
                        errors.push('User does not exist')
                    } 
                    if (passwordExist === false)  {
                        errors.push('Password does not match our records')
                    } 
    
                    /*
                        if (userExist === true && passwordExist === null)  {
                            errors.push('Password required')
                        } 
                    */
                
                    return errors;
                }
                //* ----------------------------//
    
                function validateNewEmail(newEmail, currentEmail, emailExist) {
                    const errors = []
                
                    if (!newEmail) {
                        errors.push('Email is required');
                    }
                
                    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        errors.push('Invalid email format');
                    } 
    
                    if (newEmail === currentEmail) {
                        errors.push('This is your current email');
                    }
    
                    if (emailExist === null || emailExist === true)  {
                        errors.push('This email is already in use')
                    } 
                
                    return errors;
                }
            /*----------------------------------------------*/
    
            //*Password 
            /*
                Checks for the following criteria:
                At least 8 characters long
                Contains at least one digit (0-9)
                Contains at least one lowercase letter (a-z)
                Contains at least one uppercase letter (A-Z)
                Contains at least one special character (!@#$%^&*()_+)
            */
                function validateRegisterPassword(password, confirmPassword) {
                    const errors = [];  
    
                    if (password.length < 8) {
                        errors.push('Password must be at least 8 characters long');
                    }
                
                    if (!password.match(/[a-z]/)) {
                        errors.push('Password must contain at least one lowercase letter');
                    }
                
                    if (!password.match(/[A-Z]/)) {
                        errors.push('Password must contain at least one uppercase letter');
                    }
                
                    if (!password.match(/\d/)) {
                        errors.push('Password must contain at least one digit');
                    }
                
                    if (!password.match(/[!@#$%^&*()_+]/)) {
                        errors.push('Password must contain at least one special character');
                    }
    
                    if (password !== confirmPassword) {
                        errors.push('Passwords do not match');
                    }
    
                    return errors;
                }
    
                function validateLoginPassword(password) {
                    const errors = [];
                    
                    if (password.length < 8) {
                        errors.push('Password must be at least 8 characters long');
                    }
                    
                    if (!password.match(/[a-z]/)) {
                        errors.push('Password must contain at least one lowercase letter');
                    }
                    
                    if (!password.match(/[A-Z]/)) {
                        errors.push('Password must contain at least one uppercase letter');
                    }
                    
                    if (!password.match(/\d/)) {
                        errors.push('Password must contain at least one digit');
                    }
                    
                    if (!password.match(/[!@#$%^&*()_+]/)) {
                        errors.push('Password must contain at least one special character');
                    }
                    
                    return errors;
                }
    
                function validateNewPassword(newPassword, confirmNewPassword) {
                    const errors = [];
                    
                    if (!newPassword || !confirmNewPassword) {
                        errors.push('Password is required');
                    }
    
                    if (newPassword.length < 8 || confirmNewPassword.length < 8) {
                        errors.push('Password must be at least 8 characters long');
                    }
    
                    if (!newPassword.match(/[a-z]/) || !confirmNewPassword.match(/[a-z]/)) {
                        errors.push('Password must contain at least one lowercase letter');
                    }
    
                    if (!newPassword.match(/[A-Z]/) || !confirmNewPassword.match(/[A-Z]/)) {
                        errors.push('Password must contain at least one uppercase letter');
                    }
    
                    if (!newPassword.match(/\d/) || !confirmNewPassword.match(/\d/)) {
                        errors.push('Password must contain at least one digit');
                    }
    
                    if (!newPassword.match(/[!@#$%^&*()_+]/) || !confirmNewPassword.match(/[!@#$%^&*()_+]/)) {
                        errors.push('Password must contain at least one special character');
                    }
    
                    return errors;
                }
            //*----------------------------------------------*/
    
            //*Username
            
                //? Checks for the following criteria:
                    //? Contains no profanity
                    //? Contains no longer than 30 characters
                    //? Contains at least 6 characters
                    //? Checks whether the new username is the same as the current username
                    //? Checks whether the new username is already in use
    
            function validateNewUsername(username, currentUser, usernameExist) {
                const errors = [];
    
                for (const word of bannedWords) {
                    const regex = new RegExp(`\\b${word}\\b`, 'gi');
                    if (regex.test(username)) {
                        const maskedWord = word.replace(/./g, '*'); // Replace each character with an asterisk
                        const maskedUsername = username.replace(regex, maskedWord);
                        errors.push(`Username contains profanity. Please choose a different username: ${maskedUsername}`);
                    }
                }
    
                if (!username) {
                    errors.push('Username is required');
                }
                
                if (username.length > 30) {
                    errors.push('Username must be no longer than 30 characters.');
                }
    
                if (username.length < 6) {
                    errors.push('Username must be at least 6 characters.');
                }
    
                if (username === currentUser) {
                    errors.push('This is your current username');
                }
    
                if (usernameExist === null || usernameExist === true)  {
                    errors.push('This username is already in use')
                } 
    
                return errors;
            }
            //*----------------------------------------------*/
    
        //*----------------------------------------------*/

        // SignUp Group
            // validateRegisterEmail
            // validateRegisterPassword
            // validateNewUsername

        //Login Group
            // validateLoginEmail
            // validateLoginPassword

        //Forgot Password Group
            // validateForgotPasswordEmail

        //Update Group
            // validateNewEmail
            // validateNewPassword
            // validateNewUsername

        const signUpValidations = {
            validateRegisterEmail,
            validateRegisterPassword,
            validateNewUsername
        }

        const loginValidations = {
            validateLoginEmail,
            validateLoginPassword
        }

        const forgotPasswordValidations = {
            validateForgotPasswordEmail
        }

        const updateValidations = {
            validateNewEmail,
            validateNewPassword,
            validateNewUsername
        }

    const validationData = {
        signUpValidations,
        loginValidations,
        forgotPasswordValidations,
        updateValidations
    }
    
    export const formFieldValidationContext = createContext(validationData)