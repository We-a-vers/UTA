// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../../firebase/firebase.js';

// get all elements that you need (e.g. buttons, popup, and input fields) also make sure they have the 'id' attribute in html
const pastEventsAdd = document.getElementById("past-events-add");
const pastEventsForm = document.getElementById("past-events-form");
const pastEventsImageUpload = document.getElementById("past-events-image-upload");
const pastEventsImageDelete = document.getElementById("past-events-form-delete");
const pastEventsFormCancel = document.getElementById("past-events-form-cancel");
const pastEventsImageUploadFile = document.getElementById("past-events-image-upload-file")
const imagePreview = document.getElementById("form-image-preview")
const imageUrl = document.getElementById("image-url-input")

// click listener for the add button
pastEventsAdd.addEventListener("click", () => {
    // display pop-up
    pastEventsForm.style.display = "block";
});

// click listener for the upload button
pastEventsImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    pastEventsImageUploadFile.click();
});

// change listener for upload file
pastEventsImageUploadFile.addEventListener('change', () => {
    // get the image file
    const imageFile = pastEventsImageUploadFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        imagePreview.style.backgroundImage = `url('${reader.result}')`;
        imagePreview.style.border = `none`;
    };
});

// click listener for the delete button
pastEventsImageDelete.addEventListener("click", () => {
    // delete selected image file
    pastEventsImageUploadFile.value = null;
    // reset image preview
    imagePreview.style.backgroundImage = `url('/source/assets/placeholder-image.png')`;
    imagePreview.style.border = `1px solid #BBBFCC`;
});

// click listener for the cancel button
pastEventsFormCancel.addEventListener("click", () => {
    // hide pop-up form
    pastEventsForm.style.display = "none";
    // delete selected image file
    pastEventsImageUploadFile.value = null;
    // reset image preview and url
    imagePreview.style.backgroundImage = `url('/source/assets/placeholder-image.png')`;
    imagePreview.style.border = `1px solid #BBBFCC`;
    imageUrl.value = "";
});

// submit listener for the pop-up form (note: we don't need a separate listener for the submit button bc it's already handled by this)
pastEventsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // get the image file and url
    const pastEventsImageUploadFileValue = pastEventsImageUploadFile.files[0];
    const imageUrlValue = imageUrl.value;
  
    // generate firebase database reference
    const eventsRef = ref(database, 'pastEvents');
    const newEventRef = push(eventsRef); // Generate a new child reference with an auto-generated ID
    const newEventId = newEventRef.key; // Get the auto-generated ID

    // initialize data
    const date = new Date()
    const eventData = {
        id: newEventId,
        url: imageUrlValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (pastEventsImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(pastEventsImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "pastEventsPictures/" + newEventId + ".png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(newEventRef, eventData)
            .then(() => {
                console.log("Past event stored successfully");
                // hide pop-up and reset input fields
                pastEventsForm.style.display = "none";
                pastEventsImageUploadFile.value = null;
                imageUrl.value = "";
            })
            .catch((error) => {
                console.error("Error storing past event:", error);
            });
        });
    }
});

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'pastEvents');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const pastEvents = snapshot.val();

        // sort data by created date
        const eventArray = [];
        for (const eventId in pastEvents) {
            const event = pastEvents[eventId];
            event.createdAt = new Date(event.createdAt)
            eventArray.push(event);
        }
        eventArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // get the section/div where the data/image will be displayed
        const pastEventsSection = document.getElementById("past-events-section");

        // helper function that creates the corresponding html elements and append them to the section defined above
        async function processEvent(eventId) {
            try {
                // get storage reference with path
                const sRef = storageRef(storage, `pastEventsPictures/${eventId}.png`);
                const url = await getDownloadURL(sRef);
            
                // create element, add class, add style
                const eventContainer = document.createElement("div");
                eventContainer.classList.add("box");
                eventContainer.style.backgroundImage = `url('${url}')`;
            
                // create element, add class, add style
                const pencilButton = document.createElement("button");
                pencilButton.classList.add("pencil-button");
            
                // create element, add class, add style
                const pencilIcon = document.createElement("i");
                pencilIcon.classList.add("fa");
                pencilIcon.classList.add("fa-pencil");
                pencilIcon.style.setProperty("font-size", "1.4375rem");
                pencilIcon.style.setProperty("color", "#505D68");
            
                // append child element to parent element
                pencilButton.appendChild(pencilIcon);
                eventContainer.appendChild(pencilButton);
                pastEventsSection.appendChild(eventContainer);
            } catch (error) {
                console.error("Error loading past event picture:", error);
            }
        }

        // iterate through each data and call the helper function
        for (const event of eventArray) {
            await processEvent(event.id);
        }
    }
});