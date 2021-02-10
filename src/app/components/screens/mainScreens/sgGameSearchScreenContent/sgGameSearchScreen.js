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

export default function SgGameSearchScreen({navigation, route}, props) {
    const colors = useContext(CurrentThemeContext)
    const { selectedSystemLogo } = route.params
    console.log("This is it tho" + selectedSystemLogo)
    const testGamesDb = TestImageDB.results
    const searchType = props.searchType
    console.log(searchType)
    const [isLoading, setIsLoading] = useState(true)
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ gameName, setGameName ] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
    })

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

    function pressedIcon(){
        setGameName('ice'),
        navigation.navigate('SgAddGame', { 
            gameName: gameName
        })
        console.log("It worked :)")
    }

    function gameIcon() {
        const currentSearchDB = filterList(testGamesDb)
      return (
            <FlatList
                data={currentSearchDB}
                keyboardShouldPersistTaps='always' 
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
                renderItem={({ item }) => (
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginBottom: 120
                }}>
                    <TouchableOpacity onPress={() => pressedIcon()}>
                        {searchGameIcon(colors, item)}
                    </TouchableOpacity>
                </View>
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
                        onPress={() => navigation.navigate('SgConsoleList', { modal: false })}
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
                                {gameIcon()}
                            </View>
                        </ScrollView>
                </SafeAreaView>
        )
    }
    

    function sgSearchGameStack() {
          const Stack = createStackNavigator()
            return (
                <Stack.Navigator
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
                    initialRouteName="SgDBGameSearch"
                >
                    <Stack.Screen 
                        name="SgDBGameSearch"
                        options={{ headerShown: false }}
                        component={sgDBGameSearch} 
                    />
                    <Stack.Screen 
                        name="SgAddGameConfirm"
                        options={{ headerShown: false }}
                        component={ConfirmAddGameScreen} 
                    />
                </Stack.Navigator>
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