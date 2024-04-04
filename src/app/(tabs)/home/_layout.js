import React, { useContext } from 'react'
import { Stack } from "expo-router"
import { CurrentThemeContext } from 'index'

export default function PageLayout() {
    const colors = useContext(CurrentThemeContext)
    return <Stack 
                screenOptions={{
                    headerStyle: { backgroundColor: colors.primaryColor },
                    headerTintColor: '#fff',
                    headerShown: false,
                    headerShadowVisible: false, //Removes the shadow from the header
                    //headerBackTitleVisible: false, //Removes the back button title
                }}    
            />
}