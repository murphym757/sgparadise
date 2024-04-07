import React from 'react'
import { FlatList, Pressable, View } from 'react-native'
import {
    Card,
    CardContent,
    CenterContent,
    Container,
    ContentRow,
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
    Styles,
} from 'index'

// Detailed Data for linking data
function linkedContent(linkedData, linkedDataTitle, pageLinkToSearch) {
    return (
        <LinkedContentGenreView>
            <CenterContent>
                <GameDescriptorSmall>{linkedDataTitle}</GameDescriptorSmall>
            </CenterContent>
            <MainFontLinkView>
                <Pressable>
                    <MainFontLink>{pageLinkToSearch(linkedData)}</MainFontLink>
                </Pressable>
            </MainFontLinkView>
        </LinkedContentGenreView>
    )
}

function multiLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, pageLinkToSearch) {
    const linkedDataTitle = linkedData.length > 1 ? linkedDataTitlePlural : linkedDataTitleSingular

    return (
        <LinkedContentGenreView>
            <CenterContent>
                <GameDescriptorSmall>{linkedDataTitle}</GameDescriptorSmall>
            </CenterContent>
            <MainFontLinkView>
                {sortInfoByStringLength(unsortedArray).map((item, index) => (
                    <Pressable key={index}>
                        <MainFontArrayLinks>{pageLinkToSearch(item)}</MainFontArrayLinks>
                    </Pressable>
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
    function detailArrow(arrowData, setActiveButton, colors) {
        return (
            <Container style={{paddingTop: arrowData.paddingTop, alignItems: 'center', alignContent: 'center'}}>
                <Pressable onPress={() => setActiveButton(true)}>
                    <FontAwesomeIcon icon={ arrowData.arrowIcon } color={colors.primaryFontColor} size={25} />
                </Pressable>
            </Container>
        )
    }

    function detailedNextArrow(setActiveButton, colors) {
        const paddingTop = 40
        const pageDestination = 'SecondaryGamePage'
        const arrowIcon = faArrowRight
        const arrowData = {
            paddingTop, 
            pageDestination,
            arrowIcon
        }
        return detailArrow(arrowData, setActiveButton, colors)
    }
//*----------------------------------------------*/

//* Universal FlatList Structure
    function gamePageFlatList(flatListContent){
        return (
            <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={flatListContent.array}
                keyboardShouldPersistTaps="always"
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    flatListContent.renderItem(item)
                )}
            />
        )
    }

    function returnPrimarySection(currentGameArray, sectionFunction) {
        const flatListContent = {
            array: currentGameArray,
            renderItem: sectionFunction
        }

        return gamePageFlatList(flatListContent)
    }
//*-----Universal FlatList Structure-----*/

//* First Page of Game Screen
function returnedPrimaryGamePage(currentGameArray, gamePageCoverImages, setActiveButton, colors) {
    function primaryGamePageFlatList(item){
        return (
            <View>
                {detailedGameName(item)}
                {detailGameCover(item, gamePageCoverImages)}
                {detailedPostCreator(item)}
                {detailedNextArrow(setActiveButton, colors)}
            </View>
        )
    }
    return (
        <Container>
            {returnPrimarySection(currentGameArray, primaryGamePageFlatList)}
        </Container>
    )
}
//*----------------------------------------------*/
//* Second Page of Game Screen
    //* Upper Half of Game Screen
        function upperHalfOfGamePageImageSelector(item, preDeterminedImage, currentImage, gamePageGameplayImage, gamePageGameCoverIcon){ 
            const nameLocation = 'secondaryGamePage'
            const coverIcon = item.firebaseCoverUrl
            return (
                <Container>
                    <View style={{position: 'relative'}}>
                        {currentImage == ''
                            ? gamePageGameplayImage(preDeterminedImage)
                            : gamePageGameplayImage(currentImage)
                        }
                        <View style={{
                            position: 'absolute', 
                            left: 10, 
                            bottom: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5
                        }}>
                            {gamePageGameCoverIcon(coverIcon)}
                        </View>
                    </View>
                </Container>
            )
        }
        function upperHalfOfGamePage(currentGameArray, gameScreenshots, currentImage, gamePageGameplayImage, gamePageGameCoverIcon) {
            return (
                <View>
                    <FlatList
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        data={currentGameArray}
                        keyboardShouldPersistTaps="always"
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            upperHalfOfGamePageImageSelector(item, gameScreenshots[0], currentImage, gamePageGameplayImage, gamePageGameCoverIcon)
                        )}
                    />
                </View>
            )
        }
    //*-----Upper Half of Game Screen-----*/
    //* Bottom Half of Game Screen
        function detailedGameInfoSlide1(sectionTitle, sectionData) {
            return (
                <CardContent>
                    <GameDescriptorSmall>{sectionTitle}</GameDescriptorSmall>
                    <GameDescriptorSmallAlt>{sectionData}</GameDescriptorSmallAlt>
                </CardContent>
            )
        }
        //* General Info
            function detailedGameSection(sectionTitle, sectionData) {
                return (
                    <View style={{paddingHorizontal: sectionTitle === 'Rating' ? 25 : 0}}>
                        {detailedGameInfoSlide1(sectionTitle, sectionData)}
                    </View>
                )
            }

            function detailedGameSummary(item) {
                return (
                    detailedGameInfoSlide1('Summary', item.gameSummary)
                )
            }

            function detailedGameReleaseDate(item) {
                return detailedGameSection('Release Date', item.gameReleaseDate);
            }

            function detailedGameRating(item) {
                return detailedGameSection('Rating', item.gameRating + ' Stars');
            }

            function detailedGameViews(item) {
                return detailedGameSection('Views', item.views + 1);
            }

            function returnedPrimaryGameGeneralInfo(currentGameArray) {
                function primaryGamePageFlatList(item) {
                    return (
                        <View style={{paddingHorizontal: 20}}>
                            {detailedGameSummary(item)}
                            <View style={{flexDirection: 'row'}}>
                                {detailedGameReleaseDate(item)}
                                {detailedGameRating(item)}
                                {detailedGameViews(item)}
                            </View>
                        </View>
                    )
                }
                return (
                    <Card style={Styles.CardStyle}>
                        {returnPrimarySection(currentGameArray, primaryGamePageFlatList)}
                    </Card>
                )
            }
        //*-----General Info-----*/
        //* Detailed Data for returnedGameScreenshots()
            function returnedPrimaryGameScreenshots(gameScreenshots, gameHomeNewScreenShot, setGameHomeNewScreenShot, gamePageGameplayImagesSelected, gamePageGameplayImagesNotSelected) {
                return (
                    <Container>
                        <GameDescriptorSmall>Choose One</GameDescriptorSmall>
                        <View style={{flexDirection: 'row'}}>
                            {gameScreenshots.map((item, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => setGameHomeNewScreenShot(item)}>
                                    <View style={{marginHorizontal: 5}}>
                                        {gameHomeNewScreenShot === item
                                            ? gamePageGameplayImagesSelected(item)
                                            : gamePageGameplayImagesNotSelected(item)
                                        }  
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </Container>
                )
            }
        //*----------------------------------------------*/
        //* Publishers and Developers
        //TODO: Create a way for the user to press one of the links and it take the user back to the seaarch page
            function sortInfoByStringLength(unsortedArray) {
                return [...unsortedArray].sort((a, b) => a.length - b.length)
            }

            function detailedLinkedData(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, pageLinkToSearch) {
                const unsortedArray = sortInfoByStringLength([...linkedData])
                return (
                    <View>
                        {multiLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, pageLinkToSearch)}
                    </View>
                );
            }

            function detailedPublishers(item, pageLinkToSearch) {
                return detailedLinkedData(item.gamePublishers, 'Publisher', 'Publishers', pageLinkToSearch)
            }

            function detailedDevelopers(item, pageLinkToSearch) {
                return detailedLinkedData(item.gameDevelopers, 'Developer', 'Developers', pageLinkToSearch)
            }

            function detailedGamePubDevInfo(item, pageLinkToSearch) {
                return (
                    <CardContent>
                        {detailedPublishers(item, pageLinkToSearch)}
                        {detailedDevelopers(item, pageLinkToSearch)}
                    </CardContent>
                )
            }
            function returnedPrimaryGamePubDev(currentGameArray, pageLinkToSearch) {
                function primaryGamePageFlatList(item) {
                    return (
                        <LinksCard>
                            {detailedGamePubDevInfo(item, pageLinkToSearch)}
                        </LinksCard>
                    )
                }
                return (
                    <Container>
                        {returnPrimarySection(currentGameArray, primaryGamePageFlatList)}
                    </Container>
                )
            }
        //*-----Publishers and Developers-----*/
        //* Genres and Modes
            function detailedGameData(item, pageLinkToSearch, dataKey, singularTitle) {
                const linkedData = item[dataKey]
                return (
                    <View style={{paddingVertical: singularTitle === 'Subgenre' ? 25 : 0}}>
                        {linkedContent(linkedData, singularTitle, pageLinkToSearch)}
                    </View>
                )
            }

            function detailedGameGenre(item, pageLinkToSearch) {
                return detailedGameData(item, pageLinkToSearch, 'gameGenre', 'Genre');
            }

            function detailedGameSubgenre(item, pageLinkToSearch) {
                return detailedGameData(item, pageLinkToSearch, 'gameSubgenre', 'Subgenre');
            }

            function detailedGameModes(item, pageLinkToSearch) {
                const linkedData = item.gameModes
                const linkedDataTitleSingular = `Game Mode`
                const linkedDataTitlePlural = `Game Modes`
                const unsortedArray = [...item.gameModes]
                return (
                    multiLinkedContent(linkedData, linkedDataTitleSingular, linkedDataTitlePlural, unsortedArray, pageLinkToSearch)
                )
            }

            function detailedGameGenresAndModesInfo(item, pageLinkToSearch) {
                return (
                    <Container>
                        {detailedGameGenre(item, pageLinkToSearch)}
                        {detailedGameSubgenre(item, pageLinkToSearch)}
                        {detailedGameModes(item, pageLinkToSearch)}
                    </Container>
                )
            }

            function returnedPrimaryGameGenresModes(currentGameArray, pageLinkToSearch) {
                function primaryGamePageFlatList(item) {
                    return (
                        <LinksCard>
                            {detailedGameGenresAndModesInfo(item, pageLinkToSearch)}
                        </LinksCard>
                    )
                }
                return (
                    <Container>
                        {returnPrimarySection(currentGameArray, primaryGamePageFlatList)}
                    </Container>
                )
            }
        //*-----Genres and Modes-----*/
    //*-----Bottom Half of Game Screen-----*/
//*--------------------Second Page of Game Screen--------------------------*/
export const uploadedGame = {
    returnedPrimaryGameGeneralInfo,
    returnedPrimaryGamePubDev,
    returnedPrimaryGameGenresModes,
    returnedPrimaryGameScreenshots,
    returnedPrimaryGamePage,
    upperHalfOfGamePage,
}

export const gameScreenContext = React.createContext(uploadedGame)