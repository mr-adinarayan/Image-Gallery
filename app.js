// Your Unsplash API Key
const accessKey = 'HmZPnz4t-KLn3sz-jrwSNXWDod1Do67I0w0IV3Adgfk'; // Replace with your actual key

// Global variable for storing images
let imageSource = [];

// Function to fetch images from Unsplash API
async function fetchImages() {
    const response = await fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`);
    const data = await response.json();

    return data.map(item => ({
        url: item.urls.small, // Small size image URL
        alt: item.alt_description || 'Untitled', // Alt text
        title: item.description || 'Untitled' // Title (if available)
    }));
}

// Function to create gallery images dynamically
function createGallery() {
    const gallery = document.getElementById("gallery");

    // Clear the gallery before adding new items
    gallery.innerHTML = "";

    imageSource.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.alt;
        imgElement.title = image.title;

        imgElement.classList.add(
            "w-full",          // Full width by default
            "h-auto",           // Automatic height to maintain aspect ratio
            "max-w-sm",         // Max width for small screens
            "sm:max-w-md",      // Larger max-width for medium screens
            "md:max-w-lg",      // Larger max-width for larger screens
            "lg:max-w-xl",      // Max width for large screens
            "rounded-lg",       // Rounded corners
            "cursor-pointer",   // Pointer cursor on hover
            "transform",        // For the transition effect
            "transition-transform", "hover:scale-105" // Hover effect
        );
        
        // Tailwind classes for responsive image sizing
        // imgElement.classList.add("w-full", "h-auto", "max-w-xs", "rounded-lg", "cursor-pointer", "transform", "transition-transform", "hover:scale-105");

        // Add click event to open the modal
        imgElement.addEventListener("click", () => openModal(image.url));

        const divElement = document.createElement("div");
        divElement.classList.add("overflow-hidden", "shadow-lg", "rounded-lg", "transition-transform", "hover:scale-105");
        divElement.appendChild(imgElement);

        gallery.appendChild(divElement);
    });
}

// Function to open the modal with the clicked image
function openModal(imageUrl) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.classList.remove("hidden");
    modalImg.src = imageUrl;
}

// Close the modal when the close button is clicked
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Fetch images from Unsplash and initialize the gallery
fetchImages().then(images => {
    imageSource = images; // Set the fetched images to imageSource
    createGallery(); // Create the gallery with the images
}).catch(error => {
    console.error("Error fetching images:", error);
});
