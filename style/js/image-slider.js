// Define image filenames
const images = [
    "visa.png", "deutsche-telekom.jpg", "cigna.png", "el-corte-ingles.png",
    "ford.png", "mastercard.jpeg", "inditex-logo.png", "volkswagen.png",
    "lgi-logo.png", "marketaxess.png", "mufg.png", "uhg-logo.png", "upmc-logo.png",
    "walmart.png", "wtit-logo.png", "wwt-logo.png", "1-and-1-ionos.jpg", "wells-fargo2.png", "fedex.jpg"
];

// Folder where images are stored
const imageFolder = "img/customer-programs/logos/";

// Select the container where images will be added
const imageTrack = document.getElementById("imageTrack");

// Function to load images dynamically
function loadImages() {
    images.forEach(img => {
        let imageElement = document.createElement("img");
        imageElement.src = `${imageFolder}${img}`;
        imageElement.alt = img.replace(/[-_]/g, ' ').replace(/\.(png|jpg|jpeg)/, '');
        imageElement.classList.add("carousel-image");
        imageTrack.appendChild(imageElement);
    });

    // Clone images to create an infinite loop effect
    images.forEach(img => {
        let imageElement = document.createElement("img");
        imageElement.src = `${imageFolder}${img}`;
        imageElement.alt = img.replace(/[-_]/g, ' ').replace(/\.(png|jpg|jpeg)/, '');
        imageElement.classList.add("carousel-image");
        imageTrack.appendChild(imageElement);
    });
}

// Call function to load images
loadImages();

// Function for infinite scrolling
function startInfiniteScroll() {
    let scrollSpeed = 1; // Adjust speed as needed
    let scrollStep = 0;

    function scroll() {
        scrollStep += scrollSpeed;
        imageTrack.style.transform = `translateX(-${scrollStep}px)`;

        // Reset scroll position when the first set of images is fully out of view
        if (scrollStep >= imageTrack.scrollWidth / 2) {
            scrollStep = 0;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}

// Start infinite scrolling
startInfiniteScroll();
