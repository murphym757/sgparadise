import * as React from 'react';

// Sg Paradise 3 Default Color Scheme
const primaryColor = 'rgb(224, 218, 214)'; // Timberwolf
const primaryColorAlt = 'rgb(31, 37, 41)'; //Charleston Green
const primaryColorLight = 'rgb(246, 245, 243)'; // Cultured
const primaryColorAltLight = 'rgb(61, 73, 81)'; //Charcoal
const secondaryColor = 'rgb(152, 93, 93)'; //Rose Taupe
const secondaryColorAlt = 'rgb(84, 149, 201)'; //Blue Grey
const primaryFontColor = primaryColorAlt;
const secondaryFontColor = 'rgb(103, 162, 162)'; // Cadet Blue
const successAlertFont = 'rgb(60, 92, 92)'; // Dark Slate Grey
const failureAlertFont = 'rgb(79, 49, 49)'; // Old Burgundy
const primaryRatingColor = 'rgb(188, 10, 0)';
const white = primaryColor;
const black = primaryFontColor;
const offBlack= 'rgb(112, 112, 112)';
const dayThemeOpacity = 0.95;
const nightThemeOpacity = 0.85;

const sgParadiseDefaultTheme = {
    light: {
        primaryColor: primaryColor,
        primaryColorAlt: primaryColorAlt,
        primaryColorLight: primaryColorLight,
        primaryColorAltLight: primaryColorAltLight,
        secondaryColor: secondaryColor,
        secondaryColorAlt: secondaryColorAlt,
        primaryFontColor: primaryColorAlt,
        secondaryFontColor: secondaryFontColor,
        primaryRatingColor: primaryRatingColor,
        successAlertFont: successAlertFont,
        successAlertColor: secondaryFontColor,
        failureAlertFont: failureAlertFont,
        failureAlertColor: secondaryColor,
        white: white,
        black: black,
        offBlack: offBlack
    },
    dark: {
        primaryColor: primaryColorAlt,
        primaryColorAlt: primaryColor,
        primaryColorLight: primaryColorAltLight,
        primaryColorAltLight: primaryColorLight,
        secondaryColor: secondaryColorAlt,
        secondaryColorAlt: secondaryColor,
        primaryFontColor: primaryColor,
        secondaryFontColor: secondaryFontColor,
        primaryRatingColor: primaryRatingColor,
        successAlertFont: successAlertFont,
        successAlertColor: secondaryFontColor,
        failureAlertFont: failureAlertFont,
        failureAlertColor: secondaryColor,
        white: black,
        black: white,
        offBlack: offBlack
    }
    
}
// Checks for night hours
let currentTime = new Date();
let time = currentTime.getHours();

function themeSelector() {
    if (time >= 17 || time < 7) {
        return sgParadiseDefaultTheme.dark;
    } else {
        return sgParadiseDefaultTheme.light;
    }
}
export const currentTheme = themeSelector();

export const CurrentThemeContext = React.createContext(currentTheme);