const loginButton = document.querySelector("navbar-component").shadowRoot.querySelector("#log-in");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.material-symbols-outlined')
const loginForm = document.querySelector('.login-form')
const user = {auth: false}


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

    const password = document.querySelector('#password').value
    
    if(password === '12345'){
        console.log('PASS')

        user.auth = true

        localStorage.setItem('user', JSON.stringify(user))
        window.location.replace("http://127.0.0.1:5500/source/protected/board-members-protected/board-members-protected.html");
    }
})