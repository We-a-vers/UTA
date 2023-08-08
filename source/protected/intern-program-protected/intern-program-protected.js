// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../../firebase/firebase.js';

// Grabbing modal elements
const openModal = document.querySelector('#plus');
const closeModal = document.querySelector('#close-btn');
const modal = document.querySelector('.modal');

// open the modal by clicking the plus icon
openModal.addEventListener('click', () => {
    modal.showModal();
})

// close the modal by clicking the cancel button
closeModal.addEventListener('click', () => {
    modal.close();
})


// Firebase for section 1
const internUpload = document.querySelector('#intern-upload')
const internDelete = document.querySelector('#intern-delete')
const internImage = document.querySelector('#intern-image')
const internDescriptionInput = document.querySelector('#intern-description-input')
const internUrlInput = document.querySelector('#intern-url-input')
const UploadInternFile = document.querySelector('#intern-image-upload-file')
const internHeaderForm = document.querySelector('#intern-header-form')

// click listener for the upload button
internUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    UploadInternFile.click();
});

// change the preview image for the intern placeholder
UploadInternFile.addEventListener('change', () => {
    const imageFile = UploadInternFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        internImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
internHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const internImageUploadFileValue = UploadInternFile.files[0];
    const descriptionValue = internDescriptionInput.value;
    const urlValue = internUrlInput.value;
  
    // generate firebase database reference
    const internsHeaderRef = ref(database, 'interns/internsHeader');

    // initialize data
    const date = new Date()
    const internsHeaderData = {
        description: descriptionValue,
        url: urlValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (internImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(internImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "interns/internsHeaderPicture.png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(internsHeaderRef, internsHeaderData)
            .then(() => {
                window.alert("Intern info saved!");
                console.log("Intern header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing intern header:", error);
            });
        });
    } else if (internImage.alt != "") {
        set(internsHeaderRef, internsHeaderData);
        // window.alert("Intern info saved!");
        console.log('Updated text only')
    } else{
        window.alert("Please upload an image");
        console.log('Image missing')
    }
});



// Firebase for section 2
const workUpload = document.querySelector('#work-upload')
const workDelete = document.querySelector('#work-delete')
const workImage = document.querySelector('#work-image')
const workDescriptionInput = document.querySelector('#work-description-input')
const workUrlInput = document.querySelector('#work-url-input')
const uploadWorkFile = document.querySelector('#work-image-upload-file')
const workHeaderForm = document.querySelector('#work-header-form')

// click listener for the upload button
workUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadWorkFile.click();
});

// change the preview image for the how does it work placeholder
uploadWorkFile.addEventListener('change', () => {
    const imageFile = uploadWorkFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        workImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
workHeaderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const workImageUploadFileValue = uploadWorkFile.files[0];
    const descriptionValue = workDescriptionInput.value;
    const urlValue = workUrlInput.value;
  
    // generate firebase database reference
    const worksHeaderRef = ref(database, 'interns/worksHeader');

    // initialize data
    const date = new Date()
    const worksHeaderData = {
        description: descriptionValue,
        url: urlValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (workImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(workImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "interns/worksHeaderPicture.png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(worksHeaderRef, worksHeaderData)
            .then(() => {
                window.alert("How does it work info saved!");
                console.log("How does it work header stored successfully");
            })
            .catch((error) => {
                console.error("Error storing how does it work header:", error);
            });
        });
    } else if (workImage.alt != "") {
        set(worksHeaderRef, worksHeaderData);
        // window.alert("How does it work info saved!");
        console.log('Updated text only')
    } else{
        window.alert("Please upload an image");
        console.log('Image missing')
    }
});

// window load listener
window.addEventListener("load", async () => {

    // create database reference
    const internHeaderRef = ref(database, 'interns/internsHeader')
    const internHeaderSapshot = await get(internHeaderRef);
    const workHeaderRef = ref(database, 'interns/worksHeader');
    const workHeaderSapshot = await get(workHeaderRef);
  
    if (internHeaderSapshot.exists()) {
        // retrieve data
        const internsHeader = internHeaderSapshot.val();

        const sRef = storageRef(storage, "interns/internsHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        internImage.src = imageUrl;
        internImage.alt = 'Intern Image';
        internDescriptionInput.value = internsHeader.description;
        internUrlInput.value = internsHeader.link;
    }

    if (workHeaderSapshot.exists()) {
        // retrieve data
        const worksHeader = workHeaderSapshot.val();

        const sRef = storageRef(storage, "interns/worksHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        workImage.src = imageUrl;
        workImage.alt = 'How Does It Work Image';
        workDescriptionInput.value = worksHeader.description;
        workUrlInput.value = worksHeader.link;
    }
});



//Firebase for pop up modal form
const modalUpload = document.querySelector('#modal-upload')
const modalDelete = document.querySelector('#modal-delete')
const modalImage = document.querySelector('#modal-image')
const instPostInput = document.querySelector('#modal-instPost-input')
const uploadModalrFile = document.querySelector('#modal-image-upload-file')
const modalForm = document.querySelector('#modal-form')

// click listener for the upload button
modalUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadModalrFile.click();
});

// change the preview image for the intern placeholder
uploadModalrFile.addEventListener('change', () => {
    const imageFile = uploadModalrFile.files[0];
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
    const modalImageUploadFileValue = uploadModalrFile.files[0];
    const instPostValue = instPostInput.value;
  
    // generate firebase database reference
    const internsRef = ref(database, `interns/${instPostValue}`);
    const newInterntRef = push(internsRef); // Generate a new child reference with an auto-generated ID
    const newInternId = newInterntRef.key; // Get the auto-generated ID


    // initialize data
    const date = new Date()
    const internsData = {
        id: newInternId,
        instagramPost: instPostValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (modalImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(modalImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = `internPictures${newInternId}.png`;
        
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(newInterntRef, internsData)
            .then(() => {
                console.log("Intern info stored successfully");
                // hide pop-up and reset input fields
                modal.close();
                instPostInput.value = "";
                uploadInternFile.value = null;
                modalImage.src = "/source/assets/placeholder-image.png";
                addInternToHtml(internsData.id, internsData.role);
            })
            .catch((error) => {
                console.error("Error storing intern info:", error);
            });
        });
    } else {
        window.alert("Please upload an image");
        console.log('Failed to add intern')
    }
});

// helper function that creates the corresponding html elements and append them to the section defined above
async function addInternToHtml(internId) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `internPictures/${internId}.png`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        const internContainer = document.createElement("div");
        const crossElement = document.createElement("button");
        crossElement.textContent = 'x';
        crossElement.classList.add('cross');
        crossElement.setAttribute('internId', internId);
        internContainer.classList.add("box");
        internContainer.style.backgroundImage = `url('${url}')`;
        internContainer.setAttribute('internId', internId);
    
        // append child element to parent element
        internContainer.appendChild(crossElement);
        internInfoSection.appendChild(internContainer);
        
    } catch (error) {
        console.error("Error loading intern picture:", error);
    }
}

async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'interns');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const internsArray = [];

        snapshot.forEach((positionSnap) => {
            const internsInfo = positionSnap.val();
            // sort data by created date
            for (const internId in internsInfo) {
                const intern = internsInfo[internId];
                intern.createdAt = new Date(intern.createdAt)
                internsArray.push(intern);
            }
        })

        internsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const intern of internsArray) {
            await addInternToHtml(intern.id);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);

// delete the intern info by clicking the x on the top right corner
addEventListener('click', async (e) => {
    const target = e.target.closest('.cross');

    if(target){
        if (window.confirm("Delete this intern")){
            const internId = target.getAttribute('internId');

            // Create a reference to the file to delete 
            const sRef = storageRef(storage, `internPictures${internId}.png`);
            const dbRef = ref(database, `interns/${internId}`);
            
            try {
                // Delete the file from Firebase Storage
                await deleteObject(sRef);
                console.log('File deleted photo successfully');

                // Remove the intern info from the Realtime Database
                await remove(dbRef);
                console.log('Intern info deleted successfully');

                // Reload the data to update the displayed content
                //await reloadData();
                const internToBeRemoved = document.querySelector(`[internId="${internId}"]`);
                internToBeRemoved.remove();
            } catch (error) {
                console.error('Failed to delete the photo or intern info', error);
            }
        }
    }
})