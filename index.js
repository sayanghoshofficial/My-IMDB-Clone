// my api key from OMDB
const apikey = "c9c05ce6"
// create use ful variables
var favorites = [];
const movieInput = document.getElementById('search-bar');
const movieArea = document.getElementsByClassName("movie-area");
const movieBox = document.getElementsByClassName("movie-box");
const movieContent = document.querySelector(".movie-content");
const popUp = document.getElementsByClassName('pop-up');
document.getElementsByClassName("movie-content");


// Asynchronous function for fetch api's
async function fetchDataFromApi(url){
        try {
        let data = await fetch(url);
        const responseData = await data.json();
        if(responseData.Title != undefined){
            movieHomePage(responseData);
        }else{
            throw new Error('There is no movie found in this name');
            
        }
    }
    catch(err){
        showNotification(err);
        return;
    }
}

//movie page maker
function movieHomePage(responseData){
    const movieDiv = document.createElement('div');
    movieDiv.className = "movie-box"
    movieDiv.id = responseData.imdbID;
    movieDiv.innerHTML = `
    <img src="${responseData.Poster}">
    <h1>${responseData.Title} (${responseData.Year})  <img class="starRating" src="image/star.png"/><span class="rating">${responseData.imdbRating}</span></h1>
    <h4>${responseData.Language}</h4>
    <h3>${responseData.Director}</h3>
    <h3>${responseData.Actors}</h3>
    <button class="add-fev" id="${responseData.imdbID}"><i class="fa-solid fa-heart"></i>Add favorite</i></button>
    <button class="view-details" id="${responseData.imdbID}"><i class="fa-solid fa-circle-info"></i></i>View Details</button>

    `
    movieArea[0].appendChild(movieDiv);
}
// alart function
function showNotification(text){
    alert(text);
}
// movie search option
function clickToSearch(){
    var movie = movieInput.value.trim();
    if(movie == ''){
        showNotification('please write ur movie name');
        return;
    }
    const url = "http://www.omdbapi.com/?t="+movie+"&apikey="+apikey+"";
    fetchDataFromApi(url);
    movieInput.value = '';
}

    
        
//save array to local storage
function saveArrayToLocalStorage(id){
    if(localStorage.getItem('data') == null){
        localStorage.clear();
        localStorage.setItem('data', '[]');
    }
    var localArray = JSON.parse(localStorage.getItem('data'));
    if(!localArray.includes(id)){
        localArray.push(id);
        localStorage.setItem('data', JSON.stringify(localArray));
        showNotification('Movie added to your favourite List.......')
    }else{
        showNotification('Movie already added to your favourite List.......')
        return;
    }
   
}
//add eventListener
function handledClickListener(e){
    const target = e.target;
    // console.log(target);
    // click to Seacrh containt
    if(target.className ==='fa-solid fa-magnifying-glass'){
        clickToSearch();
        removeElements();
    }
    // click to view details
    if(target.className === 'view-details' || target.className === 'fa-solid fa-circle-info'){
        const id = target.id;
        localStorage.setItem("imdbid",id);
        window.open("movie.html", "_blank");
       }
    // click to add fevourite List
    if(target.className === 'add-fev' || target.className === 'fa-solid fa-heart'){
        const id = target.id;
        saveArrayToLocalStorage(id);
        
       }
    // click to go to fevourite page
    if(target.className === 'button' || target.className === 'star'){
        window.open("favourite.html", "_blank");
    }
}
// add click event listener 
document.addEventListener('click',handledClickListener);



// Creating a array of all meal name to suggest user while typing in search box

var movieName = ["The Shawshank Redemption","The Godfather","The Dark Knight","The Godfather Part II",
"12 Angry Men","The Lord of the Rings: The Return of the King","Pulp Fiction",
"The Lord of the Rings: The Fellowship of the Ring","Il buono, il brutto, il cattivo","Forrest Gump","Fight Club",
"The Lord of the Rings: The Two Towers","Inception","The Empire Strikes Back","The Matrix","GoodFellas",
"Se7en","The Silence of the Lambs","Cidade de Deus","Saving Private Ryan","La vita è bella",
"Interstellar","The Green Mile","Star Wars","Terminator 2: Judgment Day","Back to the Future",
"The Pianist","Psycho","Gisaengchung","Léon","The Lion King","Gladiator","American History X","The Departed",
"The Usual Suspects","The Prestige","Whiplash","Casablanca","Hotaru no haka","Seppuku","The Intouchables",
"Modern Times","Once Upon a Time in the West","Rear Window","Alien","City Lights","Apocalypse Now","Memento",
"Django Unchained","Raiders of the Lost Ark","WALL·E","The Lives of Others ","Sunset Blvd","Paths of Glory","The Shining",
"The Great Dictator","Avengers: Infinity War","Witness for the Prosecution","Aliens","Spider-Man: Into the Spider-Verse",
"American Beauty","Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb","The Dark Knight Rises",
"Inglourious Basterds","Amadeus","Coco","Toy Story","Joker","Braveheart","Das Boot","Avengers: Endgame",
"Once Upon a Time in America","Good Will Hunting","Kimi no Na wa","Requiem for a Dream","3 Idiots",
"Toy Story 3","Tengoku to jigoku","Star Wars: Episode VI - Return of the Jedi ","Eternal Sunshine of the Spotless Mind",
"2001: A Space Odyssey","Reservoir Dogs","Jagten","Idi i smotri","Citizen Kane","Baa Baa Land","Baa Baaa Black Sheep",
"Lawrence of Arabia","M - Eine Stadt sucht einen Mörder","Top Gun: Maverick","North by Northwest","Vertigo","Iron Man",
"The Incredible Hulk","Iron Man 2","Thor","Captain America: The First Avenger","Iron Man 3",
"Thor: The Dark World","Captain America: The Winter Soldier","Guardians of the Galaxy","Avengers: Age of Ultron","Ant-Man",
"Captain America: Civil War","Doctor Strange","Guardians of the Galaxy Vol. 2","Spider-Man: Homecoming","Thor: Ragnarok",
"Black Panther","Ant-Man and the Wasp","Captain Marvel","Spider-Man: Far From Home","Black Widow",
"Shang-Chi and the Legend of the Ten Rings","Eternals","Spider-Man: No Way Home","Doctor Strange in the Multiverse of Madness",
"Thor: Love and Thunder","Black Panther: Wakanda Forever ","Ant-Man and the Wasp: Quantumania","Guardians of the Galaxy Vol. 3",
"The Marvels","Captain America: New World Order","Thunderbolts","Blade","Deadpool","Deadpool 2","Deadpool 3","Fantastic Four",
"Avengers: The Kang Dynasty","Avengers: Secret Wars","Avatar","Avatar: The Way of Water","Baahubali: The Beginning ",
"Baahubali 2: The Conclusion","Baby Driver","Bad Guys Always Die","Bholaa","California Typewriter","Chinatown","Calendar Girl",
"Dave","Death Note","E.T. the Extra-Terrestrial","Eagle Eye","Earth to Echo","Eddie the Eagle","The Edge of Seventeen","Edge of Tomorrow",
"Elektra","Elf","The Emoji Movie","Enchanted","Ender's Game","Entourage","Everest","Everyone's Hero","Ex Machina","Friday the 13th","Funny Games",
"Final Destination","Fear","Freddy vs. Jason","Final Examination","Firewall","Finding Nemo","G.I. Joe: The Rise of Cobra ","Gangs of New York",
"Ghostbusters","Ghost Rider","Ghost Rider: Spirit of Vengeance","Godzilla","Godzilla vs Kong","Haven","Home Alone 3","Home Alone 2","Home Alone",
"Hocus Pocus","Hook","Harry Potter","Hide and Seek","Harry Potter and the Goblet of Fire","Hellraiser: Deader","Harry Potter and the Deathly Hallows - Part 1","Invincible","Indiana Jones and the Kingdom of the Crystal Skull","Jack and Jill","Jackass Number Two","Jackass 3D",
"Jackie Brown","Jack Reacher","Jack Reacher: Never Go Back","Jack Ryan: Shadow Recruit","Jack the Giant Slayer","Jason Bourne","Jaws","Killing Moon",
"King Kong","Keeping Mum","Knock Knock","Killing Mr. Griffin","Kicked in the Head","Kindergarten Cop","Killers in the House","Krrish",
"Krrish 3","Koi... Mil Gaya","Laaj","Laal Singh Chaddha","La La Land","Land of the Dead","Lambada","Lady in the Water","Living Death","Leprechaun 5: In the Hood",
"Leprechaun 2","Mad Max","Made in Britain","Magic","Maleficent","May","Mom","Maatr","Machine","Mad About Dance","Maa","Naam Shabana","No Entry","NOTA","Night at the Museum",
"Nanny McPhee","National Treasure","National Treasure: Book of Secrets","Night of the Living Dead","No Country for Old Men","NightScream","Odd Man Out",
"Oldboy","Olympia","On the Waterfront","Onibaba","Osama","On the Town","One Eyed Jacks","Pilgrim","Peter Pan","Pinocchio","Phantom of the Rue Morgue",
"Paranoiac","Pirates of the Caribbean","Poltergeist","Perfect Alibi","Personal Effects","Pirates of the Caribbean: On Stranger Tides","Play Misty for Me",
"Qua la mano","Quack Shot","Quackser Fortune Has a Cousin in the Bronx ","Quacker Tracker","Quackodile Tears","Qaidi Band","Qala","Qarib Qarib Single",
"Queen","Quarantine","Queen Bees","Radio On","Raging Bull","Ran","Rancho Notorious","Rashomon","Re-Animator","S Diary","Under the Skin","Unforgiven",
"United 93","777 Charlie","Jai Bhim","Udal","Ugly Me","Ugly Aur Pagli","Ulakam Chuttum Valiban","Ulidavaru Kandanthe","Ultras","Unbelievable!!!!!",
"Umbrella Academy","Vera Drake","Vikram","Victim","Videodrome","Village of the Damned","Vadh","V","Veerappan","Vicky Donor","Vikram Vedha","Villain",
"Warriors","Wargames","War Game","Wages of Fear","Wayne's World","West Side Story","What's Up, Doc?","Whatever Happened to Baby Jane?","X-Men","X-Men: The Last Stand",
"X-Men Origins: Wolverine","X-Men: First Class","X-Men: Days of Future Past","X-Men: Apocalypse","X-Men: Dark Phoenix","X=Prem","Xanadu","X2","xXx",
"XXX: State of the Union","xXx: Return of Xander Cage","X-Games","Ya Rab","Yaara","Yaariyan","Yaaram","Yaara Silly Silly","Yellow Earth","Yellow Submarine",
"Young Adam","Young Frankenstein","Y","Yearly Departed","Z","Zatoichi","Zazie Dans le Metro","Zoolander","Zulu","Zaalim","Zila Ghaziabad","Zanjeer",
"Zero","Zid","Pushpa: The Rise","Pushpa: The Rise","RRR","K.G.F: Chapter 1","K.G.F: Chapter 2","Kantara","Monica, O My Darling","Love Today",
"Mukundan Unni Associates","Eega","Master","Pathaan","Alita: Battle Angel","Avengers"]
//sort names
let sortNames = movieName.sort();
movieName = sortNames;

// add key up event listener
movieInput.addEventListener("keyup",(e)=>{
    //initially remove all element
    removeElements();
    for(let i of movieName){
        //convert input to lowercase
        if(i.toLowerCase().startsWith(movieInput.value.trim().toLowerCase()) && movieInput.value != ""){
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick","displayNames('" + i +"')");

            //Display matched part bold
            let word = "<b>" + i.substr(0,movieInput.value.length) + "</b>";
            word += i.substr(movieInput.value.length);
            //display the value in array
            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem)
        }
    }
});
// display suggession values in the list
function displayNames(value){
    movieInput.value = value;
}
// initially remove all emements
function removeElements(){
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    })
}