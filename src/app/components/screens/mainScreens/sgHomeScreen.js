import React, { useState, useEffect, useContext } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image, 
    FlatList, 
    SafeAreaView, 
    TouchableOpacity 
} from 'react-native'
import axios from 'axios'
import { useAuth } from '../authScreens/authContext'
import { useSearchBar } from './sgGameSearchScreenContent/searchIndex'

import { firebase } from '../../../../server/config/config';

import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling & Screens
import {
    SearchBar,
    AddGameScreen,
    ConfirmAddGameScreen,
    SgConsoleListScreen,
    ContentContainer,
    SafeAreaViewContainer,
    ScrollViewContainer,
    CurrentThemeContext,
    Container,
    MainFont,
    GeneralFontColor,
    MainHeadingButton,
    TouchableButton,
    TouchableButtonFont,
    FontAwesomeIcon,
    faStar,
    faBook,
    faFistRaised,
    faLayerGroup,
    faPuzzlePiece,
    faFlagCheckered,
    faShieldAlt,
    faCrosshairs,
    faMap,
    faBasketballBall
} from '../index.js'


// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { sgDB, sgImageStorage, currentUser, 
        currentUID, displayData,
        addData,
        getGameData,
        //For Images
        imageCapture,
        /*--------*/ 
        addGameToConsole, 
        deleteGameFromConsole,
        updateGameViewCount,
        addImagesForGame,
        addCommentsForGame,
        addGenreTagsForGame,
        addDescriptionTagsForGame,
        deleteData, viewCountFirebase,
        entries, stateTest, logOut } = useAuth()
    const { 
        searchBar,  
        gameName, 
        gamesFilterListName,
        testDb,
        } = useSearchBar()
    const [error, setError] = useState('')
    const colors = useContext(CurrentThemeContext)
    const [addGame, setGame] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [entities, setEntities] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [testData, setTestData] = useState('')
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [consoleName, setConsoleName] = useState('sg1000')
    const [gamesCollection, setGamesCollection] = useState('games')
    //const [gameName, setGameName] = useState('tinyToon')
    const [imagesCollection, setImagesCollection] = useState('images')
    const [commentsCollection, setCommentsCollection] = useState('comments')
    const [tagsCollection, setTagsCollection] = useState('tags')
    const genreTagsTitle = 'Genre'
    const descriptionTagsTitle = 'Description'
    const [descriptionTagsData, setDescriptionTagsData] = useState([
        "Great Soundtrack",
        "Multiplayer",
        "Co-op",
        "Story Rich",
        "Pick up and play",
    ])

    const [docName, setDocName] = useState('bscOg6nL1akXjGIpk1oz')
    const [secondaryCollectionName, setSecondaryCollectionName] = useState('games')
    const [secondaryDocName, setSecondaryDocName] = useState('bscOg6nL1akXjGIpk1oz')
    const [objectName, setObjectName]= useState('newTest')

    // For Search Bar
    const [searchType, setSearchType] = useState('sgDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const chosenDb = testDb

    // For Image Image Uploads
    const [uploadImageurl, setImageurl] = useState('https://upload.wikimedia.org/wikipedia/en/7/79/Tiny_Toon_Adventures_MegaDrive_PAL.jpg')
    const [folderName, setFolderName] = useState('images')
    const [subFolderName, setSubFolderName] = useState('boxArtImage')
    const [fileName, setFileName] = useState(`${gameName}boxArt`)
    const [fileType, setFileType] = useState(uploadImageurl.slice(-3))

    // For Referencing Images
    const sgImageStorageRef = sgImageStorage.ref()
    const imagesRef  = sgImageStorageRef.child('images/tinyToon/boxArtImage/tinyToonboxArt.jpg')
    const imagesRef2  = sgImageStorageRef.child('images/tinyToon/boxArtImage/Vice-city-cover.jpg')
    const sgGameImages = [imagesRef, imagesRef2]
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileImageUrl2, setProfileImageUrl2] = useState('')

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false),
                    imageCatcher(),
                    //imageCapture(uploadImageurl, folderName, consoleName, gameName, subFolderName, fileName, fileType)
                    )
              }, 2000)
            })
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
        if(currentUID !== undefined) 
            return 
                displayData(collectionName),
                // This function will run as many times as the app renders, the function runs twice here
                updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) 
               
    })

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

    function imageCatcher() {
        return imagesRef 
        .getDownloadURL()
        .then((url) => {
            //from url you can fetched the uploaded image easily
            setProfileImageUrl(url),
            setProfileImageUrl2(url)
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
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
                    <MainFont>Home Screen</MainFont>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        data={entries}
                        keyboardShouldPersistTaps="always"
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => entries(item)}>
                            <Text>{item.id}</Text>
                            </TouchableOpacity>
                        </View>
                        )}
                    />
                    {currentUser !== null
                        ?   <View>
                                <TouchableButton onPress={() => confirmAddNewGame()}>
                                    <TouchableButtonFont>Add Game</TouchableButtonFont>
                                </TouchableButton>
                                <TouchableButton onPress={() => confirmViewGames()}>
                                    <TouchableButtonFont>View All Games</TouchableButtonFont>
                                </TouchableButton>
                                    <Button title="Tag Editor" onPress={() => addGameToConsole(collectionName, consoleName, gamesCollection, gameName)}/>
                                    <GeneralFontColor>Logged In</GeneralFontColor>
                                    <GeneralFontColor>{stateTest}</GeneralFontColor>
                                    <GeneralFontColor>{userInfo}</GeneralFontColor>
                                    {React.Children.toArray(entries.map((entry, i) => <Text>{entry.id}</Text>))}
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
  );
}