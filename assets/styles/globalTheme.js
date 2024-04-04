import * as React from 'react'
import { Appearance } from 'react-native';

// Sg Paradise 3 Default Color Scheme
const primaryColor = 'rgb(228, 218, 214)' // Timberwolf
const primaryColorAlt = 'rgb(31, 37, 41)' //Charleston Green
const primaryColorLight = 'rgb(246, 245, 243)' // Cultured
const primaryColorAltLight = 'rgb(61, 73, 81)' //Charcoal
const secondaryColor = 'rgb(152, 93, 93)' //Rose Taupe
const secondaryColorAlt = 'rgb(84, 149, 201)' //Blue Grey
const primaryFontColor = primaryColorAlt
const secondaryFontColor = 'rgb(103, 162, 162)' // Cadet Blue
const secondaryFontColorAlt ='rgb(104, 80, 59)' //Coffee
const successAlertFont = 'rgb(60, 92, 92)' // Dark Slate Grey
const failureAlertFont = 'rgb(79, 49, 49)' // Old Burgundy
const primaryRatingColor = 'rgb(188, 10, 0)'
const white = 'rgb(245, 245, 245)'
const black = 'rgb(17, 17, 17)'
const offBlack = 'rgb(112, 112, 112)'
const imPink = 'rgb(246, 180, 205)' // Piggy Pink
const dayThemeOpacity = 0.95
const nightThemeOpacity = 0.85

//* App-Wide Shared Colors/Fonts
const sgUniStyles = {
    primaryRatingColor,
    successAlertFont,
    successAlertColor: secondaryFontColor,
    failureAlertFont,
    failureAlertColor: secondaryColor,
    white,
    offWhite: primaryColor,
    black,
    offBlack,
    imageOpacityOverlay: primaryColorAlt,
}

//*-------------*/

//* App-Wide Fonts
    const appWideFont = 'SpartanRegular'
    const appWideFontBold = 'SpartanBold'
    const appWideFontBoldStandout = 'LemonMilkBold'
    const appWideFontBoldStandoutMini = 'SpartanBlack'
    const appWideFontSecondary = 'SpartanMedium'
    const appWideFontStandout = 'LemonMilkLight'
    const fontsGroup = {
        appWideFont,
        appWideFontBold,
        appWideFontBoldStandout,
        appWideFontBoldStandoutMini,
        appWideFontSecondary,
        appWideFontStandout
    }
//*-------------*/

const sgParadiseDefaultTheme = {
    light: {
        primaryColor: primaryColor,
        primaryColorAlt: primaryColorAlt,
        primaryColorLight: primaryColorLight,
        primaryColorAltLight: primaryColorAltLight,
        secondaryColor: secondaryColor,
        secondaryColorAlt: secondaryColorAlt,
        primaryFontColor: primaryColorAlt,
        secondaryFontColor: secondaryFontColorAlt,
        offWhite: primaryColor,
        sgUniStyles,
        fontsGroup
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
        offWhite: primaryColor,
        sgUniStyles,
        fontsGroup
    }
    
}
//* Checks for night hours (No longer needed, but useful for future reference)
//let currentTime = new Date()
//export let time = currentTime.getHours()
//export const dayTime = time >= 17 || time < 7
//export const nightTime = time <= 17 || time > 7

function themeSelector() {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') return sgParadiseDefaultTheme.dark
    if (colorScheme === 'light') return sgParadiseDefaultTheme.light
}
export const currentTheme = themeSelector()

export const CurrentThemeContext = React.createContext(currentTheme)