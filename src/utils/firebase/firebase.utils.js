import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQm41CuK3Ly6ly7ECY7-GZRY3B2358Nuc",
    authDomain: "clothing-166d7.firebaseapp.com",
    projectId: "clothing-166d7",
    storageBucket: "clothing-166d7.appspot.com",
    messagingSenderId: "673672411782",
    appId: "1:673672411782:web:fd7dacf8c7ad985d19ef07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
    //if user data exists

    // if user data does not exist
    //create set the document with the data from userAuth in my collection

    // return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password)return;

    return createUserWithEmailAndPassword(auth,email,password);
}
