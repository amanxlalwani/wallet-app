 
  // Import the functions you need from the SDKs you need
   import { initializeApp,getApps, getApp } from "firebase/app";
   import "firebase/auth"

import { log } from "console";
    console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    const getFirebaseApp=()=>{
      const firebaseConfig=
      {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: "wallet-app-1b38a.firebaseapp.com",
        projectId: "wallet-app-1b38a",
        storageBucket: "wallet-app-1b38a.appspot.com",
        messagingSenderId: "356174380614",
        appId: "1:356174380614:web:e7ccc9a7d2b5a99ae61447"
      }
      const app = getApps().length===0? initializeApp(firebaseConfig): getApp();
      return app
    }
 
   
    export{getFirebaseApp}