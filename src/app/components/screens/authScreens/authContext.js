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
    const sgDB = firebase.firestore()
    const sgImageStorage = firebase.storage()
    const sg1000IGDB = '84'
    const sg32XIGDB = '30'
    const sgCDIGDB = '78'
    const sgGGIGDB = '35'
    const sgGenIGDB = '29'
    const sgMSIGDB = '64'
    const sgSatIGDB = '32'

    const randomString = (n, r='') => {
        while (n--) r += String.fromCharCode((r=Math.random()*62|0, r+=r>9?(r<36?55:61):48));
        return r;
    };
    

    function complexID(characterLength) {
        return randomString(characterLength)
    }

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
        return sgDB.collection("users").doc(userId).delete().then(() => {
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
        return sgDB.collection(collectionName)
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
        return sgDB.collection("cities").add({
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
        sgDB.collection('sgAPI').doc('sg1000').collection('games').add({
            will: 'this work',
            age: 'too damn old',
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addImagesForGame(collectionName, consoleName, gamesCollection, gameName, imagesCollection) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(imagesCollection).add({
            gameImage: gameName + " Image",
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addCommentsForGame(collectionName, consoleName, gamesCollection, gameName, commentsCollection) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(commentsCollection).add({
            gameImage: gameName + " Image",
            postCreator: currentUID,
            createdAt: timestamp
        })
    }
    
    async function addGenreTagsForGame(collectionName, consoleName, gamesCollection, gameName, tagsCollection, genreTagsTitle, genreTagsData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const gameTags = gameName + "Tags"
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(tagsCollection).doc('genreTags').set({
            tagsTitle: genreTagsTitle, 
            tagsData: genreTagsData,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addDescriptionTagsForGame(collectionName, consoleName, gamesCollection, gameName, tagsCollection, descriptionTagsTitle, descriptionTagsData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const gameTags = gameName + "Tags"
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(tagsCollection).doc('descriptionTags').set({
            gameImage: gameName + " Image",
            tagsTitle: descriptionTagsTitle,
            tagsData: descriptionTagsData,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    // Add Game to sgDB
    async function addGameToConsole(collectionName, consoleName, gamesCollection, gameName) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).set({
            sgID: complexID(20),
            name: gameName,
            views: viewCountFirebase,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    // Update the game's view count
    async function updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) {
        const increment = firebase.firestore.FieldValue.increment(0.5) // The page loads twice, so increased the increments by half to make a whole view
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).update({    
            views: increment
        })
          
    }

    // Gets General Game Data
    async function getGameData(collectionName, consoleName, gamesCollection, gameName) {
     sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).get()
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
        sgDB.collection('sgAPI').doc('sg1000').collection('games').delete()
    }

    // this function runs (and works), but will fail if the collection has subcollections
    async function deleteGameFromConsole(collectionName, consoleName, gamesCollection, gameName) {
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).delete()
        console.log("this function ran")
    }

    async function imageCapture(uploadImageurl, folderName, consoleName, gameName, subFolderName, fileName, fileType) {
        const filename =  "" + folderName + "/" + consoleName + "/" + gameName + "/" + subFolderName + "/" + fileName + "." + fileType + ""
       

        
    fetch(uploadImageurl).then(res => {
            return res.blob();
        }).then(blob => {
            //uploading blob to firebase storage
        firebase.storage().ref().child(filename).put(blob).then(function(snapshot) {
            return snapshot.ref.getDownloadURL()
        })
        .then(url => {
        console.log("Firebase storage image uploaded : ", url); 
        }) 
        }).catch(error => {
        console.error(error);
        });
    }

    /*
        function displayData(collectionName, docName, objectName) {
        return sgDB.collection(collectionName).doc(docName)
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
    ///Buttons for navigating through uploading games process
    function forwardToNextPage(pageNumber, passingContent, navigationPass) {
        navigationPass.navigate(pageNumber, passingContent)
    }

    function backToPreviousPage(navigationPass) {
        navigationPass.goBack()
    }
    /*--------------*/

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

    function unixTimestampConverter(item) {
        const unixTimestamp = item.first_release_date
        const milliseconds = unixTimestamp * 1000
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
        return humanDateFormat
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
        sg1000IGDB,
        sg32XIGDB,
        sgCDIGDB,
        sgGGIGDB,
        sgGenIGDB,
        sgMSIGDB,
        sgSatIGDB,
        sgDB,
        sgImageStorage,
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
        imageCapture,
        viewCountFirebase,
        forwardToNextPage,
        backToPreviousPage,
        successAlert,
        failureAlert,
        unixTimestampConverter
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}