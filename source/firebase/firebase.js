import * as firebase from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, set, get, push, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';
import { getAuth} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'


const firebaseConfig = {
    apiKey: "AIzaSyCmGMX9MoljOy6BngzVhs4PmtqhJtLnCrk",
    authDomain: "ucsd-uta.firebaseapp.com",
    projectId: "ucsd-uta",
    storageBucket: "ucsd-uta.appspot.com",
    messagingSenderId: "973883227678",
    appId: "1:973883227678:web:c915a9a9b10a5773f6f80f",
    measurementId: "G-MCPVDR0L3Q"
};

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

const auth = getAuth(app);

export { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject };