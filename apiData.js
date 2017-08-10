//JavaScript to gather the api data from The Movie Database

//variables to hold the various inputs/urls needed to make the api call
var apiSearch=new XMLHttpRequest();
var url='https://api.themoviedb.org/3/search/movie?api_key=8c5361b08a74793d93e58ba2ab123299&query=';
var userInput;
var newURL;
var search=document.getElementById('searchButton');
 var movieResults; 
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
     
    movieResults+='<h1 id="resultsHeader">Results for '+document.querySelector('#movie').value+'</h1>';   
    movieResults+='<section id="movies">';
     //Looping through the api data returned
    for(var i=0; i<responseAsJson.results.length;i++)
        {
            //conditional to limit reults to only 9 
            if(i<9)
            {
                movieResults+='<article id="movieSearchResults">';
                movieResults+='<img src="https://image.tmdb.org/t/p/w500'+responseAsJson.results[i]["poster_path"]+'" id="moviePoster" />';
                movieResults+='<span id="data"><h5 id="movieTitle">'+responseAsJson.results[i]["title"]+'</h5>';
                movieResults+='<h6 id="movieYear">'+responseAsJson.results[i]["release_date"]+'</h6></span>';
                movieResults+='</article>';
            }         
        }
  movieResults+='</section>';
  var searchResults=document.getElementById('results');
  if(searchResults)
    {
        document.getElementById('results').innerHTML=movieResults;
    }
    })
    .catch(Error=>{
    console.log('error',Error);
    })
}
//
search.addEventListener('click',searchForMovies,false);



