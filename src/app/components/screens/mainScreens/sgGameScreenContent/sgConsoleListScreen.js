import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { consoleImages } from './sgAPIIndex'
import axios from 'axios'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFocused } from "@react-navigation/native";

import { firebase, gamesConfig } from '../../../../../server/config/config'

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
    const [isLoading, setIsLoading] = useState()
    const [searchType, setSearchType] = useState('sgIGDBSearch')
    const [selectedSystemLogo, setSelectedSystemLogo] = useState('')
    const [accessTokenIGDB, setAccessTokenIGDB] = useState('')
    const [gbConsoleId, setGbConsoleId] = useState()
    const [igdbConsoleId, setIgdbConsoleId] = useState()
    const [sgConsoleIcons, setSgConsoleIcons] = useState([])
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
            })
    }

    async function firestoreImages() {
        const nightImages = await sgDB.collection("sgAPI").orderBy('sgId', 'asc')
        .get()
        .then(querySnapshot => {
            const objectsArray = [];
            querySnapshot.forEach((doc) => {
                objectsArray.push(doc.data());
            });
            setSgConsoleIcons(objectsArray)
            console.log(objectsArray.systemLogoSelectedDay);
        });
    }
        
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
        const subscriber = sgDB
          .collection("sgAPI").orderBy('sgId', 'asc')
          .onSnapshot(querySnapshot => {
            const consoles = []
            querySnapshot.forEach(documentSnapshot => {
                consoles.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              })
            })
      
            setSgConsoleIcons(consoles)
          });
          if(isFocused){  
            setModalSelected(false)
            igbdbAPI()
        }
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, [isFocused]);    

    function setConsoleId(item) {
        navigation.navigate('MyModal')
        setSelectedSystemLogo(item.systemLogoSelectedDay)
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
        {isLoading == undefined
            ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
            : <View>
            {sgHomeModalStack()}
            <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <FontAwesomeIcon 
                    icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MainFont>Select one of the following consoles:</MainFont>
                    <FlatList
                        scrollEnabled={false}
                        data={sgConsoleIcons}
                        keyboardShouldPersistTaps="always"
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => setConsoleId(item)}>
                                <Image
                                    style={{
                                        width: 300,
                                        height: 85,
                                        marginVertical: 15
                                    }}
                                    source={{
                                        uri: "" + item.systemLogoSelectedDay + "",
                                    }}
                                    onLoadStart={() => {setIsLoading(true)}}
                                    onLoadEnd={() => {setIsLoading(false)}}
                                />
                                {isLoading && (
                                    <ActivityIndicator size="large" />
                                )}
                            </TouchableOpacity>
                        </View>
                        )}
                    />
                </View>
            </View>
        }
    </SafeAreaView>
  );
 }
 