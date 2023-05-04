
const logOutBtn = document.querySelector('.log-out');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');

// Jump to the home page if logout button clicked
logOutBtn.addEventListener('click', ()=>{
    console.log("You have successfully logged out");
    form.reset();
    window.location.href = "./index.html";
})

