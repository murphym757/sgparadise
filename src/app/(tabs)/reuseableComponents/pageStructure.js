import React, { useContext } from "react"
import { Stack } from "expo-router"
import { View } from "react-native"
import { CurrentThemeContext } from 'index'

function pageStackStructure(isNextPage, nextPageHeaderBackTitle, pageProps) {
    const colors = useContext(CurrentThemeContext)
    const nextPageStack = isNextPage
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen 
                options={
                    nextPageStack == true 
                        ? ({
                            headerBackTitle: nextPageHeaderBackTitle,
                            headerTintColor: colors.secondaryColor,
                            headerShown: true, 
                            title: '' 
                        })
                        : ({headerShown: false, })
                }
            />
            {pageProps}
        </View>
    )
}

export const pageData = {pageStackStructure}
export const PageStructureContext = React.createContext(pageData)