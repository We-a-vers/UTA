const upcomingEventsImagePencil = document.getElementById("upcoming-events-image-pencil");
const upcomingEventsForm = document.getElementById("upcoming-events-form");
const upcomingEventsFormCancel = document.getElementById("upcoming-events-form-cancel");
const upcomingEventsFormCheck = document.getElementById("upcoming-events-form-check");

upcomingEventsImagePencil.addEventListener("click", () => {
    upcomingEventsForm.style.display = "block";
});

upcomingEventsFormCancel.addEventListener("click", () => {
    upcomingEventsForm.style.display = "none";
});

upcomingEventsFormCheck.addEventListener("click", () => {
    upcomingEventsForm.style.display = "none";
});