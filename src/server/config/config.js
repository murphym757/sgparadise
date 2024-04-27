/*
import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'
*/
import algoliasearch from 'algoliasearch'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import {
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_API_KEY,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_APP_ID,
  IGDB_CLIENT_ID,
  IGDB_CLIENT_SECRET,
  GIANTBOMB_API_KEY
} from "@env"

const imagesConfig = {
  sg1000Icon: process.env.EXPO_PUBLIC_SG1KICON,
  sg32XIcon: process.env.EXPO_PUBLIC_SG32XICON,
  sgCDIcon: process.env.EXPO_PUBLIC_SGCDICON,
  sgGGIcon: process.env.EXPO_PUBLIC_SGGGICON,
  sgGENIcon: process.env.EXPO_PUBLIC_SGGICON,
  sgMSIcon: process.env.EXPO_PUBLIC_SGMSICON,
  sgSATIcon: process.env.EXPO_PUBLIC_SGSATICON,
  sgallDayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGALLLOGO,
  sgallDayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SGALLLOGO_SELECTED,
  sgallNightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGALLLOGO,
  sgallNightImagePicked: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGALLLOGO_SELECTED,
  sggDayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGGLOGO,
  sggDayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SGGLOGO_SELECTED,
  sggNightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGGLOGO,
  sggNightImagePicked: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGGLOGO_SELECTED,
  sg1000DayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SG1KLOGO,
  sg1000DayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SG1KLOGO_SELECTED,
  sg1000NightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SG1KLOGO,
  sg1000NightImagePicked: process.env.EXPO_PUBLIC_NIGHTIMAGE_SG1KLOGO_SELECTED,
  sg32xDayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SG32XLOGO,
  sg32xDayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SG32XLOGO_SELECTED,
  sg32xNightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SG32XLOGO,
  sg32xNightImagePicked:process.env.EXPO_PUBLIC_NIGHTIMAGE_SG32XLOGO_SELECTED,
  sgcdDayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGCDLOGO,
  sgcdDayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SGCDLOGO_SELECTED,
  sgcdNightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGCDLOGO,
  sgcdNightImagePicked: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGCDLOGO_SELECTED,
  sgggDayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGGGLOGO,
  sgggDayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SGGGLOGO_SELECTED,
  sgggNightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGGGLOGO,
  sgggNightImagePicked: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGGGLOGO_SELECTED,
  sgmsDayImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGMSLOGO,
  sgmsDayImagePicked: process.env.EXPO_PUBLIC_DAYIMAGE_SGMSLOGO_SELECTED,
  sgmsNightImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGMSLOGO,
  sgmsNightImagePicked: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGMSLOGO_SELECTED,
  sgParadiseDayMainImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGPARADISELOGO_MAIN,
  sgParadiseNightMainImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGPARADISELOGO_MAIN,
  sgParadiseDayAltImage: process.env.EXPO_PUBLIC_DAYIMAGE_SGPARADISELOGO_ALT,
  sgParadiseNightAltImage: process.env.EXPO_PUBLIC_NIGHTIMAGE_SGPARADISELOGO_ALT
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
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
}

const algoliaConfig = {
  apiKey: ALGOLIA_API_KEY,
  appId: ALGOLIA_APPLICATION_ID
}

// add firebase config here

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
const sgDB = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
const sgImageStorage = getStorage(app)


export { 
  imagesConfig, 
  gamesConfig, 
  auth, 
  sgDB,
  sgImageStorage,
  algoliaConfig }