import React, { useContext, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { Container } from 'index'
import { Dimensions } from 'react-native'
import { useFirebaseAuth } from 'auth/firebaseAuthContext'
import { PageStructureContext } from '../../reuseableComponents/pageStructure'
import { formFieldValidationContext } from 'auth/formFieldValidationsContext'
import { editAccountContext } from './editAccountContext'
import { loginValidationsContext } from '../accountComponents/validations/loginValidationContext'

export default function UpdateUsernamePage() {
    const { auth, firebaseAuthValue } = useFirebaseAuth()
    const [newUsername, setNewUsername] = useState('')
    const [errorUsernameCheck, setErrorUsernameCheck] = useState([])
    const editAccount = useContext(editAccountContext)
    const formFieldValidation = useContext(formFieldValidationContext)
    const loginValidation = useContext(loginValidationsContext)
    const pageStructure = useContext(PageStructureContext)
    const windowWidth = Dimensions.get('window').width

    const params = useLocalSearchParams()
    const { backHeaderTitle } = params
    const isNextPage = true

    function updateUsernameContent() {
        const formButtonLink = '/account'
        const currentUsername = auth.currentUser.displayName
        const newUsernameValidationErrors = formFieldValidation.updateValidations.validateNewUsername(newUsername, currentUsername, firebaseAuthValue.checkUserExistence)
        const formTitle = currentUsername ? 'Update Username' : 'Create Username'
        const groupData = {
            groupName: 'Username',
            currentValue: currentUsername,
            newValue: newUsername,
            onChangeNewValue: setNewUsername,
            errorCheck: errorUsernameCheck,
            onChangeErrorCheck: setErrorUsernameCheck,
            validationErrors: newUsernameValidationErrors,
            firebaseAuthValueFunction: () => firebaseAuthValue.updateUsernameAuth(newUsername)
        }
        const formFunction = () => loginValidation.usernameValidationPromise(groupData)
        return (
            <Container style={{width: windowWidth}}>
                {editAccount.editAccountForm(formButtonLink, 'Username', formTitle, formFunction, groupData)}
            </Container>
        )
    }
    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, updateUsernameContent())
}