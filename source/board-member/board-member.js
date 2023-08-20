// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

// helper function that creates the corresponding html elements and append them to the section defined above
async function addMemberToHtml(memberId, memberRole, memberName) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `memberPictures/${memberRole}/${memberId}.png`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        const memberContainer = document.querySelector('.members');
        let galleryContainer = document.querySelector(`#${memberRole}`);

        if(!galleryContainer){
            galleryContainer = document.createElement("div");
            galleryContainer.classList.add('gallery');
            galleryContainer.id = memberRole;

            memberContainer.appendChild(galleryContainer);

            const galleryTitle = document.createElement("h1");
            galleryTitle.textContent = memberRole.charAt(0).toUpperCase() + memberRole.slice(1);
            galleryContainer.appendChild(galleryTitle);

            const imageContainer = document.createElement("div");
            imageContainer.classList.add('gallery-image');
            galleryContainer.appendChild(imageContainer);
        }

        const imageContainer = document.querySelector('.gallery-image');

        const cardItem = document.createElement('div');
        cardItem.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.src = url;
        const cardName = document.createElement('h2');
        cardName.textContent = memberName;

        cardItem.appendChild(cardImage);
        cardItem.appendChild(cardName);

        imageContainer.appendChild(cardItem);
        
    } catch (error) {
        console.error("Error loading member picture:", error);
    }
}

addMemberToHtml("-NcGRUoA0KbPKHPvE8-Y", "asdd","sd");