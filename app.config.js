export default () => ({
    "expo": {
        "scheme": "sgparadise-app-scheme",
        "ios": {
            "bundleIdentifier": "com.sgparadise.sgparadise",
            "buildNumber": "1.0.0",
            "orientation": "portrait",
            "supportsTablet": true,
            "userInterfaceStyle": "automatic",
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
            "expo-font",
            "expo-router"
        ],
        "updates": {
            "url": "https://u.expo.dev/53789bae-3cfb-4d0a-9c25-73866c02b858"
            },
            "runtimeVersion": {
            "policy": "appVersion"
            }
    }
})


