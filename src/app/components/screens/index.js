// Screens
    // Auth Screens
    export { default as LoginScreen } from 'auth/loginScreen'
    export { default as RegistrationScreen } from 'auth/registrationScreen'
    export { default as ResetPasswordScreen } from 'auth/resetPasswordScreen' 

    // Main Screens
    export { default as SgHomeScreen } from 'main/sgHomeScreen'

        // Search Screens
        export { default as SgGameSearchScreen } from 'main/sgGameSearchScreenContent/sgGameSearchScreen'   
        export { default as SgSelectedGameCoverScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameCoverScreen' 
        export { default as SgSelectedGameSummaryScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameSummaryScreen'
        export { default as SgSelectedGameplayScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameplayScreen'
        export { default as SgSelectedGameSetGenreScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameSetGenreScreen'
        export { default as sgSelectedGameSetSubgenreScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameSetSubgenreScreen'
        export { default as SgSelectedGameSetGameModesScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameModesScreen'
        export { default as SgSelectedGameConfirmationScreen } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameConfirmationScreen'
        export { default as SgIGDBGameSearchScreen } from 'main/sgGameSearchScreenContent/sgIGDBGameSearchScreen'   
        export { default as SgConsoleListScreen } from 'main/sgGameScreenContent/sgConsoleListScreen'
        export { default as TestImageDB } from 'main/sgGameScreenContent/TestImageDB'
        export { default as SgSearchQuery } from 'main/sgGameScreenContent/sgConfirmAddGameScreen'
        export { default as SgSearchScreen } from 'main/sgGameSearchScreenContent/sgSearchScreen'
        export { default as sgSearchResultsScreen } from 'main/sgGameSearchScreenContent/sgSearchResultsScreen'

        // Game Screens
        export { default as GameScreen } from 'main/sgGameScreenContent/sgGameScreen'
        export { default as ConfirmAddGameScreen } from 'main/sgGameScreenContent/sgConfirmAddGameScreen'
        export { default as EditGameScreen } from 'main/sgGameScreenContent/sgEditGameScreen'
        
    // User Screens
    export { default as UserProfileScreen } from 'user/UserProfileScreen'
    export { default as UpdateUserScreen } from 'user/userUpdateScreen'
    export { default as UserSavesScreen } from 'user/UserSavesScreen'
// Assets  
    // Styling
        //Theme Context
        export {
            CurrentThemeContext,
            dayTime,
            nightTime
        } from 'assets/styles/globalTheme'
        //Global Styling
        export {
            BackButtonContainer,
            BackButtonBottomLayer,
            BackButtonTopLayer,
            Card,
            CardContent,
            CarouselCardBody,
            CarouselCardContainer,
            CarouselCardHeader,
            CarouselCardImage,
            CenterContent,
            Container,
            ContentContainer,
            CustomSearchBarContainer,
            CustomSearchBarTextInput,
            CustomTextAreaField,
            ExpandableHeading,
            GamePageImageBackground,
            GeneralFontColor,
            ItemWidth,
            LinkedContentGeneralInfoView,
            LinkedContentGenreView,
            MainFont,
            MainFontPills,
            MainFontArrayLinks,
            MainFontLink,
            MainFontLinkView,
            MainHeading,
            MainHeadingButton,
            MainHeadingLongTitle,
            MainSubFont,
            MainSubHeading,
            PageContainer,
            PageContainerCover,
            PlatformCard,
            SafeAreaViewContainer,
            SafeAreaViewLoader,
            ScrollViewContainer,
            SearchBarSG,
            SearchFont,
            sliderWidth,
            Styles,
            TextInputSearchBar,
            ViewContainer,
            ViewSortColumn,
            ViewSortRow,
            windowHeight,
            windowWidth
        } from 'assets/styles/globalStyling'

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
        } from 'assets/styles/authScreensStyling'

        //Screens Styling
        export {
            AlgoliaSearchListLabelText,
            AlgoliaSearchTitleText,
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
        } from 'assets/styles/sgScreensStyling'
    /*-----------------*/
    //Context
        //Axios Context
        export { axiosSearchContext } from 'main/sgGameSearchScreenContent/axiosSearchContext'
        
        //Auth Context
        export { useAuth } from 'auth/authContext'

        //Tags Context
        export { useTags } from 'auth/tagsContext'

        //Search Bar Context
        export { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'

        //Home Context
        export { homeScreenGenreContext } from 'main/sgHomeScreenContext'
             //Home Search Context
            export { firebaseSearchContext } from 'main//sgHomeScreenGames/sgHomeSearchScreen'
            //Date Context
            export { homeScreenDatesContext } from 'main/sgHomeScreenGames/sgHomeDates'

            //Spotlight Context
            export { homeScreenSpotlightGamesContext } from 'main/sgHomeScreenGames/sgSpotlightedGames'
            
            //Genre Context
            export { homeScreenActionContext } from 'main/sgHomeScreenGames/sgHomeActionGames'

        //Game Uploads Context
        export { confirmGameContext } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameContext'

        //Uploaded Game Context
        export { gameScreenContext } from 'main/sgGameScreenContent/sgGameScreenContext'    

    //Firebase and Elastic
    export { firebase, algoliaConfig, gamesConfig, getStorage, ref, getDownloadURL } from 'server/config/config'
    
    // Font Awesome
    export { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    export { 
        faBasketballBall,
        faBook,
        faCaretDown,
        faChevronLeft,
        faCircle,
        faCrosshairs,
        faFilter,
        faFistRaised,
        faFlagCheckered,
        faHeart, 
        faHome,
        faLayerGroup,
        faSearch,
        faMap,
        faPuzzlePiece,
        faShieldAlt,
        faStar,
        faTimes, 
        faTimesCircle,
        faUser
     } from '@fortawesome/free-solid-svg-icons'

     // sgGame Titles
     export { sg32XNATitles, sg32XEUTitles, sg32XJPNTitles } from 'server/sgGameTitles/sg32XTitles'
     export { sg1000JPNTitles } from 'server/sgGameTitles/sg1000Titles'
     export { sgCDNATitles, sgCDEUTitles, sgCDJPNTitles } from 'server/sgGameTitles/sgCDTitles'
     export { sgGenNATitles, sgGenEUTitles, sgGenJPNTitles } from 'server/sgGameTitles/sgGenTitles'
     export { sgGGNATitles, sgGGEUTitles, sgGGJPNTitles } from 'server/sgGameTitles/sgGGTitles'
     export { sgMSNATitles, sgMSEUTitles, sgMSJPNTitles, sgMSBRZTitles } from 'server/sgGameTitles/sgMSTitles'
     export { sgSatNATitles, sgSatEUTitles, sgSatJPNTitles } from 'server/sgGameTitles/sgSatTitles'
