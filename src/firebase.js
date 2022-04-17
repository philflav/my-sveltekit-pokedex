import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4JE-vrl497zcwaJbz1KYDqpFIt_8Ibyk',
  authDomain: 'sveltekit-tutorial.firebaseapp.com',
  projectId: 'sveltekit-tutorial',
  storageBucket: 'sveltekit-tutorial.appspot.com',
  messagingSenderId: '211779657421',
  appId: '1:211779657421:web:a2d071e2633d7018c95384',
};

// Initialize Firebase
initializeApp (firebaseConfig);

export const auth = getAuth ();
export const googleProvider = new GoogleAuthProvider ();
