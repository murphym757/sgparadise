import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Pressable } from 'react-native'
import { useAuth } from 'auth/authContext'
import { useIconCreator } from 'user/userIconContext'
import { UserScreenContext } from 'user/userScreenContext'
import { UserValidationsContext } from 'user/userValidationsContext'
import { LoginValidationsContext } from 'user/loginValidationContext'
import { UpdateUserInfoValidationsContext } from 'user/updateUserInfoValidationContext'
import { FormFieldsContext } from 'user/userScreenFormFieldsContext'
import { getAuth, updateEmail } from "firebase/auth"
import { RFValue } from "react-native-responsive-fontsize"

import {
  TouchableButton,
  TouchableButtonFont,
  CurrentThemeContext,
  MainFont,
  MainSecondaryFont,
  Container,
  ContentRow,
  windowHeight,
} from 'index';

export default function UpdateUserScreen({navigation}) {
  const { 
    currentUser,
    updatePasswordAuth,
    backArrow,
    firebaseReauthenticateViaEmail,
    updateUsernameFirestore, 
    updateUserEmailFirestore,
    updateEmailAuth,
    updateUsernameAuth,
    validateLoginEmail,
    validateNewEmail,
    validatePassword,
    validateNewPassword,
    validateNewUsername,
    getUsername,
    logOut
  } = useAuth()
  const { 
    sgIconCreator,
    sgColorPicker
    } = useIconCreator()
  const {
    editPersonalRow1,
    editPersonalRow2,
    editPersonalRow3,
    editPersonalRow4    
  } = useContext(UserScreenContext)
  const {
    ChangeFunction,
  } = useContext(UserValidationsContext)
  const {
    emailValidationPromise,
    validationEmailLoginFunction,
  } = useContext(LoginValidationsContext)
  const {
    changeUsername,
    changeUserEmail,
    validationUpdateUsernameFunction,
    validationNewEmailFunction,
    validationPasswordFunction
  } = useContext(UpdateUserInfoValidationsContext)
  const {
    UpdateDataFormFunction,
    customSGFormFieldContainer, 
    errorMessageDataMain,
    sgTouchableButton,
    UpdateButtonGroup,
    ButtonConfirmationSet,
    updateUserDataButtonGroup
  } = useContext(FormFieldsContext)
  const colors = useContext(CurrentThemeContext)
  const colorsPassThrough = colors
  const [ isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errorNewEmailCheck, setErrorNewEmailCheck] = useState(null)
  const [errorEmailCheck, setErrorEmailCheck] = useState(null)
  const [emailCheckStatus, setEmailCheckStatus] = useState('fulfilled')
  const [errorPasswordCheck, setErrorPasswordCheck] = useState(null)
  const [errorNewPasswordCheck, setErrorNewPasswordCheck] = useState([])
  const [passwordCheckStatus, setPasswordCheckStatus] = useState('fulfilled')
  const [errorPasswordAuthCheck, setErrorPasswordAuthCheck] = useState([])
  const [passwordAuthCheckStatus, setPasswordAuthCheckStatus] = useState('fulfilled')
  const [authButtonPressed, setAuthButtonPressed] = useState(false)
  const [changeIconButtonPressed, setChangeIconButtonPressed] = useState(false)
  const [changePersonalInfoButtonPressed, setChangePersonalInfoButtonPressed] = useState(false)
  const [changePasswordButtonPressed, setChangePasswordButtonPressed] = useState(false)
  const [changeEmailButtonPressed, setChangeEmailButtonPressed] = useState(false)
  const [changeUsernameButtonPressed, setChangeUsernameButtonPressed] = useState(false)
  const [verifyEmailButtonPressed, setVerifyEmailButtonPressed] = useState(false)
  const [verifyPasswordButtonPressed, setVerifyPasswordButtonPressed] = useState(false)
  const [verifyUsernameButtonPressed, setVerifyUsernameButtonPressed] = useState(false)
  const [verifyConfirmationButtonPressed, setVerifyConfirmationButtonPressed] = useState('')
  const [checkEmailExistence, setCheckEmailExistence] = useState(null)
  const [reauthenticationConfirmation, setReauthenticationConfirmation] = useState(false)
  const [changeStatus, setChangeStatus] = useState('')
  const [updateType, setUpdateType] = useState('')

  console.log(currentUser)

  //* Update Username
  const currentUserName = currentUser.displayName
  const [newUsername, setNewUsername] = useState('')
  const [errorNewUsernameCheck, setErrorNewUsernameCheck] = useState(null)
  const [checkUsernameExistence, setCheckUsernameExistence] = useState(null)

  //* Validation Errors
  const emailValidationErrors = validateLoginEmail(email, currentUser)
  const [errorCode, setErrorCode] = useState(null)
  const newEmailValidationErrors = validateNewEmail(newEmail, email, checkEmailExistence)
  const passwordValidationErrors = validatePassword(password)
  const newPasswordValidationErrors = validateNewPassword(newPassword, confirmNewPassword)
  const newUsernameValidationErrors = validateNewUsername(newUsername, currentUser, checkUsernameExistence)


  // Update 
  /*
  function changeUsername() {
    if ( currentUser !== null) {
      const userId = currentUser.uid
      updateUsernameFirestore(userId, newUsername), 
      updateUsernameAuth(newUsername)
      console.log('Username has been updated')
    }
  }
  */
  /*-----------------*/


  //* Update password
  function changeUserPassword() {
    if ( currentUser !== null) {
      updatePasswordAuth(newPassword)
      console.log('Password has been updated')
    }
  }
  //*-----------------*/
      
    function cancelUpdate() {
        setAuthButtonPressed(false),
        navigation.goBack()
    }

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }
    
    useEffect(() => {
      pageLoader(),
      updateSwitch()
    }, [])

    //*Back Button
      function changeButtonPressedBack(backFunc) {
        return (
          <View>
            {changeEmailButtonPressed === true 
              ? <Pressable onPress={() => {
                  setChangeEmailButtonPressed(false), 
                  setReauthenticationConfirmation(false),
                  setEmail(''),
                  setErrorEmailCheck(null)
                  setNewEmail(''),
                  setErrorNewEmailCheck(null),
                  setPassword(''),
                  setPasswordCheckStatus(null),
                  setNewPassword(''),
                  setPasswordAuthCheckStatus(null)
                }}> 
                  {backArrow(colorsPassThrough, backFunc)}
                </Pressable>
              : <Pressable onPress={() => {
                  setChangePasswordButtonPressed(false), 
                  setReauthenticationConfirmation(false)
                }}> 
              {backArrow(colorsPassThrough, backFunc)}
            </Pressable>
            }
          </View>
        )
      }

      function backButton() {
        const backNeeded = true
        return (
          <View style={{position: 'relative', flex: 1, paddingBottom: 100}}>
            {changeEmailButtonPressed == true || changePasswordButtonPressed == true
              ? changeButtonPressedBack(backNeeded)
              : <Pressable onPress={() => {
                  navigation.goBack(), 
                  setReauthenticationConfirmation(false)
                }}> 
                  {backArrow(colorsPassThrough, backNeeded)}
                </Pressable>
            }
          </View>
        )
    }
  //*------------------*/

  //* Validation 
    function passwordValidationPromise() {
      const passwordMatchPromise = new Promise((resolve, reject) => {
        if (passwordValidationErrors.length < 0) {
          setErrorPasswordAuthCheck(passwordValidationErrors)
          reject('Password validation failed:', passwordValidationErrors);
        } else {
          setErrorPasswordAuthCheck(passwordValidationErrors)
          resolve('Password is valid!');
        } 
      })
      return passwordMatchPromise
    }

    function validationUserFunction(passingEmailData) {
      Promise.all([emailValidationPromise(passingEmailData), passwordValidationPromise()]).then(() => {
        setErrorEmailCheck(emailValidationErrors)
        setErrorPasswordAuthCheck(passwordValidationErrors)
        firebaseReauthenticateViaEmail(email, password, setReauthenticationConfirmation)
      })
      .catch((err) => {
      }).finally(() => {
        console.log( "The Promise is settled, meaning it has been resolved or rejected.")
      });
    }
  //*-------------------*/

    //* Suite for Setting (and Changing) User Icon
      function sgCreatorSuite() {
        return (
          <View>
            <View>
              {backButton()}
            </View>
            <View style={{paddingBottom: RFValue(50, windowHeight)}}>
              {sgIconCreator(setChangeIconButtonPressed, navigation)}
            </View>
          </View>
        )
      }
    //*-------------------*/

    //TODO: Create a function that takes all of the user Icon data from Firebase Cloudstore and displays it on the screen

    //TODO-------------------*/

    //TODO: Rearrange the main Account screen to store data pertaining to the user's account (such as posts count, comments count, liked posts, posts created that are liked by others).

    //TODO-------------------*/

    //TODO: Come up with w series of titles for the user based on total posts, in an effort to encourage them to post more (10 Tops)
    
    //TODO-------------------*/
    

  //? Change Personal Information Functions

  //* Button Group (New Code --- 6/26/2023)
    function changeSensitiveData() {
      const usernameChangeButtonTitle = 'Change Username'
      const emailChangeButtonTitle = 'Change Email'
      const passwordChangeButtonTitle = 'Change Password'
      return (
        <View>
          <UpdateButtonGroup
            usernameChangeButtonTitle={usernameChangeButtonTitle}
            usernameChangeButtonFunction={() => {setChangeEmailButtonPressed(false), setChangePasswordButtonPressed(false), setChangeUsernameButtonPressed(true)}}
            emailChangeButtonTitle={emailChangeButtonTitle}
            emailChangeButtonFunction={() => {setChangeEmailButtonPressed(true), setChangePasswordButtonPressed(false), setChangeUsernameButtonPressed(false)}}
            passwordChangeButtonTitle={passwordChangeButtonTitle}
            passwordChangeButtonFunction={() => {setChangeEmailButtonPressed(false), setChangePasswordButtonPressed(true), setChangeUsernameButtonPressed(false)}}
            colors={colors}
            isLoading={isLoading}
          />
        </View>
      )
    }
  //*-------------------*/

  //? Change data via Firebase with these buttons

  //* Verify Identity Button (New Code --- 6/26/2023)
    function verifyFirebaseIdentityButton() {
      const buttonTitle = 'Verify Identity'
      const passingEmailData = {
        emailValidationErrors,
        setErrorEmailCheck,
        email,
        currentUser,
        setEmailCheckStatus
      }
      const buttonFunction = () => validationUserFunction(passingEmailData)
      return (
        sgTouchableButton(buttonTitle, buttonFunction, colors, isLoading)
      )
    }
  //*-------------------*/

  //* Commit Data Change Button (Updated Code --- 7/30/2023)
  //* IMPORTANT------------This runs immediately after the user presses the verify identity button
  // TODO ----Setup a way for this function to happen after pressing the yes switch down below
  const passingEmailData = {
    checkEmailExistence,
    currentUser,
    email,
    errorCode,
    getAuth,
    newEmail,
    newEmailValidationErrors,
    setCheckEmailExistence,
    setErrorEmailCheck,
    setErrorNewEmailCheck,
    updateEmail,
    updateEmailAuth,
    updateUserEmailFirestore,
    setVerifyConfirmationButtonPressed
  }
  const passingPasswordData = {
    newPassword,
    confirmNewPassword,
    newPasswordValidationErrors,
    setPasswordCheckStatus,
    setErrorNewPasswordCheck,
    navigation,
    changeUserPassword
  }
  const passingUsernameData = {
    navigation,
    currentUser,
    checkUsernameExistence,
    newUsername,
    newUsernameValidationErrors,
    setCheckUsernameExistence,
    setErrorNewUsernameCheck,
    updateUsernameFirestore,
    updateUsernameAuth,
    setVerifyUsernameButtonPressed,
    getUsername
  }
    function changeFirebaseIdentityButton(changeType, buttonTitle) {
      function buttonFunction(validationNewFunction, validationNewData, verifyConfirmation, verifyEmail, verifyPassword, verifyUsername) {
        validationNewFunction(validationNewData), 
        setVerifyConfirmationButtonPressed(verifyConfirmation), 
        setVerifyEmailButtonPressed(verifyEmail), 
        setVerifyPasswordButtonPressed(verifyPassword), 
        setVerifyUsernameButtonPressed(verifyUsername)
      }

      const buttonFunctionEmail = () => {
        buttonFunction(validationNewEmailFunction, passingEmailData, 'email', true, false, false) 
      }
      const buttonFunctionPassword = () => {
        buttonFunction(validationPasswordFunction, passingPasswordData, 'password', false, true, false)
      }
      const buttonFunctionUsername = () => {
        setCheckUsernameExistence(false)
        buttonFunction(validationUpdateUsernameFunction, passingUsernameData, 'username', false, false, true)
      
      }
      
      return (
        changeType === 'email'
          ?  sgTouchableButton(buttonTitle, buttonFunctionEmail, colors, isLoading)
          :  changeType === 'username'
              ? sgTouchableButton(buttonTitle, buttonFunctionUsername, colors, isLoading)
              : sgTouchableButton(buttonTitle, buttonFunctionPassword, colors, isLoading)
            
      )
    }
  //*------------------*/

  //* Data Change Sections (Formfield/s and button)  (New Code --- 6/26/2023)
    const passingVerificationData = {
      functionType: 'verification',
      functionButton: verifyFirebaseIdentityButton(),
      buttonStatement: 'Please enter your current email address and password',
      textField: customSGFormFieldContainer('E-mail', email, false, setEmail, colors),
      textField2: customSGFormFieldContainer('Password', password, true, setPassword, colors),
      errorCheckEmail: errorEmailCheck,
      errorMessageDataMainEmail: errorMessageDataMain(errorEmailCheck, 'email'),
      errorCheckPassword: errorPasswordAuthCheck,
      errorMessageDataMainPassword: errorMessageDataMain(errorPasswordAuthCheck, 'password'),
      errorCheckUsername: null,
      errorMessageDataMainUsername: null
    }
    const passingChangeEmailData = {
      functionType: 'email',
      functionButton: changeFirebaseIdentityButton('email', 'Change Email'),
      buttonStatement: 'Please enter your new email address',
      textField: customSGFormFieldContainer('E-mail', newEmail, false, setNewEmail, colors),
      textField2: null,
      errorCheckEmail: errorNewEmailCheck,
      errorMessageDataMainEmail: errorMessageDataMain(errorNewEmailCheck, 'newEmail'),
      errorCheckPassword: null,
      errorMessageDataMainPassword: null,
      errorCheckUsername: null,
      errorMessageDataMainUsername: null
    }
    const passingChangePasswordData = {
      functionType: 'password',
      functionButton: changeFirebaseIdentityButton('password', 'Change Password'),
      buttonStatement: 'Please enter your new password',
      textField: customSGFormFieldContainer('Password', newPassword, true, setNewPassword, colors),
      textField2: customSGFormFieldContainer('Confirm Password', confirmNewPassword, true, setConfirmNewPassword, colors),
      errorCheckEmail: null,
      errorMessageDataMainEmail: null,
      errorCheckPassword: errorNewPasswordCheck,
      errorMessageDataMainPassword:  errorMessageDataMain(errorNewPasswordCheck, 'newPassword'),
      errorCheckUsername: null,
      errorMessageDataMainUsername: null

    }
    const passingChangeUsernameData = {
      functionType: 'username',
      functionButton: changeFirebaseIdentityButton('username', 'Change Username'),
      buttonStatement: 'Please enter your new username',
      textField: customSGFormFieldContainer('Username', newUsername, false, setNewUsername, colors),
      textField2: null,
      errorCheckEmail: null,
      errorMessageDataMainEmail: null,
      errorCheckPassword: null,
      errorMessageDataMainPassword: null,
      errorCheckUsername: errorNewUsernameCheck,
      errorMessageDataMainUsername: errorMessageDataMain(errorNewUsernameCheck, 'newUsername'),
    }
    function changeDataSection(passingChangeData) {
      return (
        <UpdateDataFormFunction
          functionType={passingChangeData.functionType} 
          functionButton={passingChangeData.functionButton}
          buttonStatement={passingChangeData.buttonStatement}
          textField={passingChangeData.textField}
          textField2={passingChangeData.textField2}
          errorCheck={passingChangeData.errorCheckEmail}
          errorMessageDataMainEmail={passingChangeData.errorMessageDataMainEmail}
          errorAuthCheck={passingChangeData.errorCheckPassword}
          errorMessageDataMainPassword={passingChangeData.errorMessageDataMainPassword}
          errorCheckUsername={passingChangeData.errorCheckUsername}
          errorMessageDataMainUsername={passingChangeData.errorMessageDataMainUsername}
          colors={colors}
          isLoading={isLoading}
        />
      )
    }

  const buttonFunctionUsername = () => {
    verifyUsernameButtonPressed === true, 
    verifyEmailButtonPressed === true, 
    verifyPasswordButtonPressed(false)}


    //TODO: This about must be changed to a switch statement
    //*(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
    function changeDataStructure(passingChangingData) {
      return (
        verifyConfirmationButtonPressed === true
        ? updateSwitch()
        : <View>
          {reauthenticationConfirmation == true
            ? changeDataSection(passingChangingData)
            : changeDataSection(passingVerificationData)
          }
        </View>
      )
    }

    //*IMPORTANT -------  This is where you want to make those changes to loading the data
    //* This will appear are you change the data
    //*I.E. ----- Either use a switch statement or a if statement on any of the following 3 function below
    
    function updateSwitch() {
      switch (verifyConfirmationButtonPressed) {
        case 'email': 
          //? Pass the function to update the email
          console.log('This  will display the email change section');
          setChangeStatus('This  will display the email change section')
          break;
        case 'password':
          //? Pass the function to update the password
          console.log('This  will display the password change section');
          setChangeStatus('This  will display the password change section')
          break;
        case 'username':
          //? Pass the function to update the username
          console.log('This  will display the username change section');
          setChangeStatus('This  will display the username change section')
          // Expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        default:
          console.log(`This is the default message.`);
          changeDataSection(passingVerificationData)
          setChangeStatus(`This is the default message.`)
      }      
    }
    
    
    
    function emailChangeSection() { //* Connect this to the button
      return (
        verifyConfirmationButtonPressed === 'email'
          ? buttonSetEmail(newEmail) //? This works, do the same for the other two (maybe not the password though)
          : changeDataStructure(passingChangeEmailData)
      )
    }

    function passwordChangeSection() { //* Connect this to the button
      return (
        verifyConfirmationButtonPressed === 'password'
          ? buttonSetPassword(newPassword)
          : changeDataStructure(passingChangePasswordData)
      )
    }

    function usernameChangeSection() { //* Connect this to the button
      return (
        verifyConfirmationButtonPressed === 'username'
          ? buttonSetUsername(newUsername)
          : changeDataStructure(passingChangeUsernameData)
      )
    }
  //*-----------------------*/

  //Todo: Create a function that determines whether a user reached the confirmation page(the 'verifyPressed' variables should help with that)
  //? There is a "Too many re-renders" error. Not because of this, but everything related to the confirmation aspects should come from a seperate screen (or file)
  //? Pass those factors as props to the confirmation screen 

  //TOdo:----------------------/

    
    
    //*-----------------------*/
    //* Yes/No Button Functions for Change Personal Information
      const [yesPressed, setYesPressed] = useState(false);
      const [noPressed, setNoPressed] = useState(false);

      function handleYesPressConfirmation(validationErrors, changeFunction, passingData) {
        return (
          setYesPressed(true),
          setNoPressed(false),
          validationErrors.length < 1
            ? <View>
                {verifyConfirmationButtonPressed === 'email' || verifyConfirmationButtonPressed === 'username'
                  ? changeFunction(passingData)
                  : null
                }
                {navigation.navigate('User Profile')}  
            </View>
            : setVerifyConfirmationButtonPressed('')
        )
      }
      function handleYesPress() {
        switch (verifyConfirmationButtonPressed) {
          case 'email': 
            //? Pass the function to update the email
            handleYesPressConfirmation(newEmailValidationErrors, changeUserEmail, passingEmailData)
            break;
          case 'password':
            //? Pass the function to update the password
            handleYesPressConfirmation(newPasswordValidationErrors)
            break;
          case 'username':
            //? Pass the function to update the username
            handleYesPressConfirmation(newUsernameValidationErrors, changeUsername, passingUsernameData)
            // Expected output: "Mangoes and papayas are $2.79 a pound."
            break;
          default:
            console.log(`This is the default message.`);
            changeDataSection(passingVerificationData)
            setChangeStatus(`This is the default message.`)
        } 
      }

      //? Goes in each switch above
      

      function handleNoPress() {
        return (
          setYesPressed(false),
          setNoPressed(true),
          setVerifyConfirmationButtonPressed('')
        )
      }
  //*-----------------------*/
  

    function customButtonFunctionYesNo(buttonType, buttonFunction, buttonName) {
      return (
        <TouchableButton 
            style={{
              backgroundColor: buttonType ? colors.secondaryFontColor : colors.secondaryColor
            }}
            disabled={isLoading}
            onPress={
              checkEmailExistence === null || checkEmailExistence === true || checkUsernameExistence === null || checkUsernameExistence === true
                ? () => {buttonFunction(), setCheckEmailExistence(false), setNewEmail(''), setCheckUsernameExistence(false), setNewUsername('')}
                : () => {buttonFunction()}
            }
          >
            <TouchableButtonFont style={{color: buttonType ? colors.primaryFontColor : colors.primaryFontColor}}>
              {buttonName}
            </TouchableButtonFont>
          </TouchableButton>
      )
    }

    //? Deconstruct this function
    function buttonSetData(newData, newDataType, yesChoice, yesFunction, noChoice, noFunction) {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ContentRow>
              <MainFont>Is this the new {newDataType} you would like to use?:</MainFont>
            </ContentRow>
            <ContentRow style={{ paddingVertical: 25 }}>
              <MainSecondaryFont>{newData}</MainSecondaryFont>
            </ContentRow>
          </View>
          {customButtonFunctionYesNo(yesChoice, yesFunction, 'Yes')}
          {customButtonFunctionYesNo(noChoice, noFunction, 'No')}
        </View>
      )
    }

    function buttonSetEmail() {
      const newDataType = 'email'
      return (
        buttonSetData(newEmail, newDataType, yesPressed, handleYesPress, noPressed, handleNoPress)
      ); 
    }
    function buttonSetPassword() {
      const newDataType = 'password'
      return (
        buttonSetData(newPassword, newDataType, yesPressed, handleYesPress, noPressed, handleNoPress)
      )
    }

    function buttonSetUsername() {
      const newDataType = 'username'
      return (
        buttonSetData(newUsername, newDataType, yesPressed, handleYesPress, noPressed, handleNoPress)
      )
    }
    //*------------------*/

  //* This function is required to pass functions from the child to the parent
    function editUserDataScreenStructure() {
      const passingSectionData = {
        rowPadding: 100,
        cancelUpdate, //Function
        colors,
        setChangeIconButtonPressed,
        setChangePersonalInfoButtonPressed,
        errorMessageDataMain, //Function
        errorEmailCheck,
        errorPasswordAuthCheck,
        hasFunctionTrue: true,
        hasFunctionFalse: false,
        backButton
      }
      return (
        <View>
          {backButton()}
          {editPersonalRow1(passingSectionData)}
          {editPersonalRow2(passingSectionData)}
          {editPersonalRow3(passingSectionData)}
        </View>
      )
    }
  //*-------------------------*/
    function personalInfoSection(warningMessage1, warningMessage2) {
      const changeButtonsPressed = {
        setChangeEmailButtonPressed,
        setChangePasswordButtonPressed,
        setChangeUsernameButtonPressed,
        setUpdateType,
        colors: colors,
        isLoading: isLoading
      }
      return (
        <View>
          {backButton()}
          {changeEmailButtonPressed == true || changePasswordButtonPressed == true || changeUsernameButtonPressed == true
            ? <View>
                {changeEmailButtonPressed == true
                  ? emailChangeSection() //Email Button
                  : changePasswordButtonPressed == true
                    ? passwordChangeSection() //Password Button
                    : usernameChangeSection() //Username Button
                }
            </View>
            : updateUserDataButtonGroup(changeButtonsPressed) //? This is where the state is changing based on what you chose in the "Personal Information" section
          }
          <MainFont>{changeStatus}</MainFont>
        </View>
      )
    }

    function editPersonalInfo() {
      const warningMessage1 = "Provide your personal information, even if the account is for something like a business or pet. It won't be part of your public profile."
      const warningMessage2 = 'To keep your account secure, don\'t enter an email that belongs to someone else.'
     
      return (
        <View>
          {changeIconButtonPressed == false
            ? changePersonalInfoButtonPressed == false
              ? editUserDataScreenStructure()
              : personalInfoSection(warningMessage1, warningMessage2)
            : sgCreatorSuite()
          }
        </View>
      )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
          <Container style={{ flex: 1, justifyContent: 'center' }}>
            {editPersonalInfo()}
          </Container>
      </SafeAreaView>
    )
}
