// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

const headerImage = document.querySelector('#header-img')
const descriptionInput = document.querySelector('#header-description')

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'homepage/homeHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const homeHeader = snapshot.val();

        const sRef = storageRef(storage, "homeHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        headerImage.src = imageUrl;
        headerImage.alt = 'Home Header Image';
        descriptionInput.textContent = homeHeader.description;
    }
});