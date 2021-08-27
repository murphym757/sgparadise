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
import { firebase } from '../../../../server/config/config';
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

// App Styling & Screens
import {
    SearchBar,
    AddGameScreen,
    ConfirmAddGameScreen,
    SgConsoleListScreen,
    CurrentThemeContext,
    Container,
    MainFont,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
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
    const [error, setError] = useState('')
    const [searchType, setSearchType] = useState('sgDBSearch')
    const colors = useContext(CurrentThemeContext)
    const [addGame, setGame] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [entities, setEntities] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [testData, setTestData] = useState('')
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [consoleName, setConsoleName] = useState('sg1000')
    const [gamesCollection, setGamesCollection] = useState('games')
    const [gameName, setGameName] = useState('tinyToon')
    const [imagesCollection, setImagesCollection] = useState('images')
    const [commentsCollection, setCommentsCollection] = useState('comments')
    const [tagsCollection, setTagsCollection] = useState('tags')
    const genreTagsTitle = 'Genre'
    const [genreTagsData, setGenreTagsData] = useState([
        "Beat 'em up",
        "Brawler",
        "Fighting",
        "Action",
        "Adventure"
    ])
    console.log(genreTagsData)
    const [editgenreTags, setEditgenreTags] = useState([])
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

    // For Image Image Uploads
    const [uploadImageurl, setImageurl] = useState('https://upload.wikimedia.org/wikipedia/en/7/79/Tiny_Toon_Adventures_MegaDrive_PAL.jpg')
    const [folderName, setFolderName] = useState('images')
    const [subFolderName, setSubFolderName] = useState('boxArtImage')
    const [fileName, setFileName] = useState(gameName + 'boxArt')
    const [fileType, setFileType] = useState(uploadImageurl.slice(-3))

    // For Referencing Images
    const refImageUrl =  "" + folderName + "/" + consoleName + "/" + gameName + "/" + subFolderName + "/" + fileName + "." + fileType + ""
    const sgImageStorageRef = sgImageStorage.ref()
    const imagesRef  = sgImageStorageRef.child('images/tinyToon/boxArtImage/tinyToonboxArt.jpg')
    const imagesRef2  = sgImageStorageRef.child('images/tinyToon/boxArtImage/Vice-city-cover.jpg')
    const sgGameImages = [imagesRef, imagesRef2]
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileImageUrl2, setProfileImageUrl2] = useState('')
    console.log(profileImageUrl)

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
    

function removeFromArray(original, editgenreTags) {
  return original.filter(value => !editgenreTags.includes(value))
}

console.log(removeFromArray(genreTagsData, editgenreTags));

  
    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false),
                    imageCatcher()
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

    async function editGenreTagsData() {
        setEditgenreTags(["Fighting", "Action"]),
        removeFromArray(genreTagsData, editgenreTags)
    }

    function sgGameSearchbar() {
        return (
            <SearchBar 
                searchType={searchType}
            />
        )
    }
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
    {isLoading !== true 
        ?   <Container>
                {sgGameSearchbar({ navigation })}
                    <MainFont onPress={() => navigation.navigate('SgConsoleList')}>Home Screen</MainFont>
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
                                <Button title="Tag Editor" onPress={() => addGameToConsole(collectionName, consoleName, gamesCollection, gameName)}/>
                                <GeneralFontColor>Logged In</GeneralFontColor>
                                <GeneralFontColor>{stateTest}</GeneralFontColor>
                                <GeneralFontColor>{userInfo}</GeneralFontColor>
                                {entries.map((entry, i) => <View key={i}><Text>{entry.id}</Text></View>)}
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
                                <TouchableButton
                                    onPress={() => navigation.navigate('SgConsoleList')}>
                                <TouchableButtonFont>Add Game</TouchableButtonFont>
                                </TouchableButton>
                            </View>
                    }
            </Container>
        :   <View>
                <GeneralFontColor>Loading Screen</GeneralFontColor>
            </View>
    }
    </SafeAreaView>
  );
}