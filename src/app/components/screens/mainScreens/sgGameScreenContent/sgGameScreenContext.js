import React from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View} from 'react-native';
import { Image } from 'expo-image'
import {
    Card,
    CardContent,
    CenterContent,
    Container,
    ContentRow,
    faArrowLeft,
    faArrowRight,
    FontAwesomeIcon,
    GameDescriptorSmall,
    GameDescriptorSmallAlt,
    GameNameBig,
    LinkedContentGenreView,
    LinksCard,
    MainFont,
    MainFontArrayLinks,
    MainFontLink,
    MainFontLinkView,
    SafeAreaViewLoader,
    Styles,
} from 'index'



// Detailed Data for linking data
function linkedContent(linkedData, linkedDataTitleSingular, chosenDataOption) {
    const keySearchDataArray = false
    return (
        <LinkedContentGenreView>
            <CenterContent>
                <GameDescriptorSmall>{linkedDataTitleSingular}</GameDescriptorSmall>
            </CenterContent>
            <MainFontLinkView>
                <TouchableOpacity onPress={() => chosenDataOption(linkedData, keySearchDataArray)}>
                    <MainFontLink>{linkedData}</MainFontLink>
                </TouchableOpacity>
            </MainFontLinkView>
        </LinkedContentGenreView>
    )
}
function mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption) {
    const keySearchDataArray = true
    return (
        <LinkedContentGenreView>
            <CenterContent>
                {linkedData.length > 1
                    ?   <GameDescriptorSmall>{linkedDataTitlePlural}</GameDescriptorSmall>
                    :   <GameDescriptorSmall>{linkedDataTitleSingular}</GameDescriptorSmall>
                }
            </CenterContent>
            <MainFontLinkView>
                {sortInfoByStringLength(unsortedArray).map((item) => (
                    <TouchableOpacity onPress={() => chosenDataOption(item[0], keySearchDataArray)}>
                        <MainFontArrayLinks>{item}</MainFontArrayLinks>
                    </TouchableOpacity>
                ))}
            </MainFontLinkView>
        </LinkedContentGenreView>
    )
}
/*----------------------------------------------*/
//* FIrst Page of Game Screen
function gameTitleFunc(nameValue, nameLength, maxNameLength, nameLengthSet, fontSize) {
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
function charLengthSet(nameLocation, nameValue, nameLength, maxNameLength, nameLengthSet) {
    return (
        nameLocation === 'mainGamePage'
        ?   gameTitleFunc(nameValue, nameLength, maxNameLength, nameLengthSet, 26)
        :   gameTitleFunc(nameValue, nameLength, maxNameLength, nameLengthSet, 18)
    )
    
}
function detailedGameName(item) {
    const nameLocation = 'mainGamePage'
    const nameValue = item.gameName
    return (
        <Container style={{alignItems: 'flex-end', paddingHorizontal: 16}}>
            <ContentRow style={{paddingVertical: 10}}>
                <View style={{alignItems: 'flex-end'}}>
                    {charLengthSet(nameLocation, nameValue, nameValue.length, 21, 18)}
                </View>
            </ContentRow>
        </Container>
    )
}
//* Detailed Data for game cover
    function detailedGameCoverSGLogo() {
        return (
            <Container>
                <View style={{
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    <MainFont style={{ color: '#fff'}}>sgParadise Logo Goes Here</MainFont>
                </View>
            </Container>
        )
    }

    function detailedGameCover(item, gamePageCoverImages) {
        return (
            <Container>
                <View style={{
                    width: '100%',
                    height: undefined,
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    {gamePageCoverImages(item.firebaseCoverUrl)}
                </View>
            </Container>
        )
    }

    function detailGameCover(item, gamePageCoverImages) {
        return (
            <View>
                <View style={{
                    position: 'relative',
                }}>
                    {detailedGameCover(item, gamePageCoverImages)}
                </View>
                <View style={{
                    position: 'absolute',
                }}>
                    {detailedGameCoverSGLogo()}
                </View>
            </View>
        )
    }
//*----------------------------------------------*/

function detailedPostCreator(item) {
    //TODO: Setup a 15-character maximum (5-character minimum) character limit in the registration section
    const testUsername15Char = 'mmmmmmmmmmmmmmm'
    const testUsername5Char = 'mmmmm'
    const testDateAdded = '8/30/23'
    return (
        <Container style={{alignItems: 'flex-start'}}>
            <ContentRow>
                <View style={{paddingVertical: 10}}>
                    <MainFont>
                        <GameDescriptorSmall>Contributor: </GameDescriptorSmall>
                        {testUsername15Char}
                    </MainFont>
                </View>
            </ContentRow>
            <ContentRow>
                <View style={{paddingVertical: 10}}>
                    <MainFont>
                        <GameDescriptorSmall>Contributed: </GameDescriptorSmall>
                        {testDateAdded}
                    </MainFont>
                </View>
            </ContentRow>
        </Container>
    )
}

//* Navigation Arrows for Game Screen
    function detailArrow(arrowData, navigation, colors) {
        return (
            <Container style={{paddingTop: arrowData.paddingTop, alignItems: 'center', alignContent: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate(arrowData.pageDestination)}>
                    <FontAwesomeIcon icon={ arrowData.arrowIcon } color={colors.primaryFontColor} size={25} />
                </TouchableOpacity>
            </Container>
        )
    }

    function detailedNextArrow(navigation, colors) {
        const paddingTop = 40
        const pageDestination = 'SecondaryGamePage'
        const arrowIcon = faArrowRight
        const arrowData = {
            paddingTop, 
            pageDestination,
            arrowIcon
        }
        return detailArrow(arrowData, navigation, colors)
    }

    function detailedPrevArrow(navigation, colors) {
        const paddingTop = 0
        const pageDestination = 'PrimaryGamePage'
        const arrowIcon = faArrowLeft
        const arrowData = {
            paddingTop, 
            pageDestination,
            arrowIcon
        }
        return detailArrow(arrowData, navigation, colors)
    }
//*----------------------------------------------*/

function returnedPrimaryGamePage(passingPrimaryGamePageData) {
    const currentGameArray = passingPrimaryGamePageData.currentGameArray
    const gamePageCoverImages = passingPrimaryGamePageData.gamePageCoverImages
    const navigation = passingPrimaryGamePageData.navigation
    const colors = passingPrimaryGamePageData.colors
    return (
        <FlatList
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={currentGameArray}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Container>
                    <View>
                        {detailedGameName(item)}
                        {detailGameCover(item, gamePageCoverImages)}
                        {detailedPostCreator(item)}
                        {detailedNextArrow(navigation, colors)}
                    </View>
                </Container>
            )}
        />
    )
}

function gameLandingPage(passingPrimaryGamePageData) {
    return (
        <View style={{paddingTop: 100}}>
            {returnedPrimaryGamePage(passingPrimaryGamePageData)}
        </View>
    )
}
//*----------------------------------------------*/

//* Second Page of Game Screen
//* Detailed Data for returnedGameInfo()
function detailedGameInfoSlide1(sectionTitle, sectionData) {
    return (
        <CardContent>
            <GameDescriptorSmall>{sectionTitle}</GameDescriptorSmall>
            <GameDescriptorSmallAlt>{sectionData}</GameDescriptorSmallAlt>
        </CardContent>
    )
}
function detailedGameReleaseDate(item) {
    const sectionTitle = `Release Date`
    const sectionData = item.gameReleaseDate
    return (
        detailedGameInfoSlide1(sectionTitle, sectionData)
    )
}

function detailedGameViews(item) {
    const sectionTitle = `Views`
    const sectionData = item.views + 1
    return (
        detailedGameInfoSlide1(sectionTitle, sectionData)
    )
}

function detailedGameRating(item) {
    const sectionTitle = `Rating`
    const sectionData = item.gameRating + ' Stars'
    return (
        detailedGameInfoSlide1(sectionTitle, sectionData)
    )
}


function detailedGameInfo(item) {
    return (
        <Container>
            <View style={{paddingTop: 20}}>
                <View>
                    {detailedGameReleaseDate(item)}
                </View>
                <View style={{paddingVertical: 50}}>
                    {detailedGameRating(item)}
                </View>
                <View>
                    {detailedGameViews(item)}
                </View>
            </View>
        </Container>
    )
}

function returnedGameInfo(currentGameArray) {
    return (
        <FlatList
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={currentGameArray}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{paddingHorizontal: 20}}>
                    {detailedGameInfo(item)}
                </View>
            )}
        />
    )
}
//*----------------------------------------------*/

//* Detailed Data for returnedGameSummary()
function detailedGameInfoSlide2(sectionData) {
    return (
        <CardContent>
            <GameDescriptorSmallAlt>{sectionData}</GameDescriptorSmallAlt>
        </CardContent>
    )
}
function detailedGameSummary(item) {
    const sectionData = item.gameSummary
    return (
        detailedGameInfoSlide2(sectionData)
    )
}

function detailedGameSummaryInfo(item) {
    return (
        <Container style={{paddingTop: 20, paddingHorizontal: 20}}>
            {detailedGameSummary(item)}
        </Container>
    )
}

function returnedGameSummary(currentGameArray) {
    return (
        <FlatList
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={currentGameArray}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View>
                    <Card style={Styles.CardStyle}>
                        {detailedGameSummaryInfo(item)}
                    </Card>
                </View>
            )}
        />
    )
}
//*----------------------------------------------*/
//* Detailed Data for returnedGameScreenshots()
    function detailedGameScreenshot(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, gamePageGameplayImagesSelected, gamePageGameplayImagesNotSelected) {
        return (
            <View style={{paddingTop: 20, paddingHorizontal: 40}}>
                <View style={{height: 110}}>
                    <View>
                        <GameDescriptorSmall>Choose One</GameDescriptorSmall>
                        {gameScreenshots.map((item) =>
                            <TouchableOpacity
                                onPress={() => selectedGameScreenshot(item, selectedGameScreenshot)}>
                                    <View style={{marginVertical: 5}}>
                                        {gameHomeNewScreenShot === item
                                            ?    gamePageGameplayImagesSelected(item)
                                            :    gamePageGameplayImagesNotSelected(item)
                                        }  
                                    </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }

    function returnedGameScreenshots(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, gamePageGameplayImagesSelected, gamePageGameplayImagesNotSelected) {
        return (
            <View>
                {detailedGameScreenshot(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, gamePageGameplayImagesSelected, gamePageGameplayImagesNotSelected)}
            </View>
        )
    }
//*----------------------------------------------*/
//* Detailed Data for returnedGamePubDev()
//TODO: Create a way for the user to press one of the links and it take the user back to the seaarch page
function sortInfoByStringLength(unsortedArray) {
    const sortedArray = unsortedArray.sort((a, b) => a.length - b.length)
    const sortedMap = [...new Map(sortedArray.map(i => [i]))]
    return sortedMap
}

function detailedPublishers(item, chosenDataOption) {
    const linkedData = item.gamePublishers
    const linkedDataTitleSingular = `Publisher`
    const linkedDataTitlePlural = `Publishers`
    const unsortedArray = [...item.gamePublishers]
    return (
        mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption)
    )
}

function detailedDevelopers(item, chosenDataOption) {
    const linkedData = item.gameDevelopers
    const linkedDataTitleSingular = `Developer`
    const linkedDataTitlePlural = `Developers`
    const unsortedArray = [...item.gameDevelopers]
    return (
        mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption)
    )
}

function detailedGamePubDevInfo(item, chosenDataOption) {
    return (
        <Container>
            <View>
                {detailedPublishers(item, chosenDataOption)}
            </View>
            <View>
                {detailedDevelopers(item, chosenDataOption)}
            </View>
        </Container>
    )
}

function returnedGamePubDevInfo(currentGameArray, chosenDataOption) {
    return (
        <FlatList
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={currentGameArray}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View>
                    <LinksCard>
                        {detailedGamePubDevInfo(item, chosenDataOption)}
                    </LinksCard>
                </View>
            )}
        />
    )
}
//*----------------------------------------------*/
//* Detailed Data for returnedGameGenresAndModes()
function detailedGameGenre(item, chosenDataOption) {
    const linkedDataTitleSingular = `Genre`
    const linkedData = item.gameGenre
    return (
        linkedContent(linkedData, linkedDataTitleSingular, chosenDataOption)
    )
}
function detailedGameSubgenre(item, chosenDataOption) {
    const linkedDataTitleSingular = `Subgenre`
    const linkedData = item.gameSubgenre
    return (
        linkedContent(linkedData, linkedDataTitleSingular, chosenDataOption)
    )
}

function detailedGameModes(item, chosenDataOption) {
    const linkedData = item.gameModes
    const linkedDataTitleSingular = `Game Mode`
    const linkedDataTitlePlural = `Game Modes`
    const unsortedArray = [...item.gameModes]
    return (
        mutliLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, chosenDataOption)
    )
}

function detailedGameGenresAndModesInfo(item, chosenDataOption) {
    return (
        <Container>
            <View>
                {detailedGameGenre(item, chosenDataOption)}
            </View>
            <View style={{paddingVertical: 20}}>
                {detailedGameSubgenre(item, chosenDataOption)}
            </View>
            <View>
                {detailedGameModes(item, chosenDataOption)}
            </View>
        </Container>
    )
}

function returnedGameGenresAndModes(currentGameArray, chosenDataOption) {
    return (
        <FlatList
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={currentGameArray}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View>
                    <LinksCard>
                        {detailedGameGenresAndModesInfo(item, chosenDataOption)}
                    </LinksCard>
                </View>
            )}
        />
    )
}
//*----------------------------------------------*/
function imageStructure(imageChosen) {
    const gameScreenshot = imageChosen
    return (
        <Image
            style={{
                height: 250,
                width: 375,
                resizeMode: 'stretch',
                borderRadius: 20,
            }}
            source={`${gameScreenshot}`}
        />
    )
}
function upperHalfOfGamePageImageSelector(item, image, preDeterminedImage){ 
    const nameLocation = 'secondaryGamePage'
    const nameValue = item.gameName
    return (
        <View style={{alignContent: 'center', alignItems: 'center'}}>
            <View>
                {image == ''
                    ? imageStructure(preDeterminedImage)
                    : imageStructure(image)
                }
            </View>
            <View style={{paddingTop: 20}}>
                {charLengthSet(nameLocation, nameValue, nameValue.length, 32, 32)}
            </View>
        </View>
    )
}
function upperHalfOfGamePage(currentGameArray, gameScreenshots, image) {
    return (
        <Container style={{paddingVertical: 20}}>
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={currentGameArray}
                keyboardShouldPersistTaps="always"
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    upperHalfOfGamePageImageSelector(item, image, gameScreenshots[0])
                )}
            />
            
        </Container>
    )
}

function secondaryGamePageStructure(currentGameArray, gameScreenshots, image, gamePageScrollView, isLoading, colors, navigation) {
    return (
        <View>
            {isLoading == true
                ?   <View style={{ backgroundColor: colors.primaryColor }}>
                        <SafeAreaViewLoader>
                            <ActivityIndicator size="large" hidesWhenStopped="true"/>
                        </SafeAreaViewLoader>
                </View>
                :  <View style={{position: 'relative', paddingTop: 100}}>
                    {upperHalfOfGamePage(currentGameArray, gameScreenshots, image)}
                    {gamePageScrollView()}
                    {detailedPrevArrow(navigation, colors)}
            </View>
            }
        </View>
    )
}

function preDeterminedGameHomeScreen(imageData, gameHomeScreenShot, gamePageScrollView) {
    return (
        secondaryGamePageStructure(imageData.currentGameArray, imageData.gameScreenshots, gameHomeScreenShot, gamePageScrollView, imageData.isLoading, imageData.colors, imageData.navigation)
    )
}

function updatedGameHomeScreen(imageData, gameHomeNewScreenShot, gamePageScrollView) {
    return (
        secondaryGamePageStructure(imageData.currentGameArray, imageData.gameScreenshots, gameHomeNewScreenShot, gamePageScrollView, imageData.isLoading, imageData.colors, imageData.navigation)
    )
}
//*--------------------Second Page of Game Screen--------------------------*/
export const uploadedGame = {
    returnedGameInfo,
    returnedGamePubDevInfo,
    returnedGameGenresAndModes,
    returnedGameSummary,
    returnedGameScreenshots,
    preDeterminedGameHomeScreen,
    gameLandingPage,
    updatedGameHomeScreen
}

export const gameScreenContext = React.createContext(uploadedGame)