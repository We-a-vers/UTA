// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../../firebase/firebase.js';

// Grabbing modal elements
const openModal = document.querySelector('#plus');
const closeModal = document.querySelector('#close-btn');
const modal = document.querySelector('.modal');

// Firebase
const boardMemberUpload = document.querySelector('#board-member-upload')
const boardMemberImage = document.querySelector('#board-member-image')
const descriptionInput = document.querySelector('#description-input')
const urlInput = document.querySelector('#url-input')
const saveButton = document.querySelector('#save-btn')
const uploadBoardMemberFile = document.querySelector('#board-member-image-upload-file')
const boardMemberHeaderForm = document.querySelector('#board-member-header-form')


// click listener for the upload button
boardMemberUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadBoardMemberFile.click();
});

// change the preview image for the board member placeholder
uploadBoardMemberFile.addEventListener('change', () => {
    const imageFile = uploadBoardMemberFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        boardMemberImage.src = reader.result;
    };
})


// save the form information when the save button is clicked
boardMemberHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const boardMemberImageUploadFileValue = uploadBoardMemberFile.files[0];
    const descriptionValue = descriptionInput.value;
    const urlValue = urlInput.value;
  
    // generate firebase database reference
    const boardMembersHeaderRef = ref(database, 'boardMembersHeader');

    // initialize data
    const date = new Date()
    const boardMembersHeaderData = {
        description: descriptionValue,
        url: urlValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (boardMemberImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(boardMemberImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "boardMembersHeaderPicture.png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(boardMembersHeaderRef, boardMembersHeaderData)
            .then(() => {
                console.log("Board member header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing board member header:", error);
            });
        });
    } else if (boardMemberImage.alt != "No Image") {
        set(boardMembersHeaderRef, boardMembersHeaderData);
        console.log('Updated text only')
    } else{
        console.log('Failed')
    }
});


// window load listener
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

// open the modal by clicking the plus icon
openModal.addEventListener('click', () => {
    modal.showModal();
})

// close the modal by clicking the cancel button
closeModal.addEventListener('click', () => {
    modal.close();
})


