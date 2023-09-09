import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'AboutUs/memberHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const memberHeader = snapshot.val();

        const sRef = storageRef(storage, "memberHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        memberImage.src = imageUrl;
        member.alt = 'About Us Member Image';
        descriptionInput.value = memberHeader.description;
        urlInput.value = memberHeader.url;
    }
});

// open the modal by clicking the plus icon
openModal.addEventListener('click', () => {
    modal.showModal();
})

// close the modal by clicking the cancel button
closeModal.addEventListener('click', () => {
    modalForm.reset();
    modalImage.src = "/source/assets/placeholder-image.png";
    modal.close();
})

