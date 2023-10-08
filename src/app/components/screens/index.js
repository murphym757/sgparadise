// Screens
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
            BackButtonBottomLayer,
            BackButtonContainer,
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
            ContentDivider,
            ContentRow,
            CustomSearchBarContainer,
            CustomSearchBarTextInput,
            CustomTextAreaField,
            ExpandableHeading,
            GamePageImageBackground,
            GeneralFontColor,
            ItemWidth,
            LinkedContentGeneralInfoView,
            LinkedContentGenreView,
            LinksCard,
            MainFont,
            MainFontArrayLinks,
            MainFontLink,
            MainFontLinkView,
            MainFontPills,
            MainHeading,
            MainHeadingButton,
            MainHeadingLongTitle,
            MainSecondaryFont,
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
            windowController,
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
            AccordionHeader,
            AccordionView,
            AlgoliaSearchListLabelText,
            AlgoliaSearchTitleText,
            CustomFontAwesomeIcon,
            GameDescription,
            GameNameBig,
            GameDescriptorSmall,
            GameDescriptorSmallAlt,
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
    //Firebase and Elastic
    export { firebase, algoliaConfig, gamesConfig, getStorage, ref, getDownloadURL } from 'server/config/config'
    
    // Font Awesome
    export { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    export {
        faArrowLeft,
        faArrowRight,
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
