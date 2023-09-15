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


loginForm.addEventListener('submit', async (event) =>{

    event.preventDefault();

    const password = document.querySelector('#password').value
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password})
    })

    if (response.ok) {
        // Redirect the page to the desired URL
        window.location.replace("http://127.0.0.1:5500/source/protected/board-members-protected/board-members-protected.html");
    } else {
        // Handle the error, e.g., show an error message
        console.error('Authentication failed:', response.statusText);
    }
})