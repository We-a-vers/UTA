// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';



window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'boardMembersHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const boardMembersHeader = snapshot.val();

        const sRef = storageRef(storage, "boardMembersHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        boardMemberImage.src = imageUrl;
        boardMemberImage.alt = 'Board Member Image';
        descriptionInput.value = boardMembersHeader.description;
        urlInput.value = boardMembersHeader.url;
    }
});