import React, { useContext, useState } from "react"
import { useLocalSearchParams, Link, Stack } from "expo-router"
import { StyleSheet, Text, Dimensions, View, Pressable, Animated } from "react-native"
import * as AppleAuthentication from 'expo-apple-authentication';
import { CurrentThemeContext, Container, MainFont, MainSubFont } from 'index'
import { PageStructureContext } from '../reuseableComponents/pageStructure'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from 'auth/authContext'
import { useAppleAuth } from 'auth/appleAuthContext'
import { useFirebaseAuth } from 'auth/firebaseAuthContext'
import { formFieldValidationContext } from 'auth/formFieldValidationsContext'
import { signValidationsContext } from 'validations/signUpValidationContext'
import { loginValidationsContext } from 'validations/loginValidationContext' //* Fix this bug (importing the wrong file)
import { forgotPasswordValidationContext } from 'validations/forgotPasswordValidationContext'
import { formFieldContext } from "./formContext";
import { withSpring } from 'react-native-reanimated'

export default function PageContentGamePage() {
    const { 
        appleAuthAvailable,
        appleAuthButton, 
        appleUserToken, 
        appleUserEmail, 
        appleTokenExpirationDate, 
        getAppleCredentialState,
        logoutAppleUser,
        refreshAppleToken
    } = useAppleAuth()
    const { auth, firebaseAuthValue, cloudFirestoreValue } = useFirebaseAuth()
    console.log("🚀 ~ PageContentGamePage ~ auth:", auth)
    const windowWidth = Dimensions.get('window').width
    const colors = useContext(CurrentThemeContext)
    const pageStructure = useContext(PageStructureContext)
    const formFieldValidation = useContext(formFieldValidationContext)
    const signUpValidation = useContext(signValidationsContext)
    const loginValidation = useContext(loginValidationsContext)
    const forgotPasswordValidation = useContext(forgotPasswordValidationContext)
    const formStructure = useContext(formFieldContext)
    const pageTitle = 'Index page of Account Tab'
    const isNextPage = false
    const backHeaderTitle = 'Search'

    //* Error Handling
    const [newUserErrorUsernameCheck, setNewUserErrorUsernameCheck] = useState([])
    const [newUserErrorEmailCheck, setNewUserErrorEmailCheck] = useState([])
    const [newUserErrorPasswordCheck,  setNewUserErrorPasswordCheck] = useState([])
    const [newUserErrorConfirmPasswordCheck,  setNewUserErrorConfirmPasswordCheck] = useState([])
    const [loginErrorEmailCheck, setLoginErrorEmailCheck] = useState([])
    const [loginErrorPasswordCheck,  setLoginErrorPasswordCheck] = useState([])
    const [forgotPasswordErrorEmailCheck, setForgotPasswordErrorEmailCheck] = useState([])

    const [userLoggedIn, setUserLoggedIn] = useState(false) //* <---------Remove this line
    const [currentUser, setCurrentUser] = useState(null)
    const [usernameExist, setUsernameExist] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
    const [passwordCheckStatus, setPasswordCheckStatus] = useState('fulfilled')
    const [registrationType, setRegistrationType] = useState('login')
    const [formError, setFormError] = useState(null)
    const [helperText, setHelperText] = useState('hello world')
    const [checkUserExistence, setCheckUserExistence] = useState(false)
    const [checkEmailExistence, setCheckEmailExistence] = useState(false)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            padding: 24,
        },
        main: {
            flex: 1,
            justifyContent: "center",
            maxWidth: 960,
            marginHorizontal: "auto",
        },
        title: {
            color: colors.primaryColorAlt,
            fontFamily: 'SpartanBlack',
            fontSize: 64,
        },
        subtitle: {
            fontSize: 36,
            color: colors.secondaryColor,
        },
        button: {
            width: 388,
            height: 35,
        },
    })  

    //TODO: Create an auth section
        //TODO: Create a login section
        //TODO: Create a register section

    //TODO: Create a Account Page
        //TODO: Create a profile section
            //TODO: Create a profile edit section
        //TODO: Create a settings section

    

    //* Important-------Include Google, Apple and Facebook login

        function formRedirectLink(renderedLink) {
            return (
                <Link 
                    href={{
                        pathname: renderedLink,
                    }} 
                    style={{color: colors.primaryFontColor}}>
                    {renderedLink}
                </Link>
            )
        }


        function resetErrorCheck(errorCheck) {
            if (errorCheck === 'Login') return setNewUserErrorUsernameCheck(null), setNewUserErrorEmailCheck(null), setNewUserErrorPasswordCheck(null), setNewUserErrorConfirmPasswordCheck(null)
            if (errorCheck === 'Sign Up') return setLoginErrorEmailCheck(null), setLoginErrorPasswordCheck(null), setForgotPasswordErrorEmailCheck(null)
        }

        
    //*-----Form Section-----*/

    //* Forgot Password Section
        function sgForgotPassword() {
            const forgotPasswordEmailValidationErrors = formFieldValidation.forgotPasswordValidations.validateForgotPasswordEmail(email, firebaseAuthValue.checkEmailExistence)
            const emailData = {
                forgotPasswordEmail,
                forgotPasswordEmailValidationErrors,
                setForgotPasswordErrorEmailCheck
            }
            const formFields = [
                { label: 'Email', value: forgotPasswordEmail, onChange: setForgotPasswordEmail, errorMessage: forgotPasswordErrorEmailCheck}
            ]
            const formFieldsAlt = { label: 'Sign Up', value: `Don't Have Account?`, onChange: () => setRegistrationType('signUp'), labelAlt: null, onChangeAlt: null}
            const inputFormData = {
                formTitle: 'Forgot Password', 
                formFields, 
                formButton: 'Reset Password', 
                formRedirect: false, 
                formFieldsAlt, 
                formType: 'forgotPassword', 
                formFunction: () => forgotPasswordValidation.validationEmailForgotPasswordFunction(firebaseAuthValue, emailData), 
                resetErrorCheck,
                colors
            }
            return formStructure.inputForm(inputFormData)
        }
    //*-----Forgot Password Section-----*/
    //* Login Section
        function sgLogin() {
            const loginEmailValidationErrors = formFieldValidation.loginValidations.validateLoginEmail(email, firebaseAuthValue.checkUserExistence, firebaseAuthValue.checkPasswordExistence)
            const loginPasswordValidationErrors = formFieldValidation.loginValidations.validateLoginPassword(password)
            const emailData = {
                email,
                loginEmailValidationErrors,
                setLoginErrorEmailCheck
            }
            const passwordData = {
                password,
                loginPasswordValidationErrors,
                setLoginErrorPasswordCheck
            }
            const formFields = [
                { label: 'Email', value: email, onChange: setEmail, errorMessage: loginErrorEmailCheck},
                { label: 'Password', value: password, onChange: setPassword, errorMessage: loginErrorPasswordCheck},
            ]
            const formFieldsAlt = { label: 'Sign Up', value: `Don't Have Account?`, onChange: () => setRegistrationType('signUp'), labelAlt: 'Forgot Password', onChangeAlt: () => setRegistrationType('forgotPassword')}
            const inputFormData = {
                formTitle: 'Login', 
                formFields, 
                formButton: 'Login', 
                formRedirect: true, 
                formFieldsAlt, 
                formType: 'login', 
                formFunction: () => loginValidation.validationLoginFunction(firebaseAuthValue, emailData, passwordData), 
                resetErrorCheck,
                colors
            }
            return formStructure.inputForm(inputFormData)
        }
    //*-----Login Section-----*/

    //* Sign Up Section
        function sgSignUp() {
            const newUserUsernameValidationErrors = formFieldValidation.signUpValidations.validateNewUsername(username, currentUser, usernameExist)
            const newUserEmailValidationErrors = formFieldValidation.signUpValidations.validateRegisterEmail(email, firebaseAuthValue.checkEmailExistence)
            const newUserPasswordValidationErrors = formFieldValidation.signUpValidations.validateRegisterPassword(password, confirmPassword)
            const usernameData = {
                username, 
                currentUser,
                usernameExist,
                newUserUsernameValidationErrors,
                setNewUserErrorUsernameCheck
            }
            const emailData = {
                email,
                newUserEmailValidationErrors,
                setNewUserErrorEmailCheck
            }
            const passwordData = {
                password,
                confirmPassword,
                newUserPasswordValidationErrors,
                setNewUserErrorPasswordCheck,
                setPasswordCheckStatus,
                setNewUserErrorConfirmPasswordCheck
            }
            const formFields = [
                { label: 'Username', value: username, onChange: setUsername, errorMessage: newUserErrorUsernameCheck},
                { label: 'Email', value: email, onChange: setEmail, errorMessage: newUserErrorEmailCheck},
                { label: 'Password', value: password, onChange: setPassword, errorMessage: newUserErrorPasswordCheck},
                { label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword, errorMessage: newUserErrorConfirmPasswordCheck}
            ]
            const formFieldsAlt = { label: 'Login', value: 'Have An Account?', onChange: () => setRegistrationType('login'), labelAlt: null, onChangeAlt: null}
            
            const inputFormData = {
                formTitle: 'Sign Up', 
                formFields, 
                formButton: 'Sign Up', 
                formRedirect: false, 
                formFieldsAlt, 
                formType: 'signUp', 
                formFunction: () => signUpValidation.validationNewUserFunction(firebaseAuthValue, usernameData, emailData, passwordData), 
                resetErrorCheck,
                colors: colors
        }

            return formStructure.inputForm(inputFormData)
        }
    //*-----Sign Up Section-----*/

    function registrationCheck() {
            if (registrationType === 'login') return sgLogin()
            if (registrationType === 'signUp') return sgSignUp()
            if (registrationType === 'forgotPassword') return sgForgotPassword()
    }

    function siteWideButton(buttonTitle, buttonFunction) {
        return (
            <Button 
                style={{buttonColor: colors.primaryColor, backgroundColor: colors.secondaryColor}}
                mode="contained" 
                onPress={buttonFunction}>
                    {buttonTitle}
            </Button>
        )
    }

    //* Apple Login Section
    //* Needs to retrieve the user's email (optional) and uid. This will then go into firebase for the user's account
        function appleAuthCheck() {
            return (
                <View>
                    {appleUserToken === undefined || appleUserToken === null
                        ?   appleAuthButton() 
                        :   <View>
                                <Text style={{color: colors.primaryFontColor}}>Apple User Email: {appleUserEmail}</Text>
                                <Text style={{color: colors.primaryFontColor}}>Apple Token Expiration Date: {appleTokenExpirationDate}</Text>
                                <View style={{paddingVertical:10}}>
                                    {siteWideButton('Get Apple Credential State', () => getAppleCredentialState())}
                                </View>
                                <View style={{paddingVertical:10}}>
                                    {siteWideButton('Refresh', () => refreshAppleToken())}
                                </View>
                                <View style={{paddingVertical:10}}>
                                    {siteWideButton('Logout', () => logoutAppleUser())}
                                </View>
                                <View style={{paddingVertical:10}}>
                                    {siteWideButton('Delete User', () => {
                                        firebaseAuthValue.deleteAccountAuth()
                                        cloudFirestoreValue.deleteAccountDb(currentUser.uid)
                                    })}
                                </View>
                            </View>
                    }
                </View>
            )
        }
    //*-----Apple Login Section-----*/

    function authCheck() {
        return (
            <Container style={{width: windowWidth}}>
                {registrationCheck()}
                {appleAuthCheck()}
                <Text style={{color: colors.primaryFontColor}}>Create a auth section</Text>
            </Container>
        )
    }

    function userSection() {
        return (
            <View>
                <MainFont style={styles.subtitle}>User Section</MainFont>

            </View>
        ) 
    }
    
    function pageContent() {
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    {auth ? authCheck() : authCheck()}
                </View>
            </View>
        )
    }

    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, pageContent())
}