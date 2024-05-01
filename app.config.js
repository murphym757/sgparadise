export default () => ({
    "expo": {
        "owner": "murphym757",
        "name": "Sg Paradise",
        "slug": "sgparadise",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "sgparadise-app-scheme",
        "notification": {
            "icon": "./assets/images/icon.png",
        },
        "ios": {
            "bundleIdentifier": "com.sgparadise.sgparadise",
            "buildNumber": "1.0.0",
            "supportsTablet": true,
            "userInterfaceStyle": "automatic",
            "usesAppleSignIn": true,
            "splash": {
                "image": "./assets/images/dayThemeSgParadise.png",
                "resizeMode": "contain",
                "backgroundColor": "#E4DAD6",
                "dark": {
                    "image": "./assets/images/nightThemeSgParadise.png",
                    "resizeMode": "contain",
                    "backgroundColor": "#1A1A1A"
                }
            },
            "usesAppleSignIn": true,
            "config": {
                "usesNonExemptEncryption": false
            }
        },
        "extra": {
            igdbClientId: process.env.IGDB_CLIENT_ID,
            igdbClientSecret: process.env.IGDB_CLIENT_SECRET,
            giantbombApiKey: process.env.GIANTBOMB_API_KEY,
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
            firebaseAppId: process.env.FIREBASE_AP_ID,
            algoliaApiKey: process.env.ALGOLIA_API_KEY,
            algoliaAppId: process.env.ALGOLIA_APPLICATION_ID,
            "eas": {
                "projectId": "53789bae-3cfb-4d0a-9c25-73866c02b858"
            }
        },
        "plugins": [
            [
                "expo-font",
                {
                    "fonts": [
                        "./assets/fonts/spartanFonts/Spartan-Black.ttf",
                        "./assets/fonts/spartanFonts/Spartan-Bold.ttf",
                        "./assets/fonts/spartanFonts/Spartan-ExtraBold.ttf",
                        "./assets/fonts/spartanFonts/Spartan-ExtraLight.ttf",
                        "./assets/fonts/spartanFonts/Spartan-Light.ttf",
                        "./assets/fonts/spartanFonts/Spartan-Medium.ttf",
                        "./assets/fonts/spartanFonts/Spartan-Regular.ttf",
                        "./assets/fonts/spartanFonts/Spartan-SemiBold.ttf",
                        "./assets/fonts/spartanFonts/Spartan-Thin.ttf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-Bold.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-BoldItalic.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-Light.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-LightItalic.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-Medium.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-MediumItalic.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-Regular.otf",
                        "./assets/fonts/lemonMilkFonts/LEMONMILK-RegularItalic.otf"
                    ]
                }
            ],
            [
                "expo-secure-store",
                {
                    "faceIDPermission": "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
                }
            ],
            "expo-router",
            "expo-apple-authentication",
        ],
        "updates": {
            "url": "https://u.expo.dev/53789bae-3cfb-4d0a-9c25-73866c02b858"
            },
            "runtimeVersion": {
            "policy": "appVersion"
            }
    }
})


