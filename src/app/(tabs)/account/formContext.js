import React, { createContext } from 'react'
import { View, Pressable } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { MainFont, MainSubFont } from 'index'

function formErrorMessage(error, index, fontSize, colors) {
    return (
        <MainFont style={{fontSize: fontSize, color: colors.secondaryFontColor, paddingVertical: 5}} key={index}>{error}</MainFont>
    )
}

function accountTextField(textInputLabel, textInputValue, textChangeText, textInputError, colors) {
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
            />
            <View style={{paddingVertical: 10}}>
                {textInputError && textInputError.map((error, index) => formErrorMessage(error, index, 12, colors))}
            </View>
        </View>
    )
}

function inputRow(textInputLabel, textInputValue, textChangeText, key, textInputError, colors) {
    return (
        <View style={{flexDirection: "row"}} key={key}>
            {accountTextField(textInputLabel, textInputValue, textInputValue => textChangeText(textInputValue), textInputError, colors)}
        </View>
    )
}

function inputFormFields(formTitle, formFields, colors) {
    return (
        <View>
            <MainFont style={{color: colors.primaryFontColor}}>{formTitle}</MainFont>
            {formFields.map((formField, index) => {
                return inputRow(formField.label, formField.value, formField.onChange, index, formField.errorMessage, colors)
            })}
        </View>
    )
}

function inputFormButton(formButton, formFunction, colors) {
    return (
        <View style={{paddingTop: 20}}>
            <Button
                style={{buttonColor: colors.primaryColor, backgroundColor: colors.secondaryColor}}
                mode="contained" 
                onPress={formFunction}>
                    {formButton}
            </Button>
        </View>
    )
}

function inputFormRedirectLink(inputFormData, linkChange, linkValue, linkLabel) {
    return (
        <View style={{paddingTop: 20}}>
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
        <View style={{justifyContent: "center", paddingBottom: 50}}>
            {inputFormFields(inputFormData.formTitle, inputFormData.formFields, inputFormData.colors)}
            {inputFormData.formRedirect === true 
                ? <View style={{ alignItems: 'flex-end', paddingBottom: 25 }}>
                    {inputFormRedirectLink(inputFormData, linkChangeForgotPassword, null, inputFormData.formFieldsAlt.labelAlt)}
                </View>
                : null}
            {inputFormButton(inputFormData.formButton, inputFormData.formFunction, inputFormData.colors)}
            {inputFormRedirectLink(inputFormData, linkChange, inputFormData.formFieldsAlt.value, inputFormData.formFieldsAlt.label)}
        </View>
    )
}

const formStructure = {
    inputForm
}

export const formFieldContext = createContext(formStructure)