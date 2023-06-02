// import { firebase, database, ref, set, get } from './firebase.js';

// window.addEventListener("DOMContentLoaded", (event) => {
//     var writeButton = document.getElementById("write");
//     var readButton = document.getElementById("read");
//     var clearButton = document.getElementById("clear");
//     var dataDiv = document.getElementById("data");

//     if (writeButton) {
//         writeButton.addEventListener('click', Write);
//     }
//     if (readButton) {
//         readButton.addEventListener('click', Read);
//     }
//     if (clearButton) {
//         clearButton.addEventListener('click', Clear);
//     }

//     function Write() {
//         const dbRef = ref(database, 'users/' + id);
//         const newData = { name: "test" + id };
//         set(dbRef, newData);
//         id++;
//     }
//     async function Read() {
//         const dbRef = ref(database, 'users');
//         const snapshot = await get(dbRef);
//         if (snapshot.exists()) {
//             var data = snapshot.val();
//             dataDiv.innerHTML = JSON.stringify(data); 
//         } else {
//             dataDiv.innerHTML = "No data available";
//         }
//     }
//     function Clear() {
//         id = 0;
//         const dbRef = ref(database, 'users/');
//         set(dbRef, {});
//     }
// });

// var id = 0;


import { firebase, database, ref, set, get, push } from './firebase.js';

const pencilButton = document.getElementById("pencilButton");
const popupForm = document.getElementById("popupForm");
const eventForm = document.getElementById("eventForm");
const eventTitleInput = document.getElementById("eventTitle");
const cancelBtn = document.getElementById("cancelBtn");
const dataDiv = document.getElementById("data");

pencilButton.addEventListener("click", () => {
    popupForm.style.display = "block";
});

eventForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const eventTitle = eventTitleInput.value;
    if (eventTitle.trim() !== "") {
        const eventsRef = ref(database, 'events');
        const newEventRef = push(eventsRef); // Generate a new child reference with an auto-generated ID
        const newEventId = newEventRef.key; // Get the auto-generated ID

        const eventData = {
            id: newEventId,
            title: eventTitle
        };

        set(newEventRef, eventData)
            .then(() => {
                console.log("Event stored successfully");
                popupForm.style.display = "none";
                eventTitleInput.value = "";
            })
            .then(async() => {
                const dbRef = ref(database, 'events');
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    dataDiv.innerHTML = JSON.stringify(data); 
                } else {
                    dataDiv.innerHTML = "No data available";
                }
            })
            .catch((error) => {
                console.error("Error storing event:", error);
            });
    }
});

cancelBtn.addEventListener("click", () => {
    popupForm.style.display = "none";
    eventTitleInput.value = "";
});