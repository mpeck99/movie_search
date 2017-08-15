//JavaScript to gather the api data from The Movie Database

//variables to hold the various inputs/urls needed to make the api call
var apiSearch=new XMLHttpRequest();
var url='https://api.themoviedb.org/3/search/movie?api_key=8c5361b08a74793d93e58ba2ab123299&query=';
var userInput="";
var newURL="";
var search=document.getElementById('searchButton');
var movieResults=""; 
var dataStrorage="";
var savedMovies="";
var searchResults="";

function searchForMovies()
{   
    userInput=document.querySelector('#movie').value; 
    newURL=url+userInput+"&page=1&include_adult=false";
//Loading the json data from The Movie Database
    fetch(newURL)
    .then(response=>response.json())
    .then(responseAsJson=>
    {
//Variables to hold results
     
    movieResults+='<h2 id="resultsHeader">Results for '+document.querySelector('#movie').value+'</h2>';   
    movieResults+='<section id="movies">';
     //Looping through the api data returned
    for(var i=0; i<responseAsJson.results.length;i++)
    {        //conditional to limit reults to only 9 
        if(i<9)
        {
            movieResults+='<article id="movieSearchResults">';
            movieResults+='<img src="https://image.tmdb.org/t/p/w500'+responseAsJson.results[i]["poster_path"]+'" id="moviePoster" />';
            movieResults+='<span id="data"><h5 id="movieTitle">'+responseAsJson.results[i]["title"]+'</h5>';
            movieResults+='<h6 id="movieYear">'+responseAsJson.results[i]["release_date"]+'</h6></span>';
            movieResults+='</article>'; 
                 
        }   
        //storing the search data so that I can repopulate the page whenever the browser is closed or reloaded
    localStorage.setItem('movieData',JSON.stringify(responseAsJson.results));     
    }  
    movieResults+='</section>';
    searchResults=document.getElementById('results');
    //setting the search results to replace the html article
    if(searchResults)
    {
        document.getElementById('results').innerHTML=movieResults;
    } 
    })
    .catch(Error=>{
    console.log('error',Error);
    })
}
search.addEventListener('click',searchForMovies,false);
//loading the local storage data
function loadData()
{
    dataStrorage=localStorage.getItem('movieData');
    //parsing so that I can loop through the data
    var data=JSON.parse(dataStrorage);
    savedMovies+='<h1 id="resultsHeader">Results for '+document.querySelector('#movie').value+'</h1>';   
    savedMovies+='<section id="movies">';
   //Looping through the api data returned
    for(var a=0; a<data.length;a++)

    {
        //conditional to limit reults to only 9 
        if(a<9)
          {
            savedMovies+='<article id="movieSearchResults">';
            savedMovies+='<img src="https://image.tmdb.org/t/p/w500'+data[a]["poster_path"]+'" id="moviePoster" />';
            savedMovies+='<span id="data"><h5 id="movieTitle">'+data[a]["title"]+'</h5>';
            savedMovies+='<h6 id="movieYear">'+data[a]["release_date"]+'</h6></span>';
            savedMovies+='</article>';
        }
    }  
    savedMovies+='</section>';
    var loadMovies=document.getElementById('results');
    if(loadMovies)
    {
        document.getElementById('results').innerHTML=savedMovies;
    }
}
window.addEventListener('load', loadData,false);
//setting up a function so that when the mobile hamburger is clicked
//  I can open the ul to make the menu visible
function mobile()
{

    var tog=document.getElementById("navigation");
  if (tog.className === "menu")
  {
      tog.className += "Responsive";
  }
  else
  {
    tog.class+="menu";
  }
}
var menu=document.getElementById("hamburger");
menu.addEventListener('click',mobile, false);