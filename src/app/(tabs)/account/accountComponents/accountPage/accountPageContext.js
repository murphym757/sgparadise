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
function pageLink(styleData, linkedData, user, linkContent, nextPagePath) {
    return (
        <Link 
            href={{
                pathname: nextPagePath, 
                params: { 
                    backHeaderTitle: linkedData.currentPageTitle,
                    user: user
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

    function userGeneralData(styleData, user) {
        const userEmail = user.email ? user.email : 'Email'
        const username = user.displayName ? user.displayName : 'Username'
        const userJoined = user.metadata.creationTime ? new Date(user.metadata.creationTime) : 'Date'
        const userJoinedString = userJoined instanceof Date ? userJoined.toLocaleDateString() : userJoined
        
        return (
            <View>
                <MainFont style={styleData.styles.subtitle}>User Section</MainFont>
                <MainSubFont style={{color: styleData.colors.primaryFontColor, paddingVertical:5}}>{userEmail}</MainSubFont>
                <MainFont style={{paddingVertical: 5}}>{username}</MainFont>
                <MainFont style={{paddingVertical: 5}}>Joined {userJoinedString}</MainFont>
            </View>
        )
    }

    function upperHalfAccountPage(styleData, user) {
        return (
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    {userIcon(styleData)}
                </View>
                <View style={{flex: 2}}>
                    {userGeneralData(styleData, user)}
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

    function editAccountOptions(styleData, user, linkData) {
        const updateEmail = user.email ? 'Update Email' : 'Create Email'
        const updateUsername = user.displayName ? 'Update Username' : 'Create Username'

        return (
            <View>
                <Card mode='outlined' style={{backgroundColor: styleData.colors.primaryColor, borderColor: styleData.colors.secondaryColor}}>
                    <Card.Title style={styleData.styles.subtitle} title="Your Account" subtitle="Make any necessary changes to your account" />
                    <Card.Content>
                        {pageLink(styleData, linkData, user, cardListing(updateEmail), linkData.nextPagePathEmail)}
                            <Divider style={{ backgroundColor: styleData.colors.secondaryColor }}/>
                        {pageLink(styleData, linkData, user, cardListing(updateUsername), linkData.nextPagePathUsername)}
                    </Card.Content>
                </Card>
            </View>
        )
    }
    
    function lowerHalfAccountPage(styleData, user, linkData) {
        return (
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    {editAccountOptions(styleData, user, linkData)}
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