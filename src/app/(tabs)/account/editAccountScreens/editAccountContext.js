import React, { createContext, useContext } from 'react';
import { CurrentThemeContext } from 'index';
import { formFieldContext } from '../formContext'
import { appWideComponentsContext } from '../../reuseableComponents/appComponentsContext'

function editAccountForm(formButtonLink, formFieldLabel, formTitle, formFunction, formData) {
    const formStructure = useContext(formFieldContext)
    const colors = useContext(CurrentThemeContext)
    const appWideButton = useContext(appWideComponentsContext)

    const formFields = [
        { label: formFieldLabel, value: formData.newValue, onChange: formData.onChangeNewValue, errorMessage: formData.errorCheck, privateData: false}
    ]
    const buttonData = {
        backgroundColor: colors.secondaryColor,
        buttonErrors: formFields[0].errorMessage,
        buttonColor: colors.primaryColor,
        buttonFunction: formFunction,
        buttonLink: formButtonLink,
        buttonTitle: formTitle,
        buttonVerticalSpacing: 20
    }
    const inputFormData = {
        formTitle, 
        formFields,
        formButton: appWideButton.sgButton(buttonData),
        formRedirect: null, 
        formFieldsAlt: null, 
        formType: null, 
        colors
    }
    return formStructure.inputFormUpdateData(inputFormData)
}
const editAccountData = {
    editAccountForm
}
export const editAccountContext = createContext(editAccountData)