//JavaScript to gather the api data from The Movie Database

//variables to hold the various inputs/urls needed to make the api call
var apiSearch=new XMLHttpRequest();
var url='https://api.themoviedb.org/3/search/movie?api_key=8c5361b08a74793d93e58ba2ab123299&query=';
var userInput;
 var newURL;
 //creating a variable so when the search button is clicked
var search=document.getElementById('searchButton');

search.onclick=function(){   
userInput=document.querySelector('#movie').value; 
newURL=url+userInput+"&page=1&include_adult=false";

fetch(newURL)
.then(response=>response.json())
.then(responseAsJson=>{
    var movieResults;  
    movieResults+='<h1 id="resultsHeader">Results for '+document.querySelector('#movie').value+'</h1>';   
    movieResults+='<section id="movies">'; 
    for(var i=0; i<responseAsJson.results.length;i++)
        {
            if(i<9){
               
            movieResults+='<table id="movieSearchResults">';
            movieResults+='<tr>';
           movieResults+='<th><img src="https://image.tmdb.org/t/p/w500'+responseAsJson.results[i]["poster_path"]+'" id="moviePoster" /></th>';
           movieResults+='<tr>';
            movieResults+='<td id="data"><h6 id="movieTitle">'+responseAsJson.results[i]["title"]+'</h6>';
            movieResults+='<p id="movieYear">'+responseAsJson.results[i]["release_date"]+'</p></td>';
            movieResults+='</table>';
           
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




