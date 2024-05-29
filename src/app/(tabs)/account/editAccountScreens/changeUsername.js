import React, { useEffect, useContext, useState } from "react"
import { useLocalSearchParams, Link, Stack } from "expo-router"
import { StyleSheet, Text, Dimensions, View, Pressable, Animated } from "react-native"
import { Button, TextInput, Modal, Portal } from "react-native-paper"
import { CurrentThemeContext, Container, MainFont, MainSubFont } from 'index'
import { PageStructureContext } from '../../reuseableComponents/pageStructure'


export default function UpdateUsernamePage() {
    const pageStructure = useContext(PageStructureContext)
    const params = useLocalSearchParams()
    const { 
        backHeaderTitle, 
        user
    } = params
    const isNextPage = true

    function updateUsernameContent() {
        return (
            <Container>
                <MainFont>Update Username Page</MainFont>
            </Container>
        )
    }
    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, updateUsernameContent())
}