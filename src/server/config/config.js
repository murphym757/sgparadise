import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'
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
    GIANTBOMB_API_KEY,
    DAYIMAGE_SGALLLOGO,
    DAYIMAGE_SGALLLOGO_SELECTED,
    NIGHTIMAGE_SGALLLOGO,
    NIGHTIMAGE_SGALLLOGO_SELECTED,
    DAYIMAGE_SGGLOGO,
    DAYIMAGE_SGGLOGO_SELECTED,
    NIGHTIMAGE_SGGLOGO,
    NIGHTIMAGE_SGGLOGO_SELECTED,
    DAYIMAGE_SG1KLOGO,
    DAYIMAGE_SG1KLOGO_SELECTED,
    NIGHTIMAGE_SG1KLOGO,
    NIGHTIMAGE_SG1KLOGO_SELECTED,
    DAYIMAGE_SG32XLOGO,
    DAYIMAGE_SG32XLOGO_SELECTED,
    NIGHTIMAGE_SG32XLOGO,
    NIGHTIMAGE_SG32XLOGO_SELECTED,
    DAYIMAGE_SGCDLOGO,
    DAYIMAGE_SGCDLOGO_SELECTED,
    NIGHTIMAGE_SGCDLOGO,
    NIGHTIMAGE_SGCDLOGO_SELECTED,
    DAYIMAGE_SGGGLOGO,
    DAYIMAGE_SGGGLOGO_SELECTED,
    NIGHTIMAGE_SGGGLOGO,
    NIGHTIMAGE_SGGGLOGO_SELECTED,
    DAYIMAGE_SGMSLOGO,
    DAYIMAGE_SGMSLOGO_SELECTED,
    NIGHTIMAGE_SGMSLOGO,
    NIGHTIMAGE_SGMSLOGO_SELECTED
} from 'react-native-dotenv'

const imagesConfig ={
  sgallDayImage: DAYIMAGE_SGALLLOGO,
  sgallDayImagePicked: DAYIMAGE_SGALLLOGO_SELECTED,
  sgallNightImage: NIGHTIMAGE_SGALLLOGO,
  sgallNightImagePicked: NIGHTIMAGE_SGALLLOGO_SELECTED,
  sggDayImage: DAYIMAGE_SGGLOGO,
  sggDayImagePicked: DAYIMAGE_SGGLOGO_SELECTED,
  sggNightImage: NIGHTIMAGE_SGGLOGO,
  sggNightImagePicked: NIGHTIMAGE_SGGLOGO_SELECTED,
  sg1000DayImage: DAYIMAGE_SG1KLOGO,
  sg1000DayImagePicked: DAYIMAGE_SG1KLOGO_SELECTED,
  sg1000NightImage: NIGHTIMAGE_SG1KLOGO,
  sg1000NightImagePicked: NIGHTIMAGE_SG1KLOGO_SELECTED,
  sg32xDayImage: DAYIMAGE_SG32XLOGO,
  sg32xDayImagePicked: DAYIMAGE_SG32XLOGO_SELECTED,
  sg32xNightImage: NIGHTIMAGE_SG32XLOGO,
  sg32xNightImagePicked:NIGHTIMAGE_SG32XLOGO_SELECTED,
  sgcdDayImage: DAYIMAGE_SGCDLOGO,
  sgcdDayImagePicked: DAYIMAGE_SGCDLOGO_SELECTED,
  sgcdNightImage: NIGHTIMAGE_SGCDLOGO,
  sgcdNightImagePicked: NIGHTIMAGE_SGCDLOGO_SELECTED,
  sgggDayImage: DAYIMAGE_SGGGLOGO,
  sgggDayImagePicked: DAYIMAGE_SGGGLOGO_SELECTED,
  sgggNightImage: NIGHTIMAGE_SGGGLOGO,
  sgggNightImagePicked: NIGHTIMAGE_SGGGLOGO_SELECTED,
  sgmsDayImage: DAYIMAGE_SGMSLOGO,
  sgmsDayImagePicked: DAYIMAGE_SGMSLOGO_SELECTED,
  sgmsNightImage: NIGHTIMAGE_SGMSLOGO,
  sgmsNightImagePicked: NIGHTIMAGE_SGMSLOGO_SELECTED
}

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
  firebase.initializeApp(firebaseConfig)
}

export { imagesConfig, gamesConfig, firebase }