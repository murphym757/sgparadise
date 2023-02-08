import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFocused } from "@react-navigation/native"
import {
    CurrentThemeContext,
    dayTime,
    faChevronLeft,
    firebase,
    FontAwesomeIcon, 
    gamesConfig,
    MainFont,
    nightTime
} from 'index'
import { modalConfirmation } from './sgAPIIndex'

export default function SgConsoleListScreens({route, navigation}, props) {
    const colors = useContext(CurrentThemeContext)
    const sgDB = firebase.firestore()
    const consoleData = sgDB.collection("sgAPI").get()
    const { addGameLinkPressed } = route.params
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
    const clientIdIGDB = `${gamesConfig.igdbClientId}`
    const clientSecretIGDB = `${gamesConfig.igdbClientSecret}`
  
    function consoleLogo() {
        const nightImages = sgDB.collection("sgAPI").orderBy("systemLogoNight", "asc")
        const dayImages = sgDB.collection("sgAPI")
        if (nightTime) {return nightImages}
        if (dayTime) {return dayImages}
    }

    async function igbdbAPI() {
        let accessToken
        await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientIdIGDB}&client_secret=${clientSecretIGDB}&grant_type=client_credentials`)
            .then(res => {
                accessToken = res.data.access_token
                setAccessTokenIGDB(accessToken)
            })
    }

    async function firestoreImages() {
        const nightImages = await sgDB.collection("sgAPI").orderBy('sgId', 'asc')
        .get()
        .then(querySnapshot => {
            const objectsArray = []
            querySnapshot.forEach((doc) => {
                objectsArray.push(doc.data())
            })
            setSgConsoleIcons(objectsArray)
        })
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
          })
          if(isFocused){  
            setModalSelected(false)
            igbdbAPI()
        }
        // Unsubscribe from events when no longer in use
        return () => subscriber()
      }, [isFocused])    

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
        {addGameLinkPressed !== true
            ?   navigation.navigate('sgIGDBSearch',{
                clientIdIGDB: clientIdIGDB,
                accessTokenIGDB: accessTokenIGDB, 
                igdbConsoleId: igdbConsoleId,
                gbConsoleId: gbConsoleId,
                selectedSystemLogo: selectedSystemLogo,
                searchType: searchType
            })
            :   navigation.navigate('Page1',{
                clientIdIGDB: clientIdIGDB,
                accessTokenIGDB: accessTokenIGDB, 
                igdbConsoleId: igdbConsoleId,
                gbConsoleId: gbConsoleId,
                selectedSystemLogo: selectedSystemLogo,
                searchType: searchType
            })
        }
          setModalSelected(true)
    }

    function setConsoleConfirmation(item) {
        const resetConfirmation = resetConsoleId(item)
        const setConfirmation = confirmSetConsoleId(item)
        return modalConfirmation(resetConfirmation, setConfirmation)
    }

    function sgModalScreen() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.primaryColor }}>
                {setConsoleConfirmation()}
            </View>
        )
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
                                        url: `${item.systemLogoSelectedDay}`,
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
  )
 }
 