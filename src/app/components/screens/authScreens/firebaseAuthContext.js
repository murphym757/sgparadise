import React, { createContext, useContext, useState } from 'react'
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth"

const FirebaseAuthContext = createContext()

export function useFirebaseAuth() {
    return useContext(FirebaseAuthContext)
}

export function FirebaseAuthProvider({ children }) {
    const [checkEmailExistence, setCheckEmailExistence] = useState(false)

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
                const newUserNameRef = doc(sgDB, 'sgUsers', userID)
                await setDoc(newUserNameRef, {   
                    id: userID,
                    email: userEmail,
                    createdAt: serverTimestamp()
                })
            }
    //*-----Sign Up Process-----*/
    //* Delete User Process
        //* Authentification Section
            function deleteAccountAuth() {
                return auth.currentUser.delete().then(() => {
                    navigation.navigate('Home')
                }).catch((err) => {
                    setError(`${err}`)
                })
            }
    
         //* Delete User Data sgUsers (on Cloud Firestore)
            async function deleteAccountDb(userId) {
                const accountRef = doc(sgDB, 'users', userId)
        
                await updateDoc(accountRef, {
                    account: deleteField()
                })
            }
    //*-----Delete User Process-----*/

    const firebaseAuthValue = {
        checkEmailExistence,
        sgAccountSignUp,
        deleteAccountAuth
    }

    const cloudFirestoreValue = {
        addUserDataUsers,
        deleteAccountDb
    }

    const value = {
        firebaseAuthValue,
        cloudFirestoreValue
    }

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    )

}

