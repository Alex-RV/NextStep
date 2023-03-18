import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAIKE7a5tpmIN0F4AkdM146xf1Cjhmnx38",
    authDomain: "hackathon2022-f3707.firebaseapp.com",
    projectId: "hackathon2022-f3707",
    storageBucket: "hackathon2022-f3707.appspot.com",
    messagingSenderId: "24858785212",
    appId: "1:24858785212:web:51be9e9ed2abc19ce0e7b9",
    measurementId: "G-M6D7XN77CF"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app