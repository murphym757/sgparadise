import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { consoleImages } from './sgAPIIndex'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// App Styling
import {
    SgGameSearchScreen,
    SafeAreaViewContainer,
    Container,
    ContentContainer,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont
} from '../../index'

import {
    setImage,
    modalConfirmation
} from './sgAPIIndex'

import { loadingScreen } from '../../authScreens/loadingScreen' //Loader

//FontAwesome
import { FontAwesomeIcon, faChevronLeft } from '../../index'

export default function SgConsoleListScreens({route, navigation}) {
    const colors = useContext(CurrentThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSystemLogo, setSelectedSystemLogo] = useState('')
    const [gbConsoleId, setGbConsoleId] = useState()
    const [igdbConsoleId, setIgdbConsoleId] = useState()
    const [modalSelected, setModalSelected] = useState(route.params?.modal)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
        setModalSelected(false)
    })

    function setConsoleId(item) {
        navigation.navigate('MyModal')
        setSelectedSystemLogo(item.systemLogo)
        setGbConsoleId(item.gbId)
        setIgdbConsoleId(item.igdbId)
    }

    function resetConsoleId() {
        navigation.navigate('SgConsoleOptions') 
            setSelectedSystemLogo({ ...selectedSystemLogo })
            setGbConsoleId({ ...gbConsoleId })
            setIgdbConsoleId({ ...igdbConsoleId })
    }

    function confirmSetConsoleId(){
        navigation.navigate('SgGameSearch',{ 
            igdbConsoleId: igdbConsoleId,
            gbConsoleId: gbConsoleId,
            selectedSystemLogo: selectedSystemLogo,
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
        {isLoading == true
            ?   <ContentContainer>
                    {loadingScreen()}
                </ContentContainer>
            :   sgHomeModalStack()
        }
        <View style={{alignItems: 'center'}}></View>
    </SafeAreaView>
  );
 }
 