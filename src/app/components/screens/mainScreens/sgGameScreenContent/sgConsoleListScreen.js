import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { consoleImages } from './sgAPIIndex'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// App Styling
import {
    SafeAreaViewContainer,
    Container,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont
} from '../../index'

//FontAwesome
import { FontAwesomeIcon, faChevronLeft } from '../../index'

export default function SgConsoleListScreens({route, navigation}) {
    const colors = useContext(CurrentThemeContext)
    const [selectedSystemLogo, setSelectedSystemLogo] = useState('')
    const [gbConsoleId, setGbConsoleId] = useState([])
    const [igdbConsoleId, setIgdbConsoleId] = useState()
    console.log(igdbConsoleId)
    console.log("This is your console id " + igdbConsoleId)

    function setGameId(item) {
        navigation.navigate('MyModal')
        setSelectedSystemLogo(item.systemLogo)
        setGbConsoleId(item.gbId)
        setIgdbConsoleId(item.igdbId)
       }

    function resetGameId() {
        navigation.navigate('SgConsoleOptions') 
        setSelectedSystemLogo({ ...selectedSystemLogo })
        setGbConsoleId({ ...gbConsoleId })
        setIgdbConsoleId({ ...igdbConsoleId })
       }

    function confirmSetGameId(){
        navigation.navigate('SgAddGame', {
            itemId: igdbConsoleId,
            otherParam: 'anything you want here',
          })
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

    function setConsoleConfirmation(item) {
        return (
            <View style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <MainFont>You have selected</MainFont>
                <View style={{ padding: 30 }}>{setConsole()}</View>
                <MainFont style={{}}>Are you sure?</MainFont>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={() => resetGameId(item)}
                        title="No"
                        color="#841584"
                    />
                    <Button
                        onPress={() => confirmSetGameId(item)}
                        title="Yes"
                        color="#841584"
                    />
                </View>
            </View>
            
        )
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
                        <TouchableOpacity onPress={() => setGameId(item)}>
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
    return (
        <ModalStack.Navigator mode="modal" 
            screenOptions={{
                headerShown: false
            }}
        >
        <ModalStack.Screen
          name="SgConsoleOptions"
          component={sgConsolesStack}
          options={{ headerShown: false }}
        />
        <ModalStack.Screen name="MyModal" component={sgModalScreen} />
      </ModalStack.Navigator>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primaryColor }}>
        {sgHomeModalStack()}
        <View style={{alignItems: 'center'}}></View>
    </SafeAreaView>
  );
 }