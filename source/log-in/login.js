const loginButton = document.querySelector("navbar-component").shadowRoot.querySelector("#log-in");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.material-symbols-outlined')
const loginForm = document.querySelector('.login-form')

// open the modal by clicking the plus icon
loginButton.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () =>{
    loginForm.reset()
    modal.close()
})
