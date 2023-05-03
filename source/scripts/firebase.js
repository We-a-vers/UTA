import * as firebase from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyDfwdVOBgGUGCta6kbv0hVbYUUFaiaAO98",
    authDomain: "weaversuta.firebaseapp.com",
    databaseURL: "https://weaversuta-default-rtdb.firebaseio.com",
    projectId: "weaversuta",
    storageBucket: "weaversuta.appspot.com",
    messagingSenderId: "748568964454",
    appId: "1:748568964454:web:f53513d9afc7d25836eca7",
    measurementId: "G-9B8XYP2Q68"
};

firebase.initializeApp(firebaseConfig);
const database = getDatabase();

export { firebase, database, ref, set, get };