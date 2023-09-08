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


// <div class="uta-sponsors__logos">
//         <div class="uta-sponsors__logo-wrapper">
//             <img src="Background.png" alt="Sponsor">
//             <div class="uta-sponsors__discount">10% off</div>
//             <div class="tooltiptext">
//                 <div class="tooltiptext-title">Meet Fresh</div>

//                 <div class="tooltiptext-body">
//                     <div class="tooltiptext-discount">Discount: 10% Off</div>
//                     <ul class="tooltiptext-content">
//                         <li>Meet Fresh is THE BEST Taiwanese dessert place ever! They are best known for their hand-made dessert such as icy grass jelly and many more!</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>

const sponsorsContainer = document.querySelector('.uta-sponsors__logos');
// helper function that creates the corresponding html elements and append them to the section defined above
async function addSponsorToHtml(sponsorId, sponsorName, sponsorBenefitInfo) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `sponsors/current/${sponsorId}`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
        let sponsor = sponsorsContainer.querySelector(`#${sponsorId}`)

        if (!sponsor) {
            sponsor = document.createElement("div");
            sponsor.classList.add('uta-sponsors__logo-wrapper');
            sponsor.id = sponsorId;

            sponsorsContainer.appendChild(sponsor);

            const sponsorImage = document.createElement("img");
            sponsorImage.src = url;
            sponsorImage.alt = "Sponsor Image";

            const sponsorBenefitInfo = document.createElement("div");
            sponsorBenefitInfo.classList.add('uta-sponsors__discount');
        }
        
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