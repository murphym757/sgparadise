import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../../../../server/config/config'
import { auth } from '../../../../server/config/config'
import {
    CustomFailureAlert,
    CustomFailureAlertFont,
    CustomSuccessAlert,
    CustomSuccessAlertFont
  } from '../../../../../assets/styles/authScreensStyling';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [notLoggedInCurrentUser, setNotLoggedInCurrentUser ] = useState()
    console.log(currentUser)
    const [isLoading, setIsLoading] = useState(true)
    const auth = firebase.auth()
    const db = firebase.firestore()

    function signUp(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
    }

    function deleteAccountAuth() {
        return auth.currentUser.delete().then(() => {
            navigation.navigate('Home')
          }).catch((err) => {
            setError(""+ err +"")
          });
    }

    function deleteAccountDb(userId) {
        return db.collection("users").doc(userId).delete().then(() => {
            console.log("User successfully deleted!")
        }).catch((err) => {
          setError(""+ err +"")
        });
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function successAlert(message) {
        return <CustomSuccessAlert>
        <CustomSuccessAlertFont>{message}</CustomSuccessAlertFont>
      </CustomSuccessAlert>
    }

    function failureAlert(error) {
        return <CustomFailureAlert>
        <CustomFailureAlertFont>{error}</CustomFailureAlertFont>
      </CustomFailureAlert>
    }

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setIsLoading(false)
        })

        return unsubcribe
    }, [])

    const value = {
        db,
        currentUser,
        signUp,
        deleteAccountAuth,
        deleteAccountDb,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
        successAlert,
        failureAlert
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}