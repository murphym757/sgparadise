import styled from 'styled-components'
import { View, Text, ScrollView, SafeAreaView, Dimensions, StyleSheet, TextInput } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"
import { Image } from 'expo-image'
import {
    currentTheme
} from './globalTheme'

function responsivePxSize(pixelSize){
    return (
        `${windowController(pixelSize, windowHeight)}px`
    )
}
export const windowController = RFValue
export const windowHeight = Dimensions.get('window').height
export const windowWidth = Dimensions.get('window').width

//Search Bar 
export const CustomSearchBarContainer = styled(View) `
    height: ${responsivePxSize(48)};
    borderRadius: ${responsivePxSize(5)};
    overflow: hidden;
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    backgroundColor: ${currentTheme.primaryColor};
    fontSize: ${responsivePxSize(28)};
    marginTop: ${responsivePxSize(10)};
    marginBottom: ${responsivePxSize(10)};
    marginLeft: ${responsivePxSize(1)};
    marginRight: ${responsivePxSize(1)};
    paddingLeft: ${responsivePxSize(16)};
`;

export const CustomSearchBarTextInput = styled(TextInput) `
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    color: ${currentTheme.primaryColorAlt};
`;
/*------------------------ */

// For Image Carousel
export const SliderWidth = windowWidth
export const ItemWidth =  Math.round(SliderWidth * 0.7)
export const CarouselCardHeader = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontWeight: 700;
    paddingLeft: ${responsivePxSize(20)};
    paddingTop: ${responsivePxSize(20)};
`;
export const CarouselCardBody = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: 18;
    paddingHorizontal: ${responsivePxSize(20)};
`;
export const CarouselCardImage = styled(Image) `
    height: ${responsivePxSize(250)};
    width: ${ItemWidth};
    borderRadius: ${responsivePxSize(5)};
`;
/*-----------------*/

export const Container = styled(View) `
    paddingHorizontal: ${responsivePxSize(22)};
`;

export const ViewContainer = styled(Container) `
	backgroundColor: ${currentTheme.primaryColor};
`;

export const ContentContainer = styled(ViewContainer) `
	justifyContent: center;
	alignItems: center;
`;

export const CenterContent = styled(View) `
	justifyContent: left;
	alignItems: flex-start;
`;

//* Card Styling *//
    export const Card = styled(View) `
        backgroundColor: ${currentTheme.primaryColor};
        borderRadius: ${responsivePxSize(25)};
        width: ${responsivePxSize(375)};
        height: ${responsivePxSize(375)};
    `;

    //* The width is based on the genre/modes card's ability to list the possible max of 4 links (2 rows of 2 links)
    export const LinksCard = styled(Card) `
        width: ${responsivePxSize(310)};
    `;

    export const CardContent = styled(CenterContent) `
        marginVertical: ${responsivePxSize(5)};
    `;

    export const CardLinksView = styled(CenterContent) `
        flexDirection: 'row';
        flexWrap: 'wrap';
    `;

    export const PlatformCard = styled(View) `
        backgroundColor: ${currentTheme.primaryColor};
        alignItems: center;
        borderRadius: ${responsivePxSize(5)};
        width: ${responsivePxSize(250)};
        height: ${responsivePxSize(150)};
    `;

    export const Styles = StyleSheet.create({
        CardStyle: {
            flexGrow: 1,
            flex: 1,
        },
        CarouselStyle: {
            backgroundColor: 'white',
            borderRadius: 8,
            width: `${ItemWidth}`,
            paddingBottom: 40
        }
    });
//* Card Styling *//

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
export const BackButtonContainer = styled(Container) ``;

export const BackButtonTopLayer = styled(View) `
    position: absolute;
`;

export const BackButtonBottomLayer = styled(View) `
    position: relative;
`;
/*---------------------------------------*/

export const LinkedContentGenreView = styled(View) `
`;

export const LinkedContentGeneralInfoView = styled(View) `
    paddingVertical: ${responsivePxSize(5)};
`;

export const GeneralFontColor = styled(Text) `
    color: ${currentTheme.primaryFontColor};
`;

export const MainFont = styled(Text) `
    fontSize: ${responsivePxSize(16)};
	fontWeight: 500;
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    color: ${currentTheme.primaryFontColor};
`;

export const MainFontPills = styled(Text) `
    fontSize: ${responsivePxSize(12)};
	fontWeight: 500;
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    color: ${currentTheme.primaryFontColor};
`;

export const MainFontLinkView = styled(View) `
    justifyContent: Left;
	alignItems: flex-start;
    flexDirection: row;
    flexWrap: wrap;
`;

export const MainFontLink = styled(MainFont) `
    
`;

export const MainFontArrayLinks = styled(MainFontLink) `
    paddingRight: ${responsivePxSize(20)};
    paddingBottom: ${responsivePxSize(25)};
`;

export const MainSubFont = styled(Text) `
    fontSize: ${responsivePxSize(18)};
	fontWeight: 500;
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    color: ${currentTheme.secondaryColor};
`;

export const MainSecondaryFont = styled(Text) `
    fontSize:${responsivePxSize(18)};
	fontWeight: 500;
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    color: ${currentTheme.secondaryFontColor};
`;

export const MainHeading = styled(Text) `
    fontSize: ${responsivePxSize(25)};
    fontWeight: 700;
    fontFamily: ${currentTheme.fontsGroup.appWideFontBoldStandoutMini};
    color: ${currentTheme.primaryFontColor};
`;

export const MainHeadingLongTitle = styled(Text) `
    fontSize: ${responsivePxSize(15)};
    fontWeight: 700;
    fontFamily: ${currentTheme.fontsGroup.appWideFontBoldStandoutMini};
    color: ${currentTheme.primaryFontColor};
`;

export const MainHeadingButton = styled(Text) `
    fontSize: ${responsivePxSize(20)};
    fontWeight: 700;
    fontFamily: ${currentTheme.fontsGroup.appWideFontBoldStandoutMini};
    color: ${currentTheme.primaryFontColor};
`;

export const MainSubHeading = styled(Text) `
    fontSize: ${responsivePxSize(22)};
    fontWeight: 700;
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
    color: ${currentTheme.secondaryColor};
`;


export const ExpandableHeading = styled(Text) `
    fontSize: ${responsivePxSize(12)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontBold};
    paddingRight: ${responsivePxSize(20)};
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

export const ContentRow = styled(View) `
    flexDirection: row;
`;

// Divider beneath the form (and above the button
export const ContentDivider = styled(View) `
    paddingVertical: ${responsivePxSize(25)};
`;