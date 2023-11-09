
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    window.history.back()
  }
});


import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../../firebase/firebase.js';

const homeImageUploadBtn = document.getElementById("home-image-upload");
const homeImageFile = document.getElementById("home-image-file");
const homeImage = document.getElementById("home-input-image");
const homeHeaderForm = document.querySelector('#home-header-form')
const descriptionInput = document.querySelector('#description-input')


homeImageUploadBtn.addEventListener("click", function() {
    homeImageFile.click();
});

homeImageFile.addEventListener('change', () => {
    const imageFile = homeImageFile.files[0];
    const reader = new FileReader();

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    reader.onload = () => {
        homeImage.src = reader.result;
    };
})

// submit the data to firebase when save is clicked
homeHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const homeImageUploadFileValue = homeImageFile.files[0];
    const descriptionValue = descriptionInput.value;
  
    // generate firebase database reference
    const homeHeaderRef = ref(database, 'homepage/homeHeader');

    // initialize data
    const date = new Date()
    const homeHeaderData = {
        description: descriptionValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (homeImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(homeImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "homeHeaderPicture.png";
        const sRef = storageRef(storage, filePath);
        
        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(homeHeaderRef, homeHeaderData)
            .then(() => {
                window.alert("Home header info saved!");
                console.log("Home header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing Home header:", error);
            });
        });
    } else if (homeImage.alt != "No Image") {
        set(homeHeaderRef, homeHeaderData);
        window.alert("Home info saved!");
        console.log('Updated text only')
    } else{
        console.log('Failed')
    }
});

// reload window 
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'homepage/homeHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const homeHeader = snapshot.val();

        const sRef = storageRef(storage, "homeHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        homeImage.src = imageUrl;
        homeImage.alt = 'Home Image';
        descriptionInput.value = homeHeader.description;
    }
});
