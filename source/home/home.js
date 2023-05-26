
const logInBtn = document.querySelector('.log-in');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const subBtn = document.querySelector('#submit-btn');
const passcode = document.querySelector('#passcode');
const form = document.querySelector('form');

// Temp Passcode
const defaultPasscode = '1234';

// Close the modal and reset the form
function closeModal(){
    modal.style.display = 'none';
    form.reset();
}

// Display the modal
logInBtn.addEventListener('click', ()=>{
    modal.style.display = 'block';
})

// Close by clicking x button
closeBtn.addEventListener('click', ()=>{
    closeModal();
})

// Jump to the protected page if passcode matches
subBtn.addEventListener('click', ()=>{
    if(passcode.value === defaultPasscode){
        console.log("Pass!!");
        form.reset();
        window.location.href = 'source/log-in/protected.html';
    }
    else{
        alert('Wrong Code!!')
    }
})

// Close by clicking outside of the form
modal.addEventListener('click', (e)=>{
    if(e.target === modal){
        closeModal();
    }
})

// Close by pressing Escape Key
document.addEventListener('keydown', (e)=>{
    if(e.key === "Escape" && modal.style.display === 'block'){
        closeModal();
    }
})


