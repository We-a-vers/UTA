// import everything from firebase.js
import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

/* Upcoming Event Section */

const upcomingEventImage = document.getElementsByClassName('Upcoming__img')
const upcomingEventDate = document.getElementsByClassName('Upcoming__date')
const upcomingEventDayDifference = document.getElementsByClassName('Upcoming__days')
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
        const imageUrl = await getDownloadURL(sRef);
        const today = new Date();
        const eventdate = new Date(eventHeader.date);

        var daysLeft = Math.round((eventdate.getTime() - today.getTime()) / (24 * 3600 * 1000));

        upcomingEventImage[0].src = imageUrl;
        upcomingEventImage[0].alt = 'Upcoming Event Image';
        upcomingEventDate[0].textContent = eventHeader.date;
        upcomingEventDayDifference[0].innerHTML = `In ${daysLeft} Days`;
        upcomingEventDescription.innerHTML = eventHeader.description.replaceAll('\n', '<br>');
        upcomingEventDescription.insertAdjacentHTML("afterbegin", `<h1>${eventHeader.title}</h1>`)

        if(eventHeader.url){
            const link = document.createElement('a')
            const btn = document.createElement('button')
            btn.id = 'sign-up-btn'
            btn.textContent = 'Sign Up'

            link.href = eventHeader.url

            link.appendChild(btn)

            upcomingEventDescription.insertAdjacentElement('beforeend', link)
        }
    }
});

/* Past Events Section */

const pastEventsContainer = document.querySelector('.img-container');
async function addEventsToHtml(eventTitle, eventId){

    try {
        // get storage reference with path
        const sRef = storageRef(storage, `eventPictures/${eventTitle}/${eventId}.png`);
        const url = await getDownloadURL(sRef);

        const newPastEventCard = document.createElement('img');
        newPastEventCard.src = url;
        newPastEventCard.classList.add('event');
        
        pastEventsContainer.appendChild(newPastEventCard);
    } catch (error) {
        console.error("Error loading event picture:", error);
    }
}

// helper function for reloading data from events
async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'events/pastEvents');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {

        // retrieve data
        const eventsArray = [];
        let count = 0;

        // pushes each event into the eventsArray
        snapshot.forEach((positionSnap) => {
            const eventsInfo = positionSnap.val();

            for (const eventid in eventsInfo){
                eventsArray.push(eventsInfo[eventid]);
            }
        })

        // sort data by created date
        eventsArray.sort((a, b) => new Date(a.date) - new Date(b.date));

        // iterate through each data and call the helper function
        for (const event of eventsArray) {
            await addEventsToHtml(event.title, event.id);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);