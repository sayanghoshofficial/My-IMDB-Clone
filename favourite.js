const apikey = "c9c05ce6"
var arr = JSON.parse(localStorage.getItem("data"));
localStorage.clear();
console.log(arr);
const movieList = document.getElementsByClassName('movie-list');
localStorage.setItem('data', JSON.stringify(arr));


//get unique items
const getUniqueMovies = (array) =>(
    [...new Set(array)]
);
arr = getUniqueMovies(arr);
// take out ids from localStorage
takeIdOneByOne(arr);
function takeIdOneByOne(arr){
    for(let i = 0; i < arr.length;i++){
        if(arr[i] == null){
            continue
        }else{
           
            saveArrayToLocalStorage(arr[i]);
            movieDetails(arr[i]);
        }
       
    }
    // reloadPage();
}
//save array to local storage
function saveArrayToLocalStorage(id){
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }
    var localArray = JSON.parse(localStorage.getItem('data'));
    localArray.push(id);
    localStorage.setItem('data', JSON.stringify(localArray));
}
//create url
function movieDetails(movieId){
    // console.log('inside moviedetails 116',movieId);
    var url = "http://www.omdbapi.com/?i="+movieId+"&apikey="+apikey;
    // console.log(url);
    fetchDataFromApiforDetails(url);
    url = ''
}
// fetch data form api
async function fetchDataFromApiforDetails(url){
    try {
        let data = await fetch(url);
        const responseData = await data.json();
        if(responseData.Title != undefined){
            fevMoviePage(responseData);
        }else{
            throw new Error('There is no movie found in this name');
            
        }
    }
    catch(err){
        showNotification(err);
        return;
    }
}

//create fevourite page
function fevMoviePage(responseData){
    const movieDiv = document.createElement('div');
    movieDiv.className = "movie-area"
    movieDiv.id = responseData.imdbID;
    movieDiv.innerHTML = `
    <div class="poster">
        <img src="${responseData.Poster}">
    </div>
    <div class="details">
        <p>${responseData.Title} (${responseData.Year})</p>
        <p>Language:${responseData.Language}</p>
       
        <button class="remove-fev" id=${responseData.imdbID}>Remove Favorite</button>
    </div>
    `
    movieList[0].appendChild(movieDiv);
}
// alart function
function showNotification(text){
    alert(text);
}
//remove movie from fevorite
function removeFevoriteFromArray(id){
    const data = localStorage.getItem('data');
    if(data.length == 1){
        localStorage.clear();
        return;
    }
    const element = document.getElementById(id);
    element.classList.add('hide-display');
    updateLocalStorage(id);
   
}
//update the local storage
function updateLocalStorage(id){
    localStorage.removeItem("data");
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }
    console.log('before update',arr);
    arr = arr.filter(e => e !== id);

    var localArray = JSON.parse(localStorage.getItem('data'));
    for(let i = 0; i < arr.length; i++){
        localArray.push(arr[i]);
    }
    console.log('after update',arr)
    localStorage.setItem('data', JSON.stringify(localArray));
}
//add eventListener
function handledClickListener(e){
    const target = e.target;
    if(target.className === 'remove-fev'){
        const id = target.id;
        // console.log(id);
        removeFevoriteFromArray(id);
        showNotification('Movie delete from your fevourite list...')
        // setTimeout( reloadPage(),1000);
    }
    if(target.className === 'remove-all'){
        localStorage.removeItem("data");
        localStorage.setItem('data', '[]');
        reloadPage();
        showNotification('all Item deleted....')
    }
    if(target.className === 'button' || target.className === 'fa-solid fa-house-user'){
        window.open("index.html");
    }
}
//relode page
// reloadPage();
function reloadPage(){
    location.reload();
}
// event listener 
document.addEventListener('click',handledClickListener);