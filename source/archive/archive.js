window.addEventListener('DOMContentLoaded', (event) => {
    // Images for the first section
    const images1 = [
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
    ];
  
    // Images for the second section
    const images2 = [
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
    ];
  
    // Images for the third section
    const images3 = [
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
        './placeholder_image.png',
    ];
  
    // Populate image containers
    populateImageContainer('image-container1', images1);
    populateImageContainer('image-container2', images2);
    populateImageContainer('image-container3', images3);

    const images = [
        './placeholder_image.png',
        './placeholder_image2.png',
    ];
    let currentImageIndex = 0;
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImageSrc();
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImageSrc();
    }
    
    function updateImageSrc() {
        const image = document.querySelector('#past-event-highlights-image');
        image.src = images[currentImageIndex];
    }

    // Attach event listeners to the arrow buttons
    const prevArrow = document.querySelector('.prev-arrow');
    prevArrow.addEventListener('click', prevImage);

    const nextArrow = document.querySelector('.next-arrow');
    nextArrow.addEventListener('click', nextImage);
});
  
function populateImageContainer(containerId, images) {
    const container = document.getElementById(containerId);
    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      imgElement.alt = 'Event Image';
      container.appendChild(imgElement);
    });
}