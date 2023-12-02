import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { auth, sgDB, sgImageStorage } from 'server/config/config'
import { bannedWords } from 'server/sgProfanityFilter'
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
    writeBatch
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
} from "firebase/auth"

import {
    BackButtonContainer,
    BackButtonBottomLayer,
    BackButtonTopLayer,
    ContentContainer,
    CustomFailureAlert,
    CustomFailureAlertFont,
    CustomSuccessAlert,
    CustomSuccessAlertFont,
    faChevronLeft,
    faCircle,
    FontAwesomeIcon,
    MainFont,
    TouchableButton,
    TouchableButtonAlt,
    TouchableButtonFont,
    TouchableButtonFontAlt,
    windowController,
    windowHeight,
} from 'index'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

const initialState = {
    currentUID: null,
    currentUser: null,
    isLoading: true,
}

function reducer(state, action) {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          currentUID: action.payload.currentUID,
          currentUser: action.payload.currentUser,
          isLoading: false,
        };
      case 'CLEAR_USER':
        return {
          ...state,
          currentUID: action.payload.currentUID,
          currentUser: action.payload.currentUser,
          isLoading: false,
        };
      default:
        return state;
    }
  }

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentUID, setCurrentUID] = useState()
    console.log("🚀 ~ file: authContext.js:88 ~ AuthProvider ~ currentUID:", currentUID)
    const [currentUser, setCurrentUser] = useState()
    const [entries, setEntries] = useState([])
    const [entryText, setEntryText] = useState('')
    const [notLoggedInCurrentUser, setNotLoggedInCurrentUser ] = useState()
    const [stateTest, setStateTest] = useState('')
    const [viewCountFirebase, setViewCountFirebase] = useState(0)
    console.log("🚀 ~ file: authContext.js:42 ~ AuthProvider ~ entries:", entries)
    const errorBool = true
    const sg1000IGDB = '84'
    const sg32XIGDB = '30'
    const sgCDIGDB = '78'
    const sgGenIGDB = '29'
    const sgGGIGDB = '35'
    const sgMSIGDB = '64'
    const sgSatIGDB = '32'

    function signUp(email, password, setCheckEmailExistence) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            addUserDataUsers(user.uid, email)
        })
        .catch((error) => {
            const errorCode = error.code
            if (errorCode === 'auth/email-already-in-use') return (
                setCheckEmailExistence(true)
            )
        });
    }

    function deleteAccountAuth() {
        return auth.currentUser.delete().then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            setError(`${err}`)
        })
    }

    async function deleteAccountDb(userId) {
        const accountRef = doc(sgDB, 'users', userId)

        await updateDoc(accountRef, {
            account: deleteField()
        })
    }

    function logIn(email, password, setCheckUserExistence, setCheckPasswordExistence) {
        const auth = getAuth();
            return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                    const user = userCredential.user
                //
            })
            .catch((error) => {
                const errorCode = error.code
                if (errorCode === 'auth/user-not-found') return (
                    setCheckUserExistence(false)
                )
                if (errorCode === 'auth/wrong-password') return (
                    setCheckPasswordExistence(false)
                )
            });
    }

    function logOut() {
        return auth.signOut().then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            setError(`${err}`)
        })
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmailAuth(email, setCheckEmailExistence) {
        const auth = getAuth();
        const user = auth.currentUser;
        return updateEmail(auth.currentUser, email).then(() => {
        // Email updated!
        // ...
        console.log("Email updated successfully!")
        }).catch((error) => {
            const errorCode = error.code
            console.log("🚀 ~ file: authContext.js:137 ~ returnupdateEmail ~ errorCode:", errorCode)
            if (errorCode === 'auth/email-already-in-use') return (
                setCheckEmailExistence(true)
            )
        })
    }
    
    async function updatePasswordAuth(password) {
        // Get the current user
        const auth = getAuth();
        const user = auth.currentUser;

        // Update the user's password
        const newPassword = password
        return updatePassword(user, newPassword)
        .then(() => {
            console.log("Password updated successfully!");
        })
        .catch((error) => {
            console.log("Error updating password:", error);
        })
    }

     //? This is a test for returning specific data (This works but is not needed for the app)
    //* Replicate 'firebaseReauthenticateViaEmail' to match this
    async function getUsername(newUsername, setCheckUsernameExistence) {
        setCheckUsernameExistence(false)
        // Create a reference to the cities collection
        const usersRef = collection(sgDB, "sgUsers");

        // Create a query against the collection.
        const q = query(usersRef, where("userName", "==", newUsername));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(doc.id, " = ", doc.data()) {
                setCheckUsernameExistence(true)
            }
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " = ", doc.data());
        });

    }


    function updateUsernameAuth(newUsername) {
        const auth = getAuth()
        return updateProfile(auth.currentUser, {
            displayName: newUsername,
        }).then(() => {
        // Profile updated!
        // ...
        })
    }

    function reauthenticateUser(email, userProvidedPassword, reDirect) {
        const auth = getAuth();
        const user = auth.currentUser;

        // TODO(you): prompt the user to re-provide their sign-in credentials
        //const credential = promptForCredentials();

            const credential = auth.EmailAuthProvider.credential(
            email, 
            userProvidedPassword
        );


        reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
            reDirect
            console.log('The User have been re-authenticated.')
        }).catch((error) => {
        // An error ocurred
        // ...
        });
    }

    // User successfully reauthenticated. New ID tokens should be valid.

    
    // Function to reauthenticate user via email
    // Function to compare passwords
    async function firebaseReauthenticateViaEmail(email, password, setReauthenticationConfirmation) {
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            email,
            password
        )
    console.log("🚀 ~ file: authContext.js:198 ~ firebaseReauthenticateViaEmail ~ credential:", credential)
    reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
            console.log('The User have been re-authenticated.')
            setReauthenticationConfirmation(true)
        }).catch((error) => {
        // An error ocurred
        // ...
        console.log('The User have not been re-authenticated.')
        });
}

    //* Function for user to change password via email
    function sendVerificationCode(email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            console.log('Verification code sent successfully');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Failed to send verification code: ', error);
            console.log(errorCode)
            console.log(errorMessage)
        })
    }

    async function displayDataNew() {
        const q = query(collection(sgDB, "cities"), where("capital", "==", true));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }

    //* Get game data from firebase (for spotlight)
    async function getGameDataSpotlight(sgConsoleName, setSpotlightGame, gameName) {
        const gameRef = doc(sgDB, 'sgAPI', sgConsoleName, 'games', gameName)
        const gameSnap = await getDoc(gameRef);

        if (gameSnap.exists()) {
            setSpotlightGame(gameSnap.data())
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    }
    
    //* Get the Games Collection for Top 4 (Newly Added, Highest Rated) games
        function topGamesCollection(sgConsoleName, sgWhereStatus, sgWhere, sgOrder) {
            const collectionData = collection(sgDB, 'sgAPI', sgConsoleName, 'games')
            const typeData = sgWhereStatus === true
                ?   where("gameRating", ">", sgWhere)
                :   null
            const orderData = orderBy(sgOrder, 'desc')
            const limitData = limit(4)
            return (
                query(collectionData, typeData, orderData, limitData)
            )
        }
    //*----- Top 4 Games -----//

    async function displayTopNewlyData(sgConsoleName, sgWhereStatus, sgWhere, sgOrder, setGameArrayTest) {
        const q = topGamesCollection(sgConsoleName, sgWhereStatus, sgWhere, sgOrder, setGameArrayTest)
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setGameArrayTest(querySnapshot.docs.map(doc => doc.data()))
        })
    }

    //* Query Collection for specific data ----- IMPORTANT: Use this
        function queryCollectionStructure(collectionName, sgConsoleName, sgProvidedParameterType, sgReceivedParameterType, sgProvidedSecondaryParameterType, sgProvidedSecondaryParameterTypeOrder) {
            const collectionData = collection(sgDB, collectionName, sgConsoleName, 'games')
            const typeData = where(sgProvidedParameterType, "==", sgReceivedParameterType)
            const orderData = orderBy(sgProvidedSecondaryParameterType, sgProvidedSecondaryParameterTypeOrder)
            const limitData = limit(4)
            return (
                query(collectionData, typeData, orderData, limitData)
            )
        }
    //*-----Query Collection for specific data-----*//

    async function displayData(collectionName, sgConsoleName, sgProvidedParameterType, sgReceivedParameterType, sgProvidedSecondaryParameterType, sgProvidedSecondaryParameterTypeOrder, setGameArrayTest) {
        const q = queryCollectionStructure(collectionName, sgConsoleName, sgProvidedParameterType, sgReceivedParameterType, sgProvidedSecondaryParameterType, sgProvidedSecondaryParameterTypeOrder)
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setGameArrayTest(querySnapshot.docs.map(doc => doc.data()))
        })
    }

   

    //* Batch write to add multiple documents to a collection
    
    async function batchWrite(collectionGroup1, collectionGroup2, collectionGroup3, collectionGroup4, collectionGroup5) {
        //* Create a group for each homepageGameCollection

            //* MockGroup1
            const mockGroup1 = {
                collectionName: 'sgAPI',
                sgConsoleName: 'sgGenesis',
                subGenreName: 'Platformer',
                groupArray: setMockGroup1Array,
                setQueryArray: setMockGroup1Array
            }
            //*-----MockGroup1-----//
        const documentsRefs = [
            queryCollectionStructure(collectionGroup1.collectionName, collectionGroup1.sgConsoleName, collectionGroup1.subGenreName),
            queryCollectionStructure(collectionGroup2.collectionName, collectionGroup2.sgConsoleName, collectionGroup2.subGenreName),
            queryCollectionStructure(collectionGroup3.collectionName, collectionGroup3.sgConsoleName, collectionGroup3.subGenreName),
            queryCollectionStructure(collectionGroup4.collectionName, collectionGroup4.sgConsoleName, collectionGroup4.subGenreName),
            queryCollectionStructure(collectionGroup5.collectionName, collectionGroup5.sgConsoleName, collectionGroup5.subGenreName)
        ]
        Promise.all(documentsRefs.map(docRef => docRef.get()))
            .then(() => {
                const querySnapshot = getDocs(docRef)
                querySnapshot.forEach((doc) => {
                setQueryArray(querySnapshot.docs.map(doc => doc.data()))
            })
        })
    }
    //*-----Add batch data for firebase-----*//

    function addData(collectionName) {
       // Add a new document in collection "cities"
        return sgDB.collection("cities").add({
            name: "Tokyo",
            country: "Japan"
        })
        .then(() => {
            console.log("Document successfully written!")
        })
        .catch((err) => {
            console.error("Error writing document: ", err)
        })
    }

    function addGameToConsoleButtonGroup(buttonGroupData) {
        const sgConsoleName = buttonGroupData.passingContent.consoleName
        const sgFirebaseConsoleName = buttonGroupData.passingContent.firebaseConsoleName
        const sgFirebaseCoverUrl = buttonGroupData.passingContent.firebaseCoverUrl
        const sgFirebaseScreenshot1Url = buttonGroupData.passingContent.firebaseScreenshot1Url
        const sgFirebaseScreenshot2Url = buttonGroupData.passingContent.firebaseScreenshot2Url
        const sgFirebaseScreenshot3Url = buttonGroupData.passingContent.firebaseScreenshot3Url
        const sgFirebaseGameNameImageCount = buttonGroupData.passingContent.gameNameImageCount
        const sgFirebaseStorageConsoleName = buttonGroupData.passingContent.firebaseStorageConsoleName
        const sgGameDevelopers = buttonGroupData.passingContent.gameDevelopers
        const sgGameGenre = buttonGroupData.passingContent.gameGenre
        const sgGameModes = buttonGroupData.passingContent.gameModes
        const sgGameName = buttonGroupData.passingContent.gameName
        const sgGameNameBRZ = buttonGroupData.passingContent.gameNameBRZ
        const sgGameNameEUR = buttonGroupData.passingContent.gameNameEUR
        const sgGameNameJPN = buttonGroupData.passingContent.gameNameJPN
        const sgGameNameMatchInSgDB = buttonGroupData.passingContent.gameNameMatchInSgDB
        const sgGamePublishers = buttonGroupData.passingContent.gamePublishers
        const sgGameRating = buttonGroupData.passingContent.gameRating
        const sgGameReleaseDate = buttonGroupData.passingContent.gameReleaseDate
        const sgGameSlug = buttonGroupData.passingContent.gameSlug
        const sgGameSubgenre = buttonGroupData.passingContent.gameSubgenre
        const sgGameSummary = buttonGroupData.passingContent.gameSummary
        const sgGameID = buttonGroupData.passingContent.gameSgID
        const sgCurrentUID = currentUID
        const passingContent = {
            sgConsoleName,
            sgFirebaseConsoleName,
            sgFirebaseCoverUrl,
            sgFirebaseGameNameImageCount,
            sgFirebaseScreenshot1Url,
            sgFirebaseScreenshot2Url,
            sgFirebaseScreenshot3Url,
            sgFirebaseStorageConsoleName,
            sgGameDevelopers,
            sgGameGenre,
            sgGameID,
            sgGameModes,
            sgGameName,
            sgGameNameBRZ,
            sgGameNameEUR,
            sgGameNameJPN,
            sgGameNameMatchInSgDB,
            sgGamePublishers,
            sgGameRating, 
            sgGameReleaseDate,
            sgGameSlug,
            sgGameSubgenre,
            sgGameSummary,
            sgPostCreator:  sgCurrentUID
        }
        const stackName = ''

        function pathToUploadViaFirebase() {   
            setTimeout(() => {
                addGameToConsole(passingContent)
                addGameToSearchConsole(passingContent)
            }, 3000)
            return(
                buttonGroupData.toNewStack(buttonGroupData.stackName, buttonGroupData.screenName, buttonGroupData.navigationPass)
            )
        }
        return (
            <View>
                <TouchableButton onPress={() => pathToUploadViaFirebase()}>
                    <TouchableButtonFont>Upload Game</TouchableButtonFont>
                </TouchableButton>
                <TouchableButtonAlt style={{}} onPress={() => buttonGroupData.backToPreviousPage(buttonGroupData.navigationPass, stackName)}>
                    <TouchableButtonFontAlt>Previous Page</TouchableButtonFontAlt>
                </TouchableButtonAlt>
            </View>
        )
    }

    async function addImagesForGame(collectionName, consoleName, gamesCollection, gameName, imagesCollection) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(imagesCollection).add({
            gameImage: `${gameName} Image`,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addCommentsForGame(collectionName, consoleName, gamesCollection, gameName, commentsCollection) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(commentsCollection).add({
            gameImage: `${gameName} Image`,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }
    
    async function addGenreTagsForGame(collectionName, consoleName, gamesCollection, gameName, tagsCollection, genreTagsTitle, genreTagsData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const gameTags = `${gameName} Tags`
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(tagsCollection).doc('genreTags').set({
            tagsTitle: genreTagsTitle, 
            tagsData: genreTagsData,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    async function addDescriptionTagsForGame(collectionName, consoleName, gamesCollection, gameName, tagsCollection, descriptionTagsTitle, descriptionTagsData) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const gameTags = `${gameName} Tags`
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).collection(tagsCollection).doc('descriptionTags').set({
            gameImage: `${gameName} Image`,
            tagsTitle: descriptionTagsTitle,
            tagsData: descriptionTagsData,
            postCreator: currentUID,
            createdAt: timestamp
        })
    }

    // Create User Data sgUsers (on Cloud Firestore)
    async function addUserDataUsers(userID, userEmail) {
        const newUserNameRef = doc(sgDB, 'sgUsers', userID)
        await setDoc(newUserNameRef, {   
            id: userID,
            email: userEmail,
            createdAt: serverTimestamp()
        })
    }
    // Add new Document to already existing User Data sgUsers (on Cloud Firestore)
    async function updateUsernameFirestore(userID, newUsername) {
        const userNameRef = doc(sgDB, 'sgUsers', userID)
        await updateDoc(userNameRef, {
            userName: newUsername
        })
    }
    // Update User Data sgUsers (on Cloud Firestore)
    async function updateUserEmailFirestore(userID, userEmail) {
        const userEmailRef = doc(sgDB, 'sgUsers', userID)
        await updateDoc(userEmailRef, {
            email: userEmail
        })
    }

    // Update User  Icon Data sgUsers (on Cloud Firestore)
    async function updateUserIconFirestore(userID, userIconData) {
        const userIconRef = doc(sgDB, 'sgUsers', userID)
        await updateDoc(userIconRef, {
            userIconSVG: userIconData.avatar,
            userIconEyes: userIconData.eyeValue, 
            userIconMouth: userIconData.mouthValue,
            userIconColor:'#' + userIconData.iconBackground
        })
    }
    
    /*-------------------------------*/

    // Add Game to sgDB
    async function addGameToConsole(passingContent) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        sgDB.collection('sgAPI').doc(passingContent.sgFirebaseConsoleName).collection('games').doc(passingContent.sgGameSlug).set({
            consoleName: passingContent.sgConsoleName,
            createdAt: timestamp,
            firebaseCoverUrl: passingContent.sgFirebaseCoverUrl,
            firebaseGameNameImageCount: passingContent.sgFirebaseGameNameImageCount,
            firebaseScreenshot1Url: passingContent.sgFirebaseScreenshot1Url,
            firebaseScreenshot2Url: passingContent.sgFirebaseScreenshot2Url,
            firebaseScreenshot3Url: passingContent.sgFirebaseScreenshot3Url,
            gameDevelopers: passingContent.sgGameDevelopers,
            gameGenre: passingContent.sgGameGenre,
            gameModes: passingContent.sgGameModes,
            gameName: passingContent.sgGameName,
            gameNameBRZ: passingContent.sgGameNameBRZ,
            gameNameEUR: passingContent.sgGameNameEUR,
            gameNameJPN: passingContent.sgGameNameJPN,
            gameNameMatchInSgDB: passingContent.sgGameNameMatchInSgDB,
            gamePublishers: passingContent.sgGamePublishers,
            gameRating: passingContent.sgGameRating, 
            gameReleaseDate: passingContent.sgGameReleaseDate,
            gameSlug: passingContent.sgGameSlug,
            gameSubgenre: passingContent.sgGameSubgenre,
            gameSummary: passingContent.sgGameSummary,
            gameUploaded: true,
            postCreator: passingContent.sgPostCreator,
            sgID: passingContent.sgGameID,
            views: viewCountFirebase
        })
    }

    
    // Add Game to sgSearch (For search purposes)
    async function addGameToSearchConsole(passingContent) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        sgDB.collection('sgSearch').doc(`${passingContent.sgGameSlug} (${passingContent.sgConsoleName})`).set({
            consoleName: passingContent.sgConsoleName,
            createdAt: timestamp,
            firebaseGameNameImageCount: passingContent.sgFirebaseGameNameImageCount,
            gameCover: passingContent.sgFirebaseCoverUrl,
            gameGenre: passingContent.sgGameGenre,
            gameDevelopers: passingContent.sgGameDevelopers,
            gameModes: passingContent.sgGameModes,
            gamePublishers: passingContent.sgGamePublishers,
            gameName: passingContent.sgGameName,
            gameRating: passingContent.sgGameRating, 
            gameReleaseDate: passingContent.sgGameReleaseDate,
            gameSlug: passingContent.sgGameSlug,
            gameSubgenre: passingContent.sgGameSubgenre,
            sgID: passingContent.sgGameID
        })
    }

    // Update the game's view count
    async function updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) {
        const increment = firebase.firestore.FieldValue.increment(1)
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).update({    
            views: increment
        })
    }

    async function updateGameViewCountReset(collectionName, consoleName, gamesCollection, gameName) {
        const decrement = firebase.firestore.FieldValue.increment(-1)
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).update({    
            views: decrement
        })
    }

    //? Gets General Game Data ---Not used in the app---
    async function getGameData(collectionName, consoleName, gamesCollection, gameName) {
        sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName).get()
        .then((doc) => {
            if (doc.exists) {
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
    }
    
    /*
        function displayData(collectionName, docName, objectName) {
        return sgDB.collection(collectionName).doc(docName)
        .onSnapshot((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data())
                setStateTest(`${doc.data()}.${objectName}`)
            } else {
                console.log("No such document!")
            }
        }, err => {
            console.log("Error getting document:", err)
        })
    }
    */

    // Returns data from firebase based on a specific subgenre
    async function sgFirebaseGamesCollectionSubGenre(collectiveGameData) {
        if (collectiveGameData.gameRefSpecificRelatedData != null) {
            const subscriber = sgDB
            .collection(collectiveGameData.collectionName)
            .doc(collectiveGameData.consoleName)
            .collection(collectiveGameData.gamesCollection)
            .orderBy(collectiveGameData.gamesCollectionOrderBy, collectiveGameData.gamesCollectionOrderDirection)
            .limit(collectiveGameData.gamesCollectionOrderLimit)
            .where(collectiveGameData.gameRefSpecificData, '==', collectiveGameData.gameRefSpecificRelatedData)
            .onSnapshot(querySnapshot => {
                const games = []
                querySnapshot.forEach(documentSnapshot => {
                    games.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    })
                })
        
                collectiveGameData.setupGameData(games)
            })
        return () => subscriber()
        } else {
            const subscriber = sgDB
            .collection(collectiveGameData.collectionName)
            .doc(collectiveGameData.consoleName)
            .collection(collectiveGameData.gamesCollection)
            .orderBy(collectiveGameData.gamesCollectionOrderBy, collectiveGameData.gamesCollectionOrderDirection)
            .limit(collectiveGameData.gamesCollectionOrderLimit)
            .onSnapshot(querySnapshot => {
                const games = []
                querySnapshot.forEach(documentSnapshot => {
                    games.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    })
                })
        
                collectiveGameData.setupGameData(games)
            })
        return () => subscriber()
        }
    }
    /*-----------------*/
    // Returns the collection of console names from firebase
    async function sgFirebaseConsolesCollection(collectiveGameData) {
        const subscriber = sgDB
            .collection(collectiveGameData.collectionName)
            .orderBy(collectiveGameData.consolesCollectionOrderBy, collectiveGameData.consolesCollectionOrderDirection)
            .onSnapshot(querySnapshot => {
                const consoles = []
                querySnapshot.forEach(documentSnapshot => {
                    consoles.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    })
                })
        
                collectiveGameData.setupGameData(consoles)
            })
        return () => subscriber()
    }
    /*-----------------*/
     // Returns the collection of console names from firebase
    async function sgFirebaseGenreCollection(collectiveGameData){
        const subscriber = sgDB
        .collection(collectiveGameData.collectionName)
        .doc(collectiveGameData.tagDoc)
        .collection(collectiveGameData.genresCollection)
        .doc(collectiveGameData.genreName)
        .collection(collectiveGameData.genreSpecificCollection)
        .orderBy(collectiveGameData.genresCollectionOrderBy, collectiveGameData.genresCollectionOrderDirection)
        .onSnapshot(querySnapshot => {
            const genres = []
            querySnapshot.forEach(documentSnapshot => {
                genres.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                })
            })
    
            collectiveGameData.setupGenreData(genres)
        })
    return () => subscriber()
    }
    /*-----------------*/
    ///Buttons for navigating through uploading games process
    function toNewSection(screenName, navigationPass) {
        navigationPass.navigate(screenName)
    }

    function toNewStack(stackName, screenName, navigationPass) {
        navigationPass.navigate(stackName, { screen: screenName })
    }

    function forwardToNextPage(pageNumber, passingContent, navigationPass) {
        navigationPass.navigate(pageNumber, passingContent)
    }

    function backToPreviousPage(navigationPass, stackName) {
        navigationPass.goBack(stackName)
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

    //Limits the number of character that can be used
    function charLimit(string = '', limit = 0) {  
        return string.substring(0, limit)
    }

    // Stylized Back Arrow for going to the previous page
    function backArrow(colorsPassThrough, backNeeded) {
        const backOptionRequired = backNeeded
        const backButtonBackgroundSize = windowController(40, windowHeight)
        const backButtonSpacing = backButtonBackgroundSize - 40
        const backButtonBackgroundPaddingVert = backButtonBackgroundSize / 3.84
        const backButtonForegroundSize = backButtonBackgroundSize / 2
        const backButtonChevronPaddingVert = backButtonBackgroundSize / 1.92
        const backButtonChevronPaddingHor = backButtonBackgroundSize / 4.55
        return (
            <BackButtonContainer>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}> 
                    {backOptionRequired === true
                        ?   <View>
                                <BackButtonTopLayer style={{paddingTop: backButtonBackgroundPaddingVert}}>
                                    <FontAwesomeIcon 
                                        icon={ faCircle } color={colorsPassThrough.primaryFontColor} size={backButtonBackgroundSize}
                                    />
                                </BackButtonTopLayer>
                            </View>
                        :   <View></View>
                    }
                    <BackButtonBottomLayer style={{paddingTop: backButtonChevronPaddingVert, paddingHorizontal: backButtonChevronPaddingHor}}>
                        <FontAwesomeIcon 
                            icon={ faChevronLeft } color={colorsPassThrough.secondaryColor} size={backButtonForegroundSize} 
                        />
                    </BackButtonBottomLayer>
                </View>
            </BackButtonContainer>
        )
    }
    /*----------------------------------------------*/
    //* Validation for email, password, and username

        //*Email Validation
        
            //? Checks for the following criteria:
                //? Starts with one or more characters that are not whitespace or @
                //? Followed by @ symbol
                //? Followed by one or more characters that are not whitespace or @
                //? Followed by a dot
                //? Ends with one or more characters that are not whitespace or @
     

            function validateForgotPasswordEmail(email, emailPassed) {
                const errors = [];

                if (!email) {
                    errors.push('Email is required');
                }

                if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    errors.push('Invalid email format');
                }
                
                if (emailPassed === true) {
                    errors.push('Verification email sent successfully');
                }

                return errors;
            }

            function validateRegisterEmail(email, emailExist) {
                const errors = [];

                if (!email) {
                    errors.push('Email is required');
                }

                if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    errors.push('Invalid email format');
                }

                if (emailExist === true)  {
                    errors.push('This email is already in use')
                } 

                return errors;
            }

            //* Used for updating email (opposed to actually logging the user in)
            function validateLoginEmail(email, userExist, passwordExist) {
                const errors = [];
            
                if (!email) {
                    errors.push('Email is required');
                }
            
                if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    errors.push('Invalid email format');
                } 
                if (userExist === false)  {
                    errors.push('User does not exist')
                } 
                if (passwordExist === false)  {
                    errors.push('Password does not match our records')
                } 

                /*
                    if (userExist === true && passwordExist === null)  {
                        errors.push('Password required')
                    } 
                */
            
                return errors;
            }
            //* ----------------------------//

            function validateNewEmail(newEmail, currentEmail, emailExist) {
                const errors = []
            
                if (!newEmail) {
                    errors.push('Email is required');
                }
            
                if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    errors.push('Invalid email format');
                } 

                if (newEmail === currentEmail) {
                    errors.push('This is your current email');
                }

                if (emailExist === null || emailExist === true)  {
                    errors.push('This email is already in use')
                } 
            
                return errors;
            }
        /*----------------------------------------------*/

        //*Password 
        /*
            Checks for the following criteria:
            At least 8 characters long
            Contains at least one digit (0-9)
            Contains at least one lowercase letter (a-z)
            Contains at least one uppercase letter (A-Z)
            Contains at least one special character (!@#$%^&*()_+)
        */
            function validateRegisterPassword(password, confirmPassword) {
                const errors = [];  

                if (password.length < 8) {
                    errors.push('Password must be at least 8 characters long');
                }
            
                if (!password.match(/[a-z]/)) {
                    errors.push('Password must contain at least one lowercase letter');
                }
            
                if (!password.match(/[A-Z]/)) {
                    errors.push('Password must contain at least one uppercase letter');
                }
            
                if (!password.match(/\d/)) {
                    errors.push('Password must contain at least one digit');
                }
            
                if (!password.match(/[!@#$%^&*()_+]/)) {
                    errors.push('Password must contain at least one special character');
                }

                if (password !== confirmPassword) {
                    errors.push('Passwords do not match');
                }

                return errors;
            }

            function validatePassword(password) {
                const errors = [];
                
                if (password.length < 8) {
                    errors.push('Password must be at least 8 characters long');
                }
                
                if (!password.match(/[a-z]/)) {
                    errors.push('Password must contain at least one lowercase letter');
                }
                
                if (!password.match(/[A-Z]/)) {
                    errors.push('Password must contain at least one uppercase letter');
                }
                
                if (!password.match(/\d/)) {
                    errors.push('Password must contain at least one digit');
                }
                
                if (!password.match(/[!@#$%^&*()_+]/)) {
                    errors.push('Password must contain at least one special character');
                }
                
                return errors;
            }

            function validateNewPassword(newPassword, confirmNewPassword) {
                const errors = [];
                
                if (!newPassword || !confirmNewPassword) {
                    errors.push('Password is required');
                }

                if (newPassword.length < 8 || confirmNewPassword.length < 8) {
                    errors.push('Password must be at least 8 characters long');
                }

                if (!newPassword.match(/[a-z]/) || !confirmNewPassword.match(/[a-z]/)) {
                    errors.push('Password must contain at least one lowercase letter');
                }

                if (!newPassword.match(/[A-Z]/) || !confirmNewPassword.match(/[A-Z]/)) {
                    errors.push('Password must contain at least one uppercase letter');
                }

                if (!newPassword.match(/\d/) || !confirmNewPassword.match(/\d/)) {
                    errors.push('Password must contain at least one digit');
                }

                if (!newPassword.match(/[!@#$%^&*()_+]/) || !confirmNewPassword.match(/[!@#$%^&*()_+]/)) {
                    errors.push('Password must contain at least one special character');
                }

                return errors;
            }
        //*----------------------------------------------*/

        //*Username
        
            //? Checks for the following criteria:
                //? Contains no profanity
                //? Contains no longer than 30 characters
                //? Contains at least 6 characters
                //? Checks whether the new username is the same as the current username
                //? Checks whether the new username is already in use

        function validateNewUsername(username, currentUser, usernameExist) {
            const errors = [];

            for (const word of bannedWords) {
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                if (regex.test(username)) {
                    const maskedWord = word.replace(/./g, '*'); // Replace each character with an asterisk
                    const maskedUsername = username.replace(regex, maskedWord);
                    errors.push(`Username contains profanity. Please choose a different username: ${maskedUsername}`);
                }
            }

            if (!username) {
                errors.push('Username is required');
            }
            
            if (username.length > 30) {
                errors.push('Username must be no longer than 30 characters.');
            }

            if (username.length < 6) {
                errors.push('Username must be at least 6 characters.');
            }

            if (username === currentUser) {
                errors.push('This is your current username');
            }

            if (usernameExist === null || usernameExist === true)  {
                errors.push('This username is already in use')
            } 

            return errors;
        }
        //*----------------------------------------------*/

    //*----------------------------------------------*/

    //* Loading Screen
    function preLoadedData(loadingScreenText, loadingScreenTextColor, loaderColor) {
        return (
            <ContentContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="small" color={loaderColor} />
                <MainFont style={{color: loadingScreenTextColor}}>{loadingScreenText}</MainFont>
            </ContentContainer>
        )
    }
    //*----------------------------------------------*/
    useEffect(() => {
        const auth = getAuth();
        console.log("🚀 ~ file: authContext.js:1003 ~ useEffect ~ auth:", auth)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'SET_USER', payload: { currentUID: user.uid, currentUser: user } })
                setCurrentUser(user)
                setCurrentUID(user.uid)
            } else {
                dispatch({ type: 'CLEAR_USER', payload: { currentUID: null, currentUser: null } });
            }
        })
    
        return unsubscribe
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
        updateEmailAuth,
        updatePasswordAuth,
        updateUsernameAuth,
        reauthenticateUser,
        firebaseReauthenticateViaEmail,
        sendVerificationCode,
        displayData,
        getGameDataSpotlight,
        displayTopNewlyData,
        getGameData,
        addGameToConsoleButtonGroup,
        addGameToConsole,
        addGameToSearchConsole,
        deleteGameFromConsole,
        sgFirebaseGamesCollectionSubGenre,
        sgFirebaseConsolesCollection,
        sgFirebaseGenreCollection,
        addImagesForGame,
        addCommentsForGame,
        addGenreTagsForGame,
        addDescriptionTagsForGame,
        addUserDataUsers,
        updateUsernameFirestore,
        updateUserEmailFirestore,
        updateUserIconFirestore,
        updateGameViewCount,
        updateGameViewCountReset,
        deleteData,
        getUsername,
        entries,
        viewCountFirebase,
        toNewSection,
        toNewStack,
        forwardToNextPage,
        backToPreviousPage,
        successAlert,
        failureAlert,
        unixTimestampConverter,
        charLimit,
        backArrow,
        validateForgotPasswordEmail,
        validateRegisterEmail,
        validateLoginEmail,
        validateNewEmail,
        validateRegisterPassword,
        validatePassword,
        validateNewPassword,
        validateNewUsername,
        preLoadedData
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}