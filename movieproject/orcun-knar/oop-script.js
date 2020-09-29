//the API documentation site https://developers.themoviedb.org/3/

class App {
    static async run() {
        const movies = await APIService.fetchMovies()
        HomePage.renderMovies(movies);
        NavBar.getGenre();

    }
}

class APIService {
    static TMDB_BASE_URL = 'https://api.themoviedb.org/3';

    static async fetchMovies() {
        const url = APIService._constructUrl(`movie/now_playing`)
        const response = await fetch(url)
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }

    static async fetchMovie(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}`)
        const response = await fetch(url)
        const data = await response.json()
        return new Movie(data)
    }
    static async fetchTrailers(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}/videos`);
        const response = await fetch(url);
        const data = await response.json();
        
        return data.results.map(video => new Video(video))
    }
    static async fetchSimilarMovies(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}/videos`);
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }
    static _constructUrl(path) {
        return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
    }

    static async fetchGenres(){
        const url =  APIService._constructUrl(`genre/movie/list`);
        const response = await fetch(url);
        const data = await response.json();
        return data.genres.map(g => new Genre(g)); 
    }
    


    static async fetchGenreMovies(arg) {
        
        const url = APIService._constructUrl('discover/movie') + `&with_genres=${arg}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie));

    }
    
    static async fetchActors() {
        const url = APIService._constructUrl(`person/popular`);
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(actor => new Actor(actor))
    }
    static async fetchActor(personId) {
        const url = APIService._constructUrl(`person/${personId}`);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return new Actor(data);
    }

    static async fetchCrew(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}/credits`);
        const response = await fetch(url);
        const data = await response.json();
        return data.crew.map(crew => new Crew(crew));
    }
    static async fetchCast(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}/credits`);
        const response = await fetch(url);
        const data = await response.json();
        return data.cast.map(cast=> new Cast(cast));
    }


    static async fetchPopular(){
        const url = APIService._constructUrl(`movie/popular`);
        const response = await fetch(url);
        const data = await response.json();
        return  data.results.map(movie => new Movie(movie));
    }
    
    static async fetchLatest(){
        try{
            const url = APIService._constructUrl(`movie/latest`);
        const response = await fetch(url);
        const data = await response.json();
        return  data.results.map(movie => new Movie(movie));
        }
        catch(err){
            HomePage.container.innerHTML = "";
            return ;
        }
    }
    static async fetchTopRated(){
        const url = APIService._constructUrl(`movie/top_rated`);
        const response = await fetch(url);
        const data = await response.json();
        return  data.results.map(movie => new Movie(movie));
    }
    static async fetchNowPlaying(){
        const url = APIService._constructUrl(`movie/now_playing`);
        const response = await fetch(url);
        const data = await response.json();
        return  data.results.map(movie => new Movie(movie));
    }
    static async fetchUpcoming(){
        const url = APIService._constructUrl(`movie/upcoming`);
        const response = await fetch(url);
        const data = await response.json();
        return  data.results.map(movie => new Movie(movie));
    }
    static async fetchQuery(query){
        const urlMovie = APIService._constructUrl('search/movie') + `&query=${query}`;
        const responseMovie = await fetch(urlMovie);
        const dataMovie = await responseMovie.json();

        const urlActor = APIService._constructUrl('search/person') + `&query=${query}`;
        const responseActor = await fetch(urlActor);
        const dataActor = await responseActor.json();
        
        console.log(dataActor);
        const resultsMovies = dataMovie.results.map(movie => new Movie(movie));
        const resultsActors = dataActor.results.map(actor => new Actor(actor));
        
        const resultArr = [];
        resultArr.push(resultsMovies);
        resultArr.push(resultsActors);

        return resultArr;
    }
    static async fetchMoviesforActor(actor){
        const url = APIService._constructUrl(`person/${actor.id}/movie_credits`)
        const response = await fetch(url);
        let data = await response.json();
        data = data.crew.map(movie => new Movie(movie));
        console.log(data.map(movie=> movie.title));
        return data.map(movie=> movie.title);
    }

    static async fetchSimilarMovies(movie){
        const url = APIService._constructUrl(`movie/${movie.id}/similar`)
        const response = await fetch(url);
        let data = await response.json();
        let returnArr = [];
        data = data.results.map(movie => new Movie(movie));
        for (let i = 0; i < 5; i++) {
            returnArr.push(data[i].title);
        }
        return returnArr;
        
    }
}

// SEARCHING

class QueryPage{
    static async getResults(value){

        const result = await APIService.fetchQuery(value);
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(result[0]);
        ActorsPage.renderActors(result[1]);

    }
}

class NavBar{ 
    static genreButton = document.getElementById('genres');
    static async getGenre(){
        const genres = await APIService.fetchGenres();
        document.getElementById("genres").innerHTML ="";
        const genreDiv = document.createElement("div")
        genres.forEach(genre => {
            const listItem = document.createElement("option")
            listItem.innerText = `${genre.name}`;
            listItem.setAttribute("value",`${genre.name}`);
            listItem.setAttribute("id",`${genre.id}`);
            listItem.setAttribute("class","dropdown-item");
            listItem.classList.add("clickable");

        
            listItem.addEventListener("click", (e) => {
                MovieGenrePage.getGenreMovies(listItem.id);
            })
            genreDiv.appendChild(listItem);
        }
        )
        this.genreButton.appendChild(genreDiv);
    }
}

// FILTERING
class FilteredPage{
    static async getPopular(){
        const movies = await APIService.fetchPopular();
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(movies);
    }
    static async getLatest(){
        const movies = await APIService.fetchLatest();
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(movies);
    }
    static async getTopRated(){
        const movies = await APIService.fetchTopRated();
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(movies);
    }
    static async getNowPlaying() {
        const movies = await APIService.fetchNowPlaying();
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(movies);
    }
    static async getUpcoming() {
        const movies = await APIService.fetchUpcoming();
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(movies);
    }

}

class MovieGenrePage{
    static async getGenreMovies(arg) {
        const movies = await APIService.fetchGenreMovies(arg);
        HomePage.container.innerHTML = "";
        container.setAttribute("class","container");
        HomePage.renderMovies(movies);
    }
}



// ACTORS
class Actors {
    static async run(actor) {
        const actorData = await APIService.fetchActor(actor.id);
        ActorPage.renderActorSection(actorData);
    }
}
class ActorPage {
    static container = document.getElementById('container');
    static renderActorSection(actor) {
        ActorSection.renderActor(actor);
    }
}
class ActorSection {
    static async renderActor(actor) {
        const data = await APIService.fetchMoviesforActor(actor);
        
        ActorPage.container.innerHTML = `
      <div class="col single-actor-margin-top">
        <div class="col-md-4">
           <img id="actor-profile" src=${actor.profileUrl} alt=${actor.name} width="240" height="360"> 
        </div>
        <div class="col-md-8">
          <h2 id="actor-name">${actor.name}</h2>
          <p id="popularity">Rating: ${actor.popularity}</p>
          <p id="actor-gender">Gender: ${actor.gender}</p>
          <p id="actor-birthday">Birthday: ${actor.birthday}</p>
          <p id="actor-deathday">Deathday: ${actor.deathday}</p>
          <h4>Biography</h4>
          <p id="biography">${actor.biography}</p>
          <h4>Other Movies Actor Played in </h4>
          <p id="otherMovies"> </p>
          <p>${data.join("<br>")}</p>
        </div>
      </div>
    `;
    }
}
class Actor {
    static PROFILE_PATH_URL = "http://image.tmdb.org/t/p/w780";
    constructor(json){
        this.name = json.name;
        if(json.gender === 2){
            this.gender = "Male";
        }
        else{
            this.gender = "Female";
        }
        this.id = json.id;
        this.popularity = json.popularity;
        this.profilePath = json.profile_path;
        this.birthday = json.birthday;
        this.biography = json.biography;
        if(json.deathday === null){
            this.deathday = "alive";
        }
        else{
            this.deathday = json.deathday;
        }
    }

    get profileUrl() {
        return this.profilePath ? Actor.PROFILE_PATH_URL + this.profilePath : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"  
        ;
    }
}

class ActorsPage {
    static container = document.getElementById('container');
    static renderActors(actors) {
        actors.forEach(actor => {
            const actorDiv = document.createElement("div");
            const actorImage = document.createElement("img");
            actorImage.setAttribute("class","homeImg")
            actorImage.src = `${actor.profileUrl}`;
            actorImage.alt = "actor image";
            const actorName = document.createElement("h3");
            actorName.textContent = `${actor.name}`;

            actorImage.classList.add("img-fluid");
            actorDiv.classList.add("col-lg-4");
            actorDiv.classList.add("col-md-6");
            actorDiv.classList.add("col-sm-12");
            actorDiv.classList.add("class", "mt-3");

            actorImage.classList.add("clickable");
            actorImage.style.width = "12rem";
            actorImage.style.height = "12rem";

            actorImage.addEventListener("click", function() {
                Actors.run(actor);
            });
            actorDiv.appendChild(actorName);
            actorDiv.appendChild(actorImage);
            this.container.append(actorDiv);
        })
    }

    static async getActors(add){
        const actors = await APIService.fetchActors();
        const container = document.getElementById('container');
        container.setAttribute("class","container");
        if(add){container.innerHTML  = " ";}
        ActorsPage.renderActors(actors);
    }
}

// CREW

class Crew {
    constructor(json) {
        this.name = json.name;
        this.job = json.job;
    }
    static async getDirector(movie) {
        const crew = await APIService.fetchCrew(movie.id);
        
        for (let i = 0; i < crew.length; i++) {
            if (crew[i].job === "Director") {
                return crew[i].name;
            }
        }
    }
}

class Cast {
    constructor(json) {
        this.name = json.name;
    }

    static async getFiveActors(movie) {
        const cast = await APIService.fetchCast(movie.id);
        //console.log(cast);
        let slicedCast = cast.slice(0,5);
        //console.log(slicedCast);
        let arrayFiveActors = [];
        for(let i = 0; i < 5; i++) {
            arrayFiveActors.push(slicedCast[i].name);
        }
        return arrayFiveActors;
    }
}

// GENRES
class Genre{
    constructor(genre){
        this.name = genre.name;
        this.id = genre.id;
    }
    
    static async getGenreName(){
        const data = await APIService.fetchGenres();
        return data.map(el=> el.name);
    }
    static async getGenreID(){
        const data = await APIService.fetchGenres();
        return data.map(el=> el.id);
    }
}



//MOVIES
class HomePage {
    static container = document.getElementById('container');
    static renderMovies(movies) {
        movies.forEach(movie => {
            
      
            const movieDiv = document.createElement("div");
            const movieImage = document.createElement("img");
            
            movieImage.classList.add("img-fluid");
            movieDiv.classList.add("col-lg-4");
            movieDiv.classList.add("col-md-6");
            movieDiv.classList.add("col-sm-12");
            movieDiv.classList.add("class", "mt-3");
            //movieDiv.setAttribute("class", "card");
            movieDiv.setAttribute("id", "movieDiv");
            
            
            movieImage.classList.add("clickable");
            movieImage.style.width = "16rem";
            //movieImage.setAttribute("class","card-img-top");
            
            
            movieImage.src = `${movie.backdropUrl}`;
            movieImage.alt = "movie poster";
            const movieTitle = document.createElement("h3");
            movieTitle.setAttribute("id", "movieTitle"); 

            //movieTitle.setAttribute("class","card-title");
            movieTitle.textContent = `${movie.title}`;
            movieImage.addEventListener("click", function() {
                Movies.run(movie);
            });
            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(movieImage);
            this.container.appendChild(movieDiv);
        })
    }
}

class Movies {
    static async run(movie) {
        const movieData = await APIService.fetchMovie(movie.id)
        MoviePage.renderMovieSection(movieData);
        
    }
}
class MoviePage {
    static container = document.getElementById('container');
    static renderMovieSection(movie) {
        MovieSection.renderMovie(movie);
    }
}
class MovieSection {

    static async renderMovie(movie) {
        
        const director = await Crew.getDirector(movie);
        const fiveActors = await Cast.getFiveActors(movie);
        const language = await Movie.getLanguage(movie);
        const genres = await Movie.getGenres(movie);
        const rating = await Movie.getRating(movie);
        const votes = await Movie.getVotes(movie);
        const companyNames = await Movie.getProductionCompanyName(movie);
        const video = await Video.getVideoUrl(movie);
        //const similar = await SimilarMovies.getSimilarMovies(movie);
        const companyLogoUrl = (await Movie.getCompanyUrl(movie))[0];


        const similarMovies = await APIService.fetchSimilarMovies(movie);
        
        MoviePage.container.innerHTML = `
      <div class="col">
        <div class="col-md-4">
          <img id="movie-backdrop" src=${movie.backdropUrl}> 
        </div>
        <div class="col-md-8">
          <h2 id="movie-title">${movie.title}</h2>
          <h4>Actors:</h4>
          <p>${fiveActors.join(" - ")}</p>
          <p id="genres">Genre: ${genres}</p>
          <p id="movie-release-date">Release Date: ${movie.releaseDate}</p>
          <p id="movie-runtime">Runtime: ${movie.runtime}</p>
          <p id="movie-language">Language: ${language}</p>
          <p id="movie-rating">Rating: ${rating}</p>
          <p id="movie-votecount">Votes: ${votes}</p>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
          <div id="trailer">

            <iframe width="640" height="480" src="https://www.youtube.com/embed/${video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <h3>Similar Movies:</h3>
          <p id="similar-movies">${similarMovies.join("<br>")}</p>
          <p id="director-name">Director: ${director}</p>
          <div id="productionCompanies">
            <img id="companyPhotos" src=${companyLogoUrl} height="75" width="100">
            <p id="companyNames">Production Companies: ${companyNames.join(" - ")}</p>
          </div>
        </div>
      </div>
      
    `;
    }
}
class Video {
    static VIDEO_BASE_URL = `https://www.youtube.com/watch?v=`;
    constructor(json) {
        this.key = json.key;
    }

    static async getVideoUrl(movie) {
        const data = await APIService.fetchTrailers(movie.id);
        return  `${data[0].key}`;
    }
}
/* class SimilarMovies {
    constructor(json) {
        this.title = json.title;
    }

    static async getSimilarMovies(movie) {
        const data = await APIService.fetchSimilarMovies(movie.id);
        let similar = [];
        for (let i = 0; i < data.length; i++) {
            similar.push(data[i].title);
        }
        return similar.slice(0,5);
    }
} */
class Movie {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.releaseDate = json.release_date;
        this.runtime = json.runtime + " minutes";
        this.overview = json.overview;
        this.backdropPath = json.backdrop_path;
        this.posterPath = json.poster_path;
        this.original_language = json.original_language;
        this.genres = json.genres;
        this.rating = json.vote_average;
        this.votes = json.vote_count;
        this.productionCompanies = json.production_companies;
        //this.companyLogo = json.production_companies.map(company => company.logo_path)
    }
    get backdropUrl() {
        return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"  
        ;
    }
    get posterUrl() {
        return this.posterPath ? Movie.BACKDROP_BASE_URL + this.posterPath : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"  
        ;
    }
    static async getLanguage(movie) {
        const data = await APIService.fetchMovie(movie.id);
        return data.original_language;
    }
    static async getGenres(movie) {
        const data = await APIService.fetchMovie(movie.id);
        let genre = [];
        for (let i = 0; i < data.genres.length; i++) {
            genre.push(data.genres[i].name);
        }
        return genre;
    }
    static async getRating(movie) {
        const data = await APIService.fetchMovie(movie.id);
        return data.rating;
    }
    static async getVotes(movie) {
        const data = await APIService.fetchMovie(movie.id);
        return data.votes;
    }
    static async getProductionCompanyName(movie) {
        const data = await APIService.fetchMovie(movie.id);
        const companyNames = [];
        for (let i = 0; i < data.productionCompanies.length; i++) {
            companyNames.push(data.productionCompanies[i].name);
        }
        return companyNames;
    }
    /* static async getProductionCompanyLogo(movie) {
        const data = await APIService.fetchMovie(movie.id);

    } */
   
    static async getCompanyUrl(movie) {
        const data = await APIService.fetchMovie(movie.id);
        console.log(data);
        const arrayLogoUrl = [];
        for (let i = 0; i < data.productionCompanies.length; i++) {
            if (data.productionCompanies[i].logo_path !== null) {
                arrayLogoUrl.push(Movie.BACKDROP_BASE_URL + `${data.productionCompanies[i].logo_path}`);
            }
        }
        console.log(arrayLogoUrl)
        return arrayLogoUrl;
    }
}

//BAZAAR OF EVENT LISTENERS

document.querySelector("#search").addEventListener('search',(e)=>{
    QueryPage.getResults(document.querySelector("#search").value);
})


document.querySelector("#navActors").addEventListener("click", (e) => {
    ActorsPage.getActors(true);
})



document.querySelector("#about").addEventListener("click",(e)=>{
    const container = document.getElementById('container');
    
    container.innerHTML = '<p id="history"> It was a dream to built a page that shows all the information' +
    'for the movie lovers for Orçun and Knar. They were two movie fans that were serching for a good site to get information about movies.' +
    'After they searched for a lot of time and they could not find anything that was as perfect as they want it to be, they decided to build something magnificent (By the pressure of Ammar,' +
    'Halit and Luis). After living on a mauntain with 500 monks for 3 years they came up with this idea. The building process took 6 years and'+ 
    'finally now they are presenting you MOVIE-BUSTERS.<br> ENJOY :) </p>'
})
document.querySelector("#home").addEventListener("click",function load(){
    const container = document.getElementById('container');
    container.setAttribute("class","container");
    container.innerHTML  = " ";
    App.run();
    ;})

document.querySelector("#popular").addEventListener("click", (e)=>{
    FilteredPage.getPopular();
})

document.querySelector("#latest").addEventListener("click", (e)=>{
    FilteredPage.getLatest();
})

document.querySelector("#topRated").addEventListener("click", (e)=>{
    FilteredPage.getTopRated();
})

document.querySelector("#upComing").addEventListener("click", (e)=>{
    FilteredPage.getUpcoming();
})

document.querySelector("#nowPlaying").addEventListener("click", (e)=>{
    FilteredPage.getNowPlaying();
})

document.querySelector("#moviesBtn").addEventListener("mouseover",function(){
    NavBar.getGenre();
     document.querySelector("#genres").style.display ="block";
     document.querySelector("#genres").addEventListener("mouseover",function(){
        document.querySelector("#genres").style.display ="block";
     })
     document.querySelector("#genres").addEventListener("mouseout",function nav(){
        NavBar.getGenre();
         document.querySelector("#genres").style.display ="none";
    })

})
document.querySelector("#moviesBtn").addEventListener("mouseout",function nav(){
    NavBar.getGenre();
     document.querySelector("#genres").style.display ="none";
})

document.querySelector("#filterBtn").addEventListener("mouseover",function nav(){
        document.querySelector("#filter").style.display ="block";
        document.querySelector("#filter").addEventListener("mouseover",function(){
            document.querySelector("#filter").style.display ="block";
         })
         document.querySelector("#filter").addEventListener("mouseout",function nav(){
            NavBar.getGenre();
             document.querySelector("#filter").style.display ="none";
        })
})
document.querySelector("#filterBtn").addEventListener("mouseout",function nav(){
    document.querySelector("#filter").style.display ="none";
})


document.addEventListener("DOMContentLoaded", App.run);