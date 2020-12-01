import styled from 'styled-components';
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native';
import {
    currentTheme
} from './globalTheme';

export const Container = styled(View) `
    flex: 1;
`;

export const ViewContainer = styled(Container) `
	backgroundColor: ${currentTheme.primaryColor};
`;

export const ContentContainer = styled(ViewContainer) `
	justifyContent: center;
	alignItems: center;
`;

export const SafeAreaViewContainer = styled(SafeAreaView) `
    flex: 1;
    backgroundColor: ${currentTheme.primaryColor};
`;

export const ScrollViewContainer = styled(ScrollView) `

`;

export const ViewSortColumn = styled(View) `
    flexDirection: column;
`;

export const GeneralFontColor = styled(Text) `
    color: ${currentTheme.primaryFontColor};
`;

export const MainFont = styled(Text) `
    fontSize: 24px;
	fontWeight: 500;
    color: ${currentTheme.primaryFontColor};
`;

export const MainHeading = styled(Text) `
    fontSize: 20px;
    fontWeight: 700;
    fontFamily: 'SpartanBlack';
    paddingHorizontal: 20px;
    color: ${currentTheme.primaryFontColor};
`;

export const MainSubHeading = styled(Text) `
    fontFamily: 'SpartanRegular';
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