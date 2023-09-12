import { firebase, database, ref, set, get, push, remove, storage, storageRef, uploadBytes, getDownloadURL, deleteObject } from '../firebase/firebase.js';

const internProgramImage = document.getElementById("intern-program-image");
const internProgramDescription = document.getElementById("intern-program-description");
const internProgramJoinButton = document.getElementById("join-button");

const howImage = document.getElementById("how-image");
const howDescription = document.getElementById("how-description");

// window load listener
window.addEventListener("load", async () => {
    // create database reference
    const internProgramRef = ref(database, 'interns/internProgram');
    const internProgramSnapshot = await get(internProgramRef);
  
    if (internProgramSnapshot.exists()) {
        // retrieve data
        const internProgram = internProgramSnapshot.val();

        const sRef = storageRef(storage, "interns/internProgram");
        const imageUrl = await getDownloadURL(sRef);

        internProgramImage.src = imageUrl;
        internProgramImage.alt = 'UTA Intern Program Image';
        internProgramDescription.textContent = internProgram.description;
        internProgramJoinButton.setAttribute("onclick", "window.location.href='" + internProgram.link + "';");
    }

    const howRef = ref(database, 'interns/how');
    const howSnapshot = await get(howRef);
  
    if (howSnapshot.exists()) {
        // retrieve data
        const how = howSnapshot.val();

        const sRef = storageRef(storage, "interns/how");
        const imageUrl = await getDownloadURL(sRef);

        howImage.src = imageUrl;
        howImage.alt = 'UTA how does it work Image';
        howDescription.textContent = how.description;
    }
});

const pastProjectsContainer = document.querySelector('#past-projects');
// helper function that creates the corresponding html elements and append them to the section defined above
async function addProjectToHtml(projectId, projectName) {
    try {
        // get storage reference with path
        const sRef = storageRef(storage, `interns/past/${projectId}`);
        const url = await getDownloadURL(sRef);
    
        // create element, add class, add style
            const projectImage = document.createElement("img");
            projectImage.src = url;
            projectImage.alt = projectId;
            
            pastProjectsContainer.appendChild(projectImage)

    } catch (error) {
        console.error("Error loading past projects picture:", error);
    }
}

async function reloadData() {
    // create database reference
    const dbRef = ref(database, 'interns/past');
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
        // retrieve data
        const projectsArray = [];

        snapshot.forEach((positionSnap) => {
            const projectsInfo = positionSnap.val();

            // sort data by created date
            projectsInfo.createdAt = new Date(projectsInfo.createdAt)
            projectsArray.push(projectsInfo);
        })

        projectsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // iterate through each data and call the helper function
        for (const project of projectsArray) {
            await addProjectToHtml(project.id, project.name);
        }
    }
}

// window load listener
document.addEventListener("DOMContentLoaded", reloadData);