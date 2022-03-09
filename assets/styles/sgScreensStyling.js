import styled from 'styled-components';
import { View, Text, Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    currentTheme
} from './globalTheme';

export const windowHeight = Dimensions.get('window').height

/* Sg Collection */
/*---------------------------------------*/
export const ViewTopRow = styled(View) `
    flexDirection: row;
`;

export const ViewSearchBar = styled(View) `
    flexDirection: row; 
    width: 80%;  
    backgroundColor: ${currentTheme.primaryColorAlt};
    marginHorizontal: 20px;
`;

export const PopGamesView = styled(View) `
    flex: 1;
    height: 300;
    marginTop: 10;
`;

/*---------------------------------------*/

/* Sg Game Page */
/*---------------------------------------*/
export const AccordionHeader = styled(Text) `
    fontFamily: 'SpartanMedium';
    fontSize: 15px;
    color: ${currentTheme.primaryFontColor};
`;

export const AccordionView = styled(View) `
    padding-top: 10;
    padding-bottom: 10;
`;

export const LastAccordionView = styled(View) `
    padding-top: 10;
`;

export const TagFont = styled(Text) `
    fontFamily: 'SpartanRegular';
    fontSize: 10px;
    color: ${currentTheme.primaryColor};
`;

/*---------------------------------------*/

/* Sg Main Screen */
/*---------------------------------------*/

/*---------------------------------------*/

/* Sg Newly Added */
/*---------------------------------------*/
export const GameTitle = styled(Text) `
    fontFamily: 'SpartanBlack';
    fontSize: 20px;
    color: ${currentTheme.primaryFontColor};
`;

export const GameDescription = styled(Text) `
    fontFamily: 'SpartanRegular';
    fontSize: 10px;
    color: ${currentTheme.primaryFontColor};
`;

export const GameReleaseDate = styled(Text) `
    fontFamily: 'SpartanMedium';
    fontSize: 14px;
    color: ${currentTheme.primaryFontColor};
`;

export const CustomFontAwesomeIcon = styled(FontAwesomeIcon) `
    marginTop: 4px;
    color: ${currentTheme.secondaryColor};
`;
/*---------------------------------------*/

/* Sg Search Query Screen */
/*---------------------------------------*/
export const SearchGameTitle = styled(Text) `
    fontFamily: 'SpartanBlack';
    fontSize: 15px;
    margin-bottom: 25px;
    color: ${currentTheme.primaryFontColor};
`;
export const SearchGameData = styled(Text) `
    fontFamily: 'SpartanMedium';
    fontSize: 15px;
    margin-bottom: 5px;
    color: ${currentTheme.primaryFontColor};
`;
/*---------------------------------------*/
/* Sg Search Results Screen */
/*---------------------------------------*/
export const SearchGameResults = styled(View) `
    flexDirection: column;
    paddingBottom: ${RFValue(20, windowHeight)}px;
`;
/*---------------------------------------*/