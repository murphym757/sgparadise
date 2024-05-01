import React, { useContext, useState } from "react"
import { useLocalSearchParams, Link, Stack } from "expo-router"
import { StyleSheet, Text, Dimensions, View, Pressable } from "react-native"
import * as AppleAuthentication from 'expo-apple-authentication';
import { CurrentThemeContext, Container, MainFont, MainSubFont } from 'index'
import { PageStructureContext } from '../reuseableComponents/pageStructure'
import { TextInput, Button } from 'react-native-paper'
import { useAppleAuth } from 'auth/appleAuthContext'

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
    console.log("🚀 ~ PageContentGamePage ~ appleTokenExpirationDate:", appleTokenExpirationDate)
    const windowWidth = Dimensions.get('window').width
    const colors = useContext(CurrentThemeContext)
    const pageStructure = useContext(PageStructureContext)
    const pageTitle = 'Index page of Account Tab'
    const isNextPage = false
    const backHeaderTitle = 'Search'
    const [userLoggedIn, setUserLoggedIn] = useState(false) //* <---------Remove this line
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registrationType, setRegistrationType] = useState('login')
    const [error, setError] = useState(null)
    const [helperText, setHelperText] = useState('hello world')

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

    function accountTextField(textInputLabel, textInputValue, textChangeText) {
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
                    error={error} // Add this line
                    helperText={helperText} // And this line
                />
                {error && <Text>{helperText}</Text>}
            </View>
        )
    }

    //* Important-------Include Google, Apple and Facebook login

    //* Form Section
        function inputRow(textInputLabel, textInputValue, textChangeText, key) {
            return (
                <View style={{flexDirection: "row"}} key={key}>
                    {accountTextField(textInputLabel, textInputValue, textInputValue => textChangeText(textInputValue))}
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

        function inputForm(formTitle, formFields, formButton, formRedirect, formFieldsAlt) {
            return (
                <View style={{justifyContent: "center", paddingBottom: 50}}>
                    <MainFont style={{color: colors.primaryFontColor}}>{formTitle}</MainFont>
                    {formFields.map((formField, index) => {
                        return inputRow(formField.label, formField.value, formField.onChange, index)
                    })}
                    {formRedirect === true ? formRedirectLink('Forgot Password') : null}
                    <View style={{paddingTop: 20}}>
                        <Button
                            style={{buttonColor: colors.primaryColor, backgroundColor: colors.secondaryColor}}
                            mode="contained" 
                            onPress={() => console.log('Pressed')}>
                                {formButton}
                        </Button>
                    </View>
                    <View style={{paddingTop: 20}}>
                        <Pressable onPress={formFieldsAlt.onChange}>
                            <MainFont>{formFieldsAlt.value}</MainFont><MainSubFont>{formFieldsAlt.label}</MainSubFont>
                        </Pressable>
                    </View>
                </View>
            )
        }
    //*-----Form Section-----*/
    
    //* Login Section
        function sgLogin() {
            const formFields = [
                { label: 'Email', value: email, onChange: setEmail },
                { label: 'Password', value: password, onChange: setPassword },
            ]
            const formFieldsAlt = { label: 'Sign Up', value: `Don't Have Account?`, onChange: () => setRegistrationType('signUp')}

            return inputForm('Login', formFields, 'Login', true, formFieldsAlt)
        }
    //*-----Login Section-----*/

    //* Sign Up Section
        function sgSignUp() {
            const formFields = [
                { label: 'Username', value: username, onChange: setUsername},
                { label: 'Email', value: email, onChange: setEmail },
                { label: 'Password', value: password, onChange: setPassword },
                { label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword}
            ]
            const formFieldsAlt = { label: 'Login', value: 'Have An Account?', onChange: () => setRegistrationType('login')}

            return inputForm('Sign Up', formFields, 'Sign Up', false, formFieldsAlt)
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
                                <View style={{paddingVertical:20}}>
                                    {siteWideButton('Get Apple Credential State', () => getAppleCredentialState())}
                                </View>
                                <View style={{paddingVertical:20}}>
                                    {siteWideButton('Refresh', () => refreshAppleToken())}
                                </View>
                                <View style={{paddingVertical:20}}>
                                    {siteWideButton('Logout', () => logoutAppleUser())}
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