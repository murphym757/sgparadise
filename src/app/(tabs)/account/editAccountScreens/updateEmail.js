import React, { useEffect, useContext, useState } from "react"
import { useLocalSearchParams, Link, Stack } from "expo-router"
import { StyleSheet, Text, Dimensions, View, Pressable, Animated } from "react-native"
import { Button, TextInput, Modal, Portal } from "react-native-paper"
import { CurrentThemeContext, Container, MainFont, MainSubFont } from 'index'
import { PageStructureContext } from '../../reuseableComponents/pageStructure'


export default function UpdateEmailPage() {
    const pageStructure = useContext(PageStructureContext)
    const params = useLocalSearchParams()
    const { 
      backHeaderTitle, 
      user
    } = params
    const isNextPage = true

    function updateEmailContent() {
        return (
            <Container>
                <MainFont>Update Email Page</MainFont>
            </Container>
        )
    }
    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, updateEmailContent())
}