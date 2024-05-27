import React, { createContext } from 'react'
import { View, FlatList } from 'react-native'
import { TextInput, Card, Divider, Icon } from 'react-native-paper'
import {
    Container,
    ContentDivider,
    ContentRow,
    CustomInputField,
    FooterFont,
    FooterLink,
    MainFont,
    MainSecondaryFont,
    MainSubFont,
    TouchableButton,
    TouchableButtonFont,
} from 'index';

//*----Account Page----*//

    function userIcon(styleData) {
        const imageData = {
            height: 100,
            width: 100,
            contentFit: 'fill',
            borderRadius: 10,
            transition: 1000,
            imageLink: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/51/assets/src/react-native-logo.2e38e3ef2dc9c7aafd21c14df3a1cdb8.png'
        }
        return styleData.images.detailedGameCover(imageData, imageData.imageLink)
    }

    function userGeneralData(styleData, userData) {
        const username = 'junglefan305'
        const userJoined = 'May 2024'
        return (
            <View>
                    <MainFont style={styleData.styles.subtitle}>User Section</MainFont>
                    <MainSubFont style={{color: styleData.colors.primaryFontColor, paddingVertical:5}}>{userData.user ? userData.user.email : ''}</MainSubFont>
                    <MainFont style={{paddingVertical: 5}}>{username}</MainFont>
                    <MainFont style={{paddingVertical: 5}}>Joined {userJoined}</MainFont>
            </View>
        )
    }

    function upperHalfAccountPage(styleData, userData) {
        return (
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    {userIcon(styleData)}
                </View>
                <View style={{flex: 2}}>
                    {userGeneralData(styleData, userData)}
                </View> 
            </View>
        )
    }

    function cardListing(listingTitle, listingType, setDialogBoxType, setDialogVisible) {
        return (
            <MainFont onPress={() => {console.log(listingTitle); setDialogBoxType(listingType); setDialogVisible(true)}} variant="titleLarge" style={{paddingVertical: 10}}>{listingTitle}</MainFont>
        )
    }

    function editAccountOptions(styleData, setDialogBoxType, setDialogVisible) {
        return (
            <View>
                <Card mode='outlined' style={{backgroundColor: styleData.colors.primaryColor, borderColor: styleData.colors.secondaryColor}}>
                    <Card.Title style={styleData.styles.subtitle} title="Your Account" subtitle="Make any necessary changes to your account" />
                    <Card.Content> 
                        {cardListing('Update Email', 'updateEmail', setDialogBoxType, setDialogVisible)}
                            <Divider style={{ backgroundColor: styleData.colors.secondaryColor }}/>
                        {cardListing('Change Username', 'changeUsername',  setDialogBoxType, setDialogVisible)}
                            <Divider style={{ backgroundColor: styleData.colors.secondaryColor }}/>
                        {cardListing('Delete Account, Make font color different', 'deleteAccount', setDialogBoxType, setDialogVisible)}
                    </Card.Content>
                </Card>
            </View>
        )
    }
    
    function lowerHalfAccountPage(styleData, userData, setDialogBoxType, setDialogVisible) {
        return (
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    {editAccountOptions(styleData, setDialogBoxType, setDialogVisible)}
                </View>
            </View>
        )
    }
//*-------------------*//


const accountPageData = {
    upperHalfAccountPage,
    lowerHalfAccountPage
}

export const accountPageContext = createContext(accountPageData)