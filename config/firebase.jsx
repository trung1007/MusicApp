// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { initializeAuth} from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBgkXpGbVmh8-u72bGIOlMkLB-RekQevvg",
  authDomain: "music-app-2c0fc.firebaseapp.com",
  projectId: "music-app-2c0fc",
  storageBucket: "music-app-2c0fc.appspot.com",
  messagingSenderId: "30381411693",
  appId: "1:30381411693:web:b741c8b531f004a6255e64",
  measurementId: "G-7C1HPYXGRG"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB};

