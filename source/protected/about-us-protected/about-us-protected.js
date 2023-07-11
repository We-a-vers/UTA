const pencilButton = document.getElementById("pencilButton");
const popupForm = document.getElementById("popupForm");
const formCancelButton = document.getElementById("form-cancel-button");
const formCheckMark = document.getElementById("form-check-mark");

pencilButton.addEventListener("click", () => {
    popupForm.style.display = "block";
});

formCancelButton.addEventListener("click", () => {
    popupForm.style.display = "none";
});

formCheckMark.addEventListener("click", () => {
    popupForm.style.display = "none";
});