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

// Intern program
const internProgramForm = document.getElementById("intern-program-form");
const internProgramImage = document.getElementById("intern-program-image");
const internProgramImageUpload = document.getElementById("intern-program-image-upload");
const internProgramImageFile = document.getElementById("intern-program-image-file");
const internProgramDescription = document.getElementById("intern-program-description");
const internProgramLink = document.getElementById("intern-program-link");

// click listener for the upload button
internProgramImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    internProgramImageFile.click();
});

// change the preview image for the intern program placeholder
internProgramImageFile.addEventListener('change', () => {
    const imageFile = internProgramImageFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        internProgramImage.src = reader.result;
    };
})


// save the form information when the save button is clicked
internProgramForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const internProgramImageFileValue = internProgramImageFile.files[0];
    const internProgramDescriptionValue = internProgramDescription.value;
    const internProgramLinkValue = internProgramLink.value;
  
    // generate firebase database reference
    const internProgramRef = ref(database, 'interns/internProgram');

    // initialize data
    const date = new Date()
    const internProgramData = {
        description: internProgramDescriptionValue,
        link: internProgramLinkValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (internProgramImageFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(internProgramImageFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "interns/internProgram";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(internProgramRef, internProgramData)
            .then(() => {
                window.alert("Intern program info saved!");
                console.log("Intern program stored successfully");
            })
            .catch((error) => {
                console.error("Error storing intern program:", error);
            });
        });
    } else if (internProgramImage.alt != "No Image") {
        set(internProgramRef, internProgramData);
        window.alert("Intern program info saved!");
        console.log('Updated text only')
    } else{
        window.alert("Please upload an image");
        console.log('Image missing')
    }
});


// How does it work
const howForm = document.getElementById("how-dows-it-work-form");
const howImage = document.getElementById("how-dows-it-work-image");
const howImageUpload = document.getElementById("how-image-upload");
const howImageFile = document.getElementById("how-image-file");
const howImageDelete = document.getElementById("how-image-delete");
const howDescription = document.getElementById("how-description");
const howLink = document.getElementById("how-link");

// click listener for the upload button
howImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    howImageFile.click();
});

// change the preview image for the board member placeholder
howImageFile.addEventListener('change', () => {
    const imageFile = howImageFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        howImage.src = reader.result;
    };
})


// save the form information when the save button is clicked
howForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const howImageFileValue = howImageFile.files[0];
    const howDescriptionValue = howDescription.value;
    const howLinkValue = howLink.value;
  
    // generate firebase database reference
    const howRef = ref(database, 'interns/how');

    // initialize data
    const date = new Date()
    const howData = {
        description: howDescriptionValue,
        link: howLinkValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (howImageFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(howImageFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "interns/how";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(howRef, howData)
            .then(() => {
                window.alert("How does it work info saved!");
                console.log("How does it work stored successfully");
            })
            .catch((error) => {
                console.error("Error storing how does it work:", error);
            });
        });
    } else if (howImage.alt != "No Image") {
        set(howRef, howData);
        window.alert("How does it work info saved!");
        console.log('Updated text only')
    } else {
        window.alert("Please upload an image");
        console.log('Image missing')
    }
});


// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const membershipCardRef = ref(database, 'interns/internProgram');
    const membershipCardSnapshot = await get(membershipCardRef);
  
    if (membershipCardSnapshot.exists()) {
        // retrieve data
        const membershipCard = membershipCardSnapshot.val();

        const sRef = storageRef(storage, "interns/internProgram");
        const imageUrl = await getDownloadURL(sRef);

        internProgramImage.src = imageUrl;
        internProgramImage.alt = 'Intern Program Image';
        internProgramDescription.value = membershipCard.description;
        internProgramLink.value = membershipCard.link;
    }


    // create database reference
    const howRef = ref(database, 'interns/how');
    const howSnapshot = await get(howRef);
  
    if (howSnapshot.exists()) {
        // retrieve data
        const how = howSnapshot.val();

        const sRef = storageRef(storage, "interns/how");
        const imageUrl = await getDownloadURL(sRef);

        howImage.src = imageUrl;
        howImage.alt = 'How does it work Image';
        howDescription.value = how.description;
        howLink.value = how.link;
    }
});


// MODAL
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('#modal-form');
const openModal = document.querySelector('#plus');
const closeModal = document.querySelector('#close-btn');
const pastInternImage = document.getElementById('past-intern-image');
const pastInternImageFile = document.getElementById('past-intern-image-file');
const pastInternImageUpload = document.getElementById('past-intern-image-upload');
const pastInternName = document.getElementById('post-url');
const pastInternsSection = document.querySelector("#show-img");

// open the modal by clicking the plus icon
openModal.addEventListener('click', () => {
    modal.showModal();
})

// close the modal by clicking the cancel button
closeModal.addEventListener('click', () => {
    modal.close();
    pastInternName.value = "";
    pastInternImageFile.value = null;
    pastInternImage.src = "/source/assets/placeholder-image.png";
})


// click listener for the upload button
pastInternImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    pastInternImageFile.click();
});

// change the preview image for the board member placeholder
pastInternImageFile.addEventListener('change', () => {
    const imageFile = pastInternImageFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        pastInternImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const pastInternImageFileValue = pastInternImageFile.files[0];
    const pastInternNameValue = pastInternName.value;
  
    // generate firebase database reference
    const pastInternsRef = ref(database, 'interns/past');
    const addedPastInternsRef = push(pastInternsRef); // Generate a new child reference with an auto-generated ID
    const addedPastInternsId = addedPastInternsRef.key; // Get the auto-generated ID


    // initialize data
    const date = new Date()
    const pastInternsData = {
        id: addedPastInternsId,
        name: pastInternNameValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (pastInternImageFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(pastInternImageFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = `interns/past/${addedPastInternsId}`;
        
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(addedPastInternsRef, pastInternsData)
            .then(() => {
                console.log("Past project info stored successfully");
                // hide pop-up and reset input fields
                modal.close();
                pastInternName.value = "";
                pastInternImageFile.value = null;
                pastInternImage.src = "/source/assets/placeholder-image.png";
                addPastInternToHtml(pastInternsData.id);
            })
            .catch((error) => {
                console.error("Error storing past project info:", error);
            });
        });
    } else {
        window.alert("Please upload an image");
        console.log('Failed to add past project')
    }
});

// helper function that creates the corresponding html elements and append them to the section defined above
async function addPastInternToHtml(pastInternId) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `interns/past/${pastInternId}`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        const pastInternContainer = document.createElement("div");
        const pastInternImage = document.createElement("img");
        const crossElement = document.createElement("button");
        pastInternContainer.classList.add("box");
        pastInternContainer.setAttribute('pastInternId', pastInternId);
        pastInternImage.src = url
        pastInternImage.classList.add('past-intern-image');
        pastInternImage.setAttribute('pastInternId', pastInternId);
        crossElement.textContent = 'x';
        crossElement.classList.add('cross');
        crossElement.setAttribute('pastInternId', pastInternId);
    
        // append child element to parent element
        pastInternContainer.appendChild(pastInternImage);
        pastInternContainer.appendChild(crossElement);
        pastInternsSection.appendChild(pastInternContainer);
        
    } catch (error) {
        console.error("Error loading past project picture:", error);
    }
}

async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'interns/past');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const pastInternsArray = [];

        snapshot.forEach((positionSnap) => {
            const pastIntern = positionSnap.val();
            // sort data by created date
            pastIntern.createdAt = new Date(pastIntern.createdAt)
            pastInternsArray.push(pastIntern);
        })

        pastInternsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const pastIntern of pastInternsArray) {
            await addPastInternToHtml(pastIntern.id);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);


// delete the member info by clicking the x on the top right corner
addEventListener('click', async (e) => {
    const target = e.target.closest('.cross');

    if(target){
        if (window.confirm("Delete this pastIntern")){
            const pastInternId = target.getAttribute('pastInternId');

            // Create a reference to the file to delete 
            const sRef = storageRef(storage, `interns/past/${pastInternId}`);
            const dbRef = ref(database, `interns/past/${pastInternId}`);
            
            try {
                // Delete the file from Firebase Storage
                await deleteObject(sRef);
                console.log('File deleted photo successfully');

                // Remove the member info from the Realtime Database
                await remove(dbRef);
                console.log('Past project info deleted successfully');

                // Reload the data to update the displayed content
                //await reloadData();
                const pastInternToBeRemoved = document.querySelector(`[pastInternId="${pastInternId}"]`);
                pastInternToBeRemoved.remove();
            } catch (error) {
                console.error('Failed to delete the photo or past project info', error);
            }
        }
    }
})