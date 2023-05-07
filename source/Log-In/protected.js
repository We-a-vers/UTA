
const logOutBtn = document.querySelector('.log-out');

// Jump to the home page if logout button clicked
logOutBtn.addEventListener('click', ()=>{
    console.log("You have successfully logged out");
    window.location.href = "/index.html";
})

