const apikey = "c9c05ce6"
const ID = localStorage.getItem("imdbid");
localStorage.removeItem("imdbid");

movieDetails(ID);
const boxOffice = document.getElementsByClassName('box-office');
const headDiv = document.getElementsByClassName('headDiv')
// localStorage.clear;


//create url
function movieDetails(movieId){
    var url = "http://www.omdbapi.com/?i="+movieId+"&apikey="+apikey;
    fetchDataFromApiforDetails(url);
    url = ''
}
// fetch data form api
async function fetchDataFromApiforDetails(url){
    try {
        let data = await fetch(url);
        const responseData = await data.json();
        if(responseData.Title != undefined){
            movieDetailsPage(responseData);
        }else{
            throw new Error('There is no movie found in this name');
            
        }
    }
    catch(err){
        showNotification(err);
        return;
    }
}
//movie page
function movieDetailsPage(responseData){
    const heading = document.createElement('p');
    heading.innerHTML = `
        
        ${responseData.Title}'s Movie Page
        
    `
    headDiv[0].appendChild(heading);
    const movieDiv = document.createElement('div');
    movieDiv.className = "movie-content";
    movieDiv.id = responseData.imdbID;
    movieDiv.innerHTML = `
    <div id="poster">
        <img src="${responseData.Poster}" >
    </div>
    <div id="description">
        <h1>${responseData.Title}(${responseData.Year})</h1>
        <span> 
            Rated: ${responseData.Rated},
            Runtime: ${responseData.Runtime}
            <p class="ratings"> 
                IMDB Rating: ${responseData.imdbRating},&nbsp
                IMDB Votes: ${responseData.imdbVotes},&nbsp
                Box-Office: ${responseData.BoxOffice}
            </p>
        </span>
        <p>Country: ${responseData.Country}</p>
        <p>Language:${responseData.Language}</p>
        <p>Actors: ${responseData.Actors} </p>
        <p>Writer: ${responseData.Writer}</p>
        <p>Director: ${responseData.Director}</p>
        <p>Genre: ${responseData.Genre}</p>
        <p>Awards: ${responseData.Awards}</p>
        <p>Plot:
            ${responseData.Plot}
        </p>
    <div>
    
    </div>
</div>
    `
    boxOffice[0].appendChild(movieDiv);
  
}
// alart function
function showNotification(text){
    alert(text);
}
//add eventlistner
function handledClickListener(e){
    const target = e.target;
    if(target.className === 'button' || target.className === 'fa-solid fa-house-user'){
        window.open("index.html");
    }
}
document.addEventListener('click',handledClickListener);