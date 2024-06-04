import React, { useContext, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { Container } from 'index'
import { Dimensions } from 'react-native'
import { useFirebaseAuth } from 'auth/firebaseAuthContext'
import { PageStructureContext } from '../../reuseableComponents/pageStructure'
import { formFieldValidationContext } from 'auth/formFieldValidationsContext'
import { editAccountContext } from './editAccountContext'
import { loginValidationsContext } from '../accountComponents/validations/loginValidationContext'

export default function UpdateEmailPage() {
    const { auth, firebaseAuthValue } = useFirebaseAuth()
    const [newEmail, setNewEmail] = useState('')
    const [errorEmailCheck, setErrorEmailCheck] = useState([])
    const editAccount = useContext(editAccountContext)
    const formFieldValidation = useContext(formFieldValidationContext)
    const loginValidation = useContext(loginValidationsContext)
    const pageStructure = useContext(PageStructureContext)
    const windowWidth = Dimensions.get('window').width

    const params = useLocalSearchParams()
    const { backHeaderTitle } = params
    const isNextPage = true

    function updateEmailContent() {
        const currentEmail = auth.currentUser.email
        const newEmailValidationErrors = formFieldValidation.updateValidations.validateNewEmail(newEmail, currentEmail, firebaseAuthValue.checkEmailExistence)
        const formTitle = currentEmail ? 'Update Email' : 'Create Email'
        const groupData = {
            groupName: 'Email',
            currentValue: currentEmail,
            newValue: newEmail,
            onChangeNewValue: setNewEmail,
            errorCheck: errorEmailCheck,
            onChangeErrorCheck: setErrorEmailCheck,
            validationErrors: newEmailValidationErrors,
            firebaseAuthValueFunction: () => firebaseAuthValue.updateEmailAuth(newEmail) 
        }
        const formFunction = () => loginValidation.emailValidationPromise(groupData)
        return (
            <Container style={{width: windowWidth}}>
                {editAccount.editAccountForm('Email', formTitle, formFunction, groupData)}
            </Container>
        )
    }
    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, updateEmailContent())
}