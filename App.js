import React, { memo, useState, useEffect, useCallback, useContext } from 'react'
import { AuthProvider } from './src/app/components/screens/authScreens/authContext'
import { CurrentThemeContext } from 'index'
import { IconCreatorProvider } from './src/app/components/screens/userScreens/userIconContext'
import { LoaderProvider } from './src/server/config/loaderContext'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { SearchBarProvider } from './src/app/components/screens/mainScreens/sgGameSearchScreenContent/searchIndex'
import { TagsProvider } from './src/app/components/screens/authScreens/tagsContext'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import ScreenRoutes from "./src/app/components/screens/screenRoutes"

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'SpartanBlack': require('./assets/fonts/spartanFonts/Spartan-Black.ttf'),
    'SpartanBold':require('./assets/fonts/spartanFonts/Spartan-Bold.ttf'),
    'SpartanExtraBold': require('./assets/fonts/spartanFonts/Spartan-ExtraBold.ttf'),
    'SpartanExtraLight': require('./assets/fonts/spartanFonts/Spartan-ExtraLight.ttf'),
    'SpartanLight': require('./assets/fonts/spartanFonts/Spartan-Light.ttf'),
    'SpartanMedium': require('./assets/fonts/spartanFonts/Spartan-Medium.ttf'),
    'SpartanRegular': require('./assets/fonts/spartanFonts/Spartan-Regular.ttf'),
    'SpartanSemiBold': require('./assets/fonts/spartanFonts/Spartan-SemiBold.ttf'),
    'SpartanThin': require('./assets/fonts/spartanFonts/Spartan-Thin.ttf'),
    'LemonMilkBold': require('./assets/fonts/lemonMilkFonts/LEMONMILK-Bold.otf'),
    'LemonMilkBoldItalic': require('./assets/fonts/lemonMilkFonts/LEMONMILK-BoldItalic.otf'),
    'LemonMilkLight': require('./assets/fonts/lemonMilkFonts/LEMONMILK-Light.otf'),
    'LemonMilkLightItalic': require('./assets/fonts/lemonMilkFonts/LEMONMILK-LightItalic.otf'),
    'LemonMilkMedium': require('./assets/fonts/lemonMilkFonts/LEMONMILK-Medium.otf'),
    'LemonMilkMediumItalic': require('./assets/fonts/lemonMilkFonts/LEMONMILK-MediumItalic.otf'),
    'LemonMilkRegular': require('./assets/fonts/lemonMilkFonts/LEMONMILK-Regular.otf'),
    'LemonMilkRegularItalic': require('./assets/fonts/lemonMilkFonts/LEMONMILK-RegularItalic.otf')
  })
  const colors = useContext(CurrentThemeContext)
  const ReactNavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryColor,
    },
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


    if (fontsLoaded) {
        SplashScreen.hideAsync()
        return (
          <NavigationContainer theme={ReactNavTheme} onLayout={onLayoutRootView}>
            <LoaderProvider>
              <AuthProvider>
                <SearchBarProvider>
                  <IconCreatorProvider>
                    <TagsProvider>
                      <ScreenRoutes />
                    </TagsProvider>
                  </IconCreatorProvider>
                </SearchBarProvider>
              </AuthProvider>
            </LoaderProvider>
          </NavigationContainer>
        );
                
      } else {
        return null
      }
}