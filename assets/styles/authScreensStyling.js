import styled from 'styled-components';
import { View, Text, TextInput, Button, Image, ScrollView, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
    currentTheme
} from './globalTheme';

export const FormHeadingFontContainer = styled(View) `
    justifyContent: center; 
    alignItems: center;
    margin: 30px;
`;

export const FormHeadingFont = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: 30px;
    fontFamily: 'SpartanBold';
`;

export const CustomSuccessAlert = styled(View) `
    height: 80px;
    borderRadius: 5px;
    overflow: hidden;
    justifyContent: center;
    backgroundColor: ${currentTheme.successAlertColor};
    marginTop: 10px;
    marginBottom: 10px;
    marginLeft: 30px;
    marginRight: 30px;
    paddingLeft: 16px;
`;

export const CustomSuccessAlertFont = styled(Text) `
    color: ${currentTheme.successAlertFont};
    fontSize: 15px;
    fontFamily: 'SpartanBold';
`;

export const CustomFailureAlert = styled(View) `
    height: 80px;
    borderRadius: 5px;
    overflow: hidden;
    justifyContent: center;
    backgroundColor: ${currentTheme.failureAlertColor};
    marginTop: 10px;
    marginBottom: 10px;
    marginLeft: 30px;
    marginRight: 30px;
    paddingLeft: 16px;
`;

export const CustomFailureAlertFont = styled(Text) `
    color: ${currentTheme.failureAlertFont};
    fontSize: 15px;
    fontFamily: 'SpartanBold';
`;

/* Login Screen */
/*---------------------------------------*/
export const CustomInputField = styled(TextInput) `
    height: 48px;
    borderRadius: 5px;
    overflow: hidden;
    fontFamily: 'SpartanRegular';
    backgroundColor: ${currentTheme.primaryColorAlt};
    marginTop: 10px;
    marginBottom: 10px;
    marginLeft: 30px;
    marginRight: 30px;
    paddingLeft: 16px;
`;

export const TouchableButton = styled(TouchableOpacity) `
    backgroundColor: ${currentTheme.secondaryColor};
    marginLeft: 30px;
    marginRight: 30px;
    marginTop: 20px;
    height: 48px;
    borderRadius: 5px;
    alignItems: center;
    justifyContent: center;
`;

export const TouchableButtonFont = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: 15px;
    fontFamily: 'SpartanMedium';
`;

export const FooterView = styled(View) `
    flex: 1;
    alignItems: center;
    marginTop: 20px;
`;
export const FooterFont = styled(Text) `
    fontSize: 15px;
    fontFamily: 'SpartanRegular';
    color: ${currentTheme.primaryFontColor};
`;
export const FooterLink = styled(Text) `
    color: ${currentTheme.secondaryColor};
    fontFamily: 'SpartanMedium';
    fontSize: 15px;
`;

/*---------------------------------------*/
