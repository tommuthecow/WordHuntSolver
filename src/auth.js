import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// User registration
export const register = (email, password) =>
createUserWithEmailAndPassword(auth, email, password);

// User login
export const login = (email, password) =>
signInWithEmailAndPassword(auth, email, password);

// User logout
export const logout = () => signOut(auth);  