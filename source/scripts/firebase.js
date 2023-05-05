import * as firebase from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCmGMX9MoljOy6BngzVhs4PmtqhJtLnCrk",
    authDomain: "ucsd-uta.firebaseapp.com",
    projectId: "ucsd-uta",
    storageBucket: "ucsd-uta.appspot.com",
    messagingSenderId: "973883227678",
    appId: "1:973883227678:web:c915a9a9b10a5773f6f80f",
    measurementId: "G-MCPVDR0L3Q"
};

firebase.initializeApp(firebaseConfig);
const database = getDatabase();

export { firebase, database, ref, set, get };