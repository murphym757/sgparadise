import React, { useState, useEffect, useContext } from 'react'
import { View, Button, FlatList, TouchableOpacity } from 'react-native'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { loadingScreen } from 'auth/loadingScreen'
import {
    ContentContainer,
    SafeAreaViewContainer,
    ScrollViewContainer,
    CurrentThemeContext,
    Container,
    MainFont,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
} from 'index'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { sgDB, sgImageStorage, currentUser, 
        currentUID, displayData,
        addData,
        /*--------*/ 
        addGameToConsole, 
        deleteGameFromConsole,
        toNewSection,
        entries, stateTest, logOut } = useAuth()
    const { 
        searchBar,  
        gamesFilterListName,
        testDb,
        } = useSearchBar()
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [consoleName, setConsoleName] = useState('sgGenesis')
    const [gamesCollection, setGamesCollection] = useState('games')
    const [gameName, setGameName] = useState('tiny-toon-adventures-busters-hidden-treasure')
    // For Search Bar
    const [searchType, setSearchType] = useState('sgIGDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const chosenDb = testDb

    // For Image Image Uploads
    const [uploadImageurl, setImageurl] = useState('https://images.igdb.com/igdb/image/upload/t_1080p/co4erc.jpg')
    const [folderName, setFolderName] = useState('images')
    const [subFolderName, setSubFolderName] = useState('boxArtImage')
    const [fileName, setFileName] = useState(`tester`)
    const [fileType, setFileType] = useState(uploadImageurl.slice(-3))

    // For Referencing Images
    const sgImageStorageRef = sgImageStorage.ref()
    const [profileImageUrl, setProfileImageUrl] = useState('')

    const [gamesArray1, setGamesArray1] = useState([])
    gamesArray1.forEach(obj => {
        obj.color = 'white'}
    )
    const [fullGamesArray1, setFullGamesArray1] = useState([])

    const navigationPass = navigation
    const toGameData = {
        navigationPass,
        nextPage: 'sgGamePage'
    }
    const toConsoleList = {
        navigationPass,
        nextPage: 'SgAddGameConfirm'
    }

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false),
                    foundCoverData(),
                    //imageCapture(uploadImageurl, folderName, consoleName, gameName, subFolderName, fileName, fileType)
                    )
              }, 2000)
              getGameDataPlatformers()
            }, [])
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
        if(currentUID !== undefined) 
            return 
                displayData(collectionName)
               
    }, [isFocused])

    async function getGameDataPlatformers() {
        let platformerGames = []
        const gameRef = sgDB.collection('sgAPI').doc('sgGenesis').collection('games').orderBy('gameRating', 'desc').limit(5)
        const snapshot = await gameRef.where('gameSubgenre', '==', 'Beat ‘em Up').get()
        if (snapshot.empty) {
            console.log('No matching documents.')
        return
        }  
        snapshot.forEach(doc => {
            platformerGames.push(doc.data())
        });
        setGamesArray1(platformerGames)
    }

    function imageCatcher(item) {
        const initialFolderName = 'images'
        const consoleFolderName = 'sgGen'
        const UploadedFolderName = 'Uploaded Games'
        const gameNameFolderName = item.gameSlug
        const secondaryImageTypeFolderName = 'coverArt'
        const imagesRef = sgImageStorageRef.child(`${initialFolderName}/${consoleFolderName}/${UploadedFolderName}/${gameNameFolderName}/${secondaryImageTypeFolderName}/${gameNameFolderName}-(${secondaryImageTypeFolderName}).jpg`)
        imagesRef.getDownloadURL()
        .then((url) => {
            setFullGamesArray1(...gamesArray1, url)
            console.log(url)
            //from url you can fetched the uploaded image easily
            setProfileImageUrl(url)
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e))
    }

    function setPlatformersCover(item) {
        imageCatcher(item)
    }

    function foundCoverData() {
        gamesArray1.forEach(setPlatformersCover)
     }

    function platformersList() {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={gamesArray1}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <View>
                    <TouchableOpacity onPress={() => toNewSection(toGameData.nextPage, toGameData.navigationPass)}>
                        <MainFont>{item.gameName}</MainFont>
                        <MainFont>{item.gameReleaseDate}</MainFont>
                        <MainFont>{item.gameGenre}</MainFont>
                    </TouchableOpacity>
                </View>
                )}
            />
        )
    }

    function searchResults() {
        return (
              <FlatList
                  data={gamesFilterListName(chosenDb)}
                  keyboardShouldPersistTaps="always" 
                  contentContainerStyle={{
                      justifyContent: 'center'
                  }}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'column',
                        flex: 1
                    }}>
                        <TouchableOpacity onPress={() => chosenGame(item)}>
                           <MainFont>{item.name}</MainFont>
                        </TouchableOpacity>
                    </View>
                  )}
              />
          ) 
    }

    function confirmViewGames() {
        navigation.navigate('SgConsoleList',{
            searchType: searchType
        })
    }

    function confirmAddNewGame(){
        navigation.navigate('SgAddGameConfirm')
    }


    
  return (
    <SafeAreaViewContainer>
    {isLoading !== true 
        ?   <Container>
                {searchBar(searchBarTitle, searchType, searchQuery)}
                <ScrollViewContainer>
                {searchResults()}
                {platformersList()}
                    {currentUser !== null
                        ?   <View>
                                <TouchableButton onPress={() => toNewSection(toConsoleList.nextPage, toConsoleList.navigationPass)}>
                                    <TouchableButtonFont>Add Game</TouchableButtonFont>
                                </TouchableButton>
                                <TouchableButton onPress={() => confirmViewGames()}>
                                    <TouchableButtonFont>View All Games</TouchableButtonFont>
                                </TouchableButton>
                                    <Button title="Tag Editor" onPress={() => addGameToConsole(collectionName, consoleName, gamesCollection, gameName)}/>
                                    <GeneralFontColor>Logged In</GeneralFontColor>
                                    <GeneralFontColor>{stateTest}</GeneralFontColor>
                                    <GeneralFontColor>{userInfo}</GeneralFontColor>
                                    {React.Children.toArray(entries.map((entry, i) => <MainFont>{entry.id}</MainFont>))}
                                    <Button title="Delete Game" onPress={() => deleteGameFromConsole(collectionName, consoleName, gamesCollection, gameName)}/>
                            </View>
                        :   <View>
                                <GeneralFontColor>Not Logged In</GeneralFontColor>
                                <GeneralFontColor onPress={() => navigation.navigate('SgAddGameConfirm',{ itemId: 86})}>
                                    TO Games
                                </GeneralFontColor>
                                <TouchableButton
                                    onPress={() => navigation.navigate('Auth', { screen: 'sgAuthStack' })}>
                                    <TouchableButtonFont>Log in</TouchableButtonFont>
                                </TouchableButton>
                            </View>
                    }
                    </ScrollViewContainer>
            </Container>
        :   <ContentContainer>
                {loadingScreen()}
            </ContentContainer>
    }
    </SafeAreaViewContainer>
  )
}