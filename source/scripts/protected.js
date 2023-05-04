
const logOutBtn = document.querySelector('.log-out');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');


// Close the modal and reset the form
function closeModal(){
    modal.style.display = 'none';
    form.reset();
}

// Display the modal
logOutBtn.addEventListener('click', ()=>{
    modal.style.display = 'block';
})

// Jump to the home page if logout button clicked
logOutBtn.addEventListener('click', ()=>{
    console.log("You have successfully logged out");
    form.reset();
    window.location.href = "./index.html";
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

