// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

// grab header image and header text
const headerImage = document.querySelector('#header-img')
const headerText = document.querySelector('#header-text')

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
        headerImage.alt = 'Board Member Image';
        headerText.textContent = homeHeader.description;
    }
});

// helper function for reloading Data
async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'homepage/homeHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const sponsorsArray = [];

        for(let i = 0; i < 6; i++){
            const sponsorsInfo = snapshot[i].val();

            for (const sponsorId in sponsorsInfo) {
                const sponsor = sponsorsInfo[sponsorId];
                sponsor.createdAt = new Date(sponsor.createdAt)
                sponsorsArray.push(sponsor);
            }
        }

        sponsorsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const sponsor of sponsorsArray) {
            await addMemberToHtml(sponsor.id, sponsor.role, sponsor.name);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);