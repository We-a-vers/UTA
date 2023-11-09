import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


const loginButton = document.querySelector("navbar-component").shadowRoot.querySelector("#log-in");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.material-symbols-outlined')
const loginForm = document.querySelector('.login-form')
const errorText = document.querySelector('.error')

// open the modal by clicking the plus icon
loginButton.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () =>{
    loginForm.reset()
    errorText.style.display = 'none'
    modal.close()
    
})

loginForm.addEventListener('submit', (e) =>{

    e.preventDefault()

    const email = document.querySelector('#email')
    const password = document.querySelector('#password')


    const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location.replace('/source/protected/home-protected/home-protected.html')
            // ...
        })
        .catch((error) => {
            
            errorText.style.display = 'block'
    });
})
