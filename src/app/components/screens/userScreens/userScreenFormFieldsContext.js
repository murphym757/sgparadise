import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { 
    Container,
    FooterFont,
    FooterLink,
    MainFont,
    MainSubFont,
    UserScreenContext,
    CustomInputField,
    CurrentThemeContext,
    TouchableButton,
    TouchableButtonFont
} from 'index'

//* Custom Form Fields
function sgFormFieldSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors) {
    return (
        <View>
            <CustomInputField
                placeholder={sgPlaceholderFiled}
                secureTextEntry
                placeholderTextColor={colors}
                onChangeText={sgChangeTextField}
                required
                value={sgValueField}
                color={colors}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            {sgErrorMessageField}
        </View>
    )
}

function sgFormFieldNonSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors) {
    return (
        <View>
            <CustomInputField
                placeholder={sgPlaceholderFiled}
                placeholderTextColor={colors}
                onChangeText={sgChangeTextField}
                required
                value={sgValueField}
                color={colors}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            {sgErrorMessageField}
        </View>
    )
}

    function customSGFormField(passingSectionData, stateChangeFunc) {
        const sgPlaceholderFiled = passingSectionData.placeholder
        const sgChangeTextField = stateChangeFunc
        const sgValueField = passingSectionData.value
        const sgErrorMessageField = passingSectionData.errorMessageVariable
        const isSensitiveData = passingSectionData.isSensitiveData
        const colors = passingSectionData.colors.primaryColor

        if (isSensitiveData == true) {
            return (
                sgFormFieldSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors)
            )
        } else {
            return (
                sgFormFieldNonSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors)
            )
        }
    }

// Form Field Function 
     function customSGFormFieldContainer(placeholder, currentState, isSensitiveData, setNewState, colors) {
        const passingSectionData = {
            placeholder: placeholder,
            value: currentState,
            isSensitiveData: isSensitiveData,
            colors
        }
        return (
            customSGFormField(passingSectionData, (text) => setNewState(text))
        )
    }
/*------------------*/

function firebaseAuthUserDataFunctionButton(registerType, buttonTitle, passingUserData, isLoading, colors) {
    return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={
            registerType === 'login'
                ? () => {passingUserData.validationEmailLoginFunction(passingUserData), passingUserData.validationPasswordFunction(passingUserData)}
                : registerType === 'forgotPassword'
                    ? () => {passingUserData.validationEmailForgotPasswordFunction(passingUserData)}
                    : () => {passingUserData.validationNewUserFunction(passingUserData)}
            }>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
    )
}

function sgTouchableButton(pressFunction, buttonTitle, colors, isLoading) {
    return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {pressFunction}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
    )
}

//*------------------------------------registrationScreen.js Form------------------------------------*//
function registerUserButton(registerType, colors, isLoading) {
    return (
        registerType === 'signUp'
        ?   sgTouchableButton(console.log('Sign Up User'), 'Sign Up', colors, isLoading)
        :   registerType === 'login'
            ?   sgTouchableButton(console.log('Login User'), 'Login', colors, isLoading)
            :   sgTouchableButton(console.log('Reset User Password'), 'Reset Password', colors, isLoading)
    )

}
function RegistrationFormFunction(props) {
    const buttonStatement = 'Complete the form below:'
    const registrationLinks = {
        signUp: {
            name: 'Sign Up',
            link: props.signUpLink,
            description: "Don't have an account?"
        },
        login: {
            name: 'Login',
            link: props.loginLink,
            description: "Already got an account?"
        },
        resetPassword: {
            name: 'Reset Password',
            link: props.resetPasswordLink,
            description: "Forgot Password?"
        }
    }

    return (
        <View>
            <MainFont>{buttonStatement}</MainFont>
            {props.emailTextField}
            {props.passwordTextField}
            {props.registerUser == true
                ?   props.confirmPasswordTextField
                :   null
            }
            
            {props.userErrorEmailCheck !== null 
                ? props.errorMessageDataRegisterEmail
                : null
            }
            
            {props.userErrorPasswordCheck !== null 
                ? props.errorMessageDataRegisterPassword
                : null
            }
            {props.functionButton}
            {props.registerUser == true
                ?   registerUserButton('signUp', props.colors, props.isLoading)
                :   props.registerType == 'login'
                    ?   registerUserButton('login', props.colors, props.isLoading)
                    :   registerUserButton('forgotPassword', props.colors, props.isLoading)
            }
            {formFooter(props.registerType,  registrationLinks)}
        </View>
    )
}
//*------------------------------------registrationScreen.js Form------------------------------------*//

//*------------------------------------Custom Form Fields------------------------------------*//

//* Provides a list of errors to the user
    function flatListError(errorCheck, errorOwner, errorOwnerToUpChar, errorOwnerSubStrChar) {
        return (
            errorCheck.length !==0
                ?   <View>
                        <MainSubFont>{errorOwner[errorOwnerToUpChar].toUpperCase() + errorOwner.substring(errorOwnerSubStrChar)}: </MainSubFont>  
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                            data={errorCheck}
                            keyboardShouldPersistTaps="always"
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View>
                                    <MainFont>{item}</MainFont>
                                </View>
                            )}
                        />
                    </View>
                :   null
        )
    }
    // Appears between the last form field on the page and each respective "change" button
    function errorMessageDataMain(errorCheck, errorOwner) {
        if (errorCheck !== null) { 
            if (errorOwner === 'email') { 
                return flatListError(errorCheck, errorOwner, 0, 1)
            }
            if (errorOwner === 'newEmail') { 
                return flatListError(errorCheck, errorOwner, 3, 4)
            }
            if (errorOwner === 'password' && errorCheck.length !== 0) {
                return flatListError(errorCheck, errorOwner, 0, 1)
            }
            if (errorOwner === 'newPassword' && errorCheck.length !== 0) {
                return flatListError(errorCheck, errorOwner, 0, 1)
            }
            if (errorOwner === 'forgotPassword') {
                return flatListError(errorCheck, 'Forgot Password', 0, 1)
            }
        }
    }
    /*--------------------*/
//*------------------------------------Error Handler------------------------------------*//

//*------------------------------------Custom Form Fields Form Footer------------------------------------*//
    function formFooterMultiLink(link1, link2) {
        return (
            <View>
                <View style={{paddingVertical: 25}}>
                    <FooterFont>{link1.description} <FooterLink onPress={link1.link}>{link1.name}</FooterLink></FooterFont>
                </View>
                <View style={{paddingVertical: 25}}>
                    <FooterFont>{link2.description} <FooterLink onPress={link2.link}>{link2.name}</FooterLink></FooterFont>
                </View>
            </View>
        )
    }

    function formFooterSingleLink(link1) {
        return (
            <View>
                <View style={{paddingVertical: 50}}>
                    <FooterFont>{link1.description} <FooterLink onPress={link1.link}>{link1.name}</FooterLink></FooterFont>
                </View>
            </View>
        )
    }

    function formFooter(registerType, registrationLinks) {
        return (
            <View>
                <Container style={{alignItems: 'center'}}>
                    {registerType === 'login'
                        ?   formFooterMultiLink(registrationLinks.resetPassword, registrationLinks.signUp)
                        :   registerType === 'signUp'
                            ?   formFooterSingleLink(registrationLinks.login)
                            :   formFooterMultiLink(registrationLinks.login, registrationLinks.signUp)
                    }
                </Container>
            </View>
        )
    }
//*--------------------*/


const formFieldValidations = {
    RegistrationFormFunction,
    errorMessageDataMain,
    customSGFormFieldContainer,
    firebaseAuthUserDataFunctionButton
}

export const FormFieldsContext = React.createContext(formFieldValidations)
