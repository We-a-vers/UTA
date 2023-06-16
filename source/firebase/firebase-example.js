import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from './firebase.js';

const pencilButton = document.getElementById("pencilButton");
const popupForm = document.getElementById("popupForm");
const eventForm = document.getElementById("eventForm");
const eventTitleInput = document.getElementById("eventTitle");
const eventPictureInput = document.getElementById("eventPicture");
const cancelBtn = document.getElementById("cancelBtn");
const eventsContainer = document.getElementById("eventsContainer");


pencilButton.addEventListener("click", () => {
    popupForm.style.display = "block";
});

eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const eventTitle = eventTitleInput.value;
    const eventPictureFile = eventPictureInput.files[0];
  
    if (eventTitle.trim() !== "") {
      const eventsRef = ref(database, 'events');
      const newEventRef = push(eventsRef); // Generate a new child reference with an auto-generated ID
      const newEventId = newEventRef.key; // Get the auto-generated ID
  
      const eventData = {
        id: newEventId,
        title: eventTitle
      };
  
      if (eventPictureFile) {
        const fileURL = URL.createObjectURL(eventPictureFile);
        const response = await fetch(fileURL);
        const blob = await response.blob();
        const filePath = "eventPictures/" + newEventId + ".png";
        const sRef = storageRef(storage, filePath);
        const uploadTask = uploadBytesResumable(sRef, blob);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle upload progress if needed
          },
          (err) => {
            console.log(err);
          },
          () => {
            // Upload complete, get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                console.log(url);
                // Here you can use the download URL of the uploaded image
                // Add the logic to display or process the image as needed
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          }
        );
      }
  
      set(newEventRef, eventData)
        .then(() => {
          console.log("Event stored successfully");
          popupForm.style.display = "none";
          eventTitleInput.value = "";
          eventPictureInput.value = null;
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

function removeEvent(eventId) {
    const eventRef = ref(database, `events/${eventId}`);
  
    // Remove the event from the database
    remove(eventRef)
      .then(() => {
        console.log("Event removed successfully");
      })
      .catch((error) => {
        console.error("Error removing event:", error);
      });
  
    // Remove the event's image from storage
    const filePath = `eventPictures/${eventId}.png`;
    const imageRef = storageRef(storage, filePath);
  
    deleteObject(imageRef)
      .then(() => {
        console.log("Event image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting event image:", error);
      });

    const container = document.querySelector(`[event-id="${eventId}"]`);
    if (container) {
        container.remove();
    }
}

window.addEventListener("load", async () => {
    const dbRef = ref(database, 'events');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
      const events = snapshot.val();
  
      for (const eventId in events) {
        const eventData = events[eventId];
        const eventTitle = eventData.title;
  
        const sRef = storageRef(storage, `eventPictures/${eventId}.png`);
        getDownloadURL(sRef)
          .then((url) => {
            const container = document.createElement("div");
            container.classList.add("container");
            container.setAttribute("event-id", eventId);

            const title = document.createElement("h3");
            title.classList.add("title");
            title.textContent = eventTitle;
            container.appendChild(title);

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.innerText = "Remove";
            removeButton.addEventListener("click", () => {
                removeEvent(eventId);
            });

            buttonContainer.appendChild(removeButton);
            container.appendChild(buttonContainer);
  
            const img = document.createElement("img");
            img.src = url;
            img.alt = "event picture";
            container.appendChild(img);
  
            eventsContainer.appendChild(container);
          })
          .catch((error) => {
            console.error("Error loading event picture:", error);
          });
      }
    } else {
      eventsContainer.innerHTML = "No Events";
    }
});
