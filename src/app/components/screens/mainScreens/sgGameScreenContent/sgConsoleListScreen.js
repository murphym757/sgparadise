import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import axios from 'axios'
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFocused } from "@react-navigation/native"
import { CurrentThemeContext, dayTime, faChevronLeft, firebase, FontAwesomeIcon, gamesConfig, MainFont, nightTime } from 'index'
import { modalConfirmation } from './sgAPIIndex'

export default function SgConsoleListScreens({route, navigation}, props) {
    const [ accessTokenIGDB, setAccessTokenIGDB ] = useState('')
    const [ gbConsoleId, setGbConsoleId ] = useState()
    const [ igdbConsoleId, setIgdbConsoleId ] = useState()
    const [ isLoading, setIsLoading ] = useState()
    const [ modalSelected, setModalSelected ] = useState(route.params?.modal)
    const [ searchType, setSearchType ] = useState('sgIGDBSearch')
    const [ selectedSystemLogo, setSelectedSystemLogo ] = useState('')
    const [ sgConsoleIcons, setSgConsoleIcons ] = useState([])
    const { addGameLinkPressed } = route.params
    const clientIdIGDB = `${gamesConfig.igdbClientId}`
    const clientSecretIGDB = `${gamesConfig.igdbClientSecret}`
    const colors = useContext(CurrentThemeContext)
    const consoleData = sgDB.collection("sgAPI").get()
    const images = useContext(AppWideImageContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const sgDB = firebase.firestore()

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
        if(isFocused) {
            setModalSelected(false)
            igbdbAPI()
        }
        // Unsubscribe from events when no longer in use
        return () => subscriber()
    }, [isFocused])

    function setConsoleId(item) {
        navigation.navigate('MyModal')
        setGbConsoleId(item.systemgbId)
        setIgdbConsoleId(item.systemigdbId)
        setSelectedSystemLogo(item.systemLogoSelectedDay)
    }

    function resetConsoleId() {
            setAccessTokenIGDB({ ...accessTokenIGDB })
            setGbConsoleId({ ...gbConsoleId })
            setIgdbConsoleId({ ...igdbConsoleId })
            setSelectedSystemLogo({ ...selectedSystemLogo })
    }

    function confirmSetConsoleId(){
        {addGameLinkPressed !== true
            ?   navigation.navigate('sgIGDBSearch',{
                accessTokenIGDB: accessTokenIGDB,
                clientIdIGDB: clientIdIGDB,
                gbConsoleId: gbConsoleId,
                igdbConsoleId: igdbConsoleId,
                searchType: searchType,
                selectedSystemLogo: selectedSystemLogo,
            })
            :   navigation.navigate('Page1',{
                accessTokenIGDB: accessTokenIGDB,
                clientIdIGDB: clientIdIGDB,
                gbConsoleId: gbConsoleId,
                igdbConsoleId: igdbConsoleId,
                searchType: searchType,
                selectedSystemLogo: selectedSystemLogo,
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

    function consoleListImage(item) {
        const imageData = {
            width: 300,
            height: 85,
            borderRadius: 10,
            marginVertical: 15
        }
        return images.consoleListImageStyling(imageData, item, setIsLoading)
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primaryColor }}>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                {sgHomeModalStack()}
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
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
                                    {consoleListImage(item)}
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