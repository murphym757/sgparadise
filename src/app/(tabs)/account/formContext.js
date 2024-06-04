import React, { createContext } from 'react'
import { View, Pressable } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { MainFont, MainSubFont } from 'index'

function formErrorMessage(error, index, fontSize, colors) {
    return (
        <MainFont style={{fontSize: fontSize, color: colors.secondaryFontColor}} key={index}>{error}</MainFont>
    )
}

function accountTextField(textInputLabel, textInputValue, textChangeText, textInputError, colors, verticalSpacing, privateData) {
    return (
        <View style={{flex: 1}}>
            <TextInput
                label={textInputLabel}
                value={textInputValue}
                onChangeText={textChangeText}
                textColor={colors.primaryFontColor}
                underlineColor={colors.secondaryColor}
                activeUnderlineColor={colors.secondaryColor}
                style={{backgroundColor: colors.primaryColor}}
                errorMessage={textInputError} // And this line
                secureTextEntry={privateData === true ? true : false}
            />
            <View style={{paddingVertical: verticalSpacing}}>
                {textInputError && textInputError.map((error, index) => formErrorMessage(error, index, 12, colors))}
            </View>
        </View>
    )
}

function inputRow(textInputLabel, textInputValue, textChangeText, key, textInputError, colors, verticalSpacing, privateData) {
    return (
        <View style={{flexDirection: "row"}} key={key}>
            {accountTextField(textInputLabel, textInputValue, textInputValue => textChangeText(textInputValue), textInputError, colors, verticalSpacing, privateData)}
        </View>
    )
}

function inputFormFields(formTitle, formFields, colors, verticalSpacing) {
    return (
        <View>
            <MainFont style={{color: colors.primaryFontColor}}>{formTitle}</MainFont>
            {formFields.map((formField, index) => {
                return inputRow(formField.label, formField.value, formField.onChange, index, formField.errorMessage, colors, verticalSpacing, formField.privateData)
            })}
        </View>
    )
}

function inputFormButton(formButton, formFunction, colors, verticalSpacing) {
    return (
        <View style={{paddingVertical: verticalSpacing}}>
            <Button
                style={{buttonColor: colors.primaryColor, backgroundColor: colors.secondaryColor}}
                mode="contained" 
                onPress={formFunction}>
                    {formButton}
            </Button>
        </View>
    )
}

function inputFormRedirectLink(linkChange, linkValue, linkLabel, verticalSpacing) {
    return (
        <View style={{paddingVertical: verticalSpacing}}>
            <Pressable onPress={ linkChange }>
                <MainFont>{linkValue}</MainFont><MainSubFont>{linkLabel}</MainSubFont>
            </Pressable>
        </View>
    )
}

function inputForm(inputFormData) {
    const linkChange = () => {inputFormData.formFieldsAlt.onChange(); inputFormData.resetErrorCheck(inputFormData.formFieldsAlt.label);}
    const linkChangeForgotPassword = () => {inputFormData.formFieldsAlt.onChangeAlt(); inputFormData.resetErrorCheck(inputFormData.formFieldsAlt.label);}
    return (
        <View style={{justifyContent: "center"}}>
            {inputFormFields(inputFormData.formTitle, inputFormData.formFields, inputFormData.colors, 10)}
            {inputFormData.formRedirect === true 
                ? <View style={{ alignItems: 'flex-end' }}>
                    {inputFormRedirectLink(linkChangeForgotPassword, null, inputFormData.formFieldsAlt.labelAlt, 20)}
                </View>
                : null
            }
            {inputFormButton(inputFormData.formButton, inputFormData.formFunction, inputFormData.colors, 20)}
            {inputFormData.formFieldsAlt !== null
                ? inputFormRedirectLink(linkChange, inputFormData.formFieldsAlt.value, inputFormData.formFieldsAlt.label, 20)
                : null 
            }
            {}
        </View>
    )
}

function inputFormUpdateData(inputFormData) {
    return (
        <View style={{justifyContent: "center"}}>
            {inputFormFields(inputFormData.formTitle, inputFormData.formFields, inputFormData.colors, 10)}
            {inputFormButton(inputFormData.formButton, inputFormData.formFunction, inputFormData.colors, 20)}
        </View>
    )
}

const formStructure = {
    inputForm,
    inputFormUpdateData
}

export const formFieldContext = createContext(formStructure)