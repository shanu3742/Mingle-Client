// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";
const fbProvider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FB_KEY,
  authDomain:import.meta.env.VITE_APP_FB_DOMAIN,
  projectId:import.meta.env.VITE_APP_FB_PROJECT_ID,
  storageBucket:import.meta.env.VITE_APP_FB_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_APP_FB_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_APP_FB_APP_ID,
  measurementId:import.meta.env.VITE_APP_FB_MEASUREMENT_ID
};

// Initialize Firebase
const onFireBaseInit = () => {
    const firebaseAppInstance = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseAppInstance);
    const auth = getAuth(firebaseAppInstance);
    return  {firebaseAppInstance,analytics,auth}
}
const {firebaseAppInstance,analytics,auth} = onFireBaseInit();
const FirebaseContext = createContext<FirebaseContextType|undefined>(undefined);
const FireBaseProvider= ({children}:{children:ReactNode}) => {
 
 
  return (
    <FirebaseContext.Provider value={{firebaseAppInstance,analytics,auth,fbProvider}}>
      {children}
    </FirebaseContext.Provider>
  )


}
export const useFirebaseContext = () => {
    return useContext(FirebaseContext);
};


export default FireBaseProvider

// Define the context type
export interface FirebaseContextType {
  firebaseAppInstance: FirebaseApp;
  analytics: Analytics;
  auth: Auth;
  fbProvider: GoogleAuthProvider;
}
