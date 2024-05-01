import React, { useContext } from 'react'
import { Image } from 'expo-image'
import { Stack } from 'expo-router'
import { Tabs } from 'expo-router/tabs';
import { CurrentThemeContext } from 'index'

//* React Navigation 
import { ThemeProvider, DefaultTheme } from "@react-navigation/native"

//* Providers (Important Breakdown AuthProvider)
import { AuthProvider } from './components/screens/authScreens/authContext'
import { IconCreatorProvider } from './components/screens/userScreens/userIconContext'
import { LoaderProvider } from '../server/config/loaderContext'
import { TagsProvider } from './components/screens/authScreens/tagsContext'
import { AppleAuthProvider } from './components/screens/authScreens/appleAuthContext'

import { Provider as PaperProvider } from 'react-native-paper'
//
export const unstable_settings = {
    initialRouteName: "home",
}

//* App Wide Header
    function LogoTitle() {
        const appWideLogo = 'https://reactnative.dev/img/tiny_logo.png'
        return (
            <Image
                style={{ width: 40, height: 40 }}
                source={{ uri: appWideLogo }}
            />
        )
    }

    function AppStack({ colors }) {
        return (
            <Stack 
                screenOptions={{
                    headerStyle: { 
                        backgroundColor: colors.primaryColor,
                        paddingVertical: 10,
                    },
                    headerTintColor: '#fff',
                    headerShadowVisible: false, //Removes the shadow from the header
                    //headerBackTitleVisible: false, //Removes the back button title
                    headerTitle: props => <LogoTitle {...props} />,
                }}    
                initialRouteName="home" 
            />
        )
    }
//*------App Wide Header------*//

function AppProviders() {
    const colors = useContext(CurrentThemeContext)
    const sgParadiseAppTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.primaryColor,
        },
    }
    return (
        <ThemeProvider value={sgParadiseAppTheme}>
            <LoaderProvider>
                <AuthProvider>
                    <AppleAuthProvider>
                        <IconCreatorProvider>
                            <TagsProvider>
                                <AppStack colors={colors} />
                            </TagsProvider>
                    </IconCreatorProvider>
                    </AppleAuthProvider>
                </AuthProvider>
            </LoaderProvider>
        </ThemeProvider>
    )
}

export default function Layout() {
    return (
        <PaperProvider>
            <AppProviders />
        </PaperProvider>
    )
}
