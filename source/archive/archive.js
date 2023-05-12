window.addEventListener('DOMContentLoaded', (event) => {
    // Images for the first section
    const images1 = [
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
    ];
  
    // Images for the second section
    const images2 = [
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
    ];
  
    // Images for the third section
    const images3 = [
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
    ];
  
    // Populate image containers
    populateImageContainer('image-container1', images1);
    populateImageContainer('image-container2', images2);
    populateImageContainer('image-container3', images3);
  });
  
  function populateImageContainer(containerId, images) {
    const container = document.getElementById(containerId);
    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      imgElement.alt = 'Event Image';
      container.appendChild(imgElement);
    });


    const images = [
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200'
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
        const image = document.querySelector('.image-with-border');
        image.src = images[currentImageIndex];
    }
}
  