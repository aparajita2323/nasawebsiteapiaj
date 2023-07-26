const resultsNav=document.getElementById('resultsNav');
const favouritesNav=document.getElementById('favouritesNav');
const imagesContainer=document.querySelector('.images-container');
const saveConfirmed=document.querySelector('.save-confirmed');
const loader =document.querySelector('.loader');

function showcontent(){
  window.scrollTo({top:0 , behaviour: 'instant'});
  loader.classList.add('hidden');
}
// nasa api
const count= 8;
const apikey='DEMO_KEY';
const apiurl= `https://api.nasa.gov/planetary/apod?api_key=${apikey}&count=${count}`;

let resultArray=[];
let favourites={};
function isFavourite(itemurl) {
    return favourites.hasOwnProperty(itemurl);
}


function createDOMNodes(page){
    const currentArray = page=== 'results' ? resultArray : Object.values(favourites) ; 
    imagesContainer.innerHTML = ''; 
    currentArray.forEach((result)=> {
        // card container
        const card= document.createElement('div');
        card.classList.add('card');
        //link
        const link=document.createElement('a');
        link.href= result.hdurl ; 
        link.title='View Full Image';
        link.target='_blank';
        // image
        const image= document.createElement('img');
        image.src=result.url; 
        image.classList.add('card-img-top');
        //card body
        const cardBody=document.createElement('div');
        cardBody.classList.add('card-body');
        // card title
        const cardTitle=document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent=result.title; 
        // save text
        const saveText = document.createElement('p');
saveText.classList.add('clickable');
saveText.textContent = isFavourite(result.url) ? 'Remove Favourite' : 'Add To Favourites';
saveText.setAttribute('onclick', isFavourite(result.url) ? `removeFavourite('${result.url}')` : `saveFavourite('${result.url}')`);

    
        // card text
        const cardText=document.createElement('p');
        cardText.textContent=result.explaination ; 
        //footer container
        const footer= document.createElement('small');
        footer.classList.add('text-muted');
        //date
        const date= document.createElement('strong');
        date.textContent=result.date;
        //copyright
        const copyrightResult= result.copyright===undefined ? ' ': result.copyright ;
        const copyright= document.createElement('span');
        copyright.textContent=`${result.copyright}`;
        // Append
        footer.append(date,copyright);
        cardBody.append(cardTitle,cardText,saveText,footer);
        link.appendChild(image);
        card.append(link,cardBody);
        imagesContainer.append(card);

    });

}

  


function updateDOM(page) {
    // get faves from storage
    if (localStorage.getItem('nasafavourites')) {
      favourites = JSON.parse(localStorage.getItem('nasafavourites'));
    }
  
    imagesContainer.textContent = '';
  
    // Check if we are on the 'favourites' page and update the navigation accordingly
    if (page === 'results') {
      favouritesNav.classList.remove('active');
      resultsNav.classList.add('active');
      createDOMNodes('results');
    } else {
      favouritesNav.classList.add('active');
      resultsNav.classList.remove('active');
      // Add a small delay before showing favourites (2 seconds in this case)
      setTimeout(() => {
        createDOMNodes('favourites');
        showcontent();
      }, 1000);
    }
    
  }
  

  
  async function getimages() {
  // show loader before fetching new images
  loader.classList.remove('hidden');

  try {
    const response = await fetch(`${apiurl}&count=${count}`);
    resultArray = await response.json();
    updateDOM('results'); // Update the DOM with new images

    // hide the loader after the images are displayed
    loader.classList.add('hidden');
  } catch (error) {
    console.error(error);
    // hide the loader in case of error
    loader.classList.add('hidden');
  }
}

  
  
  
  resultsNav.addEventListener('click', () => {
    getimages(); // Call getimages() to fetch new images and display them
  });
  
  favouritesNav.addEventListener('click', () => {
    updateDOM('favourites'); // Call updateDOM directly in 'Favourites' click event
  });
  
  

 
  // on load
  getimages();
  updateDOM('results');
  window.addEventListener('load', () => {
    showcontent() }) ; 
  
  // Rest of the code remains the same
  // ...
  
  function getFavourites() {
    if (localStorage.getItem('nasafavourites')) {
      favourites = JSON.parse(localStorage.getItem('nasafavourites'));
    } else {
      favourites = {}; // Initialize favourites object if no data in local storage
    }
    updateDOM('favourites'); // Update the DOM with favorites
  }
  
 
  
  



  function saveFavourite(itemurl) {
    const item = resultArray.find((item) => item.url.includes(itemurl));
    if (item && !favourites[itemurl]) {
      favourites[itemurl] = item;
      //show save confirmation
      saveConfirmed.style.display = 'block';
      setTimeout(() => {
        saveConfirmed.style.display = 'none';
      }, 2000);
      //set faves in local storage
      localStorage.setItem('nasafavourites', JSON.stringify(favourites));
      updateDOM('results'); // Update the DOM to refresh the buttons
    }
  }
  
  function removeFavourite(itemurl) {
    if (favourites[itemurl]) {
      delete favourites[itemurl];
      localStorage.setItem('nasafavourites', JSON.stringify(favourites));
      updateDOM('favourites'); // Update the DOM to refresh the buttons
    }
  }
  
  


 


















const twitterbtn=document.getElementById('twitter');
const whatsappbtn= document.getElementById('whatsapp');
const facebookbtn=document.getElementById('facebook');

function opentwitter(){
    const urltwitter= 'https://twitter.com/';
    window.open(urltwitter,'_blank');
}

function openfacebook(){
    const facebookurl='https://www.facebook.com/';
    window.open(facebookurl,'_blank');
}

function openwhatsapp(){
    const whatsappurl= 'https://web.whatsapp.com/';
    window.open(whatsappurl,'_blank');
}

twitterbtn.addEventListener('click',opentwitter);
whatsappbtn.addEventListener('click',openwhatsapp);
facebookbtn.addEventListener('click',openfacebook);


