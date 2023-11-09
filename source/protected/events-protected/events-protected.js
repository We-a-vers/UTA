
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
    window.location.replace('/')
  }
});

// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../../firebase/firebase.js';

// Grabbing modal elements
const openModal = document.querySelector('#plus');
const closeModal = document.querySelector('#close-btn');
const modal = document.querySelector('.modal');

// Firebase
const eventImage = document.querySelector('#event-header-image')
const descriptionInput = document.querySelector('#description-input')
const urlInput = document.querySelector('#url-input')
const dateInput = document.querySelector('#date-input')
const titleInput = document.querySelector('#title-input')
const uploadEventFile = document.querySelector('#event-image-upload-file')
const eventUpload = document.querySelector('#event-upload')
const eventHeaderForm = document.querySelector('#event-header-form')

// click listener for the upload button
eventUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadEventFile.click();
});

// change the preview image for the event placeholder
uploadEventFile.addEventListener('change', () => {
    const imageFile = uploadEventFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        eventImage.src = reader.result;
    };
})


// save the form information when the save button is clicked
eventHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const eventImageUploadFileValue = uploadEventFile.files[0];

    let urlValue = "";
    if(urlInput.value){
        urlValue = urlInput.value;
    }
  
    // generate firebase database reference
    const eventHeaderRef = ref(database, 'events/eventHeader');

    // initialize data
    const date = new Date()
    const eventHeaderData = {
        description: descriptionInput.value,
        url: urlValue,
        date: dateInput.value,
        title: titleInput.value,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (eventImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(eventImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "events/eventHeaderPicture.png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(eventHeaderRef, eventHeaderData)
            .then(() => {
                window.alert("Event info saved!");
                console.log("Event header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing event header:", error);
            });
        });
    } else if (eventImage.alt != "No Image") {
        set(eventHeaderRef, eventHeaderData);
        window.alert("Event info saved!");
        console.log('Updated text only')
    } else{
        console.log('Failed')
    }
});


// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'events/eventHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const eventHeader = snapshot.val();

        const sRef = storageRef(storage, "events/eventHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        eventImage.src = imageUrl;
        eventImage.alt = 'Event Image';
        descriptionInput.value = eventHeader.description;
        titleInput.value = eventHeader.title;
        dateInput.value = eventHeader.date;
        urlInput.value = eventHeader.url;
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

/***** POP UP *****/

//Firebase for pop up modal form
const modalUpload = document.querySelector('#modal-upload')
const modalImage = document.querySelector('#modal-image')
const modalDateInput = document.querySelector('#modal-date-input')
const modalTitleInput = document.querySelector('#modal-title-input')
const modalUrlInput = document.querySelector('#modal-url-input')
const modalDescriptionInput = document.querySelector('#modal-description-input')
const uploadModalFile = document.querySelector('#modal-image-upload-file')
const modalForm = document.querySelector('#modal-form')
// get the section/div where the data/image will be displayed
const eventInfoSection = document.querySelector("#show-img");

// click listener for the upload button
modalUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadModalFile.click();
});

// change the preview image for the board event placeholder
uploadModalFile.addEventListener('change', () => {
    const imageFile = uploadModalFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        modalImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const modalImageUploadFileValue = uploadModalFile.files[0];
    const dateValue = modalDateInput.value;
    const titleValue = modalTitleInput.value;
    const descriptionValue = modalDescriptionInput.value;
    const urlValue = modalUrlInput.value;
  
    // generate firebase database reference
    const eventRef = ref(database, `events/pastEvents/${titleValue}`);
    const newEventRef = push(eventRef); // Generate a new child reference with an auto-generated ID
    const newEventId = newEventRef.key; // Get the auto-generated ID


    // initialize data
    const date = new Date()
    const eventsData = {
        id: newEventId,
        date: dateValue,
        title: titleValue,
        description: descriptionValue,
        url: urlValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (modalImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(modalImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = `eventPictures/${eventsData.title}/${newEventId}.png`;
        
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(newEventRef, eventsData)
            .then(() => {
                console.log("Past events info stored successfully");
                // hide pop-up and reset input fields
                modal.close();
                modalDateInput.value = "";
                modalTitleInput.value = "";
                modalDescriptionInput.value = "";
                modalUrlInput.value = "";
                
                uploadModalFile.value = null;
                modalImage.src = "/source/assets/placeholder-image.png";
                addEventToHtml(eventsData.id, eventsData.title);
            })
            .catch((error) => {
                console.error("Error storing past events info:", error);
            });
        });
    } else {
        window.alert("Please upload an image");
        console.log('Failed to add past events')
    }
});

// helper function that creates the corresponding html elements and append them to the section defined above
async function addEventToHtml(eventId, eventTitle) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `eventPictures/${eventTitle}/${eventId}.png`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        const eventContainer = document.createElement("div");
        const crossElement = document.createElement("button");
        crossElement.textContent = 'x';
        crossElement.classList.add('cross');
        crossElement.setAttribute('eventTitle', eventTitle);
        crossElement.setAttribute('eventId', eventId);
        eventContainer.classList.add("box");
        eventContainer.style.backgroundImage = `url('${url}')`;
        eventContainer.setAttribute('eventId', eventId);
    
        // append child element to parent element
        eventContainer.appendChild(crossElement);
        eventInfoSection.appendChild(eventContainer);
        
    } catch (error) {
        console.error("Error loading event picture:", error);
    }
}

async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'events/pastEvents');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const eventsArray = [];

        snapshot.forEach((positionSnap) => {
            const eventsInfo = positionSnap.val();
            // sort data by created date
            for (const eventId in eventsInfo) {
                const event = eventsInfo[eventId];
                event.createdAt = new Date(event.createdAt)
                eventsArray.push(event);
            }
        })

        eventsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const event of eventsArray) {
            await addEventToHtml(event.id, event.title);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);


// delete the event info by clicking the x on the top right corner
addEventListener('click', async (e) => {
    const target = e.target.closest('.cross');

    if(target){
        if (window.confirm("Delete this board event")){
            const eventId = target.getAttribute('eventId');
            const eventTitle = target.getAttribute('eventTitle');

            // Create a reference to the file to delete 
            const sRef = storageRef(storage, `eventPictures/${eventTitle}/${eventId}.png`);
            const dbRef = ref(database, `events/events/${eventTitle}/${eventId}`);
            
            try {
                // Delete the file from Firebase Storage
                await deleteObject(sRef);
                console.log('File deleted photo successfully');

                // Remove the event info from the Realtime Database
                await remove(dbRef);
                console.log('Event info deleted successfully');

                // Reload the data to update the displayed content
                //await reloadData();
                const eventToBeRemoved = document.querySelector(`[eventId="${eventId}"]`);
                eventToBeRemoved.remove();
            } catch (error) {
                console.error('Failed to delete the photo or event info', error);
            }
        }
    }
})
