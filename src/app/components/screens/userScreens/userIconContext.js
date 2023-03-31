import React, { useContext, useEffect, useState } from 'react'
import { 
    Text,
    View,
    Button, 
    Modal, 
    StyleSheet,
    Pressable,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {
    Container,
    CurrentThemeContext,
    windowHeight,
    TouchableButton,
    TouchableButtonFont,
    MainFont
} from 'index'
import { RFValue } from "react-native-responsive-fontsize";
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const IconContext = React.createContext()

export function useIconCreator() {
    return useContext(IconContext)
}

export function IconCreatorProvider({ children, navigation }) {
    const colors = useContext(CurrentThemeContext)
    const [showModal, setShowModal] = useState(false)
    const sgIconName = 'Felix'
    const [iconColorPicker, setIconColorPicker] = useState('')
    const [iconBackground, setIconBackground] = useState('') // This value goes into firebase
    
    // Icon Eyes
    const [eyeSectionOpen, setEyeSectionOpen] = useState(false)
    const [eyeValue, setEyeValue] = useState(null) // This value goes into firebase
    console.log("🚀 ~ file: userIconContext.js:43 ~ IconCreatorProvider ~ eyeValue:", eyeValue)
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
    const [mouthValue, setMouthValue] = useState(null) // This value goes into firebase
    console.log("🚀 ~ file: userIconContext.js:64 ~ IconCreatorProvider ~ mouthValue:", mouthValue)
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
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
        },
      });

     // User Icon
    function sgIconSetter(iconValue) {
        return (
            ["" + iconValue + ""]
        )
    }

    function colorFixer(chosenColor) {
        let humpDay = chosenColor
        if (chosenColor != null) {
            setIconBackground(humpDay.substr(1))
            return humpDay.substr(1)
        } 
    }

    function sgUserIcon() {
        const avatar = createAvatar(botttsNeutral, {
            seed: sgIconName,
            eyes: sgIconSetter(eyeValue),
            mouth: sgIconSetter(mouthValue),
            radius: 10,
            backgroundColor: [colorFixer(""+iconColorPicker.hex+"")]
            // ... other options
        }).toString();
      
        return (
          <Pressable 
            style={{
                width: 75,
                height: 75,
                justifyContent: 'space-around',
                backgroundColor: '#eeeeee',
            }}
            onPress={() => updateProfile(userName)}
            >
              <SvgXml xml={avatar} />
          </Pressable>
        )
    }
    function sgUserIconContainer() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 25}}>
                {sgUserIcon()}
            </View>
        )
    }
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
    function sgUserIconCreatorEyes() {
        const sectionOpen = eyeSectionOpen
        const value = eyeValue
        const iconFeatures = iconEyes
        const setSectionOpen = setEyeSectionOpen
        const setValue = setEyeValue
        const setIconFeatures = setIconEyes
        const placeholderFont = "Select a set of eyes"
        const dropDownDirection = "TOP"
        return (
            sgCustomDropdown(sectionOpen, value, iconFeatures, setSectionOpen, setValue, setIconFeatures, placeholderFont, dropDownDirection)
        )
    }
    function sgUserIconCreatorMouth() {
        const sectionOpen = mouthSectionOpen
        const value = mouthValue
        const iconFeatures = iconMouths
        const setSectionOpen = setMouthSectionOpen
        const setValue = setMouthValue
        const setIconFeatures = setIconMouths
        const placeholderFont = "Select a mouth"
        const dropDownDirection = "BOTTOM"
        return (
            sgCustomDropdown(sectionOpen, value, iconFeatures, setSectionOpen, setValue, setIconFeatures, placeholderFont, dropDownDirection)
        )
    }

    function sgIconCreator() {
        return (
            <View>
                <View style={{paddingHorizontal: 20}}>
                    {sgUserIconContainer()}
                </View>
                <View>
                    <TouchableButton onPress={() => setShowModal(true)}>
                        <TouchableButtonFont>Color Picker</TouchableButtonFont>
                    </TouchableButton>
                    <View>
                        <View style={{flexDirection: 'row', paddingVertical: 20}}>
                            {sgUserIconCreatorEyes()}
                        </View>
                        <View  style={{flexDirection: 'row', paddingVertical: 20}}>
                            {sgUserIconCreatorMouth()}
                        </View>
                    </View>
                    <Modal visible={showModal} animationType='slide' transparent={true}>
                        <ColorPicker style={{ width: '90%', backgroundColor: colors.primaryColor }} value='red' onComplete={setIconColorPicker}>
                            <Preview />
                            <Panel1 />
                            <HueSlider />
                            <OpacitySlider />
                            <Swatches />
                            <TouchableButton onPress={() => setShowModal(false)}>
                                <TouchableButtonFont>Finish</TouchableButtonFont>
                            </TouchableButton>
                        </ColorPicker>
                    </Modal>
                </View>
            </View>
        )
    }

    const value = {
        sgIconCreator
    }

    return (
        <IconContext.Provider value={value}>
            {children}
        </IconContext.Provider>
    )
}