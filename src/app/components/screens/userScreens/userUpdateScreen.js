
import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Pressable, Text } from 'react-native';
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
  Container,
  useIconCreator
} from 'index'

export default function UpdateUserScreen({navigation}) {
    const { 
      currentUser, 
      updateProfile,
      deleteAccountAuth, 
      deleteAccountDb, 
      updateEmail, 
      updatePassword, 
      reauthenticateUser,
      successAlert, 
      failureAlert
    } = useAuth()
    const { 
      sgIconCreator,
      sgColorPicker
      } = useIconCreator()
    const sgDB = firebase.firestore()
    const colors = useContext(CurrentThemeContext)
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    console.log("🚀 ~ file: userUpdateScreen.js:41 ~ UpdateUserScreen ~ email:", email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userProvidedPassword, setUserProvidedPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState(currentUser.displayName)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [errorEmailCheck, setErrorEmailCheck] = useState('')
    const [errorPasswordCheck, setErrorPasswordPassword] = useState('')
    const [errorPasswordAuthCheck, setErrorPasswordAuthCheck] = useState('')
    const [testError, setTestError] = useState('')
    const [authButtonPressed, setAuthButtonPressed] = useState(false)
    const [changeIconButtonPressed, setChangeIconButtonPressed] = useState(false)
    const [userIcon, setUserIcon] = useState('')
    const sgIconName = 'Felix'
    const sgIconEyes = ["bulging"]
    console.log(currentUser)


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

    function updateProcess() {//You shouldn't have to update any info to "add the username" ***IMPORTANT***
      const updateDataPromises = []
      const emailMatchPromise = new Promise((resolve, reject) => {
        if (email !== currentUser.email) {
          resolve('This checks for matching emails')
          updateEmail(email)
        } else {
          reject('Email is still the same')
          setErrorEmailCheck('Email is still the same')
        }
      })
      const passwordMatchPromise = new Promise((resolve, reject) => {
        if (password == confirmPassword) {
          resolve('This password has been updated')
          updatePassword(password)
        } else {
          reject('Password and Confirm Password do not match')
          setErrorPasswordPassword('Password and Confirm Password do not match')
        }
      })

      updateDataPromises.push(emailMatchPromise)
      //updateDataPromises.push(passwordMatchPromise)
      Promise.all(updateDataPromises).then((messages) => {
        reauthenticateUser()
        console.log(messages)
      }).catch((err) => {
      }).finally(() => {
        console.log(
          "The Promise is settled, meaning it has been resolved or rejected."
        )});
    }
      


    function cancelUpdate() {
        setAuthButtonPressed(false)
        navigation.navigate('Home')
    }

    function onRegisterPress() {
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        const promises = []
        console.log("🚀 ~ file: userUpdateScreen.js:53 ~ onRegisterPress ~ promises:", promises)
        setIsLoading(true)
        setError("")
        if (email !== currentUser.email) {
          promises.push(updateEmail(email))
        }
        if (password !== '') {
          promises.push(updatePassword(password))
        }

        Promise.all(promises)
        .then(() =>{
          navigation.navigate('Home')
        }).catch((err)=>{
          setError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
      }

    function onDeleteAccountPress() {
      const promises =[]
      setIsLoading(true)
      setError("")
      promises.push(deleteAccountAuth())
      promises.push(deleteAccountDb(userId))
      Promise.all(promises)
        .then(() =>{
          navigation.navigate('Login')
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    
    function successAlertMessage(message) {
        return successAlert(message)
      }
  
    function failureAlertMessage(error) {
      return failureAlert(error)
    }

    function errorMessageData(errMessage) {
      return <MainFont>{errMessage}</MainFont>
    }

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }
  
    useEffect(() => {
      setUserId(`${currentUser.uid}`)
      pageLoader()
    })

    function setupAuthentication() {
      return setAuthButtonPressed(true)
    }


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
          changeTextVariable: (text) => setUserName(text),
          value: userName,
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
          changeTextVariable: (text) => setEmail(text),
          value: email,
          errorMessageVariable:errorMessageData(errorEmailCheck)
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
          changeTextVariable: (text) => setPassword(text),
          value: password,
          errorMessageVariable:errorMessageData(errorPasswordCheck)
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
          changeTextVariable: (text) => setConfirmPassword(text),
          value: confirmPassword,
          errorMessageVariable:errorMessageData(errorPasswordCheck)
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
      /*------------------*/
      
      // Auth Form
        function customSGFormFieldEmailAuth() {
          const fieldGroup = {
            placeholder: 'E-mail',
            changeTextVariable: (text) => setEmail(text),
            value: email,
            errorMessageVariable:errorMessageData(errorEmailCheck)
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

        function customSGFormFieldPasswordAuth() {
          const fieldGroup = {
            placeholder: 'Password',
            changeTextVariable: (text) => setUserProvidedPassword(text),
            value: userProvidedPassword,
            errorMessageVariable:errorMessageData(errorPasswordAuthCheck)
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
        function customSGButtonUpdate() {
          const buttonGroup = {
            style: colors.secondaryColor,
            function: () => updateProcess(),
            title: 'Update'
          }
          const customButtonStyle = buttonGroup.style
          const customButtonFunction = buttonGroup.function
          const customButtonTitle = buttonGroup.title
          return (
            customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
          )
        }
        function customSGButtonDelete() {
          const buttonGroup = {
            style: colors.secondaryColorAlt,
            function: () => onDeleteAccountPress(),
            title: 'Delete'
          }
          const customButtonStyle = buttonGroup.style
          const customButtonFunction = buttonGroup.function
          const customButtonTitle = buttonGroup.title
          return (
            customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
          )
        }
        function customSGButtonGoToAuth() {
          const buttonGroup = {
            style: colors.secondaryColorAlt,
            function: () => setupAuthentication(),
            title: 'Reauthenticate'
          }
          const customButtonStyle = buttonGroup.style
          const customButtonFunction = buttonGroup.function
          const customButtonTitle = buttonGroup.title
          return (
            customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
          )
        }
      /*------------------*/
    /*------------------*/

    // Form Button Functions  
    function customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle) {
      const buttonStyle = customButtonStyle
      const buttonFunction = customButtonFunction
      const buttonTitle = customButtonTitle
      
      return (
        <TouchableButton style={{backgroundColor: buttonStyle }}
            disabled={isLoading}
            onPress={buttonFunction}>
            <TouchableButtonFont>{buttonTitle}</TouchableButtonFont>
        </TouchableButton>
      )
    }

    function customSGButtonAuth() {
      const buttonGroup = {
        style: colors.secondaryColorAlt,
        function: () => reauthenticateUser(email, userProvidedPassword),
        title: 'Reauthenticate'
      }
      const customButtonStyle = buttonGroup.style
      const customButtonFunction = buttonGroup.function
      const customButtonTitle = buttonGroup.title
      return (
        customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
      )
    }
    function customSGButtonChangeIcon() {
      const buttonGroup = {
        style: colors.secondaryColor,
        function: () => setChangeIconButtonPressed(true),
        title: 'Change Icon'
      }
      const customButtonStyle = buttonGroup.style
      const customButtonFunction = buttonGroup.function
      const customButtonTitle = buttonGroup.title
      return (
        customSGFormButton(customButtonStyle, customButtonFunction, customButtonTitle)
      )
    }
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

    function authForm() {
      return (
        <View>
          {customSGFormFieldEmailAuth()}
          {customSGFormFieldPasswordAuth()}
          {customSGButtonAuth()}
        </View>
      )
    }

    function updateForm() {
      return (
        <View>
          <View>
            {error !== ''
              ? failureAlertMessage(error)
              : <View></View>
            }
          </View>
          <View style={{flexDirection: 'column'}}>
            {customSGFormFieldUsername()}
            {customSGFormFieldEmail()}
            {customSGFormFieldPassword()}
            {customSGFormFieldPasswordConfirm()}
          </View>
          <View style={{flexDirection: 'column'}}>
            {customSGButtonChangeIcon()}
            {customSGButtonUpdate()}
            {customSGButtonDelete()}
            {customSGButtonGoToAuth()}
          </View>
        </View>
      )
    }

    function editUserExpanded(){
      return (
        <View>
          {changeIconButtonPressed == false
            ? updateForm()
            : <View> 
                <View style={{paddingBottom: 200}}>
                  {sgIconCreator()}
                </View>
                <View>
                {customSGButtonChangeIconGoBack()}
                </View>
            </View>
          }
        </View>
      )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
          <Container style={{ flex: 1 }}>
            <View style={{ paddingLeft: 20 }}>
              <FontAwesomeIcon 
                icon={ faTimes } color={colors.primaryFontColor} size={50} 
                onPress={() => navigation.navigate('Home')}
              />
            </View>
            {authButtonPressed == false
              ? editUserExpanded()
              : authForm()
            }
              <FooterView style={{flexDirection: 'row'}}>
                  <FooterFont style={{alignItems: 'center', justifyContent: 'center'}}>
                    <FooterLink onPress={cancelUpdate}>
                      Cancel
                    </FooterLink>
                  </FooterFont>
              </FooterView>
              <Text>{testError}</Text>
          </Container>
      </SafeAreaView>
    )
}