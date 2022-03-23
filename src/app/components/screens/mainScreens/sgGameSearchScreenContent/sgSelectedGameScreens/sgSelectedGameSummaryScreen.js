
import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import {
    confirmGameContext,
    CurrentThemeContext,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    windowHeight,
} from 'index'
import axios from 'axios'

export default function SgSelectedGameSummaryScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage,
        charLimit
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const [isLoading, setIsLoading] = useState()
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
        gameScreenshots,
        gameScreenshot1,
        gameScreenshot2,
        gameScreenshot3,
        gameSummary,
        gameSlug
    } = route.params

    // IGDB search data (Put on confirmation page)
    const [adminUser, setAdminUser] = useState(true)
    const [firebaseCoverUrl, setFirebaseCoverUrl] = useState('')
    const [firebaseScreenshot1Url, setFirebaseScreenshot1Url] = useState('')
    const [firebaseScreenshot2Url, setFirebaseScreenshot2Url] = useState('')
    const [firebaseScreenshot3Url, setFirebaseScreenshot3Url] = useState('')
    const [coverUrl, setCoverUrl] = useState(`https://images.igdb.com/igdb/image/upload/t_1080p/${gameCover}.jpg`)
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
    const [updatedGameSummary, setUpdatedGameSummary] = useState(gameSummary)
    const [chosenPublishersArray, setChosenPublishersArray] = useState([])
    const [chosenDevelopersArray, setChosenDevelopersArray] = useState([])
    const igdbCompaniesURL = 'https://api.igdb.com/v4/companies'
    const igdbCompaniesResultsField = `fields country,name; where id =`
    const axiosTimeout = {timeout: 2000}
    const pageDescription = `What is ${gameName} about, exactly?`
    const [nextPageNumber, setNextPageNumber] = useState('Page6')
    const passingImageData = {
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
        fileType,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        setFirebaseCoverUrl,
        setFirebaseScreenshot1Url,
        setFirebaseScreenshot2Url,
        setFirebaseScreenshot3Url
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
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers: chosenPublishersArray,
        gameRating,
        gameReleaseDate,
        gameSlug,
        gameSummary: updatedGameSummary
    }
    console.log("🚀 ~ file: sgSelectedGameSummaryScreen.js ~ line 56 ~ SgSelectedGameSummaryScreen ~ passingContent", passingContent)
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
            let gamePubParams = []
            let gameDevParams = []
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                    gamePublishers.map(item => gamePubParams.push(
                        api.post(igdbCompaniesURL, `${igdbCompaniesResultsField}(${item});`, axiosTimeout)
                            .then(res => {
                                setChosenPublishersArray(gamePublishersNameInfo => [...gamePublishersNameInfo, res.data])
                            }, [])
                            .catch(err => {
                                console.log(err)
                            })
                            .then(function () {
                                // always executed
                            })
                    )),
                    gameDevelopers.map(item => gameDevParams.push(
                        api.post(igdbCompaniesURL, `${igdbCompaniesResultsField}(${item});`, axiosTimeout)
                            .then(res => {
                                setChosenDevelopersArray(gameDevelopersNameInfo => [...gameDevelopersNameInfo, res.data])
                            }, [])
                            .catch(err => {
                                console.log(err)
                            })
                            .then(function () {
                                // always executed
                            }) 
                    )),
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