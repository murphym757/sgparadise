import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
// React Navigation
import { useIsFocused } from '@react-navigation/native'
import {
    confirmGameContext,
    firebase,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    windowHeight
} from 'index'
  
export default function SgSelectedGameConfirmationScreen({route, navigation}) {
    const {
        addGameToConsoleButtonGroup,
        backToPreviousPage,
        currentUID,
        imageCapture,
        toNewStack
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
    const [isLoading, setIsLoading] = useState()
    
    const { 
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameGenre,
        gameModes,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameScreenshot1,
        gameScreenshot2,
        gameScreenshot3,
        gameSlug,
        gameSubGenre,
        gameSummary
    } = route.params
  
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [gameUploaded, setGameUploaded] = useState(false)
    const pageDescription = `Here is all the information about ${gameName}. Is there anything you would like to change?`
    const stackName = 'Game'
    const screenName = 'sgUserStackNavbar'


     // For Image Image Uploads
     const [coverUrl, setCoveUrl] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameCover}.jpg`)
     const [screenshot1Url, setScreenshot1Url] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameScreenshot1}.jpg`)
     const [screenshot2Url, setScreenshot2Url] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameScreenshot2}.jpg`)
     const [screenshot3Url, setScreenshot3Url] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameScreenshot3}.jpg`)
     const [folderName, setFolderName] = useState('images')
     const [consoleNameFolder, setConsoleNameFolder] = useState(firebaseStorageConsoleName)
     const [subFolderName, setSubFolderName] = useState('Uploaded Games')
     const [gameNameFolder, setGameNameFolder] = useState(gameSlug)
     const [coverArtFolder, setCoverArtFolder] = useState('coverArt')
     const [screenshotFolder, setScreenshotFolder] = useState('screenshots')
     const [coverArtFileName, setCoverArtFileName] = useState(`${gameSlug}-(coverArt)`)
     const [screenshotFileName, setScreenshotFileName] = useState(`${gameSlug}-(screenshot)`)
     const [fileType, setFileType] = useState(coverUrl.slice(-3))
     const imageContent = {
        coverUrl,
        screenshot1Url,
        screenshot2Url,
        screenshot3Url,
        folderName,
        consoleNameFolder,
        subFolderName,
        gameNameFolder,
        coverArtFolder,
        screenshotFolder,
        coverArtFileName,
        screenshotFileName,
        fileType
     }
    const confirmationPage = true
    const passingContent = {
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers: gameDevelopers.map(game => game[0].name),
        gameGenre,
        gameModes: gameModes.map(game => game.tagName),
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers: gamePublishers.map(game => game[0].name),
        gameRating, 
        gameReleaseDate,
        gameScreenshot1,
        gameScreenshot2,
        gameScreenshot3,
        gameSlug,
        gameSubGenre,
        gameSummary,
        gameUploadedBy: currentUID
    }
    console.log("🚀 ~ file: sgSelectedGameConfirmationScreen.js ~ line 80 ~ SgSelectedGameConfirmationScreen ~ passingContent", passingContent)
    
    const navigationPass = navigation
    let tagArrayData = {
        pageDescription
    }
    const buttonGroupData = {
        toNewStack, 
        backToPreviousPage, 
        imageContent,
        stackName,
        screenName,
        passingContent, 
        navigationPass
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
      }, [isFocused])

    return (
        <PageContainer>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {confirmGame.gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, confirmationPage, undefined)}
                    {addGameToConsoleButtonGroup(buttonGroupData)}
                </View>
            }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}