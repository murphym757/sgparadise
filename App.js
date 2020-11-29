import React, { useState, useEffect, useContext } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { AuthProvider } from './src/app/components/screens/authScreens/authContext'
import ScreenRoutes from "./src/app/components/screens/screenRoutes";

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
    
      if (fontsLoaded) {
        return  (
          <AuthProvider>
            <ScreenRoutes />
          </AuthProvider>
        );        
      } else {
        return (
            <AppLoading />
        )
      }
}