import styled from 'styled-components'
import { View, Text, Image, ScrollView, SafeAreaView, Dimensions, ImageBackground, StyleSheet, TextInput } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {
    currentTheme
} from './globalTheme'

export const windowHeight = Dimensions.get('window').height
export const windowWidth = Dimensions.get('window').width

//Search Bar 
export const CustomSearchBarContainer = styled(View) `
    height: 48px;
    borderRadius: 5px;
    overflow: hidden;
    fontFamily: 'SpartanRegular';
    backgroundColor: ${currentTheme.primaryColor};
    fontSize: 28px;
    marginTop: 10px;
    marginBottom: 10px;
    marginLeft: 1px;
    marginRight: 1px;
    paddingLeft: 16px;
`;

export const CustomSearchBarTextInput = styled(TextInput) `
    fontFamily: 'SpartanRegular';
    color: ${currentTheme.primaryColorAlt};
`;
/*------------------------ */

// For Image Carousel
export const SliderWidth = windowWidth
export const ItemWidth =  Math.round(SliderWidth * 0.7)
export const CarouselCardHeader = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    px;
    fontWeight: 700;
    paddingLeft: 20;
    paddingTop: 20;
`;
export const CarouselCardBody = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: 18;
    paddingLeft: 20;
    paddingLeft: 20;
    paddingRight: 20;
`;
export const CarouselCardImage = styled(Image) `
    height: 250;
    width: ${ItemWidth};
    borderRadius: 5;
`;
/*-----------------*/

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

export const PlatformCard = styled(View) `
    backgroundColor: ${currentTheme.primaryColor};
	alignItems: center;
    borderRadius: 5;
    width: ${RFValue(250, windowHeight)}px;
    height: ${RFValue(150, windowHeight)}px;
`;

export const Styles = StyleSheet.create({
    CardStyle: {
        flexGrow: 1,
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: {width: 6, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    CarouselStyle: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: `${ItemWidth}`,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
});

// Main Screen Background
export const SafeAreaViewContainer = styled(SafeAreaView) `
    backgroundColor: ${currentTheme.primaryColor};
`;

export const SafeAreaViewLoader = styled(SafeAreaViewContainer) `
    justifyContent: center
    height: ${windowHeight};
`;

export const ScrollViewContainer = styled(ScrollView) `

`;

export const ViewSortRow = styled(View) `
    flexDirection: row;
`;

export const ViewSortColumn = styled(View) `
    flexDirection: column;
`;

/* Back Button */
/*---------------------------------------*/
export const BackButtonContainer = styled(Container) `
    marginLeft: ${RFValue(30, windowHeight)}px;
`;

export const BackButtonTopLayer = styled(View) `
    paddingTop: ${RFValue(13, windowHeight)}px;
    position: absolute;
`;

export const BackButtonBottomLayer = styled(View) `
    paddingTop: ${RFValue(26, windowHeight)}px;
    paddingHorizontal: ${RFValue(11, windowHeight)}px;
    position: relative;
`;
/*---------------------------------------*/

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

export const MainFontPills = styled(Text) `
    fontSize: ${RFValue(12, windowHeight)}px;
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