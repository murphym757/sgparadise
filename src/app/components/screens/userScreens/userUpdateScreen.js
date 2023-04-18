
import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, FlatList, Text } from 'react-native';
import { useAuth } from 'auth/authContext'
import {
  CustomInputField,
  faTimes, 
  firebase, 
  FontAwesomeIcon, 
  FooterFont,
  FooterLink, 
  FooterView,
  TouchableButton,
  TouchableButtonFont,
  CurrentThemeContext,
  MainFont,
  MainSubFont,
  Container,
  useIconCreator
} from 'index'

export default function UpdateUserScreen({navigation}) {
    const { 
      currentUser, 
      updateProfile,
      deleteAccountAuth, 
      deleteAccountDb, 
      updateEmailAuth, 
      updatePasswordAuth,
      successAlert, 
      failureAlert,
      backArrow,
      sgDB,
      toNewSection,
      updateUsernameFirestore, 
      updateUserEmailFirestore,
      updateUsernameAuth,
      validateEmail,
      validatePassword
    } = useAuth()
      console.log("🚀 ~ file: userUpdateScreen.js:39 ~ UpdateUserScreen ~ currentUser:", currentUser)
    const { 
      sgIconCreator,
      sgColorPicker
      } = useIconCreator()
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userProvidedPassword, setUserProvidedPassword] = useState('')
    const [newUsername, setNewUsername] = useState()
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('') 
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [errorEmailCheck, setErrorEmailCheck] = useState(null)
    const [emailCheckStatus, setEmailCheckStatus] = useState('fulfilled')
    const [errorPasswordCheck, setErrorPasswordPassword] = useState([])
    const [passwordCheckStatus, setPasswordCheckStatus] = useState('fulfilled')
    const [errorPasswordAuthCheck, setErrorPasswordAuthCheck] = useState([])
    const [passwordAuthCheckStatus, setPasswordAuthCheckStatus] = useState('fulfilled')
    const statusChecks = [emailCheckStatus, passwordCheckStatus, passwordAuthCheckStatus]
    console.log("🚀 ~ file: userUpdateScreen.js:161 ~ Promise.allSettled ~ statusChecks:", statusChecks)
    const [testError, setTestError] = useState('')
    const [authButtonPressed, setAuthButtonPressed] = useState(false)
    const [changeIconButtonPressed, setChangeIconButtonPressed] = useState(false)
    const [changePersonalInfoButtonPressed, setChangePersonalInfoButtonPressed] = useState(false)
    const [changePasswordButtonPressed, setChangePasswordButtonPressed] = useState(false)
    const [changeEmailButtonPressed, setChangeEmailButtonPressed] = useState(false)
    const [multiActionFunction, setMultiActionFunction] = useState(false)
    const [userIcon, setUserIcon] = useState('')
    const sgIconName = 'Felix'
    const sgIconEyes = ["bulging"]


    let p = new Promise((resolve, reject) => {
      let a = 1 + 1
      if (a == 2) {
        resolve('Success')
      } else {
        reject('Failed')
      }
    })
    
    p.then((message) => {
      console.log('This is in the then ' + message)
    }).catch((message) => {
      setTestError('This is in the catch ' + message)
      console.log('This is in the catch ' + message)
    }).finally(() => {
      console.log(
        "The Promise is settled, meaning it has been resolved or rejected."
      )});

    function usernameUpdate() {
      updateProfile(userName)
    }

  // Log out the user
  function onHandleLogout() {
    logOut()
  }
  /*---------------*/

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

   // Update email
   function changeUserEmail() {// The user needs to be logged out and back in to see the new email
    if ( currentUser !== null) {
      const userId = currentUser.uid
      updateUserEmailFirestore(userId, newEmail)
      updateEmailAuth(newEmail)
      console.log('Email has been updated')
    }
  }
  /*-----------------*/

  // Update password
  function changeUserPassword() {// The user can make a password change "without" having to loggout and back in
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
        const errors = validateEmail(newEmail);
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
        setAuthButtonPressed(false)
        navigation.goBack()
    }
    
    function successAlertMessage(message) {
        return successAlert(message)
      }
  
    function failureAlertMessage(error) {
      return failureAlert(error)
    }

    function errorMessageData(errorOwner, errMessage) {
      if (errorOwner === 'email') {
        return (
          <FlatList
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={errorEmailCheck}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <MainFont>{item}</MainFont>
              </View>
            )}
          />
        )
      }
      if (errorOwner === 'password') {
        return (
          <FlatList
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={errorPasswordAuthCheck}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <MainFont>{item}</MainFont>
              </View>
            )}
          />
        )
      }
    }

    // Goes on the "main section" update screen
    function errorMessageDataMain(errorCheck, errorOwner, errorMessage) {
      if (errorCheck !== null) { 
        if (errorOwner === 'email') { 
          return <View>
          <MainSubFont>{errorOwner[0].toUpperCase() + errorOwner.substring(1)}: </MainSubFont>
          {errorMessageData(errorOwner, errorMessage)}
        </View>
        }
        if (errorOwner === 'password' && errorPasswordAuthCheck.length !== 0) {
          return <View>
            <MainSubFont>{errorOwner[0].toUpperCase() + errorOwner.substring(1)}: </MainSubFont>
            {errorMessageData(errorOwner, errorMessage)}
          </View>
        }
      }
    }
    /*--------------------*/

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }
  
    useEffect(() => {
      pageLoader()
    })

    function setupAuthentication() {
      return setAuthButtonPressed(true)
    }

    function changeButtonPressedBack(backFunc) { //This works when the user "long presses" the button or some time "double taps" the button
      return (
        <View>
          {changeEmailButtonPressed === true 
            ? <TouchableOpacity onPress={() => {setChangeEmailButtonPressed(false)}}> 
                {backArrow(colorsPassThrough, backFunc)}
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => {setChangePasswordButtonPressed(false)}}> 
            {backArrow(colorsPassThrough, backFunc)}
          </TouchableOpacity>
          }
        </View>
      )
    }

    function BackButton() {
      const stackName = 'Search'
      const backNeeded = true
      return (
        <View>
        {changeEmailButtonPressed == true || changePasswordButtonPressed == true
          ? changeButtonPressedBack(backNeeded)
          : <TouchableOpacity onPress={() => {navigation.goBack()}}> 
              {backArrow(colorsPassThrough, backNeeded)}
            </TouchableOpacity>
        }
       </View>
       /* This is for sending the user back to the "main section" update screen upon updating the data
          <TouchableOpacity onPress={() => {updateProcess()}}> 
            {backArrow(colorsPassThrough, backNeeded)}
          </TouchableOpacity>
        */
      )
  }

  function emailValidationFunction() {
    const emailMatchPromise = new Promise((resolve, reject) => {
      const errors = validateEmail(email, currentUser);
      if (errors.length > 0) {
        setErrorEmailCheck(errors)
        console.log('Email validation failed:', errors);
      } else {
        if (email == currentUser.email) {
          resolve('The email has been updated')
          setErrorEmailCheck(null)
        } else {
          reject('The email is still the same')
          setErrorEmailCheck(errors)
          setEmailCheckStatus('rejected')
        }
        console.log('Email is valid!');
      }
    })

    Promise.all([emailMatchPromise]).then(() => {
      console.log('This is where you place the re-authentication with email link function')
    })
    .catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected.")
    });
  }

  function changeFunction(functionType, functionButton, functionTextField) {
    const buttonStatement = 'Please enter your email address to verify your identity'
    return (
       <View>
        <MainFont>{buttonStatement}</MainFont>
        {functionTextField}
        {errorEmailCheck !== null ? errorMessageDataMain(errorEmailCheck, 'email', errorEmailCheck) : null}
        {functionButton}
      </View>
    )
  }

  function changePasswordFunction() {
    return (
      <View>
        <MainFont>Password Statement</MainFont>
        <MainFont>Password Text Field</MainFont>
        <MainFont>Password Errors</MainFont>
        <MainFont>Password Confirm Button</MainFont>
      </View>
    )
  }

  function tester() {
    return (
      navigation.navigate('Home')
    )
  }


    // Edit Profile (General Info)
    /*--------------------------*/ 

    // Edit Personal 
    function row1LinkRelative(linkFunction, linkColor, linkFont) {
      return (
        <View style={{position: 'relative', flex: 1}}>
          <Pressable onPress={linkFunction}>
            <MainSubFont style={{color: linkColor}}>{linkFont}</MainSubFont>
          </Pressable>
        </View>
      )
    }
    function row1LinkAbsolute(hasFunction, linkFunction, linkColor, linkFont, leftPadding) {
      return (
        <View style={{flex: 1, position: 'absolute'}}>
          {hasFunction == true
            ? <Pressable onPress={linkFunction}>
                <MainSubFont style={{color:linkColor}}>{linkFont}</MainSubFont>
              </Pressable>
            : <View>
                <MainSubFont style={{color: linkColor}}>{linkFont}</MainSubFont>
              </View>
          }
        </View>
      )
    }
    function editPersonalRow1(rowPadding) {
      return (
        <View style={{paddingBottom: rowPadding}}>
          <View style={{flexDirection: 'row'}}>
            {row1LinkRelative(cancelUpdate, colors.primaryFontColor, 'Cancel')}
          </View>
        </View>
      )
    }
    function editPersonalRow2(rowPadding) {
      return (
        <View style={{paddingBottom: rowPadding}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {row1LinkAbsolute(false, cancelUpdate, colors.primaryFontColor, 'Edit Profile', 130)}
          </View>
        </View>
      )
    }

    function editPersonalRow3(rowPadding) {
      return (
        <View style={{paddingBottom: rowPadding}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Pressable onPress={() => {setChangeIconButtonPressed(true), setChangePersonalInfoButtonPressed(false)}}>
              <MainFont style={{color: colors.secondaryColor}}>Edit Avatar</MainFont>
            </Pressable>
          </View>
        </View>
      )
    }

    function editPersonalRow4(rowPadding) {
      return (
        <View style={{paddingBottom: rowPadding}}>
          <View>
            {customSGFormFieldUsername()}
            {errorEmailCheck !== null ? errorMessageDataMain(errorEmailCheck, 'email', errorEmailCheck) : null}
            {errorPasswordAuthCheck.length !== 0 ? errorMessageDataMain(errorPasswordAuthCheck, 'password', errorPasswordAuthCheck) : null}
            </View>
        </View>
      )
    }

    function editPersonalRow5(rowPadding) {
      return (
        <View style={{paddingBottom: rowPadding}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Pressable onPress={() => {setChangePersonalInfoButtonPressed(true), setChangeIconButtonPressed(false)}}>
              <MainSubFont>Personal information settings</MainSubFont>
            </Pressable>
            </View>
        </View>
      )
    }

    function editPersonalRow6(rowPadding) {
      return (
        <View style={{paddingBottom: rowPadding}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {row1LinkAbsolute(true, updateProcess, colors.secondaryColor, 'Update', 300)}
          </View>
        </View>
      )
    }

    function editPersonalInfo() {
      const warningMessage1 = "Provide your personal information, even if the account is for something like a business or pet. It won't be part of your public profile."
      const warningMessage2 = 'To keep your account secure, don\'t enter an email that belongs to someone else.'
      return (
        <View>
          {changeIconButtonPressed == false
            ?  changePersonalInfoButtonPressed == false
              ? <View>
                  {editPersonalRow1(100)}
                  {editPersonalRow2(100)}
                  {editPersonalRow3(100)}
                  {editPersonalRow4(100)}
                  {editPersonalRow5(100)}
                  {editPersonalRow6(100)}
                </View>
              : <View>
                {personalInfoSection(warningMessage1, warningMessage2)}
              </View>
            
            : <View>
                {sgCreatorSuite()}
              </View>
          }
        </View>
      )
    }
    /*-------------------------*/


    // Form Field Functions  
    function customSGFormField(customPlaceholder, customChangeText, customValue, customErrorMessage, isSensitiveData) {
      const sgPlaceholderFiled = customPlaceholder
      const sgChangeTextField = customChangeText
      const sgValueField = customValue
      const sgErrorMessageField = customErrorMessage

      if (isSensitiveData == true) {
        return (
          <View>
            <CustomInputField
              placeholder={sgPlaceholderFiled}
              secureTextEntry
              placeholderTextColor={colors.primaryColor}
              onChangeText={sgChangeTextField}
              required
              value={sgValueField}
              color={colors.primaryColor}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            {sgErrorMessageField}
          </View>
        )
      } else {
      return (
        <View>
          <CustomInputField
            placeholder={sgPlaceholderFiled}
            placeholderTextColor={colors.primaryColor}
            onChangeText={sgChangeTextField}
            required
            value={sgValueField}
            color={colors.primaryColor}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {sgErrorMessageField}
        </View>
      )
      }
    }
      // Update Form
      function customSGFormFieldUsername() {
        const fieldGroup = {
          placeholder: 'Username',
          changeTextVariable: (text) => setNewUsername(text),
          value: newUsername,
          errorMessageVariable: null
        }
        const customPlaceholder = fieldGroup.placeholder
        const customChangeText = fieldGroup.changeTextVariable
        const customValue = fieldGroup.value
        const customErrorMessage = fieldGroup.errorMessageVariable
        const isSensitiveData = false
        return (
          customSGFormField(customPlaceholder, customChangeText, customValue, customErrorMessage, isSensitiveData)
        )
      }

      function customSGFormFieldEmail() {
        const fieldGroup = {
          placeholder: 'E-mail',
          changeTextVariable: (text) => setNewEmail(text),
          value: newEmail,
          errorMessageVariable: errorMessageData(errorEmailCheck)
        }
        const customPlaceholder = fieldGroup.placeholder
        const customChangeText = fieldGroup.changeTextVariable
        const customValue = fieldGroup.value
        const customErrorMessage = fieldGroup.errorMessageVariable
        const isSensitiveData = false
        return (
          customSGFormField(customPlaceholder, customChangeText, customValue, customErrorMessage, isSensitiveData)
        )
      }

      function customSGFormFieldPassword() {
        const fieldGroup = {
          placeholder: 'Password',
          changeTextVariable: (text) => setNewPassword(text),
          value: newPassword,
          errorMessageVariable: null
        }
        const customPlaceholder = fieldGroup.placeholder
        const customChangeText = fieldGroup.changeTextVariable
        const customValue = fieldGroup.value
        const customErrorMessage = fieldGroup.errorMessageVariable
        const isSensitiveData = true
        return (
          customSGFormField(customPlaceholder, customChangeText, customValue, customErrorMessage, isSensitiveData)
        )
      }
      function customSGFormFieldPasswordConfirm() {
        const fieldGroup = {
          placeholder: 'Confirm Password',
          changeTextVariable: (text) => setConfirmNewPassword(text),
          value: confirmNewPassword,
          errorMessageVariable: errorMessageDataMain(errorPasswordCheck, 'password', errorPasswordCheck)
        }
        const customPlaceholder = fieldGroup.placeholder
        const customChangeText = fieldGroup.changeTextVariable
        const customValue = fieldGroup.value
        const customErrorMessage = fieldGroup.errorMessageVariable
        const isSensitiveData = true
        return (
          customSGFormField(customPlaceholder, customChangeText, customValue, customErrorMessage, isSensitiveData)
        )
      }
      
      function customSGFormFieldEmailReEntry() {
        const fieldGroup = {
          placeholder: 'Email',
          changeTextVariable: (text) => setEmail(text),
          value: email,
          errorMessageVariable: errorMessageData(errorEmailCheck)
        }
        const customPlaceholder = fieldGroup.placeholder
        const customChangeText = fieldGroup.changeTextVariable
        const customValue = fieldGroup.value
        const customErrorMessage = fieldGroup.errorMessageVariable
        const isSensitiveData = false
        return (
          customSGFormField(customPlaceholder, customChangeText, customValue, customErrorMessage, isSensitiveData)
        )
      }
      /*------------------*/

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

    function customSGButtonData(buttonGroup) {
      const customButtonStyle = buttonGroup.style
      const customButtonFunction = buttonGroup.function
      const customButtonTitle = buttonGroup.title
      return (
        customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
      )
    }
    function customSGButtonGroup(buttonTitle, buttonFunction) {
      const buttonGroup = {
        style: colors.secondaryColor,
        function: buttonFunction,
        title: buttonTitle
      }
      return (
        customSGButtonData(buttonGroup)
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
      if (customButtonType === 'emailChangeButton') return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {setChangeEmailButtonPressed(true), setChangePasswordButtonPressed(false)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
      if (customButtonType === 'passwordChangeButton') return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {setChangeEmailButtonPressed(false), setChangePasswordButtonPressed(true)}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }

    function changeSensitiveData() {
      const emailChangeButtonTitle = 'Change Email'
      const passwordChangeButtonTitle = 'Change Password'
      return (
        <View>
          {customSGFormSensitiveDataButton('emailChangeButton', emailChangeButtonTitle)}
          {customSGFormSensitiveDataButton('passwordChangeButton', passwordChangeButtonTitle)}
        </View>
      )
    }

    function verifyFirebaseEmailButton() {
      const buttonTitle = 'Verify Email'
      return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {emailValidationFunction()}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }

    function personalInfoSection(warningMessage1, warningMessage2) {
      return (
        <View>
          <View style={{position: 'relative', flex: 1, paddingBottom: 100}}>{BackButton()}</View>
          <View style={{flex: 1, position: 'absolute', alignSelf: 'flex-end', paddingTop: 10, paddingRight: 100}}>
            <MainSubFont>Personal Information</MainSubFont>
          </View>
          {changeEmailButtonPressed == true || changePasswordButtonPressed == true
            ? <View>
                {changeEmailButtonPressed == true
                  ? <View>
                      {changeFunction('email', verifyFirebaseEmailButton(), customSGFormFieldEmailReEntry())}
                  </View>
                  : <View>
                      {changeFunction('password', verifyFirebaseEmailButton(), customSGFormFieldEmailReEntry())}
                  </View>
                }
            </View>
            : <View>
                {changeSensitiveData()}
            </View>
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