import React from 'react';
import { View, Pressable } from 'react-native';
import {
    MainFont,
    MainSubFont,
    CustomInputField,
    ContentRow
  } from 'index';

function row1LinkRelative(linkFunction, linkColor, linkFont) {
    return (
      <View style={{position: 'relative', flex: 1}}>
        <Pressable onPress={linkFunction}>
          <MainSubFont style={{color: linkColor}}>{linkFont}</MainSubFont>
        </Pressable>
      </View>
    )
  }

  function row1LinkAbsolute(hasFunction, linkFunction, linkColor, linkFont) {
    return (
      <View style={{flex: 1, position: 'absolute'}}>
        {hasFunction == true
          ? <Pressable onPress={linkFunction}>
              <MainSubFont style={{color:linkColor}}>{linkFont}</MainSubFont>
            </Pressable>
          : <View>
              <MainSubFont style={{color: linkColor}}>{linkFont}</MainSubFont>
            </View>
        }
      </View>
    )
  }

  function editPersonalRow1(passingSectionData) {
    //! Change "Cancel" button to "Back" button
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <ContentRow>
          {row1LinkRelative(passingSectionData.cancelUpdate, passingSectionData.colors.primaryFontColor, 'Cancel')}
        </ContentRow>
      </View>
    )
  }

  function editPersonalRow2(passingSectionData) {
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <ContentRow style={{justifyContent: 'center', alignItems: 'center'}}>
          {row1LinkAbsolute(passingSectionData.hasFunctionTrue, null, passingSectionData.colors.primaryFontColor, 'User Image Goes Here')}
        </ContentRow>
      </View>
    )
  }

  function editPersonalRow3(passingSectionData) {
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={() => {passingSectionData.setChangeIconButtonPressed(true), passingSectionData.setChangePersonalInfoButtonPressed(false)}}>
            <MainFont style={{color: passingSectionData.colors.secondaryColor}}>Edit Avatar</MainFont>
          </Pressable>
        </View>
      </View>
    )
  }

  function editPersonalRow4(passingSectionData) {
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={() => {passingSectionData.setChangePersonalInfoButtonPressed(true), passingSectionData.setChangeIconButtonPressed(false)}}>
            <MainSubFont>Personal information settings</MainSubFont>
          </Pressable>
          </View>
      </View>
    )
  }

  function editPersonalRow5(passingSectionData) {
    //! Remove "Update" link from page
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <ContentRow style={{justifyContent: 'center', alignItems: 'center'}}>
          {row1LinkAbsolute(passingSectionData.hasFunctionTrue, passingSectionData.updateProcess, passingSectionData.colors.secondaryColor, 'Update')}
        </ContentRow>
      </View>
    )
  }

  //* Form Field Function
  
  //*----------------------------------------------//

const userSection = {
    row1LinkRelative, 
    row1LinkAbsolute,
    editPersonalRow1,
    editPersonalRow2,
    editPersonalRow3,
    editPersonalRow4,
    editPersonalRow5,
}

export const UserScreenContext = React.createContext(userSection)