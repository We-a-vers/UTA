
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const auth = getAuth();
const logoutButton = document.querySelector("tab-component").shadowRoot.querySelector("#log-out");

logoutButton.addEventListener('click', () => {
  // Sign out the user
  signOut(auth)
    .then(() => {
      // User has been successfully signed out
      // Redirect to the login page or perform any other necessary actions
      window.location.replace = '/'; // Replace with the URL of your login page
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
});