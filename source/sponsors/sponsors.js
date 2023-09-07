import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

const membershipCardImage = document.getElementById("membership-card-image");
const membershipCardPrice = document.getElementById("membership-card-price");
const membershipCardDescription = document.getElementById("membership-card-description");
const membershipCardPurchaseButton = document.getElementById("membership-card-purchase-button");

const merchImage = document.getElementById("merch-image");
const merchPrice = document.getElementById("merch-price");
const merchDescription = document.getElementById("merch-description");
const merchPurchaseButton = document.getElementById("merch-purchase-button");

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
        membershipCardImage.alt = 'UTA Membership Card Image';
        membershipCardPrice.textContent = "Price: " + membershipCard.price;
        membershipCardDescription.textContent = membershipCard.description;
        membershipCardPurchaseButton.setAttribute("onclick", "window.location.href='" + membershipCard.link + "';");
    }

    const merchRef = ref(database, 'sponsors/merch');
    const merchSnapshot = await get(merchRef);
  
    if (merchSnapshot.exists()) {
        // retrieve data
        const merch = merchSnapshot.val();

        const sRef = storageRef(storage, "sponsors/merch");
        const imageUrl = await getDownloadURL(sRef);

        merchImage.src = imageUrl;
        merchImage.alt = 'UTA Merch Image';
        merchPrice.textContent = "Price: " + merch.price;
        merchDescription.textContent = merch.description;
        merchPurchaseButton.setAttribute("onclick", "window.location.href='" + merch.link + "';");
    }
});