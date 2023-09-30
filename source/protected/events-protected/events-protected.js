// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

/* Upcoming Events Section */

const upComingEventImage = document.querySelector('#upcoming-events-image')
const upComingEventDate = document.querySelector('#upcoming-events-date')
const upComingEventTitle = document.querySelector('#upcoming-events-title')
const upComingEventDescription = document.querySelector('#upcoming-events-description')
const upComingEventUrl = document.querySelector('#upcoming-events-url');

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
        upComingEventImage.alt = 'Events Image';
        upComingEventDate.textContent = eventHeader.date;
        upComingEventTitle.textContent = eventHeader.title;
        upComingEventDescription.textContent = eventHeader.description;

        if(eventHeader.url){
            const link = document.createElement('a')
            const btn = document.createElement('button')
            btn.id = 'sign-up-btn'
            btn.textContent = 'Sign Up'

            link.href = upComingEventUrl.textContent;

            link.appendChild(btn)

            upComingEventDescription.insertAdjacentElement('afterend', link)
        }
        
    }
});

/* Past Events Section */

async function addEventsToHtml(id){

    try {
        // get storage reference with path
        const sRef = storageRef(storage, `events/past/${id}`);
        const url = await getDownloadURL(sRef);

        //<img class="sponsor-image" src="/source/assets/placeholder-image.png" alt="">
        const imageContainer = document.querySelector('.event-gallery')
        const image = document.createElement('img')
        image.classList.add('event-image')
        image.src = url
        image.alt = 'Event Image'
        
        imageContainer.appendChild(image)
        
    } catch (error) {
        console.error("Error loading event picture:", error);
    }
}

// helper function for reloading Data from sponsors
async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'events/past');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {

        // retrieve data
        const eventsArray = [];

        let count = 0;
        snapshot.forEach((positionSnap) => {

            if(count < 6){
                const eventsInfo = positionSnap.val();
                // sort data by created date
                eventsInfo.createdAt = new Date(eventsInfo.createdAt);
                eventsArray.push(eventsInfo);

                count++;
            }
            else{
                return;
            }

        })

        eventsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const event of eventsArray) {
            await addEventsToHtml(event.id);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);