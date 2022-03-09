import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { firebase } from 'server/config/config'
import {
  CustomFailureAlert,
  CustomFailureAlertFont,
  CustomSuccessAlert,
  CustomSuccessAlertFont,
  TouchableButton,
  TouchableButtonAlt,
  TouchableButtonFont,
  TouchableButtonFontAlt
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

    const randomString = (n, r='') => {
        while (n--) r += String.fromCharCode((r=Math.random()*62|0, r+=r>9?(r<36?55:61):48))
        return r
    }
    

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
            setError(`${err}`)
          })
    }

    function deleteAccountDb(userId) {
        return sgDB.collection("users").doc(userId).delete().then(() => {
            console.log("User successfully deleted!")
        }).catch((err) => {
          setError(`${err}`)
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
        const sgGameCover = buttonGroupData.passingContent.gameCover
        const sgFirebaseConsoleName = buttonGroupData.passingContent.firebaseConsoleName
        const sgFirebaseStorageConsoleName = buttonGroupData.passingContent.firebaseStorageConsoleName
        const sgGameDevelopers = buttonGroupData.passingContent.gameDevelopers
        const sgGameGenre = buttonGroupData.passingContent.gameGenre
        const sgGameModes = buttonGroupData.passingContent.gameModes
        const sgGameName = buttonGroupData.passingContent.gameName
        const sgGameNameBRZ = buttonGroupData.passingContent.gameNameBRZ
        const sgGameNameEUR = buttonGroupData.passingContent.gameNameEUR
        const sgGameNameJPN = buttonGroupData.passingContent.gameNameJPN
        const sgGamePublishers = buttonGroupData.passingContent.gamePublishers
        const sgGameRating = buttonGroupData.passingContent.gameRating
        const sgGameReleaseDate = buttonGroupData.passingContent.gameReleaseDate
        const sgGameScreenshots = buttonGroupData.passingContent.gameScreenshots
        const sgGameSlug = buttonGroupData.passingContent.gameSlug
        const sgGameSubGenre = buttonGroupData.passingContent.gameSubGenre
        const sgGameSummary = buttonGroupData.passingContent.gameSummary
        const sgUploadImageurl = buttonGroupData.imageContent.uploadImageurl
        const sgFolderName = buttonGroupData.imageContent.folderName
        const sgConsoleNameFolder = buttonGroupData.imageContent.consoleNameFolder
        const sgGameNameFolder = buttonGroupData.imageContent.gameNameFolder
        const sgSubFolderName = buttonGroupData.imageContent.subFolderName
        const sgCoverArtFolder = buttonGroupData.imageContent.coverArtFolder
        const sgScreenshotFolder = buttonGroupData.imageContent.screenshotFolder
        const sgCoverArtFileName = buttonGroupData.imageContent.coverArtFileName
        const sgFileType = buttonGroupData.imageContent.fileType
        const sgCurrentUID = currentUID
        const passingContent = {
            sgGameName: sgGameName,
            sgGameNameBRZ: sgGameNameBRZ,
            sgGameNameEUR: sgGameNameEUR,
            sgGameNameJPN: sgGameNameJPN,
            sgGameDevelopers: sgGameDevelopers,
            sgGamePublishers: sgGamePublishers,
            sgGameReleaseDate: sgGameReleaseDate,
            sgGameSummary: sgGameSummary,
            sgGameGenre: sgGameGenre,
            sgGameSubGenre: sgGameSubGenre,
            sgGameModes: sgGameModes,
            sgGameRating: sgGameRating, 
            sgGameCover: sgGameCover,
            sgGameScreenshots: sgGameScreenshots,
            sgGameSlug: sgGameSlug,
            sgConsoleName: sgConsoleName,
            sgFirebaseConsoleName: sgFirebaseConsoleName,
            sgFirebaseStorageConsoleName: sgFirebaseStorageConsoleName,
            sgPostCreator:  sgCurrentUID,
        }
        const imageContent = {
            sgUploadImageurl,
            sgFolderName,
            sgConsoleNameFolder,
            sgSubFolderName,
            sgGameNameFolder,
            sgCoverArtFolder,
            sgScreenshotFolder,
            sgCoverArtFileName,
            sgGameCover,
            sgGameScreenshots,
            sgFileType
         }
        

        function pathToUploadViaFirebase() {
            setTimeout(() => {
                addGameToConsole(passingContent),
                imageCapture(imageContent)
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
                <TouchableButtonAlt style={{}} onPress={() => buttonGroupData.backToPreviousPage(buttonGroupData.navigationPass)}>
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

    // Add Game to sgDB
    async function addGameToConsole(passingContent) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        sgDB.collection('sgAPI').doc(passingContent.sgFirebaseConsoleName).collection('games').doc(passingContent.sgGameSlug).set({
            sgID: complexID(20),
            gameName: passingContent.sgGameName,
            gameNameBRZ: passingContent.sgGameNameBRZ,
            gameNameEUR: passingContent.sgGameNameEUR,
            gameNameJPN: passingContent.sgGameNameJPN,
            gameDevelopers: passingContent.sgGameDevelopers,
            gamePublishers: passingContent.sgGamePublishers,
            gameReleaseDate: passingContent.sgGameReleaseDate,
            gameSummary: passingContent.sgGameSummary,
            gameGenre: passingContent.sgGameGenre,
            gameSubGenre: passingContent.sgGameSubGenre,
            gameModes: passingContent.sgGameModes,
            gameRating: passingContent.sgGameRating, 
            gameCover: passingContent.sgGameCover,
            gameScreenshots: passingContent.sgGameScreenshots,
            gameSlug: passingContent.sgGameSlug,
            postCreator: passingContent.sgPostCreator,
            gameUploaded: true,
            createdAt: timestamp,
            views: viewCountFirebase
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
    }

    async function imageCapture(imageContent) {
        const uploadImageurl = imageContent.sgUploadImageurl
        const folderName = imageContent.sgFolderName
        const consoleNameFolder = imageContent.sgConsoleNameFolder
        const subFolderName = imageContent.sgSubFolderName
        const gameNameFolder = imageContent.sgGameNameFolder
        const coverArtFolder = imageContent.sgCoverArtFolder
        const screenshotFolder = imageContent.sgScreenshotFolder
        const coverArtFileName = imageContent.sgCoverArtFileName
        const gameCover = imageContent.sgGameCover
        const gameScreenshots = imageContent.sgGameScreenshots
        const fileType = imageContent.sgFileType
        const coverArtFileRoute = `${folderName}/${consoleNameFolder}/${subFolderName}/${gameNameFolder}/${coverArtFolder}/${gameCover}.${fileType}`
        const screenshotFileROute = `${folderName}/${consoleNameFolder}/${subFolderName}/${gameNameFolder}/${screenshotFolder}/${gameScreenshots}.${fileType}`

        fetch(uploadImageurl)
            .then(res => {
                return res.blob()
            })
            .then(blob => {
                //uploading blob to firebase storage
                firebase.storage().ref().child(filename).put(blob).then(function(snapshot) {
                    return snapshot.ref.getDownloadURL()
                })
                .then(url => {
                console.log("Firebase storage image uploaded : ", url) 
                }) 
            })
            .catch(error => {
            console.error(error)
            })
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

    //Limits the number of character that can be used
    function charLimit(string = '', limit = 0) {  
        return string.substring(0, limit)
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
        addGameToConsoleButtonGroup,
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
        toNewSection,
        toNewStack,
        forwardToNextPage,
        backToPreviousPage,
        successAlert,
        failureAlert,
        unixTimestampConverter,
        charLimit
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}