import React, { useContext, useEffect, useState } from 'react'
import { 
    Text,
    View,
    Pressable,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {
    Container,
    CurrentThemeContext
} from 'index'
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';

const IconContext = React.createContext()

export function useIconCreator() {
    return useContext(IconContext)
}

export function IconCreatorProvider({ children, navigation }) {
    const colors = useContext(CurrentThemeContext)
    const sgIconName = 'Felix'
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

     // User Icon
    function sgIconSetter(iconValue) {
        return (
            ["" + iconValue + ""]
        )
    }
    function sgUserIcon() {
        const avatar = createAvatar(botttsNeutral, {
            seed: sgIconName,
            eyes: sgIconSetter(eyeValue),
            mouth: sgIconSetter(mouthValue),
            radius: 10
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
    function sgUserIconCreatorEyes() {
        return (
          <DropDownPicker
            open={eyeSectionOpen}
            value={eyeValue}
            items={iconEyes}
            setOpen={setEyeSectionOpen}
            setValue={setEyeValue}
            setItems={setIconEyes}
            style={{
                backgroundColor: colors.primaryColor,
            }}
            dropDownContainerStyle={{
                backgroundColor: "#dfdfdf"
            }}
          />
        )
    }
    function sgUserIconCreatorMouth() {
        return (
          <DropDownPicker
            open={mouthSectionOpen}
            value={mouthValue}
            items={iconMouths}
            setOpen={setMouthSectionOpen}
            setValue={setMouthValue}
            setItems={setIconMouths}
            placeholder="Select an items"
            style={{
              backgroundColor: colors.primaryColor,
              borderColor: colors.black,
              fontColor: "#dfdfdf"
            }}
            dropDownContainerStyle={{
              backgroundColor: "#dfdfdf",
              borderColor: colors.black,
              color: colors.primaryColor,
            }}
            labelStyle={{
              fontWeight: "bold"
            }}
            textStyle={{
              fontSize: 15
            }}
          />
        )
    }

    function sgIconCreator() {
        return (
          <Container>
            <View>
                <View style={{paddingHorizontal: 20}}>
                    {sgUserIconContainer()}
                </View>
                <View>
                <View style={{flexDirection: 'row'}}>
                    {sgUserIconCreatorEyes()}
                </View>
                <View  style={{flexDirection: 'row'}}>
                    {sgUserIconCreatorMouth()}
                </View>
                </View>
            </View>
        </Container>
        )
    }
    function textTest() {
        return (
            <Text>If you see this, it works. More to do tho</Text>
        )
    }

    const value = {
        sgIconCreator,
        textTest
    }

    return (
        <IconContext.Provider value={value}>
            {children}
        </IconContext.Provider>
    )
}