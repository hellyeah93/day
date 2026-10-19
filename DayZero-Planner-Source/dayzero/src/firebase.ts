import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { AppData } from './types';
const env = import.meta.env;
export const firebaseConfigured = Boolean(env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID && env.VITE_FIREBASE_APP_ID && env.VITE_FIREBASE_API_KEY !== 'replace_me');
const app = firebaseConfigured ? (getApps()[0] ?? initializeApp({ apiKey: env.VITE_FIREBASE_API_KEY, authDomain: env.VITE_FIREBASE_AUTH_DOMAIN, projectId: env.VITE_FIREBASE_PROJECT_ID, storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET, messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID, appId: env.VITE_FIREBASE_APP_ID })) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export async function signInGoogle() { if (!auth) throw new Error('Configure Firebase in .env before using cloud sign-in.'); return signInWithPopup(auth, new GoogleAuthProvider()); }
export async function signInEmail(email:string,password:string) { if (!auth) throw new Error('Configure Firebase in .env before using cloud sign-in.'); return signInWithEmailAndPassword(auth,email,password); }
export async function registerEmail(email:string,password:string) { if (!auth) throw new Error('Configure Firebase in .env before using cloud sign-in.'); return createUserWithEmailAndPassword(auth,email,password); }
export async function signOutUser() { if (auth) await signOut(auth); }
export function watchUser(cb:(user:User|null)=>void) { if (!auth) { cb(null); return () => {}; } return onAuthStateChanged(auth,cb); }
export async function loadCloudData(uid:string):Promise<Partial<AppData>|null> { if (!db) return null; const snap=await getDoc(doc(db,'users',uid,'app','data')); return snap.exists() ? snap.data() as Partial<AppData> : null; }
export async function saveCloudData(uid:string,data:AppData) { if (!db) throw new Error('Firebase is not configured.'); await setDoc(doc(db,'users',uid,'app','data'),{...data,updatedAt:Date.now()},{merge:true}); }
