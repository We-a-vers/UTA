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

//Firebase for pop up modal form
const modalUpload = document.querySelector('#modal-upload')
const modalImage = document.querySelector('#modal-image')
const roleInput = document.querySelector('#modal-role-input')
const nameInput = document.querySelector('#modal-name-input')
const uploadModalrFile = document.querySelector('#modal-image-upload-file')
const modalForm = document.querySelector('#modal-form')

// click listener for the upload button
modalUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    uploadModalrFile.click();
});

// change the preview image for the board member placeholder
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
    const roleValue = roleInput.value;
    const nameValue = nameInput.value;
  
    // generate firebase database reference
    const membersRef = ref(database, 'boardMembers');
    const newMembertRef = push(membersRef); // Generate a new child reference with an auto-generated ID
    const newMemberId = newMembertRef.key; // Get the auto-generated ID


    // initialize data
    const date = new Date()
    const membersData = {
        id: newMemberId,
        role: roleValue,
        name: nameValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (modalImageUploadFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(modalImageUploadFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "memberPictures/" + newMemberId + ".png";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(newMembertRef, membersData)
            .then(() => {
                console.log("Board member info stored successfully");
                // hide pop-up and reset input fields
                modal.close();
                roleInput.value = "";
                nameInput.value = "";
                uploadBoardMemberFile.value = null;
                modalImage.src = "/source/assets/placeholder-image.png";
                
            })
            .catch((error) => {
                console.error("Error storing board member info:", error);
            });
        });
    } else if (modalImage.alt != "No Image") {
        set(newMembertRef, membersData);
        console.log('Updated text only')
    } else{
        console.log('Failed')
    }
});

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'boardMembers');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const membersInfo = snapshot.val();

        console.log(membersInfo)

        // sort data by created date
        const membersArray = [];
        for (const eventId in membersInfo) {
            const member = membersInfo[eventId];
            member.createdAt = new Date(member.createdAt)
            membersArray.push(member);
        }
        membersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // get the section/div where the data/image will be displayed
        const memberInfoSection = document.querySelector("#show-img");

        // helper function that creates the corresponding html elements and append them to the section defined above
        async function processEvent(eventId) {
            try {
                // get storage reference with path
                const sRef = storageRef(storage, `memberPictures/${eventId}.png`);
                const url = await getDownloadURL(sRef);
            
                // create element, add class, add style
                const memberContainer = document.createElement("div");
                memberContainer.classList.add("box");
                memberContainer.style.backgroundImage = `url('${url}')`;
            
                // append child element to parent element
                memberInfoSection.appendChild(memberContainer);
            } catch (error) {
                console.error("Error loading member picture:", error);
            }
        }

        // iterate through each data and call the helper function
        for (const member of membersArray) {
            await processEvent(member.id);
        }
    }
});

