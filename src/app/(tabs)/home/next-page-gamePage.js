import React, { useState, useEffect, useContext } from 'react'
import { useLocalSearchParams, Link } from "expo-router"
import { Text, ScrollView, TouchableOpacity, View, Dimensions } from "react-native"
import { CurrentThemeContext, Container, ContentRow, GameNameBig } from 'index'
import { doc, getDoc } from "firebase/firestore"
import { AppWideImageContext } from 'main/sgImageContext'
import { gameScreenContext } from 'main/sgGameScreenContent/sgGameScreenContext'
import { useAuth } from 'auth/authContext'
import { PageStructureContext } from '../reuseableComponents/pageStructure'
import { useLoader } from 'server/config/loaderContext'
import { ActivityIndicator } from 'react-native-paper'



//* Import Firebase 
export default function PageContentGamePage() {
  //* route.params doesn't work here, but pass those variables in as props
 /* const { 
    collectionName, 
    gamesCollection, 
    consoleName, 
    gameName, 
    gameImageCount, 
    gameSummary, 
  } = route.params */
  const windowWidth = Dimensions.get('window').width
  const [ currentGameArray, setCurrentGameArray ] = useState([])
  const [ gameHomeNewScreenShot, setGameHomeNewScreenShot ] = useState('')
  const [ gameHomeScreenCover, setGameHomeScreenCover ] = useState('')
  const [ gameHomeScreenShot, setGameHomeScreenShot ] = useState('')
  const [ gameScreenshot1, setGameScreenshot1 ] = useState([])
  const [ gameScreenshot2, setGameScreenshot2 ] = useState([])
  const [ gameScreenshot3, setGameScreenshot3 ] = useState([])
  const [ gameName, setGameName ] = useState('')
  const [ gameSummary, setGameSummary ] = useState('')
  const [activeButton, setActiveButton] = useState(false)
  const { sgDB, currentUID, updateGameViewCount, backArrow, preLoadedData } = useAuth()
  const colors = useContext(CurrentThemeContext)
  const pageStructure = useContext(PageStructureContext)
  const gameScreenFunc = useContext(gameScreenContext)
  const gameScreenshots = [ gameScreenshot1.toString(), gameScreenshot2.toString(), gameScreenshot3.toString() ]
  const images = useContext(AppWideImageContext)
  

  const params = useLocalSearchParams()
  const { 
    backHeaderTitle, 
    gameSlug,
    gameReleaseDate
  } = params

  //* Idea ------ Pass the gameSlug to the gamePage and use it to get the game data
  const pageTitle = 'Game Page'
  const isNextPage = true

  useEffect(() => {
    getCurrentGameData()  
  }, [gameHomeNewScreenShot, activeButton]) // Run when isLoading changes

  async function getCurrentGameData() {
    let currentGameData = []
    let currentGameScreenshot1 = []
    let currentGameScreenshot2 = []
    let currentGameScreenshot3 = []
    const gameRef = doc(sgDB, 'sgAPI', 'sgGenesis', 'games', gameSlug)
    const docSnap = await getDoc(gameRef)

    if (docSnap.exists()) {
        currentGameData.push(docSnap.data())
        currentGameScreenshot1.push(docSnap.data().firebaseScreenshot1Url)
        currentGameScreenshot2.push(docSnap.data().firebaseScreenshot2Url)
        currentGameScreenshot3.push(docSnap.data().firebaseScreenshot3Url)
    } else {
      // docSnap.data() will be undefined in this case
        console.log("No such document!")
    }
    //This code asks whether or not the game's data was passed in or not. This is really more useful when traversing between tabs (in the navbar)
    if (currentGameArray.length === 0)  {
        setCurrentGameArray(currentGameData)
        setGameScreenshot1(currentGameScreenshot1)
        setGameScreenshot2(currentGameScreenshot2)
        setGameScreenshot3(currentGameScreenshot3)
    }
    setGameName(currentGameData[0].gameName)
    setGameSummary(currentGameData[0].gameSummary)
}

  //* Link Function
  function pageLinkToSearch(passedProp) {
    const nextPagePath = "/search"
    const linkContent = 'Go to Search page'
    const linkedDataSearch = {
        nextPagePath,
        linkContent
    }
    return (
        <Link 
            href={{
                pathname: nextPagePath, 
                params: { 
                    backHeaderTitle: pageTitle,
                    passedProp:passedProp
                }
            }} 
            style={{color: colors.primaryFontColor}}>
              {passedProp}
        </Link>
    )
}

  //*-----Link Function-----*//

//* Image Functions
  //* Image Resize
    function imageResize(screenWidth, imageData, height, width) {
      return (
        windowWidth === screenWidth ? (imageData.height = height, imageData.width = width) : null
      )
    }
  //*-----Image Resize-----*//

  //* Gameplay Images
    function gamePageGameplayImages(borderWidth, borderColor, item) {
      const imageData = {
          height: 70,
          width: 120,
          contentFit: 'fill',
          borderRadius: 5,
          borderWidth: borderWidth,
          borderColor: borderColor,
          transition: 1000,
      }
      {imageResize(1024, imageData, 120, 180)}
      return images.gamePageGameplayImages(imageData, item)
    }

    function gamePageGameplayImagesSelected(item) {
      return gamePageGameplayImages(7, colors.secondaryColor, item)
    }

    function gamePageGameplayImagesNotSelected(item) {
      return gamePageGameplayImages(0, null, item)
    }
  //*-----Gameplay Images-----*//
  //* Main Gameplay Image
    function gamePageGameplayImage(imageChosen) {
      const imageData = {
          height: 300,
          width: 388,
          contentFit: 'fill',
          borderRadius: 10,
          transition: 1000,
      }
      {imageResize(1024, imageData, 700, 936)}
      return images.gamePageGameplayImageBigDisplay(imageData, imageChosen)
    }
  //*-----Main Gameplay Image-----*//
  //* Game Cover Icon
    function gamePageGameCoverIcon(imageChosen) {
      const imageData = {
          height: 100,
          width: 75,
          contentFit: 'fill',
          borderRadius: 10,
          transition: 1000,
      }
      {imageResize(1024, imageData, 180, 125)}
      return images.detailedGameCover(imageData, imageChosen)
    }
  //*-----Game Cover Icon-----*//
//*-----Image Functions-----*//

//* Game Page Structure
    //* Game Name (Resizes the font size based on the length of the game's name)
      function charLengthSet(nameValue, nameLength, maxNameLength, nameLengthSet, fontSize) {
        if (nameLength < maxNameLength) {
          return (
              <GameNameBig style={{ fontSize: fontSize }}>{nameValue}</GameNameBig>
          )
        } else {
            return (
                <GameNameBig style={{ fontSize: fontSize }}>{nameValue.substring(0, nameLengthSet) + '...'}</GameNameBig>
            )
        }
      }
      function detailedGameName() {
        const nameValue = gameName
        const gameNameExtender = windowWidth === 1024 ? 50 : 27
        return (
          <Container>
            <View style={{alignItems: 'flex-end'}}>
              {charLengthSet(nameValue, nameValue.length, 21, gameNameExtender, 18)}
            </View>
          </Container>
        )
      }
    //*-----Game Name (Resize)-----*//
  function gamePageTop() {
    return (
      <View>
        {gameScreenFunc.upperHalfOfGamePage(currentGameArray, gameScreenshots, gameHomeNewScreenShot, gamePageGameplayImage, gamePageGameCoverIcon)}
      </View>
    )
  }

  function gamePageMiddle() {
    return (
      <View>
        {gameScreenshots.length === 0
          ? null
          : gameScreenFunc.returnedPrimaryGameScreenshots(gameScreenshots, gameHomeNewScreenShot, setGameHomeNewScreenShot, gamePageGameplayImagesSelected, gamePageGameplayImagesNotSelected)
        }
      </View>
    )
  }

  function gamePageBottom() {
    return (
      <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 10}}>
          {gameScreenFunc.returnedPrimaryGameGeneralInfo(currentGameArray)}
          {gameScreenFunc.returnedPrimaryGamePubDev(currentGameArray, pageLinkToSearch)}
          {gameScreenFunc.returnedPrimaryGameGenresModes(currentGameArray, pageLinkToSearch)}
      </ScrollView>
    )
  }

  function gamePageData() {
    return (
      <Container style={{flex: 1}}>
        <View style={{flex: 0}}>{detailedGameName()}</View>
        <View style={{flex: windowWidth === 1024 ? 10 : 3}}>{gamePageTop()}</View>
        <View style={{flex: windowWidth === 1024 ? 2 :1}}>{gamePageMiddle()}</View>
        <View style={{flex: windowWidth === 1024 ? 4 :3}}>{gamePageBottom()}</View>
      </Container>
    )
  }
//*-----Game Page Structure-----*//

function originalGameContent() {
  return (
    <View>
      <Text style={{color: colors.primaryFontColor}}>{pageTitle}</Text>
      <Text style={{color: colors.primaryFontColor}}>{gameSummary}</Text>
    </View>
  )
}

//* Allows the user to setup a search query with the game's data via Algolia
  function chosenDataOption(item, linkedData) {
    return (
      <Link
        href={{
          pathname: linkedData.nextPagePath, 
          params: {
            gameDataToBePassed: item,
            gamePageLinkPressed: true
          }
        }}
      >
        {linkedData.linkContent}
      </Link>
    )
  }
//*-----Search Query Via Links-----*//

//* This is the game's landing page (Apply an animation the data on this page and make transitions between the game's screenshots)
//TODO Add loading spinner to the game's landing page (need "isLoading" state)
//TODO Add a "View More" button to the game's landing page (or arrow) to view the rest of the data
//? Never add a "Back" button to the game's landing page (it's not needed)
function gamePageCoverImages(imageChosen) {
  const imageData = {
      height: 450,
      width: 350,
      contentFit: 'fill',
      borderRadius: 25,
      transition: 1000,
  }
  {imageResize(1024, imageData, 900, 800)}
  return images.gamePageCoverImage(imageData, imageChosen)
}

function PrimaryGamePageStructure() {
  return gameScreenFunc.returnedPrimaryGamePage(currentGameArray, gamePageCoverImages, setActiveButton, colors)
}

function gamePageContent() {
  return (
    activeButton === false ? PrimaryGamePageStructure() : gamePageData()
  )
}

function animatedLoader() {
  return (
    <View>
      <Text style={{color: colors.primaryFontColor}}>Loading...</Text>
    </View>
  )
}

function activityIndicator() {
  return (
      <ActivityIndicator animating={true} size={100} color={colors.secondaryColor} />
  )
}

  
  return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, gamePageContent())
}