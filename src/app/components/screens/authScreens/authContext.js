import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { firebase } from 'server/config/config'
import {
    BackButtonContainer,
    BackButtonBottomLayer,
    BackButtonTopLayer,
    Container,
    CustomFailureAlert,
    CustomFailureAlertFont,
    CustomSuccessAlert,
    CustomSuccessAlertFont,
    faChevronLeft,
    faCircle,
    FontAwesomeIcon,
    TouchableButton,
    TouchableButtonAlt,
    TouchableButtonFont,
    TouchableButtonFontAlt,
    windowController,
    windowHeight,
    windowWidth
} from 'index'

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

    function signUp(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
    }

    function deleteAccountAuth() {
        return auth.currentUser.delete().then(() => {
            navigation.navigate('Home')
          }).catch((err) => {
            setError(`${err}`)
          })
    }

    function deleteAccountDb(userId) {
        return sgDB.collection("users").doc(userId).delete().then(() => {
        }).catch((err) => {
          setError(`${err}`)
        })
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
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

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateProfile(newUsername) {
        return currentUser.updateProfile({
            displayName: newUsername,
          }).then(() => {
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }

    function reauthenticateUser(email, userProvidedPassword, reDirect) {
        const user = currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            email, 
            userProvidedPassword
        );
        // Now you can use that to reauthenticate
        user.reauthenticateWithCredential(credential).then(
            reDirect,
            logOut()
            );
    }

    function displayData(collectionName) {
        return sgDB.collection(collectionName)
        .get().then((querySnapshot) => {
            const newEntries = []
            querySnapshot.forEach((doc) => {
                const entry = doc.data()
                entry.id = doc.id
                newEntries.push(entry)
            })
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
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        sgDB.collection('sgUsers').doc(userID).set({
            id: userID,
            email:userEmail,
            createdAt: timestamp
        })
    }
    // Add new Document to already existing User Data sgUsers (on Cloud Firestore)
    async function updateUsernameFirestore(userID, newUsername) {
        sgDB.collection('sgUsers').doc(userID).update({
            userName: newUsername
        })
    }
    // Update User Data sgUsers (on Cloud Firestore)
    async function updateUserEmailFirestore(userID, userEmail) {
        sgDB.collection('sgUsers').doc(userID).update({
            email:userEmail
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

    // Gets General Game Data
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
                <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center' }}> 
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

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateProfile(newUsername) {
        return currentUser.updateProfile({
            displayName: newUsername,
          }).then(() => {
          }).catch((error) => {
            // An error occurred
            // ...
          });
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
        updateProfile,
        reauthenticateUser,
        displayData,
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
        updateGameViewCount,
        updateGameViewCountReset,
        deleteData,
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
        backArrow
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}