
import { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Pressable, TouchableOpacity, FlatList, Text } from 'react-native';
import { useAuth } from 'auth/authContext'
import { 
    getAuth, 
    updateEmail,
} from "firebase/auth";
import {
  CustomInputField,
  TouchableButton,
  TouchableButtonFont,
  CurrentThemeContext,
  UserScreenContext,
  UserValidationsContext,
  EmailValidationsContext,
  MainFont,
  MainSubFont,
  Container,
  useIconCreator,
} from 'index';

export default function UpdateUserScreen({navigation}) {
    const { 
      currentUser, 
      updateProfile,
      deleteAccountAuth, 
      deleteAccountDb,  
      updatePasswordAuth,
      successAlert, 
      failureAlert,
      backArrow,
      sgDB,
      toNewSection,
      firebaseReauthenticateViaEmail,
      sendVerificationCode,
      updateUsernameFirestore, 
      updateUserEmailFirestore,
      updateUsernameAuth,
      validateEmail,
      validateNewEmail,
      validatePassword
    } = useAuth()
    const { 
      sgIconCreator,
      sgColorPicker
      } = useIconCreator()
      const {
        row1LinkRelative,
        row1LinkAbsolute,
        editPersonalRow1,
        editPersonalRow2,
        editPersonalRow3,
        editPersonalRow4,
        editPersonalRow5,
        editPersonalRow6,
        customSGFormField      
      } = useContext(UserScreenContext)
      const {
        ChangeFunction,
        ChangeFirebaseIdentityButton
      } = useContext(UserValidationsContext)
      const {
        UserEmailValidation,
        EmailFirebaseChangeButton,
        ChangeEmailFunction
      } = useContext(EmailValidationsContext)
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userProvidedPassword, setUserProvidedPassword] = useState('')
    const [newUsername, setNewUsername] = useState()
    const [newEmail, setNewEmail] = useState('')
    console.log("🚀 ~ file: userUpdateScreen.js:56 ~ UpdateUserScreen ~ newEmail:", newEmail)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('') 
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [errorNewEmailCheck, setErrorNewEmailCheck] = useState(null)
    const [errorEmailCheck, setErrorEmailCheck] = useState(null)
    console.log("🚀 ~ file: userUpdateScreen.js:72 ~ UpdateUserScreen ~ errorEmailCheck:", errorEmailCheck)
    const [emailCheckStatus, setEmailCheckStatus] = useState('fulfilled')
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(null)
    
    const [passwordCheckStatus, setPasswordCheckStatus] = useState('fulfilled')
    const [errorPasswordAuthCheck, setErrorPasswordAuthCheck] = useState([])
    const [passwordAuthCheckStatus, setPasswordAuthCheckStatus] = useState('fulfilled')
    const statusChecks = [emailCheckStatus, passwordCheckStatus, passwordAuthCheckStatus]
    const [testError, setTestError] = useState('')
    const [authButtonPressed, setAuthButtonPressed] = useState(false)
    const [changeIconButtonPressed, setChangeIconButtonPressed] = useState(false)
    const [changePersonalInfoButtonPressed, setChangePersonalInfoButtonPressed] = useState(false)
    const [changePasswordButtonPressed, setChangePasswordButtonPressed] = useState(false)
    const [changeEmailButtonPressed, setChangeEmailButtonPressed] = useState(false)
    const [verifyEmailButtonPressed, setVerifyEmailButtonPressed] = useState(false)
    const [verifyPasswordButtonPressed, setVerifyPasswordButtonPressed] = useState(false)
    const [verifyConfirmationButtonPressed, setVerifyConfirmationButtonPressed] = useState(false)
    console.log("🚀 ~ file: userUpdateScreen.js:82 ~ UpdateUserScreen ~ verifyConfirmationButtonPressed:", verifyConfirmationButtonPressed)
    const [multiActionFunction, setMultiActionFunction] = useState(false)
    const [userIcon, setUserIcon] = useState('')
    const sgIconName = 'Felix'
    const sgIconEyes = ["bulging"]

    const [checkEmailExistence, setCheckEmailExistence] = useState(false)
    console.log("🚀 ~ file: userUpdateScreen.js:85 ~ UpdateUserScreen ~ checkEmailExistence:", checkEmailExistence)

    const [reauthenticationConfirmation, setReauthenticationConfirmation] = useState(false)

    //Validation Errors
    const emailValidationErrors = validateEmail(email, currentUser)
    const [errorCode, setErrorCode] = useState(null)
    const newEmailValidationErrors = validateNewEmail(newEmail, currentUser, checkEmailExistence) //This is where you should look for the error code.....it's working now
    const passwordValidationErrors = validatePassword(password)


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
      updateUserEmailFirestore(userId, newEmail) //Opposed to saving the email to firestore, you should save the uid to firestore
      updateEmailAuth(newEmail, errorCode)
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
      if (errorOwner === 'newEmail') {
        return (
          <FlatList
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={errorNewEmailCheck}
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
        if (errorOwner === 'newEmail') { 
          return <View>
          <MainSubFont>{errorOwner[3].toUpperCase() + errorOwner.substring(4)}: </MainSubFont>
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
            ? <TouchableOpacity onPress={() => {setChangeEmailButtonPressed(false), setReauthenticationConfirmation(false)}}> 
                {backArrow(colorsPassThrough, backFunc)}
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => {setChangePasswordButtonPressed(false), setReauthenticationConfirmation(false)}}> 
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
          : <TouchableOpacity onPress={() => {navigation.goBack(), setReauthenticationConfirmation(false)}}> 
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


  //* Validation 
  function emailValidationPromise() {
    const emailMatchPromise = new Promise((resolve, reject) => {
      if (emailValidationErrors.length < 0) {
        setErrorEmailCheck(emailValidationErrors)
        console.log('Email validation failed:', emailValidationErrors);
      } else {
        if (email == currentUser.email) {
          resolve('The email has been updated')
          setErrorEmailCheck(null)
        } else {
          reject('The email is still the same')
          setErrorEmailCheck(emailValidationErrors)
          setEmailCheckStatus('rejected')
        }
        console.log('Email is valid!');
      }
    })
    return emailMatchPromise
  }

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

  function validationUserFunction() {
    Promise.all([emailValidationPromise(), passwordValidationPromise()]).then(() => {
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
  function updateEmailAuth(email, passedError) {
    const auth = getAuth();
    const user = auth.currentUser;
    return updateEmail(auth.currentUser, email).then(() => {
    // Email updated!
    // ...
    if(checkEmailExistence === true) return (setCheckEmailExistence(false))
    console.log("Email updated successfully!")
    }).catch((error) => {
      setCheckEmailExistence(true)
    })
}

  function newEmailValidationPromise() {
    const newEmailMatchPromise = new Promise((resolve, reject) => {
      if (newEmailValidationErrors.length < 0) {
        setErrorNewEmailCheck(newEmailValidationErrors)
        reject(('Email validation failed:', newEmailValidationErrors));
      } else {
        setErrorNewEmailCheck(newEmailValidationErrors)
        resolve('Email is valid!')
      } 
    })

    return newEmailMatchPromise
  }

  function validationNewEmailFunction() {
    Promise.all([newEmailValidationPromise()]).then(() => {
      setErrorNewEmailCheck(newEmailValidationErrors)
      changeUserEmail()
    })
    .catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejectedss.")
    });
  }

  //*-------------------*/
  //* Validation for email (email already exists?)
  function emailExistencePromise() {
    const emailExistPromise = new Promise((resolve, reject) => {
      if (checkEmailExistence === true) {
        setErrorNewEmailCheck(newEmailValidationErrors)
        reject('Email already exist:', newEmailValidationErrors);
      } else {
        setErrorNewEmailCheck(newEmailValidationErrors)
        resolve('Email is valid!');
      } 
    })
    return emailExistPromise
  }

  function validationEmailExistenceFunction() {
    Promise.all([emailExistencePromise()]).then(() => {
      setErrorEmailCheck(emailValidationErrors)
      validationNewEmailFunction()
      //navigation.goBack()
    })
    .catch((err) => {
    }).finally(() => {
      console.log( "The Promise is settled, meaning it has been resolved or rejected.")
    });
  }
  //*-------------------*/

  
  






  

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


    // Edit Profile (General Info)
    /*--------------------------*/ 

    // Edit Personal 
    //* This function is required to pass functions from the child to the parent
    function editUserDataScreenStructure() {
      const passingSectionData = {
        rowPadding: 100,
        cancelUpdate, //Function
        colors,
        setChangeIconButtonPressed,
        setChangePersonalInfoButtonPressed,
        customSGFormFieldUsername, //Function
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
          {editPersonalRow6(passingSectionData)}
        </View>
      )
    }
    //*-------------------------*/

    function editPersonalInfo() {
      const warningMessage1 = "Provide your personal information, even if the account is for something like a business or pet. It won't be part of your public profile."
      const warningMessage2 = 'To keep your account secure, don\'t enter an email that belongs to someone else.'
     
      return (
        <View>
          {changeIconButtonPressed == false
            ?  changePersonalInfoButtonPressed == false
              ? editUserDataScreenStructure()
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
      // Update Form
      function customSGFormFieldUsername() {
        const passingSectionData = {
          placeholder: 'Username',
          value: newUsername,
          errorMessageVariable: null,
          isSensitiveData: false,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setNewUsername(text))
        )
      }

      function customSGFormFieldEmail() {
        const passingSectionData = {
          placeholder: 'E-mail',
          value: email,
          errorMessageVariable: errorMessageData(errorEmailCheck),
          isSensitiveData: false,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setEmail(text))
        )
      }

      function customSGFormFieldNewEmail() {
        const passingSectionData = {
          placeholder: 'E-mail',
          value: newEmail,
          errorMessageVariable: errorMessageData(errorEmailCheck),
          isSensitiveData: false,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setNewEmail(text))
        )
      }
      
      function customSGFormFieldPassword() {
        const passingSectionData = {
          placeholder: 'Password',
          value: newPassword,
          errorMessageVariable: null,
          isSensitiveData: true,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setNewPassword(text))
        )
      }
      
      function customSGFormFieldPasswordConfirm() {
        const passingSectionData = {
          placeholder: 'Confirm Password',
          value: confirmNewPassword,
          errorMessageVariable: errorMessageDataMain(errorPasswordCheck, 'password', errorPasswordCheck),
          isSensitiveData: true,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setConfirmNewPassword(text))
        )
      }
      
      //* Validation Form
      function customSGFormFieldEmailReEntry() {
        const passingSectionData = {
          placeholder: 'Email',
          value: email,
          errorMessageVariable: errorMessageData(errorEmailCheck),
          isSensitiveData: false,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setEmail(text))
        )
      }

      function customSGFormFieldPasswordReEntry() {
        const passingSectionData = {
          placeholder: 'Password',
          value: password,
          errorMessageVariable: errorMessageData(errorPasswordCheck),
          isSensitiveData: true,
          colors
        }
        return (
          customSGFormField(passingSectionData, (text) => setPassword(text))
        )
      }
      //*------------------*/
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

    function verifyFirebaseIdentityButton() {
      const buttonTitle = 'Verify Identity'
      return (
        <TouchableButton style={{backgroundColor: colors.secondaryColor }}
            disabled={isLoading}
            onPress={() => {validationUserFunction()}}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }

    function changeFirebaseIdentityButton(changeType) {
      const buttonTitle = 'Verify Identity'
      return (
        changeType === 'email'
          ? <TouchableButton style={{backgroundColor: colors.secondaryColor }}
              disabled={isLoading}
              onPress={() => {validationNewEmailFunction(), setVerifyConfirmationButtonPressed(true), setVerifyEmailButtonPressed(true), setVerifyPasswordButtonPressed(false)}}>
              <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
            </TouchableButton>
          : <TouchableButton style={{backgroundColor: colors.secondaryColor }}
              disabled={isLoading}
              onPress={() => {console.log('password'), setVerifyPasswordButtonPressed(true), setVerifyEmailButtonPressed(false)}}>
              <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
            </TouchableButton>
      )
    }

    //This stays on this page
    function emailChangeSection() {
      return (
      verifyConfirmationButtonPressed === true
      ? buttonSet(newEmail)
      : <View>
        {reauthenticationConfirmation == true
          ? <ChangeEmailFunction
              functionType={'email'} 
              functionButton={changeFirebaseIdentityButton('email')}
              emailTextField={customSGFormFieldNewEmail()}
              errorEmailCheck={errorNewEmailCheck}
              errorMessageDataMainEmail={errorMessageDataMain(errorNewEmailCheck, 'newEmail', errorNewEmailCheck)}
            />
          : <ChangeFunction 
              functionType={'email'} 
              functionButton={verifyFirebaseIdentityButton()} 
              emailTextField={customSGFormFieldEmailReEntry()} 
              passwordTextField={customSGFormFieldPasswordReEntry()}
              errorEmailCheck={errorEmailCheck}
              errorMessageDataMainEmail={errorMessageDataMain(errorEmailCheck, 'email', errorEmailCheck)}
              errorPasswordAuthCheck={errorPasswordAuthCheck}
              errorMessageDataMainPassword={errorMessageDataMain(errorPasswordAuthCheck, 'password', errorPasswordAuthCheck)}
            />
        }
      </View>
      )
    }
    /*-----------------------*/

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
                  ? <View>{emailChangeSection()}</View> //Email Button
                  : <View>
                      {changeFunction('password', verifyFirebaseIdentityButton(), customSGFormFieldEmailReEntry())}
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

    // Yes/No Button Functions for Change Personal Information
    const [yesPressed, setYesPressed] = useState(false);
    const [noPressed, setNoPressed] = useState(false);

  function handleYesPress() {
    return (
      setYesPressed(true),
      setNoPressed(false),
      validationEmailExistenceFunction(),
      checkEmailExistence === true 
      ? setVerifyConfirmationButtonPressed(false)
      : navigation.goBack() //? change to go back to profile page
    )
  }

  function handleNoPress() {
    return (
      setYesPressed(false),
      setNoPressed(true),
      setVerifyConfirmationButtonPressed(false),
      validationEmailExistenceFunction()
    )
  }


    function buttonSet(newEmail) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <MainFont>Are you sure? {newEmail}</MainFont>
          <TouchableOpacity
            onPress={handleYesPress}
            style={{
              backgroundColor: yesPressed ? 'green' : 'white',
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'green',
              marginRight: 10,
            }}
          >
            <Text style={{ color: yesPressed ? 'white' : 'green' }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNoPress}
            style={{
              backgroundColor: noPressed ? 'red' : 'white',
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'red',
            }}
          >
            <Text style={{ color: noPressed ? 'white' : 'red' }}>No</Text>
          </TouchableOpacity>
        </View>
      );
    
    }


    /*------------------*/

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
          <Container style={{ flex: 1, justifyContent: 'center' }}>
            {editPersonalInfo()}
          </Container>
      </SafeAreaView>
    )
}
