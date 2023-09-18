// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

// grab header image and header text
const headerImage = document.querySelector('#header-img')
const headerText = document.querySelector('#header-text')

// window load listener for header
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'homepage/homeHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const homeHeader = snapshot.val();

        const sRef = storageRef(storage, "homeHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        headerImage.src = imageUrl;
        headerImage.alt = 'Board Member Image';
        headerText.textContent = homeHeader.description;
    }
});


const upComingEventImage = document.querySelector('#upcoming-events-image')
const upComingEventDate = document.querySelector('#upcoming-events-date')
const upComingEventTitle = document.querySelector('#upcoming-events-title')
const upComingEventDescription = document.querySelector('#upcoming-events-description')

// window load listener for upcoming event
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'events/eventHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const eventHeader = snapshot.val();

        const sRef = storageRef(storage, "events/eventHeaderPicture.png");
        const imageUrl = await getDownloadURL(sRef);

        upComingEventImage.src = imageUrl;
        upComingEventImage.alt = 'Board Member Image';
        upComingEventDate.textContent = eventHeader.date;
        upComingEventTitle.textContent = eventHeader.title;
        upComingEventDescription.textContent = eventHeader.description;

        if(eventHeader.url){
            const link = document.createElement('a')
            const btn = document.createElement('button')
            btn.id = 'sign-up-btn'
            btn.textContent = 'Sign Up'

            link.href = eventHeader.url

            link.appendChild(btn)

            upComingEventDescription.insertAdjacentElement('afterend', link)
        }
        
    }
});


async function addSponsorsToHtml(id){

    try {
        // get storage reference with path
        const sRef = storageRef(storage, `sponsors/current/${id}`);
        const url = await getDownloadURL(sRef);

        //<img class="sponsor-image" src="/source/assets/placeholder-image.png" alt="">
        const imageContainer = document.querySelector('.sponsor-gallery')
        const image = document.createElement('img')
        image.classList.add('sponsor-image')
        image.src = url
        image.alt = 'Sponsor Image'
        
        imageContainer.appendChild(image)
        
    } catch (error) {
        console.error("Error loading member picture:", error);
    }
}

// helper function for reloading Data from sponsors
async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'sponsors/current');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {

        // retrieve data
        const sponsorsArray = [];

        let count = 0;
        snapshot.forEach((positionSnap) => {

            if(count < 6){
                const sponsorsInfo = positionSnap.val();
                // sort data by created date
                sponsorsInfo.createdAt = new Date(sponsorsInfo.createdAt);
                sponsorsArray.push(sponsorsInfo);

                count++;
            }
            else{
                return;
            }

        })

        sponsorsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const sponsor of sponsorsArray) {
            await addSponsorsToHtml(sponsor.id);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);