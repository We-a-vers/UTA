// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

// // grab header image and header text
// const headerImage = document.querySelector('#header-img')
// const headerText = document.querySelector('#header-text')

// window load listener for header
// window.addEventListener("load", async () => {
//     // create database reference
//     const dbRef = ref(database, 'home/homeHeader');
//     const snapshot = await get(dbRef);
  
//     if (snapshot.exists()) {
//         // retrieve data
//         const homeHeader = snapshot.val();

//         const sRef = storageRef(storage, "homeHeaderPicture.png");
//         const imageUrl = await getDownloadURL(sRef);

//         headerImage.src = imageUrl;
//         headerImage.alt = 'Board Member Image';
//         headerText.textContent = homeHeader.description;
//     }
// });

/* Upcoming Event Section */

const upcomingEventImage = document.getElementsByClassName('Upcoming__img')
const upcomingEventDate = document.getElementsByClassName('Upcoming__date')
const upcomingEventTitle = document.getElementsByClassName('Upcoming__title')
const upcomingEventDescription = document.getElementById('Upcoming__descriptions')

// window load listener for upcoming event
window.addEventListener("load", async () => {
    // create database reference
    const dbRef = ref(database, 'events/eventHeader');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const eventHeader = snapshot.val();
        const sRef = storageRef(storage, "events/eventHeaderPicture.png");
        // console.log(`sRef: ${sRef}`);
        const imageUrl = await getDownloadURL(sRef);
        // console.log(`Url: ${imageUrl}`);
        upcomingEventImage[0].src = imageUrl;
        // console.log(upcomingEventImage[0].src);

        upcomingEventImage[0].alt = 'Board Member Image';
        upcomingEventDate[0].textContent = eventHeader.date;
        upcomingEventTitle[0].textContent = eventHeader.title;
        upcomingEventDescription.textContent = eventHeader.description;

        if(eventHeader.url){
            const link = document.createElement('a')
            const btn = document.createElement('button')
            btn.id = 'sign-up-btn'
            btn.textContent = 'Sign Up'

            link.href = eventHeader.url

            link.appendChild(btn)

            upcomingEventDescription.insertAdjacentElement('afterend', link)
        }
        
    }
});

/* Past Events Section */

async function addEventsToHtml(id){

    try {
        // get storage reference with path
        const sRef = storageRef(storage, `events/past/${id}`);
        const url = await getDownloadURL(sRef);

        const imageContainer = document.querySelector('.past-events')
        const image = document.createElement('img')
        image.classList.add('event-image')
        image.src = url
        image.alt = 'Event Image'
        
        imageContainer.appendChild(image)
        
    } catch (error) {
        console.error("Error loading event picture:", error);
    }
}

// helper function for reloading data from events
async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'sponsors/past');
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