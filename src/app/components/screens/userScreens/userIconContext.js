import React, { useContext, useState } from 'react';
import { View, Pressable } from 'react-native';
import { CurrentThemeContext, windowHeight, TouchableButton, TouchableButtonFont } from 'index';
import { RFValue } from "react-native-responsive-fontsize";
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import ColorPicker, { Panel3 } from 'reanimated-color-picker';
import { useAuth } from 'auth/authContext'

const IconContext = React.createContext()

export function useIconCreator() {
    return useContext(IconContext)
}

export function IconCreatorProvider({ children }) {
    const { 
        currentUser,
        updateUserIconFirestore
    } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const [showModal, setShowModal] = useState(false)
    const sgIconName = 'Felix'
    const [iconColorPicker, setIconColorPicker] = useState('')
    const [iconBackground, setIconBackground] = useState('')
    
    //* Icon Creator Facial Features
        // Icon Eyes
        const [eyeSectionOpen, setEyeSectionOpen] = useState(false)
        const [eyeValue, setEyeValue] = useState(null)
        const [iconEyes, setIconEyes] = useState([
            {label: 'Eyes', value: 'eyes', disabled: true},
            {label: 'Bulging', value: 'bulging', parent: 'eyes'},
            {label: 'Dizzy', value: 'dizzy', parent: 'eyes'},
            {label: 'Eva', value: 'eva', parent: 'eyes'},
            {label: 'Frame1', value: 'frame1', parent: 'eyes'},
            {label: 'Frame2', value: 'frame2', parent: 'eyes'},
            {label: 'Glow', value: 'glow', parent: 'eyes'},
            {label: 'Happy', value: 'happy', parent: 'eyes'},
            {label: 'Hearts', value: 'hearts', parent: 'eyes'},
            {label: 'Robocop', value: 'robocop', parent: 'eyes'},
            {label: 'Round', value: 'round', parent: 'eyes'},
            {label: 'RoundFrame01', value: 'roundFrame01', parent: 'eyes'},
            {label: 'RoundFrame02', value: 'roundFrame02', parent: 'eyes'},
            {label: 'Sensor', value: 'sensor', parent: 'eyes'},
            {label: 'Shade01', value: 'shade01', parent: 'eyes'}
        ])
        // Icons Mouth
        const [mouthSectionOpen, setMouthSectionOpen] = useState(false)
        const [mouthValue, setMouthValue] = useState(null)
        const [iconMouths, setIconMouths] = useState([
            {label: 'Mouths', value: 'mouths', disabled: true},
            {label: 'Bite', value: 'bite', parent:'mouths'},
            {label: 'Diagram', value: 'diagram', parent:'mouths'},
            {label: 'grill01', value: 'grill01', parent:'mouths'},
            {label: 'grill02', value: 'grill02', parent:'mouths'},
            {label: 'grill03', value: 'grill03', parent:'mouths'},
            {label: 'smile01', value: 'smile01', parent:'mouths'},
            {label: 'smile02', value: 'smile02', parent:'mouths'},
            {label: 'square01', value: 'square01', parent:'mouths'},
            {label: 'square02', value: '2', parent:'mouths'}
        ])
    //*---------------------Icon Creator Facial Features---------------------*//

     // User Icon
    function sgIconSetter(iconValue) {
        return (
            ["" + iconValue + ""]
        )
    }

    function colorFixer(chosenColor) {
        let iconColor = chosenColor
        if (chosenColor != null) {
            setIconBackground(iconColor.substr(1))
            return iconColor.substr(1)
        } 
    }

    //* Icon Creator Dropdown Section
        function sgCustomDropdown(sectionOpen, value, iconFeatures, setSectionOpen, setValue, setIconFeatures, placeholderFont, dropDownDirection) {
            return (
                <DropDownPicker
                    open={sectionOpen}
                    value={value}
                    items={iconFeatures}
                    setOpen={setSectionOpen}
                    setValue={setValue}
                    setItems={setIconFeatures}
                    placeholder={placeholderFont}
                    dropDownDirection={dropDownDirection}
                    style={{
                        backgroundColor: colors.primaryColor,
                        borderColor: colors.black,
                        color: colors.primaryFontColor,
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: colors.primaryColor,
                        borderColor: colors.black,
                        color: colors.primaryFontColor,
                    }}
                    labelStyle={{
                        fontSize: `${RFValue(15, windowHeight)}`,
                        fontWeight: 500,
                        fontFamily: 'SpartanRegular'
                    }}
                    textStyle={{
                        fontSize: `${RFValue(15, windowHeight)}`,
                        fontWeight: 500,
                        fontFamily: 'SpartanRegular',
                        color: colors.primaryFontColor
                    }}
                />
            )
        }
        function sgUserIconCreator(sectionOpen, value, iconFeatures, setSectionOpen, setValue, setIconFeatures, placeholderFont, dropDownDirection) {
            const iconCreatorSectionOpen = sectionOpen
            const iconCreatorValue = value
            const iconCreatorIconFeatures = iconFeatures
            const iconCreatorSetSectionOpen = setSectionOpen
            const iconCreatorSetValue = setValue
            const iconCreatorSetIconFeatures = setIconFeatures
            const iconCreatorPlaceholderFont = placeholderFont
            const iconCreatorDropDownDirection = dropDownDirection
            return (
                sgCustomDropdown(iconCreatorSectionOpen, iconCreatorValue, iconCreatorIconFeatures, iconCreatorSetSectionOpen, iconCreatorSetValue, iconCreatorSetIconFeatures, iconCreatorPlaceholderFont, iconCreatorDropDownDirection)
            )
        }
        function sgUserIconCreatorEyes() {
            const placeholderFont = "Select a set of eyes"
            const dropDownDirection = "TOP"
            return (
                sgUserIconCreator(eyeSectionOpen, eyeValue, iconEyes, setEyeSectionOpen, setEyeValue, setIconEyes, placeholderFont, dropDownDirection)
            )
        }
        function sgUserIconCreatorMouth() {
            const placeholderFont = "Select a mouth"
            const dropDownDirection = "TOP"
            return (
                sgUserIconCreator(mouthSectionOpen, mouthValue, iconMouths, setMouthSectionOpen, setMouthValue, setIconMouths, placeholderFont, dropDownDirection)
            )
        }
    //*------------Icon Creator Dropdown Section------------//

    function iconCreatorRow(iconFunction) {
        return (
            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                {iconFunction}
            </View>
        )
    }

    function colorPickerFunc() {
        return (
            <View>
                <ColorPicker style={{ width: '90%', backgroundColor: "transparent" }} value='red' onComplete={setIconColorPicker}>
                    <Panel3 style={{ width: '50%' }} />
                </ColorPicker>
            </View>
        )
    }

    

    //* Icon Creator Page Structure
        //* IMPORTANT ------ This function will display the user icon throughout the app. It best to replicate this and add it to the authcontext.js file
            function sgUserIcon(avatar) {
                return (
                    <Pressable 
                        style={{
                            width: 75,
                            height: 75,
                            justifyContent: 'space-around',
                            backgroundColor: colors.primaryColor,
                        }}
                        onPress={() => updateProfile(userName)}>
                            <SvgXml xml={avatar} />
                    </Pressable>
                )
            }
        //*

        function sgUserIconContainer(avatar) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 25}}>
                    {sgUserIcon(avatar)}
                </View>
            )
        }
        function sgIconCreatorPreview(avatar) {
            return (
                <View style={{ paddingHorizontal: 20 }}>
                    {sgUserIconContainer(avatar)}
                </View>
            )
        }
        function sgIconCreatorDropdowns() {
            return (
                <View>
                    {iconCreatorRow(sgUserIconCreatorEyes())}
                    {iconCreatorRow(sgUserIconCreatorMouth())}
                </View>
            )
        }

        function sgIcronCreatorColorPicker() {
            return (
                <View style={{paddingVertical: RFValue(100, windowHeight), paddingLeft: RFValue(125, windowHeight)}}>
                    {colorPickerFunc()}
                </View>
            )
        }

        //* It was easier to pass the "navaigation" prop from the parent component rather than the child component. This is because the child component is a function and not a component. This is a workaround to pass the navigation prop to the child component.
            function firebaseIconData(avatar, setChangeIconButtonPressed, navigation) {
                const userIconData = {
                    eyeValue,
                    mouthValue,
                    iconBackground,
                    avatar
                }
                const userID = currentUser.uid
                const buttonName = 'Set User Icon'
                return (
                    <TouchableButton onPress={() => {updateUserIconFirestore(userID, userIconData), setChangeIconButtonPressed(false), navigation.goBack()} }>
                        <TouchableButtonFont>{buttonName}</TouchableButtonFont>
                    </TouchableButton>
                )
            }
        //*
        function sgIconCreatorButton(avatar, setChangeIconButtonPressed, navigation) {
            return (
                <View style={{paddingTop: RFValue(25, windowHeight), paddingBottom: RFValue(50, windowHeight)}}>
                    {firebaseIconData(avatar, setChangeIconButtonPressed, navigation)}
                </View>
            )   
        }

        function sgIconCreator(setChangeIconButtonPressed, navigation) {
            const avatar = createAvatar(botttsNeutral, {
                seed: sgIconName,
                eyes: sgIconSetter(eyeValue), //* This data will come from firebase
                mouth: sgIconSetter(mouthValue), //* This data will come from firebase
                radius: 10,
                backgroundColor: [colorFixer(""+iconColorPicker.hex+"")] //* This data will come from firebase
                // ... other options
            }).toString();
            return (
                <View>
                    {sgIconCreatorPreview(avatar)}
                    {sgIconCreatorDropdowns()}
                    {sgIcronCreatorColorPicker()}
                    {sgIconCreatorButton(avatar, setChangeIconButtonPressed, navigation)}
                </View>
            )
        }
    //*------------Icon Creator Page Structure------------//

    const value = {
        sgIconCreator
    }

    return (
        <IconContext.Provider value={value}>
            {children}
        </IconContext.Provider>
    )
}