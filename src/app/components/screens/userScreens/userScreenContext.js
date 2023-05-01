import React from 'react';
import { View, Pressable } from 'react-native';
import {
    MainFont,
    MainSubFont,
    CustomInputField
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
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <View style={{flexDirection: 'row'}}>
          {row1LinkRelative(passingSectionData.cancelUpdate, passingSectionData.colors.primaryFontColor, 'Cancel')}
        </View>
      </View>
    )
  }

  function editPersonalRow2(passingSectionData) {
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {row1LinkAbsolute(passingSectionData.hasFunctionTrue, null, passingSectionData.colors.primaryFontColor, 'User Image Goes Here')}
        </View>
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
        <View>
          {passingSectionData.customSGFormFieldUsername()}
          {passingSectionData.errorEmailCheck !== null ? passingSectionData.errorMessageDataMain(passingSectionData.errorEmailCheck, 'email', passingSectionData.errorEmailCheck) : null}
          {passingSectionData.errorPasswordAuthCheck.length !== 0 ? passingSectionData.errorMessageDataMain(passingSectionData.errorPasswordAuthCheck, 'password', passingSectionData.errorPasswordAuthCheck) : null}
          </View>
      </View>
    )
  }

  function editPersonalRow5(passingSectionData) {
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

  function editPersonalRow6(passingSectionData) {
    return (
      <View style={{paddingBottom: passingSectionData.rowPadding}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {row1LinkAbsolute(passingSectionData.hasFunctionTrue, passingSectionData.updateProcess, passingSectionData.colors.secondaryColor, 'Update')}
        </View>
      </View>
    )
  }

  //* Form Field Function
  function sgFormFieldSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors) {
    return (
      <View>
        <CustomInputField
          placeholder={sgPlaceholderFiled}
          secureTextEntry
          placeholderTextColor={colors}
          onChangeText={sgChangeTextField}
          required
          value={sgValueField}
          color={colors}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {sgErrorMessageField}
      </View>
    )
  }

  function sgFormFieldNonSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors) {
    return (
      <View>
        <CustomInputField
          placeholder={sgPlaceholderFiled}
          placeholderTextColor={colors}
          onChangeText={sgChangeTextField}
          required
          value={sgValueField}
          color={colors}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {sgErrorMessageField}
      </View>
    )
  }

  function customSGFormField(passingSectionData, bummp) {
    const sgPlaceholderFiled = passingSectionData.placeholder
    const sgChangeTextField = bummp
    const sgValueField = passingSectionData.value
    const sgErrorMessageField = passingSectionData.errorMessageVariable
    const isSensitiveData = passingSectionData.isSensitiveData
    const colors = passingSectionData.colors.primaryColor

    if (isSensitiveData == true) {
      return (
        sgFormFieldSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors)
      )
    } else {
      return (
        sgFormFieldNonSecure(sgPlaceholderFiled, sgChangeTextField, sgValueField, sgErrorMessageField, colors)
      )
    }
  }

  //*----------------------------------------------//

const userSection = {
    row1LinkRelative, 
    row1LinkAbsolute,
    editPersonalRow1,
    editPersonalRow2,
    editPersonalRow3,
    editPersonalRow4,
    editPersonalRow5,
    editPersonalRow6, 
    customSGFormField,
}

export const UserScreenContext = React.createContext(userSection)