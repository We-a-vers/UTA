import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


const loginButton = document.querySelector("navbar-component").shadowRoot.querySelector("#log-in");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.material-symbols-outlined')
const loginForm = document.querySelector('.login-form')
const user = {auth: ''}


// open the modal by clicking the plus icon
loginButton.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () =>{
    loginForm.reset()
    modal.close()
})

loginForm.addEventListener('submit', (e) =>{

    e.preventDefault()

    // const password = document.querySelector('#password').value
    
    // if(password === '12345'){
    //     console.log('PASS')

    //     user.auth = `@aT3'h8GN?V4xaKGP[X0}&Kfx6ID1-`

    //     localStorage.setItem('user', JSON.stringify(user))
    //     window.location.replace("/source/protected/board-members-protected/board-members-protected.html");
    // }

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value


    const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.accessToken)
            window.location.replace('/source/protected/board-members-protected/board-members-protected.html')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    });
})