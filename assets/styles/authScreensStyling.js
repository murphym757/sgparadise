import styled from 'styled-components';
import { View, Text, TextInput, Dimensions, Pressable } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
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

export const FormHeadingFontContainer = styled(View) `
    justifyContent: center; 
    alignItems: center;
    margin: ${responsivePxSize(30)};
`;

export const FormHeadingFont = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: ${responsivePxSize(30)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontBold};
`;

export const CustomSuccessAlert = styled(View) `
    height: ${responsivePxSize(80)};
    borderRadius: ${responsivePxSize(5)};
    overflow: hidden;
    justifyContent: center;
    backgroundColor: ${currentTheme.successAlertColor};
    marginTop: ${responsivePxSize(10)};
    marginBottom: ${responsivePxSize(10)};
    marginLeft: ${responsivePxSize(30)};
    marginRight: ${responsivePxSize(30)};
    paddingLeft: ${responsivePxSize(16)};
`;

export const CustomSuccessAlertFont = styled(Text) `
    color: ${currentTheme.successAlertFont};
    fontSize: ${responsivePxSize(15)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontBold};
`;

export const CustomFailureAlert = styled(View) `
    height: ${responsivePxSize(80)};
    borderRadius: ${responsivePxSize(5)};
    overflow: hidden;
    justifyContent: center;
    backgroundColor: ${currentTheme.failureAlertColor};
    marginVertical: ${responsivePxSize(10)};
    marginHorizontal: ${responsivePxSize(30)};
    paddingLeft: ${responsivePxSize(16)};
`;

export const CustomFailureAlertFont = styled(Text) `
    color: ${currentTheme.failureAlertFont};
    fontSize: ${responsivePxSize(15)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontBold};
`;

/* Login Screen */
/*---------------------------------------*/
export const CustomInputField = styled(TextInput) `
    height: ${responsivePxSize(48)};
    borderRadius: ${responsivePxSize(5)};
    overflow: hidden;
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    backgroundColor: ${currentTheme.primaryColorAlt};
    marginVertical: ${responsivePxSize(10)};
    marginHorizontal: ${responsivePxSize(1)};
    paddingLeft: 16px;
`;

export const TouchableButton = styled(Pressable) `
    backgroundColor: ${currentTheme.secondaryColor};
    marginHorizontal: ${responsivePxSize(30)};
    marginTop: ${responsivePxSize(20)};
    height: ${responsivePxSize(48)};
    borderRadius: ${responsivePxSize(5)};
    alignItems: center;
    justifyContent: center;
`;

export const TouchableButtonFont = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: ${responsivePxSize(15)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
`;

export const TouchableButtonAlt = styled(Pressable) `
    backgroundColor: ${currentTheme.primaryColor};
    marginHorizontal: ${responsivePxSize(30)};
    marginTop: ${responsivePxSize(20)};
    height: ${responsivePxSize(48)};
    border: ${currentTheme.secondaryColor};
    borderRadius: ${responsivePxSize(5)};
    alignItems: center;
    justifyContent: center;
`;

export const TouchableButtonFontAlt = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: ${responsivePxSize(15)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary};
`;

export const TouchableButtonDelete = styled(Pressable) `
    backgroundColor: ${currentTheme.primaryColorAltLight};
    marginHorizontal: ${responsivePxSize(30)};
    marginTop: ${responsivePxSize(20)};
    height: ${responsivePxSize(48)};
    border: ${currentTheme.secondaryColor};
    borderRadius: ${responsivePxSize(5)};
    alignItems: center;
    justifyContent: center;
`;

export const TouchableButtonFontDelete = styled(Text) `
    color: ${currentTheme.primaryColor};
    fontSize: ${responsivePxSize(15)};
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary}
`;

export const FooterView = styled(View) `
    flex: 1;
    alignItems: center;
    marginTop: ${responsivePxSize(20)};
`;
export const FooterFont = styled(Text) `
    fontSize: ${responsivePxSize(15)};
    fontFamily: ${currentTheme.fontsGroup.appWideFont};
    color: ${currentTheme.primaryFontColor};
`;
export const FooterLink = styled(Text) `
    color: ${currentTheme.secondaryColor};
    fontFamily: ${currentTheme.fontsGroup.appWideFontSecondary}
    fontSize: ${responsivePxSize(15)};
`;

/*---------------------------------------*/
