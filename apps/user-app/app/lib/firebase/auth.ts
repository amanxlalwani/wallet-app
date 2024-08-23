   // Import the functions you need from the SDKs you need
    
   
   import { initializeApp,getApps, getApp } from "firebase/app";
   import "firebase/auth"
   import { firebaseConfig } from "./config";
   

    const app = getApps().length===0? initializeApp(firebaseConfig): getApp();
  
   
    export{app}