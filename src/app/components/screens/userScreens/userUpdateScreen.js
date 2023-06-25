import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from 'auth/authContext'
import { 
    getAuth, 
    updateEmail,
} from "firebase/auth";
import {
  TouchableButton,
  TouchableButtonFont,
  CurrentThemeContext,
  UserScreenContext,
  UserValidationsContext,
  LoginValidationsContext,
  UpdateUserInfoValidationsContext,
  RegistrationValidationsContext,
  FormFieldsContext,
  MainFont,
  MainSecondaryFont,
  MainSubFont,
  Container,
  useIconCreator,
  ContentRow,
} from 'index';

export default function UpdateUserScreen({navigation}) {
  const { 
    currentUser,
    updatePasswordAuth,
    backArrow,
    firebaseReauthenticateViaEmail,
    updateUsernameFirestore, 
    updateUserEmailFirestore,
    updateUsernameAuth,
    validateLoginEmail,
    validateNewEmail,
    validatePassword,
    validateNewPassword,
    validateNewUsername
  } = useAuth()
  const { 
    sgIconCreator,
    sgColorPicker
    } = useIconCreator()
  const {
    editPersonalRow1,
    editPersonalRow2,
    editPersonalRow3,
    editPersonalRow4,
    editPersonalRow5      
  } = useContext(UserScreenContext)
  const {
    ChangeFunction,
  } = useContext(UserValidationsContext)
  const {
    emailValidationPromise,
    validationEmailLoginFunction,
  } = useContext(LoginValidationsContext)
  const {
    changeUserEmail,
    ChangeUsernameFunction,
    validationNewEmailFunction,
    validationPasswordFunction,
    ChangePasswordFunction,
    ChangeEmailFunction
  } = useContext(UpdateUserInfoValidationsContext)
  const {
    customSGFormFieldContainer, 
    errorMessageDataMain
  } = useContext(FormFieldsContext)
  const colors = useContext(CurrentThemeContext)
  const colorsPassThrough = colors
  const [ isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
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
  const [errorNewUsernameCheck, setErrorNewUsernameCheck] = useState(null)
  const statusChecks = [emailCheckStatus, passwordCheckStatus, passwordAuthCheckStatus]
  const [authButtonPressed, setAuthButtonPressed] = useState(false)
  const [changeIconButtonPressed, setChangeIconButtonPressed] = useState(false)
  const [changePersonalInfoButtonPressed, setChangePersonalInfoButtonPressed] = useState(false)
  const [changePasswordButtonPressed, setChangePasswordButtonPressed] = useState(false)
  const [changeEmailButtonPressed, setChangeEmailButtonPressed] = useState(false)
  const [changeUsernameButtonPressed, setChangeUsernameButtonPressed] = useState(false)
  const [verifyEmailButtonPressed, setVerifyEmailButtonPressed] = useState(false)
  const [verifyPasswordButtonPressed, setVerifyPasswordButtonPressed] = useState(false)
  const [verifyUsernameButtonPressed, setVerifyUsernameButtonPressed] = useState(false)
  const [verifyConfirmationButtonPressed, setVerifyConfirmationButtonPressed] = useState(false)
  const [checkEmailExistence, setCheckEmailExistence] = useState(false)
  const [reauthenticationConfirmation, setReauthenticationConfirmation] = useState(false)

  //* Validation Errors
  const emailValidationErrors = validateLoginEmail(email, currentUser)
  const [errorCode, setErrorCode] = useState(null)
  const newEmailValidationErrors = validateNewEmail(newEmail, email, checkEmailExistence)
  const passwordValidationErrors = validatePassword(password)
  const newPasswordValidationErrors = validateNewPassword(newPassword, confirmNewPassword)
  const newUsernameValidationErrors = validateNewUsername(newUsername, currentUser)

  //* Icon Creator
  const [userIcon, setUserIcon] = useState('')
  const sgIconName = 'Felix'
  const sgIconEyes = ["bulging"]


  // Update username
  function changeUsername() {
    if ( currentUser !== null) {
      const userId = currentUser.uid
      updateUsernameFirestore(userId, newUsername), 
      updateUsernameAuth(newUsername)
      console.log('Username has been updated')
    }
  }
  /*-----------------*/


  // Update password
  function changeUserPassword() {
    if ( currentUser !== null) {
      updatePasswordAuth(newPassword)
      console.log('Password has been updated')
    }
  }
  /*-----------------*/
  function checkStatus(statusChecks) {
    return statusChecks === 'fulfilled'
  }

    function updateProcess() {//You shouldn't have to update any info to "add the username" ***IMPORTANT***
      const usernameMatchPromise = new Promise((resolve, reject) => {
        if (newUsername !== currentUser.username) {
          resolve('This checks for matching usernames')
          changeUsername()
        } else {
          reject('username is still the same')
          
        }
      })
      const emailMatchPromise = new Promise((resolve, reject) => {
        const errors = validateLoginEmail(newEmail);
        if (errors.length > 0) {
          setErrorEmailCheck(errors)
          console.log('Email validation failed:', errors);
        } else {
          if (newEmail !== currentUser.email) {
            resolve('The email has been updated')
            setEmailCheckStatus('fulfilled')
            changeUserEmail()
          } else {
            reject('The email is still the same')
            setErrorEmailCheck('Email is still the same' + " (" + newEmail + ")")
            setEmailCheckStatus('rejected')
          }
          console.log('Email is valid!');
        }
      })
      const passwordMatchPromise = new Promise((resolve, reject) => {
        const errors = validatePassword(newPassword);
        if (errors.length > 0) {
          setErrorPasswordAuthCheck(errors)
          console.log('Password validation failed:', errors);
        } else {
          if (password !== newPassword) {
            if (newPassword == confirmNewPassword) {
              resolve('This password has been updated')
              setPasswordCheckStatus('fulfilled')
              setPasswordAuthCheckStatus('fulfilled')
              changeUserPassword()
            } else {
              reject('Password and Confirm Password do not match')
              setErrorPasswordPassword('Password and Confirm Password do not match')
              setPasswordCheckStatus('rejected')
              setPasswordAuthCheckStatus('rejected')
            }
          } else {
            reject('Password has not been updated')
          }
          console.log('Password is valid!');
        } 
      })
      Promise.allSettled([usernameMatchPromise, emailMatchPromise, passwordMatchPromise]).then(() => {
        if (statusChecks.every(checkStatus) === true) {
          if (changePersonalInfoButtonPressed === true) {
            setChangePersonalInfoButtonPressed(false), 
            setChangeIconButtonPressed(false)
          } else if (changeIconButtonPressed === true) {
            setChangePersonalInfoButtonPressed(false), 
            setChangeIconButtonPressed(false)
          } else {
            navigation.navigate('User Profile')
          }
        }
      })
      .catch((err) => {
      }).finally(() => {
        console.log( "The Promise is settled, meaning it has been resolved or rejected.")
      });
    }
      
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
      pageLoader()
    })

    function changeButtonPressedBack(backFunc) {
      return (
        <View>
          {changeEmailButtonPressed === true 
            ? <TouchableOpacity onPress={() => {
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
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => {
                setChangePasswordButtonPressed(false), 
                setReauthenticationConfirmation(false)
              }}> 
            {backArrow(colorsPassThrough, backFunc)}
          </TouchableOpacity>
          }
        </View>
      )
    }

    function BackButton() {
      const backNeeded = true
      return (
        <View>
          {changeEmailButtonPressed == true || changePasswordButtonPressed == true
            ? changeButtonPressedBack(backNeeded)
            : <TouchableOpacity onPress={() => {
                navigation.goBack(), 
                setReauthenticationConfirmation(false)
              }}> 
                {backArrow(colorsPassThrough, backNeeded)}
              </TouchableOpacity>
          }
        </View>
      )
  }

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
    // Form Button Functions  
    // Custom Button
    
    function customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle) {
      const buttonStyle = customButtonStyle
      const buttonFunction = customButtonFunction
      const buttonTitle = customButtonTitle
      
      return (
        <TouchableButton style={{backgroundColor: buttonStyle }}
            disabled={isLoading}
            onPress={() => buttonFunction}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }
    /*------------------*/
    // Go Back Button
    function customSGButtonChangeIconGoBack() {
      const buttonGroup = {
        style: colors.secondaryColor,
        function: () => setChangeIconButtonPressed(false),
        title: 'Change User Information'
      }
      const customButtonStyle = buttonGroup.style
      const customButtonFunction = buttonGroup.function
      const customButtonTitle = buttonGroup.title
      return (
        customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
      )
    }
    /*------------------*/
    /*---------------- */

    function sgCreatorSuite() {
      return (
        <View> 
          <View style={{paddingBottom: 200}}>
            {sgIconCreator()}
          </View>
          <View>
            {customSGButtonChangeIconGoBack()}
          </View>
        </View>
      )
    }

    // Change Personal Information Functions
    function customSGFormSensitiveDataButton(customButtonType, customButtonTitle) {
      const buttonTitle = customButtonTitle
      if (customButtonType === 'usernameChangeButton') return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {setChangeEmailButtonPressed(false), setChangePasswordButtonPressed(false), setChangeUsernameButtonPressed(true)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
      if (customButtonType === 'emailChangeButton') return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {setChangeEmailButtonPressed(true), setChangePasswordButtonPressed(false), setChangeUsernameButtonPressed(false)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
      if (customButtonType === 'passwordChangeButton') return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {setChangeEmailButtonPressed(false), setChangePasswordButtonPressed(true), setChangeUsernameButtonPressed(false)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }

    function changeSensitiveData() {
      const usernameChangeButtonTitle = 'Change Username'
      const emailChangeButtonTitle = 'Change Email'
      const passwordChangeButtonTitle = 'Change Password'
      return (
        <View>
          {customSGFormSensitiveDataButton('usernameChangeButton', usernameChangeButtonTitle)}
          {customSGFormSensitiveDataButton('emailChangeButton', emailChangeButtonTitle)}
          {customSGFormSensitiveDataButton('passwordChangeButton', passwordChangeButtonTitle)}
        </View>
      )
    }

    //* Change data via Firebase with these buttons

    function verifyFirebaseIdentityButton() {
      const buttonTitle = 'Verify Identity'
      const passingEmailData = {
        emailValidationErrors,
        setErrorEmailCheck,
        email,
        currentUser,
        setEmailCheckStatus
      }
      return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {validationUserFunction(passingEmailData)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }

   

    function changeFirebaseIdentityButton(changeType, buttonTitle) {
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
        updateUserEmailFirestore
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
        
      }
      return (
        changeType === 'email'
          ? <TouchableButton style={{backgroundColor: colors.secondaryColor }}
              disabled={isLoading}
              onPress={() => {validationNewEmailFunction(passingEmailData), setVerifyConfirmationButtonPressed(true), setVerifyEmailButtonPressed(true), setVerifyPasswordButtonPressed(false)}}>
              <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
            </TouchableButton>
          : <TouchableButton style={{backgroundColor: colors.secondaryColor }}
              disabled={isLoading}
              onPress={() => {validationPasswordFunction(passingPasswordData), setVerifyPasswordButtonPressed(true), setVerifyEmailButtonPressed(false), setVerifyConfirmationButtonPressed(false)}}>
              <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
            </TouchableButton>
      )
    }
    //*------------------*/

    //* Results of both "Update Email" and "Update Password" buttons being pressed
    function emailChangeSection() {
      return (
        verifyConfirmationButtonPressed === true
        ? buttonSetEmail(newEmail)
        : <View>
          {reauthenticationConfirmation == true
            ? <ChangeEmailFunction
                functionType={'email'} 
                functionButton={changeFirebaseIdentityButton('email', 'Verify Identity')}
                emailTextField={customSGFormFieldContainer('E-mail', newEmail, false, setNewEmail)}
                errorEmailCheck={errorNewEmailCheck}
                errorMessageDataMainEmail={errorMessageDataMain(errorNewEmailCheck, 'newEmail')}
              />
            : <ChangeFunction 
                functionType={'email'} 
                functionButton={verifyFirebaseIdentityButton()} 
                emailTextField={customSGFormFieldContainer('Email', email, false, setEmail)} 
                passwordTextField={customSGFormFieldContainer('Password', password, true, setPassword)}
                errorEmailCheck={errorEmailCheck}
                errorMessageDataMainEmail={errorMessageDataMain(errorEmailCheck, 'email')}
                errorPasswordAuthCheck={errorPasswordAuthCheck}
                errorMessageDataMainPassword={errorMessageDataMain(errorPasswordAuthCheck, 'password')}
              />
          }
        </View>
      )
    }

    function passwordChangeSection() {
      return (
      verifyConfirmationButtonPressed === true
      ? buttonSetEmail(newEmail)
      : <View>
        {reauthenticationConfirmation == true
          ? <ChangePasswordFunction
              functionType={'password'} 
              functionButton={changeFirebaseIdentityButton('password', 'Change Password')}
              passwordTextField={customSGFormFieldContainer('Password', newPassword, true, setNewPassword)}
              confirmPasswordTextField={customSGFormFieldContainer('Confirm Password', confirmNewPassword, true, setConfirmNewPassword)}
              errorPasswordCheck={errorNewPasswordCheck}
              errorMessageDataMainPassword={errorMessageDataMain(errorNewPasswordCheck, 'newPassword')}
            />
          : <ChangeFunction 
              functionType={'email'} 
              functionButton={verifyFirebaseIdentityButton()} 
              emailTextField={customSGFormFieldContainer('Email', email, false, setEmail)} 
              passwordTextField={customSGFormFieldContainer('Password', password, true, setPassword)}
              errorEmailCheck={errorEmailCheck}
              errorMessageDataMainEmail={errorMessageDataMain(errorEmailCheck, 'email')}
              errorPasswordAuthCheck={errorPasswordAuthCheck}
              errorMessageDataMainPassword={errorMessageDataMain(errorPasswordAuthCheck, 'password')}
            />
        }
      </View>
      )
    }

    function usernameChangeSection() {
      return (
        verifyConfirmationButtonPressed === true
        ? buttonSetEmail(newEmail)
        : <View>
        {reauthenticationConfirmation == true
          ? <ChangeUsernameFunction 
              functionType={'username'} 
              functionButton={changeFirebaseIdentityButton('username', 'Change Username')}
              usernameTextField={customSGFormFieldContainer('Username', newUsername, true, setNewUsername)}
              errorUsernameCheck={errorNewUsernameCheck}
              errorMessageDataMainUsername={errorMessageDataMain(errorNewUsernameCheck, 'newUsername')}
            />
          : <ChangeFunction 
              functionType={'email'} 
              functionButton={verifyFirebaseIdentityButton()} 
              emailTextField={customSGFormFieldContainer('Email', email, false, setEmail)} 
              passwordTextField={customSGFormFieldContainer('Password', password, true, setPassword)}
              errorEmailCheck={errorEmailCheck}
              errorMessageDataMainEmail={errorMessageDataMain(errorEmailCheck, 'email')}
              errorPasswordAuthCheck={errorPasswordAuthCheck}
              errorMessageDataMainPassword={errorMessageDataMain(errorPasswordAuthCheck, 'password')}
            />
        }
        </View>
      )
    }
        //? Create a function that allows the user to change their username
        //? This function consists of a 'Change Username" button that will appear above the 'Change Email' and 'Change Password' buttons
        //? There will be a form field and a "Change Username" button
        //? Upon pressing the "Change Username" button, the user will be asked "Are you sure you want to change your username?"
        //? If the user presses "Yes", the username will be changed and the user will be redirected to the profile page
        //? If the user presses "No", the username will not be changed and the user will be redirected to the profile page
    //*-----------------------*/

    

    //* Yes/No Button Functions for Change Personal Information
    const [yesPressed, setYesPressed] = useState(false);
    const [noPressed, setNoPressed] = useState(false);

  function handleYesPress() {
    const passingEmailData = {
      checkEmailExistence,
      dataCollection: 'updateUser',
      newEmailValidationErrors,
      setErrorEmailCheck,
      setErrorNewEmailCheck
    }
    return (
      setYesPressed(true),
      setNoPressed(false),
      checkEmailExistence === true || newEmail === email || newEmailValidationErrors.length > 0
      ? setVerifyConfirmationButtonPressed(false)
      : navigation.goBack() //? change to go back to profile page
    )
  }

  function handleNoPress() {
    const passingEmailData = {
      checkEmailExistence,
      setErrorNewEmailCheck,
      newEmailValidationErrors,
      setErrorEmailCheck
    }
    return (
      setYesPressed(false),
      setNoPressed(true),
      setVerifyConfirmationButtonPressed(false)
    )
  }
  

    function customButtonFunctionYesNo(buttonType, buttonFunction, buttonName) {
      return (
        <TouchableButton 
            style={{
              backgroundColor: buttonType ? colors.secondaryFontColor : colors.secondaryColor
            }}
            disabled={isLoading}
            onPress={() => {buttonFunction()}}>
            <TouchableButtonFont style={{color: buttonType ? colors.primaryFontColor : colors.primaryFontColor}}>
              {buttonName}
            </TouchableButtonFont>
          </TouchableButton>
      )
    }
    //*-----------------------*/

    function buttonSetEmail(newEmail) {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ContentRow>
              <MainFont>Is this the new email you would like to use?:</MainFont>
            </ContentRow>
            <ContentRow style={{ paddingVertical: 25 }}>
              <MainSecondaryFont>{newEmail}</MainSecondaryFont>
            </ContentRow>
          </View>
          {customButtonFunctionYesNo(yesPressed, handleYesPress, 'Yes')}
          {customButtonFunctionYesNo(noPressed, handleNoPress, 'No')}
        </View>
      ); 
    }
    /*------------------*/

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
        updateProcess,
        hasFunctionTrue: true,
        hasFunctionFalse: false,
       }
      return (
        <View>
          {editPersonalRow1(passingSectionData)}
          {editPersonalRow2(passingSectionData)}
          {editPersonalRow3(passingSectionData)}
          {editPersonalRow4(passingSectionData)}
          {editPersonalRow5(passingSectionData)}
        </View>
      )
    }
    //*-------------------------*/

    function personalInfoSection(warningMessage1, warningMessage2) {
      return (
        <View>
          <View style={{position: 'relative', flex: 1, paddingBottom: 100}}>{BackButton()}</View>
          <View style={{flex: 1, position: 'absolute', alignSelf: 'flex-end', paddingTop: 10, paddingRight: 100}}>
            <MainSubFont>Personal Information</MainSubFont>
          </View>
          {changeEmailButtonPressed == true || changePasswordButtonPressed == true || changeUsernameButtonPressed == true
            ? <View>
                {changeEmailButtonPressed == true
                  ? emailChangeSection() //Email Button
                  : changePasswordButtonPressed == true
                    ? passwordChangeSection() //Password Button
                    : usernameChangeSection() //Username Button
                }
            </View>
            : changeSensitiveData()
          }
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
