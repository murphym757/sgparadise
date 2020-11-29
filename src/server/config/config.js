import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    IGDB_CLIENT_ID,
    IGDB_CLIENT_SECRET,
    GIANTBOMB_API_KEY
} from 'react-native-dotenv'

const gamesConfig = {
  igdbClientId: IGDB_CLIENT_ID,
  igdbClientSecret: IGDB_CLIENT_SECRET,
  giantbombApiKey: GIANTBOMB_API_KEY
}

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { gamesConfig, firebase }