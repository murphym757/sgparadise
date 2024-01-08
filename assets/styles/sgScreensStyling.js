import styled from 'styled-components';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    currentTheme
} from './globalTheme';

function responsivePxSize(pixelSize){
    return (
        `${windowController(pixelSize, windowHeight)}px`
    )
}
export const windowController = RFValue
export const windowHeight = Dimensions.get('window').height
export const windowWidth = Dimensions.get('window').width

/* Sg Collection */
/*---------------------------------------*/
export const ViewTopRow = styled(View) `
    flexDirection: row;
`;

export const ViewSearchBar = styled(View) `
    flexDirection: row; 
    width: 80%;  
    backgroundColor: ${currentTheme.primaryColorAlt};
    marginHorizontal: ${responsivePxSize(20)};
`;

export const PopGamesView = styled(View) `
    flex: 1;
    height: 300;
    marginTop: ${responsivePxSize(10)};
`;
/*---------------------------------------*/

/* Sg Home Screen */
/*---------------------------------------*/
export const MiniButton = styled(View) `
    paddingVertical: ${responsivePxSize(2)};
    paddingHorizontal: ${responsivePxSize(2)};
    borderWidth: ${responsivePxSize(1)};
    borderRadius: ${responsivePxSize(12)};
    alignItems: 'center';
    justifyContent: 'center';
`;

export const MiniButtonFont = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    fontSize: ${responsivePxSize(15)};
    lineHeight:  ${responsivePxSize(21)};
`;

/*---------------------------------------*/

/* Sg Game Page */
/*---------------------------------------*/
export const AccordionHeader = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    fontSize: ${responsivePxSize(15)};
    color: ${currentTheme.primaryFontColor};
`;

export const AccordionView = styled(View) `
    paddingVertical: ${responsivePxSize(10)};

`;

export const LastAccordionView = styled(View) `
    paddingTop: ${responsivePxSize(10)};
`;

export const TagFont = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    fontSize: ${responsivePxSize(10)};
    color: ${currentTheme.primaryColor};
`;

export const GameNameBig = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontBoldStandout};
    fontSize: ${responsivePxSize(52)};
    color: ${currentTheme.secondaryColor};
`;

export const GameDescriptorSmall = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontStandout};
    fontSize: ${responsivePxSize(16)};
    color: ${currentTheme.secondaryColor};
`;

export const GameDescriptorSmallAlt = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    fontSize: ${responsivePxSize(16)};
    color: ${currentTheme.primaryFontColor};
`;



export const GameScreenSpacing = styled(View) `
    position: 'relative';
    paddingTop: ${responsivePxSize(125)};
`;

/*---------------------------------------*/

/* Sg Main Screen */
/*---------------------------------------*/

/*---------------------------------------*/

/* Sg Newly Added */
/*---------------------------------------*/
export const GameTitle = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontBoldStandoutMini};
    fontSize: ${responsivePxSize(20)};
    color: ${currentTheme.primaryFontColor};
`;

export const GameDescription = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    fontSize: ${responsivePxSize(10)};
    color: ${currentTheme.primaryFontColor};
`;

export const GameReleaseDate = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    fontSize: ${responsivePxSize(14)};
    color: ${currentTheme.primaryFontColor};
`;

export const CustomFontAwesomeIcon = styled(FontAwesomeIcon) `
    marginTop: ${responsivePxSize(4)};
    color: ${currentTheme.secondaryColor};
`;
/*---------------------------------------*/

/* Sg Search Query Screen */
/*---------------------------------------*/
export const SearchGameTitle = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontBoldStandoutMini};
    fontSize: ${responsivePxSize(15)};
    marginBottom: ${responsivePxSize(25)};
    color: ${currentTheme.primaryFontColor};
`;
export const SearchGameData = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    fontSize: ${responsivePxSize(15)};
    marginBottom: ${responsivePxSize(5)};
    color: ${currentTheme.primaryFontColor};
`;
/*---------------------------------------*/
/* Sg Search Results Screen */
/*---------------------------------------*/
export const SearchGameResults = styled(View) `
    flexDirection: column;
    paddingBottom: ${responsivePxSize(20)};
`;
/*---------------------------------------*/
/* Sg Algolia RefinementList Page */
/*---------------------------------------*/
export const AlgoliaSearchListLabelText = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: ${responsivePxSize(16)};
`;

export const AlgoliaSearchTitleText = styled(Text) `
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    color: ${currentTheme.secondaryFontColor};
    fontSize: ${responsivePxSize(32)};
`;
/*---------------------------------------*/