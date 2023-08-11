const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
// Initial count is only 5 to hide immediately the loader even though the loaded image is only 5 images
// This allows the user to constantly use the site even though the other assets/data are still loading
let count = 5;
const apiKey ='cEZug5yJQIkpgzw5cGi0Wgz629O5rn5iAw6GC_PPx6I';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        // This is just to return the cout number to the maximum allowable by the api
        // Putting the count number into the maximum number also allows the system to download more data as the user uses the site
        // This prevent loading times and provide much better experience to the users
        count = 30;
        let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}
// Helper function to Set attributes on DOM ELements
function setAttributes(element, attrs) {
    for (const key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}

// Create Elements for links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    }catch (error){
        // catch error
    }
}

// check to see if scrolling near bottom of page and then Load more Photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();        
    }
});

// main func
getPhotos();