const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];


// Unsplash API
const count = 30;
const apiKey ='cEZug5yJQIkpgzw5cGi0Wgz629O5rn5iAw6GC_PPx6I';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// Check if all iameges were laoded
function imageLoaded(){
    console.log('image loaded');
}
// Helper function to Set attributes on DOM ELements
function setAttributes(element, attrs) {
    for (const key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}

// Create Elements for links & Photos, Add to DOM
function displayPhotos(){
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();        
    }
});

// main func
getPhotos();