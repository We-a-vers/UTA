// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

const boardMemberImage = document.querySelector('#header-image');
const headerText = document.querySelector('#headerText');

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'boardMembers/memberHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const boardMembersHeader = snapshot.val();

        const sRef = storageRef(storage, "boardMembersHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        boardMemberImage.src = imageUrl;
        boardMemberImage.alt = 'Board Member Image';
        headerText.textContent = boardMembersHeader.description;

        const signUpButton = document.createElement('button');
        const link = document.createElement('a');

        if(boardMembersHeader.url != ""){
            signUpButton.textContent = "Join our intern program";
            signUpButton.className = 'link';

            link.href = boardMembersHeader.url;
            link.appendChild(signUpButton);
        }
        else{
            signUpButton.textContent = "No Link Provided";
            signUpButton.className = 'no-link';
        }

        headerText.insertAdjacentElement('afterend',link);
    }
});


const memberContainer = document.querySelector('.members');
let galleryContainer;
// helper function that creates the corresponding html elements and append them to the section defined above
async function addMemberToHtml(memberId, memberRole, memberName) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `memberPictures/${memberRole}/${memberId}.png`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        galleryContainer = memberContainer.querySelector(`#${memberRole}`)

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

        const imageContainer = galleryContainer.querySelector('.gallery-image');

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

async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'boardMembers/members');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const membersArray = [];

        snapshot.forEach((positionSnap) => {
            const membersInfo = positionSnap.val();
            // sort data by created date
            for (const memberId in membersInfo) {
                const member = membersInfo[memberId];
                member.createdAt = new Date(member.createdAt)
                membersArray.push(member);
            }
        })

        membersArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const member of membersArray) {
            await addMemberToHtml(member.id, member.role, member.name);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);
