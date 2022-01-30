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
        export { default as SgSelectedGameCoverScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameCoverScreen' 
        export { default as SgSelectedGameSummaryScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameSummaryScreen'
        export { default as SgSelectedGameplayScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameplayScreen'
        export { default as SgSelectedGameSetGenreScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameSetGenreScreen'
        export { default as SgSelectedGameSetSubGenreScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameSetSubGenreScreen'
        export { default as SgIGDBGameSearchScreen } from './mainScreens/sgGameSearchScreenContent/sgIGDBGameSearchScreen'   
        export { default as SgConsoleListScreen } from './mainScreens/sgGameScreenContent/sgConsoleListScreen'
        export { default as TestImageDB } from './mainScreens/sgGameScreenContent/TestImageDB'
        export { default as SgSearchQuery } from './mainScreens/sgGameScreenContent/sgConfirmAddGameScreen'
        export { default as sgSearchScreen } from './mainScreens/sgGameSearchScreenContent/sgSearchScreen'
        export { default as sgSearchResultsScreen } from './mainScreens/sgGameSearchScreenContent/sgSearchResultsScreen'

        // Game Screens
        export { default as GameScreen } from './mainScreens/sgGameScreenContent/sgGameScreen'
        export { default as AddGameScreen } from './mainScreens/sgGameScreenContent/sgAddGameScreen'
        export { default as ConfirmAddGameScreen } from './mainScreens/sgGameScreenContent/sgConfirmAddGameScreen'
        export { default as EditGameScreen } from './mainScreens/sgGameScreenContent/sgEditGameScreen'
        
    // User Screens
    export { default as UserProfileScreen } from './userScreens/UserProfileScreen'
    export { default as UpdateUserScreen } from './userScreens/userUpdateScreen'
    export { default as UserSavesScreen } from './userScreens/UserSavesScreen'
// Assets  
    // Styling
        //Theme Context
        export {
            CurrentThemeContext,
            dayTime,
            nightTime
        } from '../../../../assets/styles/globalTheme'
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
            MainHeadingButton,
            MainHeadingLongTitle,
            MainSubFont,
            GeneralFontColor,
            SearchFont,
            ExpandableHeading,
            CustomTextAreaField
        } from '../../../../assets/styles/globalStyling'

        //Auth Styling
        export {
            CustomInputField,
            TouchableButton,
            TouchableButtonFont,
            TouchableButtonAlt,
            TouchableButtonFontAlt,
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
            SearchGameData,
            SearchGameResults
        } from '../../../../assets/styles/sgScreensStyling'


    // Font Awesome
    export { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    export { 
        faHome,
        faFilter,
        faHeart, 
        faTimes, 
        faUser,
        faCaretDown,
        faChevronLeft,
        faTimesCircle,
        faStar,
        faBook,
        faFistRaised,
        faLayerGroup,
        faPuzzlePiece,
        faFlagCheckered,
        faShieldAlt,
        faCrosshairs,
        faMap,
        faBasketballBall
     } from '@fortawesome/free-solid-svg-icons'

     // sgGame Titles
     export { sg32XNATitles, sg32XEUTitles, sg32XJPNTitles } from '../../../server/sgGameTitles/sg32XTitles'
     export { sg1000JPNTitles } from '../../../server/sgGameTitles/sg1000Titles'
     export { sgCDNATitles, sgCDEUTitles, sgCDJPNTitles } from '../../../server/sgGameTitles/sgCDTitles'
     export { sgGenNATitles, sgGenEUTitles, sgGenJPNTitles } from '../../../server/sgGameTitles/sgGenTitles'
     export { sgGGNATitles, sgGGEUTitles, sgGGJPNTitles } from '../../../server/sgGameTitles/sgGGTitles'
     export { sgMSNATitles, sgMSEUTitles, sgMSJPNTitles, sgMSBRZTitles } from '../../../server/sgGameTitles/sgMSTitles'
     export { sgSatNATitles, sgSatEUTitles, sgSatJPNTitles } from '../../../server/sgGameTitles/sgSatTitles'
