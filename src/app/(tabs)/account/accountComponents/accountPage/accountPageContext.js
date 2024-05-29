import React, { createContext } from 'react'
import { View, FlatList } from 'react-native'
import { TextInput, Card, Divider, Icon } from 'react-native-paper'
import { useLocalSearchParams, Link, Stack } from "expo-router"

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

//* Link to next page
function pageLink(styleData, linkedData, userData, linkContent, nextPagePath) {
    return (
        <Link 
            href={{
                pathname: nextPagePath, 
                params: { 
                    backHeaderTitle: linkedData.currentPageTitle,
                    user: userData.user
                }
            }} 
            style={{color: styleData.colors.primaryFontColor}}>
            {linkContent}
        </Link>
    )
}

//TODO: Implement a modal for the user to update their email, username, and delete their account
//TODO: Implement a dialog box showing the changes the user has made to their account and ask them for confirmation of the changes
//TODO: FOr the delete account, pro vide a warning that the user will lose all their data and ask for confirmation

//*----User Changes Modal----*//

//*----User Changes Modal----*//

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

    function cardListing(listingTitle) {
        return (
            <View style={{paddingVertical: 10}}>
                <MainFont variant="titleLarge">{listingTitle}</MainFont>
            </View>
        )
    }

    function editAccountOptions(styleData, userData, linkData) {
        return (
            <View>
                <Card mode='outlined' style={{backgroundColor: styleData.colors.primaryColor, borderColor: styleData.colors.secondaryColor}}>
                    <Card.Title style={styleData.styles.subtitle} title="Your Account" subtitle="Make any necessary changes to your account" />
                    <Card.Content>
                        {pageLink(styleData, linkData, userData, cardListing('Update Email'), linkData.nextPagePathEmail)}
                            <Divider style={{ backgroundColor: styleData.colors.secondaryColor }}/>
                        {pageLink(styleData, linkData, userData, cardListing('Change Username'), linkData.nextPagePathUsername)}
                    </Card.Content>
                </Card>
            </View>
        )
    }
    
    function lowerHalfAccountPage(styleData, userData, linkData) {
        return (
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    {editAccountOptions(styleData, userData, linkData)}
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