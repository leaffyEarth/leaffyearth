import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4XWPwI3Nk2fEbzwT8Dw9V2koWMRZ714M",
    authDomain: "leaffyearth-cb27f.firebaseapp.com",
    projectId: "leaffyearth-cb27f",
    storageBucket: "leaffyearth-cb27f.firebasestorage.app",
    messagingSenderId: "814473006050",
    appId: "1:814473006050:web:537554d59e80a13cf647bb",
    measurementId: "G-GNQCYNCC6F"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };