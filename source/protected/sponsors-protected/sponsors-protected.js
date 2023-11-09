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

// MEMBERSHIP CARD
const membershipCardForm = document.getElementById("membership-card-form");
const membershipCardImage = document.getElementById("membership-card-image");
const membershipCardImageUpload = document.getElementById("membership-card-image-upload");
const membershipCardImageFile = document.getElementById("membership-card-image-file");
// const membershipCardImageDelete = document.getElementById("membership-card-image-delete");
const membershipCardPrice = document.getElementById("membership-card-price");
const membershipCardDescription = document.getElementById("membership-card-description");
const membershipCardLink = document.getElementById("membership-card-link");

// click listener for the upload button
membershipCardImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    membershipCardImageFile.click();
});

// change the preview image for the board member placeholder
membershipCardImageFile.addEventListener('change', () => {
    const imageFile = membershipCardImageFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        membershipCardImage.src = reader.result;
    };
})


// save the form information when the save button is clicked
membershipCardForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const membershipCardImageFileValue = membershipCardImageFile.files[0];
    const membershipCardPriceValue = membershipCardPrice.value;
    const membershipCardDescriptionValue = membershipCardDescription.value;
    const membershipCardLinkValue = membershipCardLink.value;
  
    // generate firebase database reference
    const sponsorsMembershipCardRef = ref(database, 'sponsors/membershipCard');

    // initialize data
    const date = new Date()
    const sponsorsMembershipCardData = {
        price: membershipCardPriceValue,
        description: membershipCardDescriptionValue,
        link: membershipCardLinkValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (membershipCardImageFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(membershipCardImageFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "sponsors/membershipCard";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(sponsorsMembershipCardRef, sponsorsMembershipCardData)
            .then(() => {
                window.alert("Membership card info saved!");
                console.log("Membership card stored successfully");
            })
            .catch((error) => {
                console.error("Error storing membership card:", error);
            });
        });
    } else if (membershipCardImage.alt != "No Image") {
        set(sponsorsMembershipCardRef, sponsorsMembershipCardData);
        window.alert("Membership card info saved!");
        console.log('Updated text only')
    } else{
        window.alert("Please upload an image");
        console.log('Image missing')
    }
});


// MERCH
const merchForm = document.getElementById("merch-form");
const merchImage = document.getElementById("merch-image");
const merchImageUpload = document.getElementById("merch-image-upload");
const merchImageFile = document.getElementById("merch-image-file");
const merchPrice = document.getElementById("merch-price");
const merchDescription = document.getElementById("merch-description");
const merchLink = document.getElementById("merch-link");

// click listener for the upload button
merchImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    merchImageFile.click();
});

// change the preview image for the board member placeholder
merchImageFile.addEventListener('change', () => {
    const imageFile = merchImageFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        merchImage.src = reader.result;
    };
})


// save the form information when the save button is clicked
merchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const merchImageFileValue = merchImageFile.files[0];
    const merchPriceValue = merchPrice.value;
    const merchDescriptionValue = merchDescription.value;
    const merchLinkValue = merchLink.value;
  
    // generate firebase database reference
    const sponsorsMerchRef = ref(database, 'sponsors/merch');

    // initialize data
    const date = new Date()
    const sponsorsMerchData = {
        price: merchPriceValue,
        description: merchDescriptionValue,
        link: merchLinkValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (merchImageFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(merchImageFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "sponsors/merch";
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(sponsorsMerchRef, sponsorsMerchData)
            .then(() => {
                window.alert("Merch info saved!");
                console.log("Merch stored successfully");
            })
            .catch((error) => {
                console.error("Error storing merch:", error);
            });
        });
    } else if (merchImage.alt != "No Image") {
        set(sponsorsMerchRef, sponsorsMerchData);
        window.alert("Merch info saved!");
        console.log('Updated text only')
    } else {
        window.alert("Please upload an image");
        console.log('Image missing')
    }
});


// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const membershipCardRef = ref(database, 'sponsors/membershipCard');
    const membershipCardSnapshot = await get(membershipCardRef);
  
    if (membershipCardSnapshot.exists()) {
        // retrieve data
        const membershipCard = membershipCardSnapshot.val();

        const sRef = storageRef(storage, "sponsors/membershipCard");
        const imageUrl = await getDownloadURL(sRef);

        membershipCardImage.src = imageUrl;
        membershipCardImage.alt = 'Membership Card Image';
        membershipCardPrice.value = membershipCard.price;
        membershipCardDescription.value = membershipCard.description;
        membershipCardLink.value = membershipCard.link;
    }


    // create database reference
    const merchRef = ref(database, 'sponsors/merch');
    const merchSnapshot = await get(merchRef);
  
    if (merchSnapshot.exists()) {
        // retrieve data
        const merch = merchSnapshot.val();

        const sRef = storageRef(storage, "sponsors/merch");
        const imageUrl = await getDownloadURL(sRef);

        merchImage.src = imageUrl;
        merchImage.alt = 'Merch Image';
        merchPrice.value = merch.price;
        merchDescription.value = merch.description;
        merchLink.value = merch.link;
    }
});


// MODAL
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('#modal-form');
const openModal = document.querySelector('#plus');
const closeModal = document.querySelector('#close-btn');
const sponsorImage = document.getElementById('sponsor-image');
const sponsorImageFile = document.getElementById('sponsor-image-file');
const sponsorImageUpload = document.getElementById('sponsor-image-upload');
const sponsorName = document.getElementById('sponsor-name');
const sponsorBenefitInfo = document.getElementById('sponsor-benefit-info');
const sponsorDescription = document.getElementById('sponsor-description');
const sponsorsSection = document.querySelector("#show-img");

// open the modal by clicking the plus icon
openModal.addEventListener('click', () => {
    modal.showModal();
})

// close the modal by clicking the cancel button
closeModal.addEventListener('click', () => {
    modal.close();
    sponsorName.value = "";
    sponsorBenefitInfo.value = "";
    sponsorDescription.value = "";
    sponsorImageFile.value = null;
    sponsorImage.src = "/source/assets/placeholder-image.png";
})


// click listener for the upload button
sponsorImageUpload.addEventListener('click', () => {
    // trigger the hidden upload file input (will open file upload dialogue)
    sponsorImageFile.click();
});

// change the preview image for the board member placeholder
sponsorImageFile.addEventListener('change', () => {
    const imageFile = sponsorImageFile.files[0];
    const reader = new FileReader();

    // generate url
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
  
    // display image preview when the image is loaded
    reader.onload = () => {
        sponsorImage.src = reader.result;
    };
})

// save the form information when the save button is clicked
modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the image file and url
    const sponsorImageFileValue = sponsorImageFile.files[0];
    const sponsorNameValue = sponsorName.value;
    const sponsorBenefitInfoValue = sponsorBenefitInfo.value;
    const sponsorDescriptionValue = sponsorDescription.value;
  
    // generate firebase database reference
    const sponsorsRef = ref(database, 'sponsors/current');
    const newSponsorsRef = push(sponsorsRef); // Generate a new child reference with an auto-generated ID
    const newSponsorsId = newSponsorsRef.key; // Get the auto-generated ID


    // initialize data
    const date = new Date()
    const sponsorsData = {
        id: newSponsorsId,
        name: sponsorNameValue,
        benefitInfo: sponsorBenefitInfoValue,
        description: sponsorDescriptionValue,
        createdAt: date.toUTCString(),
    };

    // make sure an image file is uploaded
    if (sponsorImageFileValue) {
        // prepare for upload
        const fileURL = URL.createObjectURL(sponsorImageFileValue);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = `sponsors/current/${newSponsorsId}`;
        
        const sRef = storageRef(storage, filePath);

        // upload
        uploadBytes(sRef, blob).then((snapshot) => {
            // add data to database after upload is completed
            set(newSponsorsRef, sponsorsData)
            .then(() => {
                console.log("Sponsor info stored successfully");
                // hide pop-up and reset input fields
                modal.close();
                sponsorName.value = "";
                sponsorBenefitInfo.value = "";
                sponsorDescription.value = "";
                sponsorImageFile.value = null;
                sponsorImage.src = "/source/assets/placeholder-image.png";
                addSponsorToHtml(sponsorsData.id);
            })
            .catch((error) => {
                console.error("Error storing sponsor info:", error);
            });
        });
    } else {
        window.alert("Please upload an image");
        console.log('Failed to add sponsor')
    }
});

// helper function that creates the corresponding html elements and append them to the section defined above
async function addSponsorToHtml(sponsorId) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `sponsors/current/${sponsorId}`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        const sponsorContainer = document.createElement("div");
        const sponsorImage = document.createElement("img");
        const crossElement = document.createElement("button");
        sponsorContainer.classList.add("box");
        sponsorContainer.setAttribute('sponsorId', sponsorId);
        sponsorImage.src = url
        sponsorImage.classList.add('sponsor-image');
        sponsorImage.setAttribute('sponsorId', sponsorId);
        crossElement.textContent = 'x';
        crossElement.classList.add('cross');
        crossElement.setAttribute('sponsorId', sponsorId);
    
        // append child element to parent element
        sponsorContainer.appendChild(sponsorImage);
        sponsorContainer.appendChild(crossElement);
        sponsorsSection.appendChild(sponsorContainer);
        
    } catch (error) {
        console.error("Error loading sponsor picture:", error);
    }
}

async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'sponsors/current');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const sponsorsArray = [];

        snapshot.forEach((positionSnap) => {
            const sponsor = positionSnap.val();
            // sort data by created date
            sponsor.createdAt = new Date(sponsor.createdAt)
            sponsorsArray.push(sponsor);
        })

        sponsorsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const sponsor of sponsorsArray) {
            await addSponsorToHtml(sponsor.id);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);


// delete the member info by clicking the x on the top right corner
addEventListener('click', async (e) => {
    const target = e.target.closest('.cross');

    if(target){
        if (window.confirm("Delete this sponsor")){
            const sponsorId = target.getAttribute('sponsorId');

            // Create a reference to the file to delete 
            const sRef = storageRef(storage, `sponsors/current/${sponsorId}`);
            const dbRef = ref(database, `sponsors/current/${sponsorId}`);
            
            try {
                // Delete the file from Firebase Storage
                await deleteObject(sRef);
                console.log('File deleted photo successfully');

                // Remove the member info from the Realtime Database
                await remove(dbRef);
                console.log('Sponsor info deleted successfully');

                // Reload the data to update the displayed content
                //await reloadData();
                const sponsorToBeRemoved = document.querySelector(`[sponsorId="${sponsorId}"]`);
                sponsorToBeRemoved.remove();
            } catch (error) {
                console.error('Failed to delete the photo or sponsor info', error);
            }
        }
    }
})