import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAmVt9BEtRXN79d1dPlUU7auC_gfIzqN7c  ',
    authDomain: 'wordhuntssolver.firebaseapp.com',
    projectId: 'wordhuntssolver',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
