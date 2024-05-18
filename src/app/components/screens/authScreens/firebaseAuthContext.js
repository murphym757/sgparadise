import React, { createContext, useContext, useState } from 'react'
import {
    collection,
    deleteField,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
    writeBatch,
    deleteDoc
} from "firebase/firestore"
import { 
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth, 
    onAuthStateChanged,
    reauthenticateWithCredential, 
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword,
    updateProfile,
    deleteUser
} from "firebase/auth"
import { auth, sgDB, sgImageStorage } from 'server/config/config'


const FirebaseAuthContext = createContext()

export function useFirebaseAuth() {
    return useContext(FirebaseAuthContext)
}

export function FirebaseAuthProvider({ children }) {
    const [checkEmailExistence, setCheckEmailExistence] = useState(false)
    const [checkUserExistence, setCheckUserExistence] = useState(null)
    const [checkPasswordExistence, setCheckPasswordExistence] = useState(null)

    //* Sign Up Process
        //* Authentification Section
            async function sgAccountSignUp(email, password) {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    addUserDataUsers(user.uid, email)
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    if (errorCode === 'auth/email-already-in-use') return (
                        setCheckEmailExistence(true)
                    )
                })
            }

            //* Create User Data sgUsers (on Cloud Firestore)
            async function addUserDataUsers(userID, userEmail) {
                await setDoc(doc(sgDB, 'sgUsers', userID), {   
                    id: userID,
                    email: userEmail,
                    createdAt: serverTimestamp()
                })
            }
    //*-----Sign Up Process-----*/
    //* Delete User Process
        //* Authentification Section
        function deleteAccountAuth() {
            const auth = getAuth()
            const user = auth.currentUser
        
            deleteUser(user).then(() => {
        		// User deleted.
            }).catch((err) => {
                setError(`${err}`)
            });
        }
    
         //* Delete User Data sgUsers (on Cloud Firestore)
        async function deleteAccountDb(userId) {
            await deleteDoc(doc(sgDB, 'sgUsers', userId))
        }
        
    //*-----Delete User Process-----*/
    //* Login/Logout Process
        async function sgLogIn(email, password) {
            const auth = getAuth();
                return signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                        const user = userCredential.user
                    //
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    if (errorCode === 'auth/user-not-found') return (
                        setCheckUserExistence(false)
                    )
                    if (errorCode === 'auth/wrong-password') return (
                        setCheckPasswordExistence(false)
                    )
                });
        }

        function sgLogOut() {
            return auth.signOut().then(() => {
                navigation.navigate('Home')
            }).catch((err) => {
                setError(`${err}`)
            })
        }
    //*-----Login/Logout Process-----*/
    //* Reset Password Process
        //* Function for user to change password via email
            function sendVerificationCode(email) {
                const auth = getAuth();
                sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                    console.log('Verification code sent successfully');
                })
                .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    console.log('Failed to send verification code: ', err);
                    console.log(errorCode)
                    console.log(errorMessage)
                })
            }
    //*-----Reset Password Process-----*/
    const firebaseAuthValue = {
        checkEmailExistence,
        checkUserExistence,
        checkPasswordExistence,
        setCheckUserExistence,
        sgAccountSignUp,
        deleteAccountAuth,
        sgLogIn,
        sgLogOut,
        sendVerificationCode
    }

    const cloudFirestoreValue = {
        addUserDataUsers,
        deleteAccountDb
    }

    const value = {
        auth,
        firebaseAuthValue,
        cloudFirestoreValue,
    }

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    )

}

