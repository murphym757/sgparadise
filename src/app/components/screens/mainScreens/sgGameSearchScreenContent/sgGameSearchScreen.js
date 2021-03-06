import React, { useState, useEffect, useContext } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image,
    FlatList, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity 
} from 'react-native'
import axios from 'axios'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import {
    modalConfirmation,
    searchGameIcon
} from '../sgGameScreenContent/sgAPIIndex'
import {
    ConfirmAddGameScreen,
    SafeAreaViewContainer,
    ContentContainer,
    TestImageDB,
    SearchBar,
    SgSearchQuery,
    SearchGameTitle,
    SearchGameData,
    FontAwesomeIcon,
    faChevronLeft
} from '../../index'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import {
    CustomInputField
  } from '../../../../../../assets/styles/authScreensStyling'
import { loadingScreen } from '../../authScreens/loadingScreen' //Loader

export default function SgGameSearchScreen({route, navigation}, props) {
    const colors = useContext(CurrentThemeContext)
    const { selectedSystemLogo } = route.params
    console.log("This is it tho" + selectedSystemLogo)
    const testGamesDb = TestImageDB.results
    const searchType = props.searchType
    console.log(searchType)
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [gameName, setGameName] = useState()
    console.log(gameName)
    const [modalSelected, setModalSelected] = useState(route.params?.modal)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
        setModalSelected(false)
    }, [])

    function filterList(testGamesDb) {
        return testGamesDb.filter(
        (testGame) =>
            testGame.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.publisher
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.releaseYear
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.platform
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
    }

    function onSearch() {
        return (searchQuery) => setSearchQuery(searchQuery)
    }

    function resetSearchQuery() {
        setSearchQuery('')
    }

    function setGameId(item) {
        navigation.navigate('SgGameModal')
        setGameName(item.name)
    }

    function resetGameId() {
        navigation.navigate('SgGameSearch')
        setGameName({ ...gameName }) 
    }

    function confirmSetGameId(){
        navigation.navigate('SgAddGameConfirm', { 
            gameName: gameName
        })
        console.log("It worked :)")
          setModalSelected(true)
    }

    function setGameConfirmation(item) {
        const resetConfirmation = resetGameId(item)
        const setConfirmation = confirmSetGameId(item)
        return modalConfirmation(resetConfirmation, setConfirmation)
    }

    function sgModalScreen() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
               {setGameConfirmation()}
            </View>
        );
    }

    function sgGSRenderItem(item) {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
                marginBottom: 120
            }}>
                <TouchableOpacity onPress={() => setGameId(item)}>
                    {searchGameIcon(colors, item)}
                </TouchableOpacity>
            </View>
        )
    }

    function sgGameStack() {
        const currentSearchDB = filterList(testGamesDb)
      return (
            <FlatList
                data={currentSearchDB}
                keyboardShouldPersistTaps="always" 
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    sgGSRenderItem(item)
                )}
            />
        ) 
    }

    function setConsole() {
        return (
            <Image
                style={{
                    width: 200,
                    height: 60
                }}
                source={{
                    uri: "" + selectedSystemLogo + "",
                }}
            />
        )
    }

    function sgDBGameSearch() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
                    <FontAwesomeIcon 
                        icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
                        onPress={() => navigation.navigate('SgConsoleList')}
                    />
                    <Text>Received params: {JSON.stringify(route.params)}</Text>
                    <Text>Your here now</Text>
                        {setConsole()}
                        <CustomInputField
                            placeholderTextColor={colors.primaryColor}
                            placeholder='Search Games'
                            onChangeText={onSearch()}
                            value={searchQuery}
                            color={colors.primaryColor}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <ScrollView 
                            scrollEventThrottle={16}
                        >
                            <View style={{ flex: 1 }}>
                                <Text>
                                    Add Games
                                </Text>
                            </View>
                            <View>
                                {sgGameStack()}
                            </View>
                        </ScrollView>
                </SafeAreaView>
        )
    }
    

    function sgSearchGameStack() {
        const ModalStack = createStackNavigator()
        const sgModal = modalSelected == true 
        ? null
        : <ModalStack.Screen name="SgGameModal" component={sgModalScreen} />
            return (
                <ModalStack.Navigator mode="modal"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: colors.primaryColor,
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0
                        },
                        headerTintColor: colors.primaryFontColor,
                        style: {
                            shadowColor: 'transparent',
                        },
                    }}
                >
                    <ModalStack.Screen 
                        name="SgDBGameSearch"
                        component={sgDBGameSearch} 
                        options={{ headerShown: false }}
                    />
                    {sgModal}
                </ModalStack.Navigator>
            )
      }
     
  return (
        <SafeAreaViewContainer>
            {isLoading == true
                ?   <ContentContainer>
                        {loadingScreen()}
                    </ContentContainer>
                :   sgSearchGameStack()
            }
        </SafeAreaViewContainer>
  );
}