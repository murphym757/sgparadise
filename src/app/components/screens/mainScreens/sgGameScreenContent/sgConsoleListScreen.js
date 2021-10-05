import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { consoleImages } from './sgAPIIndex'
import axios from 'axios'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFocused } from "@react-navigation/native";

import { firebase, gamesConfig } from '../../../../../server/config/config'
console.log(gamesConfig.igdbClientId)

// App Styling
import {
    SgGameSearchScreen,
    SafeAreaViewContainer,
    Container,
    ContentContainer,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    dayTime,
    nightTime,
    sg32XNATitles
} from '../../index'

import {
    setImage,
    modalConfirmation
} from './sgAPIIndex'

import stringSimilarity from 'string-similarity'

//FontAwesome searchType
import { FontAwesomeIcon, faChevronLeft } from '../../index'

export default function SgConsoleListScreens({route, navigation}, props) {
    const colors = useContext(CurrentThemeContext)
    const sgDB = firebase.firestore()
    const consoleData = sgDB.collection("sgAPI").get()
    const [searchType, setSearchType] = useState('sgIGDBSearch')
    const [selectedSystemLogo, setSelectedSystemLogo] = useState('')
    const [accessTokenIGDB, setAccessTokenIGDB] = useState('')
    console.log("This is your twitch code " + accessTokenIGDB)
    const [gbConsoleId, setGbConsoleId] = useState()
    const [igdbConsoleId, setIgdbConsoleId] = useState()
    console.log(igdbConsoleId)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [modalSelected, setModalSelected] = useState(route.params?.modal)

    // For IGDB API Search Endpoint
    const clientIdIGDB = "" + gamesConfig.igdbClientId + ""
    const clientSecretIGDB = "" + gamesConfig.igdbClientSecret + ""

        // Finds the clostest game title
        let matches = stringSimilarity.findBestMatch("The Amazing Spider-Man: Web of Fire", sg32XNATitles);
        console.log(matches.bestMatch.target)
  

    function consoleLogo() {
        const nightImages = sgDB.collection("sgAPI").orderBy("systemLogoNight", "asc")
        const dayImages = sgDB.collection("sgAPI")
        console.log(dayImages)
        if (nightTime) {return nightImages}
        if (dayTime) {return dayImages}
    }

    async function igbdbAPI() {
        let accessToken;
        await axios.post('https://id.twitch.tv/oauth2/token?client_id=' + clientIdIGDB + '&client_secret=' + clientSecretIGDB + '&grant_type=client_credentials')
            .then(res => {
                accessToken = res.data.access_token;
                setAccessTokenIGDB(accessToken)
                console.log(accessToken); // shows the token fine here
            })
    }
    
    useEffect(() => {
        if(isFocused){  
            setModalSelected(false)
            igbdbAPI()
        }}, [isFocused])
        

    function setConsoleId(item) {
        navigation.navigate('MyModal')
        setSelectedSystemLogo(item.systemLogo)
        setGbConsoleId(item.systemgbId)
        setIgdbConsoleId(item.systemigdbId)
    }

    function resetConsoleId() {
            setSelectedSystemLogo({ ...selectedSystemLogo })
            setGbConsoleId({ ...gbConsoleId })
            setIgdbConsoleId({ ...igdbConsoleId })
            setAccessTokenIGDB({ ...accessTokenIGDB })
    }

    function confirmSetConsoleId(){
        navigation.navigate('SgIGDBGameSearch',{
            clientIdIGDB: clientIdIGDB,
            accessTokenIGDB: accessTokenIGDB, 
            igdbConsoleId: igdbConsoleId,
            gbConsoleId: gbConsoleId,
            selectedSystemLogo: selectedSystemLogo,
            searchType: searchType
        })
          setModalSelected(true)
    }

    function setConsoleConfirmation(item) {
        const resetConfirmation = resetConsoleId(item)
        const setConfirmation = confirmSetConsoleId(item)
        return modalConfirmation(resetConfirmation, setConfirmation)
    }

    function sgModalScreen() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                {setConsoleConfirmation()}
            </View>
        );
    }

   function sgConsolesStack() {
       return (
        <View style={{ backgroundColor: colors.primaryColor }}>
            <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <FontAwesomeIcon 
                    icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MainFont>Select one of the following consoles:</MainFont>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={consoleImages()}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => setConsoleId(item)}>
                            <Image
                                style={{
                                    width: 200,
                                    height: 60,
                                    marginVertical: 15
                                }}
                                source={{
                                    uri: "" + item.systemLogo + "",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </View>
        </View>
       )
   }

   function sgHomeModalStack() {
    const ModalStack = createStackNavigator()
    const sgModal = modalSelected == true 
        ? null
        : <ModalStack.Screen name="MyModal" component={sgModalScreen} />
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
                        name="SgConsoleOptions"
                        component={sgConsolesStack}
                        options={{ headerShown: false }}
                    />
                        {sgModal}
                </ModalStack.Navigator>
            )
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primaryColor }}>
        {sgHomeModalStack()}
        <View style={{alignItems: 'center'}}></View>
    </SafeAreaView>
  );
 }
 