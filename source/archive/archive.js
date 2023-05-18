window.addEventListener('DOMContentLoaded', (event) => {
    // Images for the first section
    const images1 = [
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
    ];
  
    // Images for the second section
    const images2 = [
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
    ];
  
    // Images for the third section
    const images3 = [
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
        'https://picsum.photos/580/350',
    ];
  
    // Populate image containers
    populateImageContainer('image-container1', images1);
    populateImageContainer('image-container2', images2);
    populateImageContainer('image-container3', images3);

    const images = [
        'https://picsum.photos/1150/630',
        'https://picsum.photos/1150/630',
        'https://picsum.photos/1150/630',
        'https://picsum.photos/1150/630',
        'https://picsum.photos/1150/630'
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