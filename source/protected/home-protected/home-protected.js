
const memberImageUploadBtn = document.getElementById("member-image-upload");
const memberImageFile = document.getElementById("member-image-file");
const memberImage = document.getElementById("member-input-image");




memberImageUploadBtn.addEventListener("click", function() {
    memberImageFile.click();
});

memberImageFile.addEventListener('change', () => {
    const imageFile = memberImageFile.files[0];
    const reader = new FileReader();

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    reader.onload = () => {
        memberImage.src = reader.result;
    };
})

