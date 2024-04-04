import React, { useContext } from "react"
import { Tabs } from "expo-router"
import { CurrentThemeContext } from 'index'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function TabsLayout() {
    const colors = useContext(CurrentThemeContext)
    function tabScreen(tabName, tabBarLabelName, faIconName) {
        return (
            <Tabs.Screen
                name={tabName}
                options={{
                    tabBarLabel: tabBarLabelName,
                    title: tabBarLabelName,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome6 name={faIconName} color={color} size={size} solid />
                    )
                }}
            />
        )
    }

    return (
        <Tabs 
            screenOptions={{ 
                headerShown: false, 
                tabBarActiveTintColor: colors.primaryColorAlt,
                tabBarInactiveTintColor: colors.secondaryColor,
                tabBarStyle: {
                    backgroundColor: colors.primaryColor,
                    borderTopWidth: 0
                }
            }}
        >
            {tabScreen('home', 'Home', 'house')}
            {tabScreen('search', 'Search', 'magnifying-glass')}
            {tabScreen('account', 'Account', 'user')}
        </Tabs>
    )
}
