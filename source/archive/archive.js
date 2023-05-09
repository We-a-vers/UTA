window.addEventListener('DOMContentLoaded', (event) => {
    // Images for the first section
    const images1 = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      // Add more images here
    ];
  
    // Images for the second section
    const images2 = [
      'image4.jpg',
      'image5.jpg',
      'image6.jpg',
      // Add more images here
    ];
  
    // Images for the third section
    const images3 = [
      'image7.jpg',
      'image8.jpg',
      'image9.jpg',
      // Add more images here
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
}
  