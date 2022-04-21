import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyD4JE-vrl497zcwaJbz1KYDqpFIt_8Ibyk',
  authDomain: 'sveltekit-tutorial.firebaseapp.com',
  projectId: 'sveltekit-tutorial',
  storageBucket: 'sveltekit-tutorial.appspot.com',
  messagingSenderId: '211779657421',
  appId: '1:211779657421:web:a2d071e2633d7018c95384',
};

// Initialize Firebase
const app = initializeApp (firebaseConfig);

export const db = getFirestore (app);

export const auth = getAuth ();

export const googleProvider = new GoogleAuthProvider ();
