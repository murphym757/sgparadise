import React, { createContext, useContext, useState } from 'react'
import { View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as SecureStore from 'expo-secure-store'


//* JWT (For decoding the Apple auth token)
import { jwtDecode } from "jwt-decode"

const AppleAuthContext = createContext()

export function useAppleAuth() {
    return useContext(AppleAuthContext)
}

export function AppleAuthProvider({ children }) {
    const [appleAuthAvailable, setAppleAuthAvailable] = useState()
    const [appleTokenExpirationDate, setAppleTokenExpirationDate] = useState()
    const [appleUserEmail, setAppleUserEmail] = useState()
    console.log("🚀 ~ AppleAuthProvider ~ appleUserEmail:", appleUserEmail)
    const [appleUserToken, setAppleUserToken] = useState()
    const currentTime = Date.now() / 1000

    //* Checks Apple Auth Availability
    async function checkAppleAuthAvailability() {
        const isAvailable = await AppleAuthentication.isAvailableAsync()
        setAppleAuthAvailable(isAvailable)

        if (isAvailable) {
            const credentialJson = await SecureStore.getItemAsync('apple-credentials')
            setAppleUserToken(JSON.parse(credentialJson))
        }
    }

    //* Auth 
    //TODO: Send the user email (and genreate a 'sgID' for the user) to the firebase database
    //TODO: Create a function that will check if the user is already in the database (if so, then don't add them)
    function appleAuthButton() {
        return (
            <View>
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={{height: 35}}
                    onPress={async () => {
                        try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        })
                        const decoded = jwtDecode(credential.identityToken)
                        setAppleUserEmail(decoded.email)
                        setAppleUserToken(credential)
                        setAppleTokenExpirationDate((currentTime >= decoded.exp).toString())
                        SecureStore.setItemAsync('apple-credentials', JSON.stringify(credential))
                        // signed in
                        } catch (e) {
                            if (e.code === 'ERR_REQUEST_CANCELED') {
                                // handle that the user canceled the sign-in flow
                            } else {
                                // handle other errors
                            }
                        }
                    }}
                />
            </View>
        )
    }

    //* Gets Apple Credential State
    async function getAppleCredentialState() {
        const credentialState = await AppleAuthentication.getCredentialStateAsync(appleUserToken.user)
        return credentialState
    }

    //*Logouts Apple User
    async function logoutAppleUser() {
        await SecureStore.deleteItemAsync('apple-credentials')
        setAppleUserEmail(null)
        setAppleUserToken(null)
        setAppleTokenExpirationDate(null)
    }

    //* Calls for refreshing the token
    async function refreshAppleToken() {
        const credentialState = await AppleAuthentication.refreshAsync({user: appleUserToken.user})
        setAppleUserToken(credentialState)
        SecureStore.setItemAsync('apple-credentials', JSON.stringify(credentialState))
    }
    const value = {
        appleAuthAvailable,
        appleAuthButton,
        appleTokenExpirationDate, 
        appleUserEmail,
        appleUserToken,
        checkAppleAuthAvailability,
        getAppleCredentialState,
        logoutAppleUser,
        refreshAppleToken
    }

    return (
        <AppleAuthContext.Provider value={value}>
            {children}
        </AppleAuthContext.Provider>
    )

}

