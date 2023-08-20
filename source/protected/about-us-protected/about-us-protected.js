// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../../firebase/firebase.js';

// Firebase - Member
const aboutUsUpload = document.querySelector('#member-upload')
const aboutUsImage = document.querySelector('#member-img')
const descriptionInput = document.querySelector('#member-description-input')
const uploadAboutUsFile = document.querySelector('#member-image-upload-file')
const aboutUsHeaderForm = document.querySelector('#member-header-form')


// click listener for the upload button
aboutUsUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadAboutUsFile.click();
});

// change the preview image for the board member placeholder
uploadAboutUsFile.addEventListener('change', () => {
    const imageFile = uploadAboutUsFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        aboutUsImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
aboutUsHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const aboutUsImageUploadFileValue = uploadAboutUsFile.files[0];
    const descriptionValue = descriptionInput.value;
  
    // generate firebase database reference
    const memberHeaderRef = ref(database, 'aboutUs/memberHeader');

    // initialize data
    const date = new Date()

    const memberHeaderData = {
        description: descriptionValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (aboutUsImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(aboutUsImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "aboutUs/member/HeaderPicture.png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(memberHeaderRef, memberHeaderData)
            .then(() => {
                window.alert("Member info saved!");
                console.log("Member header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing Member header:", error);
            });
        });
    } else if (aboutUsImage.alt != "No Image") {
        set(memberHeaderRef, memberHeaderData);
        window.alert("Member info saved!");
        console.log('Updated text only')
    } else{
        console.log('Failed')
    }
});


// Firebase - History
const historyUpload = document.querySelector('#history-upload')
const historyImage = document.querySelector('#history-img')
const hDescriptionInput = document.querySelector('#history-description-input')
const uploadHistoryFile = document.querySelector('#history-image-upload-file')
const historyHeaderForm = document.querySelector('#history-header-form')


// click listener for the upload button
historyUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadHistoryFile.click();
});

// change the preview image for the board member placeholder
uploadHistoryFile.addEventListener('change', () => {
    const imageFile = uploadHistoryFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        historyImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
historyHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const historyImageUploadFileValue = uploadAboutUsFile.files[0];
    const hDescriptionValue = hDescriptionInput.value;
  
    // generate firebase database reference
    const historyHeaderRef = ref(database, 'aboutUs/historyHeader');

    // initialize data
    const date = new Date()

    const historyHeaderData = {
        description: hDescriptionValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (historyImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(historyImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "aboutUs/history/HeaderPicture.png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(historyHeaderRef, historyHeaderData)
            .then(() => {
                window.alert("History info saved!");
                console.log("History header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing History header:", error);
            });
        });
    } else if (historyImage.alt != "No Image") {
        set(historyHeaderRef, historyHeaderData);
        window.alert("History info saved!");
        console.log('Updated text only')
    } else{
        console.log('Failed')
    }
});


// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'memberHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve datam
        const memberHeader = snapshot.val();

        const sRef = storageRef(storage, "aboutUs/member/HeaderPicture.png");
        const sRef2 = storageRef(storage, "aboutUs/history/HeaderPicture.png");
    
        const imageUrl = await getDownloadURL(sRef);
        const imageUrl2 = await getDownloadURL(sRef2);

        aboutUsImage.src = imageUrl;
        aboutUsImage.alt = 'Member Image';
        descriptionInput.value = memberHeader.description;

        historyImage.src = imageUrl2;
        historyImage.alt = 'History Image';
        hDescriptionInput.value = memberHeader.description;
    }
});

