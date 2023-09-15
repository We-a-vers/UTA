import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

// grab elements for top half (header)
const memberImage = document.querySelector('#header-image');
const headerText = document.querySelector('#headerText');

// grab elements for bottom half (history)
const historyImage = document.querySelector('#history-image');
const historyText = document.querySelector('#historyText');

// window load listener
window.addEventListener("load", async () => {
    // top half (header)
    // create database reference
    const dbRef1 = ref(database, 'aboutUs/memberHeader');
    const snapshot1 = await get(dbRef1);
  
    if (snapshot1.exists()) {
        // retrieve data
        const memberHeader = snapshot1.val();

        const sRef1 = storageRef(storage, "aboutUs/member/HeaderPicture.png");
        const imageUrl1 = await getDownloadURL(sRef1);

        memberImage.src = imageUrl1;
        memberImage.alt = 'About Us Member Image';
        headerText.textContent = memberHeader.description;
    }

    // bottom half (history)
    // create database reference
    const dbRef2 = ref(database, 'aboutUs/historyHeader');
    const snapshot2 = await get(dbRef2);
  
    if (snapshot2.exists()) {
        // retrieve data
        const historyHeader = snapshot2.val();

        const sRef2 = storageRef(storage, "aboutUs/history/HeaderPicture.png");
        const imageUrl2 = await getDownloadURL(sRef2);

        historyImage.src = imageUrl2;
        historyImage.alt = 'About Us History Image';
        historyText.textContent = historyHeader.description;
    }
});

// // open the modal by clicking the plus icon
// openModal.addEventListener('click', () => {
//     modal.showModal();
// })

// // close the modal by clicking the cancel button
// closeModal.addEventListener('click', () => {
//     modalForm.reset();
//     modalImage.src = "/source/assets/placeholder-image.png";
//     modal.close();
// })

