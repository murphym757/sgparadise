// Screens
    // Auth Screens
    export { default as LoginScreen } from './authScreens/loginScreen'
    export { default as RegistrationScreen } from './authScreens/registrationScreen'
    export { default as ResetPasswordScreen } from './authScreens/resetPasswordScreen' 

    // Main Screens
    export { default as SgMainScreen } from './mainScreens/sgMainScreen'
    export { default as SgHomeScreen } from './mainScreens/sgHomeScreen'

        // Search Screens
        export { default as SgGameSearchScreen } from './mainScreens/sgGameSearchScreenContent/sgGameSearchScreen'     
        export { default as SgConsoleListScreen } from './mainScreens/sgGameScreenContent/sgConsoleListScreen'
        export { default as TestImageDB } from './mainScreens/sgGameScreenContent/TestImageDB'
        export { default as SearchBar } from './mainScreens/sgGameSearchScreenContent/searchIndex'
        export { default as SgSearchQuery } from './mainScreens/sgGameScreenContent/sgConfirmAddGameScreen'
        // Game Screens
        export { default as GameScreen } from './mainScreens/sgGameScreenContent/sgGameScreen'
        export { default as AddGameScreen } from './mainScreens/sgGameScreenContent/sgAddGameScreen'
        export { default as ConfirmAddGameScreen } from './mainScreens/sgGameScreenContent/sgConfirmAddGameScreen'
        export { default as EditGameScreen } from './mainScreens/sgGameScreenContent/sgEditGameScreen'
        
    // User Screens
    export { default as UserProfileScreen } from './userScreens/userProfileScreen'
    export { default as UpdateUserScreen } from './userScreens/userUpdateScreen'
    export { default as UserSavesScreen } from './userScreens/userSavesScreen'
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
            TextInputSearchBar,
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

        //Screens Styling
        export {
            ViewTopRow,
            ViewSearchBar,
            PopGamesView,
            AccordionHeader,
            AccordionView,
            LastAccordionView,
            TagFont,
            GameTitle,
            GameDescription,
            GameReleaseDate,
            CustomFontAwesomeIcon,
            SearchGameTitle,
            SearchGameData
        } from '../../../../assets/styles/sgScreensStyling'


    // Font Awesome
    export { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    export { 
        faHome, 
        faHeart, 
        faTimes, 
        faUser,
        faCaretDown,
        faChevronLeft
     } from '@fortawesome/free-solid-svg-icons'