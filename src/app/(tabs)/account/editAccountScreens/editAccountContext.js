import React, { createContext, useContext } from 'react';
import { CurrentThemeContext } from 'index';
import { formFieldContext } from '../formContext'
function editAccountForm(formFieldLabel, formTitle, formFunction, formData) {
    
    const formStructure = useContext(formFieldContext)
    const colors = useContext(CurrentThemeContext)

    const formFields = [
        { label: formFieldLabel, value: formData.newValue, onChange: formData.onChangeNewValue, errorMessage: formData.errorCheck, privateData: false}
    ]
    const inputFormData = {
        formTitle: formTitle, 
        formFields, 
        formButton: formTitle, 
        formRedirect: null, 
        formFieldsAlt: null, 
        formType: null, 
        formFunction: formFunction,
        colors
    }
    return formStructure.inputFormUpdateData(inputFormData)
}
const editAccountData = {
    editAccountForm
}
export const editAccountContext = createContext(editAccountData)