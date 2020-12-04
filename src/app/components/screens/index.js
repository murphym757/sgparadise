// Screens
    // Auth Screens
    export { default as LoginScreen } from './authScreens/loginScreen'
    export { default as RegistrationScreen } from './authScreens/registrationScreen'
    export { default as ResetPasswordScreen } from './authScreens/resetPasswordScreen' 


    // Main Screens
    export { default as SgMainScreen } from './mainScreens/sgMainScreen'
    export { default as SgHomeScreen } from './mainScreens/sgHomeScreen'

    // User Screens
    export { default as UserProfileScreen } from './userScreens/userProfileScreen'
    export { default as UpdateUserScreen } from './userScreens/userUpdateScreen'
    export { default as UserSavesScreen } from './userScreens/userSavesScreen'
    export { default as UserAddGameScreen } from './userScreens/userAddGameScreen'
    
// Assets  
    // Styling
        //Theme Context
        export {CurrentThemeContext} from '../../../../assets/styles/globalTheme'
        //Global Styling
        export {
            Container,
            ViewContainer,
            SafeAreaViewContainer,
            ScrollViewContainer,
            ContentContainer,
            ViewSortColumn,
            MainFont,
            MainHeading,
            MainSubHeading,
            SearchFont,
            ExpandableHeading
        } from '../../../../assets/styles/globalStyling'

        //Auth Styling
        export {
            CustomInputField,
            TouchableButton,
            TouchableButtonFont,
            FooterView,
            FooterFont,
            FooterLink
        } from '../../../../assets/styles/authScreensStyling'


    // Font Awesome
    export { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    export { faHome, faHeart, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'