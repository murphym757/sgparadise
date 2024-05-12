import React, { useContext, useState } from "react"
import { useLocalSearchParams, Link, Stack } from "expo-router"
import { StyleSheet, Text, Dimensions, View, Pressable } from "react-native"
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
    const windowWidth = Dimensions.get('window').width
    const colors = useContext(CurrentThemeContext)
    const pageStructure = useContext(PageStructureContext)
    const formFieldValidation = useContext(formFieldValidationContext)
    const signUpValidation = useContext(signValidationsContext)
    const loginValidation = useContext(loginValidationsContext)
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

    const [userLoggedIn, setUserLoggedIn] = useState(false) //* <---------Remove this line
    const [currentUser, setCurrentUser] = useState(null)
    const [usernameExist, setUsernameExist] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordCheckStatus, setPasswordCheckStatus] = useState('fulfilled')
    const [registrationType, setRegistrationType] = useState('login')
    const [error, setError] = useState(null)
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

    function accountTextField(textInputLabel, textInputValue, textChangeText, textInputError) {
        return (
            <View style={{flex: 1}}>
                <TextInput
                    label={textInputLabel}
                    value={textInputValue}
                    onChangeText={textChangeText}
                    textColor={colors.primaryFontColor}
                    underlineColor={colors.secondaryColor}
                    activeUnderlineColor={colors.secondaryColor}
                    style={{backgroundColor: colors.primaryColor}}
                    errorMessage={textInputError} // And this line
                />
                <View style={{paddingVertical: 10}}>
                    {textInputError && textInputError.map((error, index) => <MainFont style={{color: colors.secondaryColorFontColor, paddingVertical: 5}} key={index}>{error}</MainFont>)}
                </View>
            </View>
        )
    }

    //* Important-------Include Google, Apple and Facebook login

    //* Form Section
        function inputRow(textInputLabel, textInputValue, textChangeText, key, textInputError) {
            return (
                <View style={{flexDirection: "row"}} key={key}>
                    {accountTextField(textInputLabel, textInputValue, textInputValue => textChangeText(textInputValue), textInputError)}
                </View>
            )
        }

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

        function inputFormFields(formTitle, formFields, formRedirect, formType) {
            return (
                <View>
                    <MainFont style={{color: colors.primaryFontColor}}>{formTitle}</MainFont>
                    {formFields.map((formField, index) => {
                        return inputRow(formField.label, formField.value, formField.onChange, index, formField.errorMessage)
                    })}
                    {formRedirect === true ? formRedirectLink('Forgot Password') : null}
                </View>
            )
        }
        
        function inputFormButton(formButton, formFunction) {
            return (
                <View style={{paddingTop: 20}}>
                    <Button
                        style={{buttonColor: colors.primaryColor, backgroundColor: colors.secondaryColor}}
                        mode="contained" 
                        onPress={formFunction}>
                            {formButton}
                    </Button>
                </View>
            )
        }

        function inputFormRedirectLink(formFieldsAlt) {
            return (
                <View style={{paddingTop: 20}}>
                        <Pressable onPress={formFieldsAlt.onChange}>
                            <MainFont>{formFieldsAlt.value}</MainFont><MainSubFont>{formFieldsAlt.label}</MainSubFont>
                        </Pressable>
                    </View>
            )
        }

        function inputForm(formTitle, formFields, formButton, formRedirect, formFieldsAlt, formType, formFunction) {
            return (
                <View style={{justifyContent: "center", paddingBottom: 50}}>
                    {inputFormFields(formTitle, formFields, formRedirect, formType)}
                    {inputFormButton(formButton, formFunction)}
                    {inputFormRedirectLink(formFieldsAlt)}
                </View>
            )
        }
    //*-----Form Section-----*/
    
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
            const formFieldsAlt = { label: 'Sign Up', value: `Don't Have Account?`, onChange: () => setRegistrationType('signUp')}

            return inputForm('Login', formFields, 'Login', true, formFieldsAlt, 'login', () => loginValidation.validationLoginFunction(firebaseAuthValue, emailData, passwordData))
        }
    //*-----Login Section-----*/

    //* Sign Up Section
        function sgSignUp() {
            const newUserUsernameValidationErrors = formFieldValidation.signUpValidations.validateNewUsername(username, currentUser, usernameExist)
            console.log("🚀 ~ sgSignUp ~ newUserUsernameValidationErrors:", newUserUsernameValidationErrors)
            const newUserEmailValidationErrors = formFieldValidation.signUpValidations.validateRegisterEmail(email, firebaseAuthValue.checkEmailExistence)
            console.log("🚀 ~ sgSignUp ~ newUserEmailValidationErrors:", newUserEmailValidationErrors)
            const newUserPasswordValidationErrors = formFieldValidation.signUpValidations.validateRegisterPassword(password, confirmPassword)
            console.log("🚀 ~ sgSignUp ~ newUserPasswordValidationErrors:", newUserPasswordValidationErrors)
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
            const formFieldsAlt = { label: 'Login', value: 'Have An Account?', onChange: () => setRegistrationType('login')}

            return inputForm('Sign Up', formFields, 'Sign Up', false, formFieldsAlt, 'signUp', () => signUpValidation.validationNewUserFunction(firebaseAuthValue, usernameData, emailData, passwordData))
        }
    //*-----Sign Up Section-----*/

    function registrationCheck() {
        return (
            <View>
                {registrationType === 'login' ? sgLogin(): sgSignUp()}
            </View>
        )
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
    function pageContent() {
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    {authCheck()}
                </View>
            </View>
        )
    }

    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, pageContent())
}