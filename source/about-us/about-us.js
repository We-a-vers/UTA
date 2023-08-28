import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

const memberImage = document.querySelector('#header-image');
const headerText = document.querySelector('#headerText');

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'aboutUs/memberHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const memberHeader = snapshot.val();

        const sRef = storageRef(storage, "memberHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        mamberImage.src = imageUrl;
        memberImage.alt = 'About Us Member Image';
        headerText.textContent = memberHeader.description;

        const signUpButton = document.createElement('button');
        const link = document.createElement('a');

        if(MembersHeader.url != ""){
            signUpButton.textContent = "Join our intern program";
            signUpButton.className = 'link';

            link.href = boardMembersHeader.url;
        }
        else{
            signUpButton.textContent = "No Link Provided";
            signUpButton.className = 'no-link';
        }

        link.appendChild(signUpButton);
        headerText.insertAdjacentElement('afterend',link);
    }
});
