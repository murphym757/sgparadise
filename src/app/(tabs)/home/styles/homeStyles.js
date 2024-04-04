import styled from 'styled-components';
import { View, Text, Dimensions, Pressable } from 'react-native'
import { currentTheme } from "assets/styles/globalTheme"


export const HomeMainFont = styled(Text) `
    fontSize: 40px;
    color: ${currentTheme.secondaryFontColor};
`;

export const ContentContainer = styled(View) `
	justifyContent: center;
	alignItems: center;
`;
