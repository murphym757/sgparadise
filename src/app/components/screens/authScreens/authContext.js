import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../../../../server/config/config'
import { auth } from '../../../../server/config/config'
import {
    CustomFailureAlert,
    CustomFailureAlertFont,
    CustomSuccessAlert,
    CustomSuccessAlertFont
  } from '../../../../../assets/styles/authScreensStyling'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUID, setCurrentUID] = useState()
    const [notLoggedInCurrentUser, setNotLoggedInCurrentUser ] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [stateTest, setStateTest] = useState('')
    const [entryText, setEntryText] = useState('')
    const [viewCountFirebase, setViewCountFirebase] = useState(0)
    console.log("Testing testing" + viewCountFirebase)
    const [entries, setEntries] = useState([])
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
          })
    }

    function deleteAccountDb(userId) {
        return db.collection("users").doc(userId).delete().then(() => {
            console.log("User successfully deleted!")
        }).catch((err) => {
          setError(""+ err +"")
        })
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

    function displayData(collectionName) {
        return db.collection(collectionName)
        .get().then((querySnapshot) => {
            console.log(querySnapshot.size)
            const newEntries = []
            querySnapshot.forEach((doc) => {
                const entry = doc.data()
                entry.id = doc.id
                newEntries.push(entry)
            });
            setEntries(newEntries)
        }, err => {
            console.log("Error getting document:", err)
        })
    }

    function addData(collectionName) {
       // Add a new document in collection "cities"
        return db.collection("cities").add({
            name: "Tokyo",
            country: "Japan"
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((err) => {
            console.error("Error writing document: ", err);
        });
    }

    async function addData(collectionName) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection('sgAPI').doc('sg1000').collection('games').add({
            will: 'this work',
            age: 'too damn old',
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addImagesForGame(collectionName, consoleName, gamesCollection, gameName, imagesCollection) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(imagesCollection).add({
            gameImage: gameName + " Image",
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addCommentsForGame(collectionName, consoleName, gamesCollection, gameName, commentsCollection) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(commentsCollection).add({
            gameImage: gameName + " Image",
            postCreator: currentUID,
            createdAt: timestamp
        })
    }
    
    async function addGenreTagsForGame(collectionName, consoleName, gamesCollection, gameName, tagsCollection, genreTagsTitle, genreTagsData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const gameTags = gameName + "Tags"
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(tagsCollection).doc('genreTags').set({
            tagsTitle: genreTagsTitle, 
            tagsData: genreTagsData,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addDescriptionTagsForGame(collectionName, consoleName, gamesCollection, gameName, tagsCollection, descriptionTagsTitle, descriptionTagsData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const gameTags = gameName + "Tags"
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(tagsCollection).doc('descriptionTags').set({
            gameImage: gameName + " Image",
            tagsTitle: descriptionTagsTitle,
            tagsData: descriptionTagsData,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    // Add Game to DB
    async function addGameToConsole(collectionName, consoleName, gamesCollection, gameName, viewCount) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).set({
            will: 'this work',
            age: 'too damn old',
            views: viewCount,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    // Update the game's view count
    async function updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) {
        const increment = firebase.firestore.FieldValue.increment(0.5) // The page loads twice, so increased the increments by half to make a whole view
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).update({    
            views: increment
        })
    }

    // Gets General Game Data
    async function getGameData(collectionName, consoleName, gamesCollection, gameName) {
     db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).get()
        .then((doc) => {
            if (doc.exists) {
                console.log(doc.data().views)
                setViewCountFirebase(doc.data().views)
            } else {
                console.log("No such document!")
            }
        }, err => {
            console.log("Error getting document:", err)
        })
    }

    async function deleteData(collectionName, docName) {
        db.collection('sgAPI').doc('sg1000').collection('games').delete()
    }

    // this function runs (and works), but will fail if the collection has subcollections
    async function deleteGameFromConsole(collectionName, consoleName, gamesCollection, gameName) {
        db.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).delete()
        console.log("this function ran")
    }

    

    /*
        function displayData(collectionName, docName, objectName) {
        return db.collection(collectionName).doc(docName)
        .onSnapshot((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data())
                setStateTest(doc.data() + "." + objectName)
            } else {
                console.log("No such document!")
            }
        }, err => {
            console.log("Error getting document:", err)
        })
    }
    */

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
            setCurrentUID(user.uid)
            setIsLoading(false)
        })

        return unsubcribe
    }, [])

    const value = {
        db,
        currentUser,
        currentUID,
        signUp,
        deleteAccountAuth,
        deleteAccountDb,
        stateTest,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
        displayData,
        getGameData,
        addData,
        addGameToConsole,
        deleteGameFromConsole,
        addImagesForGame,
        addCommentsForGame,
        addGenreTagsForGame,
        addDescriptionTagsForGame,
        updateGameViewCount,
        deleteData,
        entries,
        viewCountFirebase,
        successAlert,
        failureAlert
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}