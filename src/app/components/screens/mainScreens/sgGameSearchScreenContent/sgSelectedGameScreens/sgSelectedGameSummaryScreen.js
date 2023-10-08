
import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useAuth } from 'auth/authContext'
import { axiosSearchContext } from 'main/sgGameSearchScreenContent/axiosSearchContext'
import { confirmGameContext } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameContext'
import { CurrentThemeContext, PageContainer, SafeAreaViewContainer, windowHeight } from 'index'
import axios from 'axios'

export default function SgSelectedGameSummaryScreen({route, navigation}) {
    const {
        backToPreviousPage,
        charLimit,
        forwardToNextPage,
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const [isLoading, setIsLoading] = useState()
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const searchAxios = useContext(axiosSearchContext)
    const { 
        accessTokenIGDB,
        clientIdIGDB,
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameId,
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
        gameScreenshots,
        gameSlug,
        gameSummary,
        imagesChosen
    } = route.params
    
    const [adminUser, setAdminUser] = useState(true)
    const [chosenDevelopersArray, setChosenDevelopersArray] = useState([])
    const [chosenPublishersArray, setChosenPublishersArray] = useState([])
    const [coverArtFileName, setCoverArtFileName] = useState(`${gameSlug}-(coverArt)`)
    const [coverArtFolder, setCoverArtFolder] = useState('coverArt')
    const [coverUrl, setCoverUrl] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameCover}.jpg`)
    const [fileType, setFileType] = useState(coverUrl.slice(-3))
    const [firebaseCoverUrl, setFirebaseCoverUrl] = useState('')
    const [firebaseScreenshot1Url, setFirebaseScreenshot1Url] = useState('')
    const [firebaseScreenshot2Url, setFirebaseScreenshot2Url] = useState('')
    const [firebaseScreenshot3Url, setFirebaseScreenshot3Url] = useState('')
    const [folderName, setFolderName] = useState('images')
    const [gameNameFolder, setGameNameFolder] = useState(gameSlug)
    const [gameNameImageCount, setGameImageCount] = useState(imagesChosen) 
    const [nextPageNumber, setNextPageNumber] = useState('Page6')
    const [screenshot1Url, setScreenshot1Url] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameScreenshot1}.jpg`)
    const [screenshot2Url, setScreenshot2Url] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameScreenshot2}.jpg`)
    const [screenshot3Url, setScreenshot3Url] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameScreenshot3}.jpg`)
    const [screenshotFileName, setScreenshotFileName] = useState(`${gameSlug}-(screenshot)`)
    const [screenshotFolder, setScreenshotFolder] = useState('screenshots')
    const [sortedGameName, setSortGameName] = useState(gameSlug.slice(0, 2))
    const [subFolderName, setSubFolderName] = useState('Uploaded Games')
    const [updatedGameSummary, setUpdatedGameSummary] = useState(gameSummary)
    const pageDescription = `What is ${gameName} about, exactly?`
    console.log("🚀 ~ file: sgSelectedGameSummaryScreen.js:76 ~ SgSelectedGameSummaryScreen ~ gameNameImageCount", gameNameImageCount)
    const passingImageData = {
        coverArtFileName,
        coverArtFolder,
        coverUrl,
        fileType,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        firebaseStorageConsoleName,
        folderName,
        gameNameFolder,
        gameNameImageCount,
        screenshot1Url,
        screenshot2Url,
        screenshot3Url,
        screenshotFileName,
        screenshotFolder,
        setFirebaseCoverUrl,
        setFirebaseScreenshot1Url,
        setFirebaseScreenshot2Url,
        setFirebaseScreenshot3Url,
        sortedGameName,
        subFolderName
    }
    const passingContent = {
        adminUser,
        consoleName,
        firebaseConsoleName,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers: chosenDevelopersArray,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameImageCount,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers: chosenPublishersArray,
        gameRating,
        gameReleaseDate,
        gameSlug,
        gameSummary: updatedGameSummary
    }
    const navigationPass = navigation
    const buttonGroupData = {
        backToPreviousPage, 
        charLimit,
        forwardToNextPage, 
        navigationPass,
        nextPageNumber, 
        pageDescription,
        passingContent
    }

    useEffect(() => {
        function searchTesting() {
            confirmGame.coverImageCapture(passingImageData),
            confirmGame.screenshotUpload(passingImageData)
            let api = axios.create({
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': clientIdIGDB,
                    'Authorization': `Bearer ${accessTokenIGDB}`
                }
            })
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(
                        searchAxios.findPublishersName(api, gamePublishers, setChosenPublishersArray),
                        searchAxios.findDevelopersName(api, gameDevelopers, setChosenDevelopersArray),
                        setIsLoading(false),
                        setUpdatedGameSummary(charLimit(gameSummary, 500))
                    )
                    if (gameScreenshots == 0) {
                        return setNextPageNumber('Page6')
                    } else {
                        return nextPageNumber
                    }
                }, 2000)
            })
        }

        async function sgLoader() {
            await searchTesting()
        }
        sgLoader()
    }, [])

    return (
        <PageContainer>
            <SafeAreaViewContainer>
                {isLoading == undefined
                    ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    : <View>
                        {confirmGame.gameSummaryResults(buttonGroupData, updatedGameSummary, setUpdatedGameSummary, windowHeight, colors)}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}