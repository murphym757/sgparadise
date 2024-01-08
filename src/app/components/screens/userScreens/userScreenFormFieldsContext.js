import React from 'react';
import { View, FlatList } from 'react-native';
import {
    Container,
    ContentDivider,
    ContentRow,
    CustomInputField,
    FooterFont,
    FooterLink,
    MainFont,
    MainSecondaryFont,
    MainSubFont,
    TouchableButton,
    TouchableButtonFont,
} from 'index';

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
        <TouchableButton style={{ backgroundColor: colors.secondaryColor }}
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

function sgTouchableButton(buttonTitle, buttonFunction, colors, isLoading) {
    return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={buttonFunction}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
    )
}

function UpdateButtonGroup(props) {
    return (
    <View>
        {sgTouchableButton(props.usernameChangeButtonTitle, props.usernameChangeButtonFunction, props.colors, props.isLoading)}
        {sgTouchableButton(props.emailChangeButtonTitle, props.emailChangeButtonFunction, props.colors, props.isLoading)}
        {sgTouchableButton(props.passwordChangeButtonTitle, props.passwordChangeButtonFunction, props.colors, props.isLoading)}
    </View>
    )
}
//*------------------------------------userUpdateScreen.js Form------------------------------------*//
//*(New Code --- 7/3/2023)
    function UpdateDataSingleFormFunction(passedSingleFormData) {
        return (
            <View>
                <MainFont>{passedSingleFormData.buttonStatement}</MainFont>
                {passedSingleFormData.textFiled1}
                {passedSingleFormData.errorMessageDataMainEmail}
                {passedSingleFormData.errorMessageDataMainUsername}
                {passedSingleFormData.functionButton}
            </View>
        )
    }
    function UpdateDataDoubleFormFunction(passedDoubleFormData) {
        return (
            <View>
                <MainFont>{passedDoubleFormData.buttonStatement}</MainFont>
                {passedDoubleFormData.textFiled1}
                {passedDoubleFormData.textField2}
                {passedDoubleFormData.errorMessageDataMainEmail}
                <ContentDivider />
                {passedDoubleFormData.errorMessageDataMainPassword}
                {passedDoubleFormData.functionButton}
            </View>
        )
    }
    function UpdateDataFormFunction(props) {
        const passedSingleFormData = {
            textFiled1: props.textField,
            buttonStatement: props.buttonStatement,
            errorCheck: props.errorCheck,
            errorMessageDataMainEmail: props.errorMessageDataMainEmail,
            errorMessageDataMainUsername: props.errorMessageDataMainUsername,
            functionButton: props.functionButton
        }
        const passedDoubleFormData = {
            textFiled1: props.textField,
            textField2: props.textField2,
            buttonStatement: props.buttonStatement,
            errorCheck: props.errorCheck,
            errorAuthCheck: props.errorAuthCheck,
            errorMessageDataMainEmail: props.errorMessageDataMainEmail,
            errorMessageDataMainPassword: props.errorMessageDataMainPassword,
            functionButton: props.functionButton
        }
        return (
            <View>
                {props.functionType == 'password' || props.functionType == 'verification'
                    ?   UpdateDataDoubleFormFunction(passedDoubleFormData)
                    :   UpdateDataSingleFormFunction(passedSingleFormData)
                }
            </View>
        )
    }
//*------------------------------------userUpdateScreen.js Form------------------------------------*//

//*--------------------*/

//*--------------------*/

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
                return flatListError(errorCheck, errorOwner, 3, 4)
            }
            if (errorOwner === 'forgotPassword') {
                return flatListError(errorCheck, 'Forgot Password', 0, 1)
            }
            if (errorOwner === 'newUsername') { 
                return flatListError(errorCheck, errorOwner, 3, 4)
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

//* Confirmation Buttons for Change Personal Information (Finish this)
function customButtonFunctionYesNo(props, buttonFunction, buttonName) {
    return (
    <TouchableButton 
        style={{
            backgroundColor: props.yesPressed === props.noPressed
                ? props.colors.secondaryFontColor 
                : props.colors.secondaryColor
        }}
        disabled={props.isLoading}
        onPress={() => {buttonFunction()}}
    >
        <TouchableButtonFont 
            style={{
                color: props.yesPressed === props.noPressed 
                    ? props.colors.primaryFontColor 
                    : props.colors.primaryFontColor
            }}
        >
            {buttonName}
        </TouchableButtonFont>
    </TouchableButton>
)
}
function buttonConfirmationType(props) {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ContentRow>
                <MainFont>{props.changeMessage}</MainFont>
            </ContentRow>
            <ContentRow style={{ paddingVertical: 25 }}>
            </ContentRow>
        </View>
    )
}



function ButtonConfirmationSet(props) {
    return (
    <View>
        {buttonConfirmationType(props)}
        {customButtonFunctionYesNo(props, props.yesButtonFunction(), props.yesButtonTitle)}
        {customButtonFunctionYesNo(props, props.noButtonFunction(), props.noButtonTitle)}
    </View>
    ); 
}
//*-----------------------*/


    //* Button Group that provides the user with the option to change their username, email, or password
        function changePersonalInfoButtonGroup(changeButtonsPressed, passingChangeInfo) {
            return (
            <TouchableButton style={{backgroundColor: changeButtonsPressed.colors.secondaryColor }}
                disabled={changeButtonsPressed.isLoading}
                onPress={() => {
                    changeButtonsPressed.setChangeEmailButtonPressed(passingChangeInfo.changeEmailStatus),
                    changeButtonsPressed.setChangePasswordButtonPressed(passingChangeInfo.changePasswordStatus), 
                    changeButtonsPressed.setChangeUsernameButtonPressed(passingChangeInfo.changeUsernameStatus),
                    changeButtonsPressed.setUpdateType(passingChangeInfo.changeType)
                }
                }>
                <TouchableButtonFont>{passingChangeInfo.changeButtonTitle}</TouchableButtonFont>
            </TouchableButton>
            )
        }
        
        function customSGFormSensitiveDataButton(changeButtonsPressed, passingChangeInfo) {
            if (passingChangeInfo.customButtonType === 'usernameChangeButton') return (
                changePersonalInfoButtonGroup(changeButtonsPressed, passingChangeInfo)
            )
            if (passingChangeInfo.customButtonType === 'emailChangeButton') return (
                changePersonalInfoButtonGroup(changeButtonsPressed, passingChangeInfo)
            )
            if (passingChangeInfo.customButtonType === 'passwordChangeButton') return (
                changePersonalInfoButtonGroup(changeButtonsPressed, passingChangeInfo)
            )
        }

        function updateUserDataButtonGroup(changeButtonsPressed) {
            const passingUsernameChangeInfo = {
                changeType: 'username',
                changeButtonTitle: 'Change Username',
                customButtonType: 'usernameChangeButton',
                changeEmailStatus: false,
                changePasswordStatus: false,
                changeUsernameStatus: true
            }
            const passingEmailChangeInfo = {
                changeType: 'email',
                changeButtonTitle: 'Change Email',
                customButtonType: 'emailChangeButton',
                changeEmailStatus: true,
                changePasswordStatus: false,
                changeUsernameStatus: false
            }
            const passingPasswordChangeInfo = {
                changeType: 'password',
                changeButtonTitle: 'Change Password',
                customButtonType: 'passwordChangeButton',
                changeEmailStatus: false,
                changePasswordStatus: true,
                changeUsernameStatus: false
            }
            return (
            <View>
                {customSGFormSensitiveDataButton(changeButtonsPressed, passingUsernameChangeInfo)}
                {customSGFormSensitiveDataButton(changeButtonsPressed, passingEmailChangeInfo)}
                {customSGFormSensitiveDataButton(changeButtonsPressed, passingPasswordChangeInfo)}
            </View>
            )
        }
    //*-------------------------*/


const formFieldValidations = {
    RegistrationFormFunction,
    errorMessageDataMain,
    sgTouchableButton,
    UpdateButtonGroup,
    UpdateDataFormFunction,
    customSGFormFieldContainer,
    firebaseAuthUserDataFunctionButton,
    ButtonConfirmationSet,
    updateUserDataButtonGroup
}

export const FormFieldsContext = React.createContext(formFieldValidations)
