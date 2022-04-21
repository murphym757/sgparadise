import styled from 'styled-components'
import { View, Text, ScrollView, SafeAreaView, Dimensions, ImageBackground, StyleSheet } from 'react-native';
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

export const CenterContent = styled(View) `
	justifyContent: center;
	alignItems: center;
`;

export const Card = styled(View) `
    backgroundColor: ${currentTheme.primaryColor};
	alignItems: center;
    borderRadius: 25;
    width: ${RFValue(375, windowHeight)}px;
    height: ${RFValue(375, windowHeight)}px;
`;

export const CardContent = styled(ContentContainer) `
    marginVertical: 5;
`;

export const CardLinksView = styled(ContentContainer) `
    flexDirection: 'row';
    flexWrap: 'wrap';
`;

export const Styles = StyleSheet.create({
    CardStyle: {
        flexGrow: 1,
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: {width: 6, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});

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
    marginLeft: ${RFValue(30, windowHeight)}px;
    paddingTop: ${RFValue(5, windowHeight)}px; 
    position: absolute;
`;

export const BackButtonBottomLayer = styled(View) `
    marginLeft:${RFValue(40, windowHeight)}px;
    position: relative;
`;

export const LinkedContentGenreView = styled(View) `
    paddingVertical: 20;
`;

export const LinkedContentGeneralInfoView = styled(View) `
    paddingVertical: 5;
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

export const MainFontLinkView = styled(View) `
    justifyContent: center;
	alignItems: center;
    flexDirection: row;
    flexWrap: wrap;
`;

export const MainFontLink = styled(MainFont) `
    textDecorationLine: underline;
`;

export const MainFontArrayLinks = styled(MainFontLink) `
    paddingHorizontal: 25;
    paddingBottom: 25;
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