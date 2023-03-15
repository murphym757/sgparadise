import React, { useState, useEffect, useCallback, useContext } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/app/components/screens/authScreens/authContext'
import { TagsProvider } from './src/app/components/screens/authScreens/tagsContext'
import { SearchBarProvider } from './src/app/components/screens/mainScreens/sgGameSearchScreenContent/searchIndex'
import { IconCreatorProvider } from './src/app/components/screens/userScreens/userIconContext'
import ScreenRoutes from "./src/app/components/screens/screenRoutes"

function useFonts(fontMap) {
  let [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}

export default function Home() {
  let [fontsLoaded] = useFonts({
    'SpartanBlack': require('./assets/fonts/spartanFonts/Spartan-Black.ttf'),
    'SpartanBold':require('./assets/fonts/spartanFonts/Spartan-Bold.ttf'),
    'SpartanExtraBold': require('./assets/fonts/spartanFonts/Spartan-ExtraBold.ttf'),
    'SpartanExtraLight': require('./assets/fonts/spartanFonts/Spartan-ExtraLight.ttf'),
    'SpartanLight': require('./assets/fonts/spartanFonts/Spartan-Light.ttf'),
    'SpartanMedium': require('./assets/fonts/spartanFonts/Spartan-Medium.ttf'),
    'SpartanRegular': require('./assets/fonts/spartanFonts/Spartan-Regular.ttf'),
    'SpartanSemiBold': require('./assets/fonts/spartanFonts/Spartan-SemiBold.ttf'),
    'SpartanThin': require('./assets/fonts/spartanFonts/Spartan-Thin.ttf')
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    
    prepare();
  }, []);

    if (fontsLoaded) {
        SplashScreen.hideAsync()
        return  (
          <AuthProvider>
            <SearchBarProvider>
              <IconCreatorProvider>
                <TagsProvider>
                  <ScreenRoutes />
                </TagsProvider>
              </IconCreatorProvider>
            </SearchBarProvider>
          </AuthProvider>
        );
                
      } else {
        return null
      }
}