import styled from 'styled-components'
import { View, Text, ScrollView, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {
    currentTheme
} from './globalTheme'

export const windowHeight = Dimensions.get('window').height

export const Container = styled(View) `
    paddingLeft: ${RFValue(22, windowHeight)}px;
    paddingRight: ${RFValue(22, windowHeight)}px;
`;

export const ViewContainer = styled(Container) `
	backgroundColor: ${currentTheme.primaryColor};
`;

export const ContentContainer = styled(ViewContainer) `
	justifyContent: center;
	alignItems: center;
`;

export const SafeAreaViewContainer = styled(SafeAreaView) `
    backgroundColor: ${currentTheme.primaryColor};
`;

export const ScrollViewContainer = styled(ScrollView) `

`;

export const ViewSortRow = styled(View) `
    flexDirection: row;
`;

export const ViewSortColumn = styled(View) `
    flexDirection: column;
`;

export const BackButtonTopLayer = styled(View) `
    marginLeft: 30;
    paddingTop: 25; 
    position: absolute;
`;

export const BackButtonBottomLayer = styled(View) `
    marginLeft: 40;
    position: relative;
`;

export const GeneralFontColor = styled(Text) `
    color: ${currentTheme.primaryFontColor};
`;

export const MainFont = styled(Text) `
    fontSize: ${RFValue(15, windowHeight)}px;
	fontWeight: 500;
    fontFamily: 'SpartanRegular';
    color: ${currentTheme.primaryFontColor};
`;

export const MainSubFont = styled(Text) `
    fontSize: ${RFValue(18, windowHeight)}px;
	fontWeight: 500;
    fontFamily: 'SpartanMedium';
    color: ${currentTheme.secondaryColor};
`;

export const MainHeading = styled(Text) `
    fontSize: ${RFValue(25, windowHeight)}px;
    fontWeight: 700;
    fontFamily: 'SpartanBlack';
    color: ${currentTheme.primaryFontColor};
`;

export const MainHeadingLongTitle = styled(Text) `
    fontSize: ${RFValue(15, windowHeight)}px;
    fontWeight: 700;
    fontFamily: 'SpartanBlack';
    color: ${currentTheme.primaryFontColor};
`;

export const MainHeadingButton = styled(Text) `
    fontSize: ${RFValue(20, windowHeight)}px;
    fontWeight: 700;
    fontFamily: 'SpartanBlack';
    color: ${currentTheme.primaryFontColor};
`;

export const MainSubHeading = styled(Text) `
    fontSize: ${RFValue(22, windowHeight)}px;
    fontWeight: 700;
    fontFamily: 'SpartanMedium';
    color: ${currentTheme.secondaryColor};
`;


export const ExpandableHeading = styled(Text) `
    fontSize: 12px;
    fontFamily: 'SpartanBold';
    paddingRight: 20px;
    position: absolute;
    right: 0;
    margin: auto;
    color: ${currentTheme.secondaryFontColor};
`; 

export const PageContainer = styled(View) `
    flex: 1;
    paddingTop: ${windowHeight/20}px;
    paddingBottom: ${windowHeight/20}px;
    backgroundColor: ${currentTheme.primaryColor};
`;

export const PageContainerCover = styled(View) `
    flex: 1;
    paddingTop: ${windowHeight/20}px;
    paddingBottom: ${windowHeight/40}px;
    backgroundColor: ${currentTheme.primaryColor};
`;

export const GamePageImageBackground = styled(ImageBackground) `
    flex: 1;
    justifyContent: center;
    paddingTop: ${windowHeight/20}px;
    paddingBottom: ${windowHeight/20}px;
`;