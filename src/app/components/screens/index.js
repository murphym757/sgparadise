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
        export { default as SgSelectedGameSetGameModesScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameModesScreen'
        export { default as SgSelectedGameConfirmationScreen } from './mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameConfirmationScreen'
        export { default as SgIGDBGameSearchScreen } from './mainScreens/sgGameSearchScreenContent/sgIGDBGameSearchScreen'   
        export { default as SgConsoleListScreen } from './mainScreens/sgGameScreenContent/sgConsoleListScreen'
        export { default as TestImageDB } from './mainScreens/sgGameScreenContent/TestImageDB'
        export { default as SgSearchQuery } from './mainScreens/sgGameScreenContent/sgConfirmAddGameScreen'
        export { default as sgSearchScreen } from './mainScreens/sgGameSearchScreenContent/sgSearchScreen'
        export { default as sgSearchResultsScreen } from './mainScreens/sgGameSearchScreenContent/sgSearchResultsScreen'

        // Game Screens
        export { default as GameScreen } from './mainScreens/sgGameScreenContent/sgGameScreen'
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
            ContentContainer,
            CustomTextAreaField,
            ExpandableHeading,
            PageContainer,
            PageContainerCover,
            GeneralFontColor,
            MainFont,
            MainHeading,
            MainHeadingButton,
            MainHeadingLongTitle,
            MainSubFont,
            SafeAreaViewContainer,
            ScrollViewContainer,
            SearchFont,
            TextInputSearchBar,
            ViewContainer,
            ViewSortColumn,
            ViewSortRow,
            windowHeight
        } from '../../../../assets/styles/globalStyling'

        //Auth Styling
        export {
            CustomInputField,
            FooterFont,
            FooterLink,
            FooterView,
            TouchableButton,
            TouchableButtonAlt,
            TouchableButtonDelete,
            TouchableButtonFont,
            TouchableButtonFontAlt,
            TouchableButtonFontDelete
        } from '../../../../assets/styles/authScreensStyling'

        //Screens Styling
        export {
            AccordionHeader,
            AccordionView,
            CustomFontAwesomeIcon,
            GameDescription,
            GameReleaseDate,
            GameTitle,
            LastAccordionView,
            PopGamesView,
            SearchGameData,
            SearchGameResults,
            SearchGameTitle,
            TagFont,
            ViewSearchBar,
            ViewTopRow
        } from '../../../../assets/styles/sgScreensStyling'
    /*-----------------*/
    //Context
        //Axios Context
        export { axiosSearchContext } from './mainScreens/sgGameSearchScreenContent/axiosSearchContext'
        
        //Auth Context
        export { useAuth } from './authScreens/authContext'

        //Tags Context
        export { useTags } from './authScreens/tagsContext'

        //Search Bar Context
        export { useSearchBar } from './mainScreens/sgGameSearchScreenContent/searchIndex'

        //Game Uploads Context
        export { confirmGameContext } from '../screens/mainScreens/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameContext'
    
    //Firebase
    export { firebase } from '../../../server/config/config'
    
    // Font Awesome
    export { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    export { 
        faBasketballBall,
        faBook,
        faCaretDown,
        faChevronLeft,
        faCrosshairs,
        faFilter,
        faFistRaised,
        faFlagCheckered,
        faHeart, 
        faHome,
        faLayerGroup,
        faMap,
        faPuzzlePiece,
        faShieldAlt,
        faStar,
        faTimes, 
        faTimesCircle,
        faUser
     } from '@fortawesome/free-solid-svg-icons'

     // sgGame Titles
     export { sg32XNATitles, sg32XEUTitles, sg32XJPNTitles } from '../../../server/sgGameTitles/sg32XTitles'
     export { sg1000JPNTitles } from '../../../server/sgGameTitles/sg1000Titles'
     export { sgCDNATitles, sgCDEUTitles, sgCDJPNTitles } from '../../../server/sgGameTitles/sgCDTitles'
     export { sgGenNATitles, sgGenEUTitles, sgGenJPNTitles } from '../../../server/sgGameTitles/sgGenTitles'
     export { sgGGNATitles, sgGGEUTitles, sgGGJPNTitles } from '../../../server/sgGameTitles/sgGGTitles'
     export { sgMSNATitles, sgMSEUTitles, sgMSJPNTitles, sgMSBRZTitles } from '../../../server/sgGameTitles/sgMSTitles'
     export { sgSatNATitles, sgSatEUTitles, sgSatJPNTitles } from '../../../server/sgGameTitles/sgSatTitles'
