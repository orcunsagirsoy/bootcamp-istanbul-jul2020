//the API documentation site https://developers.themoviedb.org/3/
//Key:542003918769df50083a13c415bbc602
//genres: https://api.themoviedb.org/3/genre/movie/list?api_key=542003918769df50083a13c415bbc602&language=en-US
///////  

const nav = document.querySelector('nav');
$(window).on("scroll", function () {
  if ($(window).scrollTop()) {
    $('nav').addClass('black');
  } else {
    $('nav').removeClass('black');
  }
})
//////// General code
class App {
  static async run() {
    const movies = await APIService.fetchMovies();
    HomePage.renderMovies(movies);
  }
}
/////// Fetching code starts here
class APIService {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static async fetchMovies() {
    const url = APIService._constructUrl(`movie/now_playing`)
    const response = await fetch(url)
    const data = await response.json()
    return data.results.map(movie => new Movie(movie))
  }
  static async fetchMovie(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}`)
    const response = await fetch(url)
    const data = await response.json()
    return new Movie(data)
  }
  //this is for fetching actors
  static async fetchPeople() {
    const url = APIService._constructUrl(`person/popular`)
    const response = await fetch(url)
    const data = await response.json()
    return data.results;
    return data.results.map(actor => new Actor(actor))
  }
  static async fetchActor(actorId) {
    const url = APIService._constructUrl(`person/${actorId}`)
    const response = await fetch(url)
    const data = await response.json()
    return new Actor(data)
  }
  //this is for fetching the movie credit for single actor
  static async fetchActorCredit(actorId) {
    const url = APIService._constructUrl(`person/${actorId}/movie_credits`)
    const response = await fetch(url)
    const data = await response.json()
    return new ActorCredit(data)
  }
  // this is for fetching credit of people for single movie
  static async fetchCredits(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/credits`)
    const response = await fetch(url)
    const data = await response.json()
    return new Credit(data)
  }
  static async movieTrailer(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/videos`)
    const response = await fetch(url)
    const data = await response.json()
    return new Trailer(data.results)
  }
  static async relatedMovies(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/similar`)
    const response = await fetch(url)
    const data = await response.json()
    return new RelatedMovies(data.results)
  }

  //fetching for filter starts here //
  //this is for fetching popular movies
  static async fetchPopular() {
    const url = APIService._constructUrl(`movie/popular`)
    const response = await fetch(url)
    const data = await response.json()
    //console.log(data.results)
    //return data.results;

    return data.results.map(movie => new Movie(movie))
  }
  //this for fetching TopRated 
  static async fetchTopRated() {
    const url = APIService._constructUrl(`movie/top_rated`)
    const response = await fetch(url)
    const data = await response.json()

    return data.results.map(movie => new Movie(movie))
  }
  //this for fetching UpComing 
  static async fetchUpComing() {
    const url = APIService._constructUrl(`movie/upcoming`)
    const response = await fetch(url)
    const data = await response.json()
    return data.results.map(movie => new Movie(movie))
  }

  ///// this for fetch ReReleaseDate filter
  static async fetchReleaseDate() {
    const url = APIService._ReleaseDataConstructUrl()
    const response = await fetch(url)
    const data = await response.json()
    return data.results.map(movie => new Movie(movie))
  }
///////genresNav felter and fetch
  static async genresNav() {
    const url = APIService._constructUrl(`genre/movie/list`)
    const response = await fetch(url)
    const data = await response.json()
    return data['genres'];
  }

  static async fetchDiscover(genresID){
    const url = APIService._genresConstructUrl(genresID)
    const response = await fetch(url)
    const data = await response.json()
    //const movies = await data.results;
    console.log(data);
    return data.results.map(movie => new Movie(movie));
    //return data.results
  }
  static async grenerDiscover(genre) {
    const movies = await APIService.fetchDiscover(genre);
    //console.log(movies)
    let container = document.getElementById('container');
    container.innerHTML = ""
    HomePage.renderMovies(movies);
  }

  ////////// Search Function
  static async fetchSearch(searchValue){
    const url = APIService._searchConstructUrl(searchValue)
    const response = await fetch(url)
    //console.log(url);
    const data = await response.json()
    //const movies = await data.results;
    console.log(data.results);
    return data.results.map(result => new Movie(result));
    //return data.results
  }
  static async searchRender(result) {
    const resultData = await APIService.fetchSearch(result);
    console.log(result)
    let container = document.getElementById('container');
    container.innerHTML = ""
    HomePage.renderMovies(resultData);
  }

  static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
  }
  //////link for Genres
  static _genresConstructUrl(genresID) {
    return `${this.TMDB_BASE_URL}/discover/movie?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&sort_by=popularity.desc&with_genres=${genresID}`;
  }

  static _searchConstructUrl(searchValue) {
    return `${this.TMDB_BASE_URL}/search/multi?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&query=${searchValue}`;
  }

  static _ReleaseDataConstructUrl() {
    return `${this.TMDB_BASE_URL}/discover/movie?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&sort_by=release_date.desc`;
  }
}




/////// Home page rendering starts here 
class HomePage {
  static container = document.getElementById('container');
  static renderMovies(movies) {
    const mainMovieDiv = document.createElement("div");
    mainMovieDiv.classList.add("home-page-row");
    this.container.appendChild(mainMovieDiv);
    //console.log(movies)
    movies.forEach(movie => {
      //console.log(movie)
      const movieDiv = document.createElement("div");
      const movieImage = document.createElement("img");
      if (!movie.name){
        movieImage.src = `${movie.backdropUrl}`;
        //console.log(movie.backdropUrl)
      }
     else {
        //console.log(movie.profileBackdropUrl)
         movieImage.src = `${movie.profileBackdropUrl}`
      }
      const movieTitle = document.createElement("h3");
      
      //// the down code is for styling 
      //giving classes to cards
      movieDiv.classList.add("card");
      movieImage.classList.add("card-img-top");
      movieTitle.classList.add("card-title");
    
      if (!movie.name){
      movieTitle.textContent = `${movie.title}`;
      }else{
      movieTitle.textContent = `${movie.name}`
      }
      movieImage.addEventListener("click", function () {
        if(!movie.name){
          Movies.run(movie);
        }else{
          Actors.run(movie)
        }
      });
      mainMovieDiv.appendChild(movieDiv);
      movieDiv.appendChild(movieImage);
      movieDiv.appendChild(movieTitle);

      //giving ids to cards
      movieDiv.classList.add("home-page-card");
      movieImage.classList.add("home-page-img");
      movieTitle.classList.add("homepage-title");
      movieTitle.classList.add("text-center");

      //adding hover effect
      const hoverDiv = document.createElement("div");
      hoverDiv.classList.add("hover-more-detalis");
      const movieGenres = document.createElement("p"); 
      movieGenres.textContent = `Genres: ${movie.genre_ids}`;
     
      const movieVoting = document.createElement("p"); 
      movieVoting.textContent = `Rating: ${movie.vote_average}/10`;
      movieDiv.appendChild(hoverDiv);
      hoverDiv.appendChild(movieGenres);
      hoverDiv.appendChild(movieVoting);
      hoverDiv.addEventListener("click", function () {
        if(!movie.name){
          Movies.run(movie);
        }else{
          Actors.run(movie)
        }
      });

     movieDiv.addEventListener("mouseenter", function( event) {   
        if(movie.releaseDate!==undefined && movie.vote_average!==undefined) {
           hoverDiv.id = "hover-id"
        }
      });
    })
  }
}
/////// Movie page starts here
////// this class for calling fetch functions related to one movie (the fetch is done according to the movie id)
class Movies {
  static async run(movie) {
    const movieData = await APIService.fetchMovie(movie.id)
    const creditsData = await APIService.fetchCredits(movie.id);
    const trailerData = await APIService.movieTrailer(movie.id);
    const relatedMoviesData = await APIService.relatedMovies(movie.id);
    MoviePage.renderMovieSection(movieData, creditsData, trailerData, relatedMoviesData);
  }
}
///// rendering one movie page starts here 
class MoviePage {
  static container = document.getElementById('container');
  static renderMovieSection(movie, creditsData, trailerData, relatedMoviesData) {
    MovieSection.renderMovie(movie, creditsData, trailerData, relatedMoviesData);
  }
}
///// the html code to add to one movie page starts here 
class MovieSection {
  static renderMovie(movie, creditsData, trailerData, relatedMoviesData) {
    MoviePage.container.innerHTML = `
      <div id="first-part">
        <div id="image_movie_div">
            <div class="shadow_effect"></div>
            <img id="movie-backdrop" class="single_movie_img" src=${movie.backdropUrl}> 
        </div>
          <div class="short_info">
            <h2 id="movie-title"><span>${movie.title}</span></h2>
            <p id="genres">${movie.genres}</p>
            <div class="more_info">
              <p id="movie-release-date">${movie.releaseDate}</p>
              <p id="movie-runtime">${movie.runtime}</p>
            </div>  
            <h5>Overview:</h5>
            <p id="movie-overview">${movie.overview}</p>
            <div class="more_info">
            <p>Vote Average: ${movie.vote_average}/10</p>
            <p>Vote Count: ${movie.voteCount}</p>
            </div>
            <div class="more_info">
              <p>Director: ${creditsData.director}</p>
              <p>Language: ${movie.language}</p>
            </div>
          </div>  
      </div>  
      <div id="second-part">
        <div class=" container" id="actors" >
            <h3 class="row " id="actor-header">Actors:</h3> 
            <div class="row ">${creditsData.credits}
          </div>
        </div>
        <div class="container" id="production-company" >
          <h3 class="row" id="production-header">Production Companies:</h3>
          <div class='row justify-content-center'> ${movie.production_companies} </div>
        </div>
          <h3> Trailer:</h3> 
          <div id="trailer">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerData.trailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="container" >
            <h3 class="row"> Related Movies:</h3> 
            <div class="row"> ${relatedMoviesData.relatedMovie}</div>
          </div>
      </div>    
    </div>  
` 
   const actorCards = document.querySelectorAll(".actor-card");

    actorCards.forEach(card => {
      card.addEventListener("click", function () {
        let id = card.id.split('-')[1];
        Actors.run(creditsData.actors[id]);
      });

    })
  };
 } 
//here to navigate through the data set.
class Movie {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  constructor(json) {
    console.log(json)
    this.id = json.id;
    this.title = json.title;
    this.releaseDate = json.release_date;
    this.runtime = json.runtime + "minutes";
    this.overview = json.overview;
    this.backdropPath = json.backdrop_path;
    this.budget = json.budget;
    ////// navigate through Rating starts here 
    this.vote_average = json.vote_average;
    this.voteCount = json.vote_count;
    ////// navigate through genres starts here 
    this.genres = " ";
    for (const i in json.genres) {
      this.genres += `${json.genres[i].name} `
    };
    ////// navigate through language starts here 
    this.language = '';
    for (const j in json.spoken_languages) {
      this.language += `"${json.spoken_languages[j].name}" `
    }
    this.genre_ids = ''
    for (let i in json.genre_ids){
      let result = genresArraylist.find(({ id }) => id === json.genre_ids[i]);
      this.genre_ids += `${result.name} `
    }
    ////// navigate through Production companies starts here 
    this.production_companies = '';
    for (const j in json.production_companies) {
      let companyPic = json.production_companies[j].logo_path;
      let picLink;
      if (companyPic !== null) {
        picLink = Movie.BACKDROP_BASE_URL + companyPic
      } else {
        picLink = "./images/download.png"
      }
      this.production_companies += `
      <div class="col">
       <div class="card" style="width:12rem; margin:2px" >
        <img src="${picLink}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text" >${json.production_companies[j].name}</p>
        </div>
      </div>
      </div>`
    };
    this.name=json.name;
    this.profile_path = json.profile_path
  }
  get backdropUrl() {
    return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "";
  } 
///////this for the search bar too
  get profileBackdropUrl() {
    return this.profile_path ? Movie.BACKDROP_BASE_URL + this.profile_path : "";
  }
}
////// navigation to get credit data in the one movie page
class Credit {
  constructor(json) {
    //// cast/actors
    this.actors = [];
    this.credits = "";
    for (const i in json.cast) {
      let actorPic = json.cast[i].profile_path;
      let picLink;
      if (i < 5) {
        if (actorPic !== null) {
          picLink = Movie.BACKDROP_BASE_URL + actorPic
        } else {
          picLink = "./images/download.png"
        }
        this.actors.push(json.cast[i]);
        this.credits += `
        <div class="col">
          <div id="actor-${i}" class="card actor-card" style="width: 12rem;">
           <img src="${picLink}" class=" actor-img card-img-top" alt="...">
           <div class="card-body">
              <p class="card-text ">${json.cast[i].name} </p>
           </div>
          </div>
       </div>`
      }
    }
    //// director 
    this.director = '';
    for (const j in json.crew) {
      if (json.crew[j].job == 'Director') {
        this.director += `"${json.crew[j].name}" `
      }
    }
  }
}
////// navigation to get trailer/video to one movie page
class Trailer {
  constructor(json) {
    console.log(json)
    this.trailer = json[0].key;
  }
}
////// navigation to get similar movies to one movie page
class RelatedMovies {
  constructor(json) {
    //console.log(json)
    this.relatedMovie = " ";
    for (const i in json) {
      let relatedMoviePic = json[i].poster_path;
      let picLink;
      if (i < 5) {
        picLink = Movie.BACKDROP_BASE_URL + relatedMoviePic;
        this.relatedMovie += `
        <div class="col">
          <div class="card" id="relatedMovie" style="width: 12rem;">
            <img src="${picLink}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">${json[i].original_title}</p>
            </div>
          </div>
       </div>
       `
      }
    }
  }
}
///// Movie page ends here////////////
/////// Actors Page starts here ////////
let actorsNav = document.getElementById('actors');
//adding  event listner to actors in navbar
actorsNav.addEventListener("click", async function () {
  const actors = await APIService.fetchPeople();
  ActorsPage.renderActors(actors)
});
/////// Actors page rendering starts here 
class ActorsPage {
  static container = document.getElementById('container');
  static PIC_BASE_URL = 'http://image.tmdb.org/t/p/w185';
  static renderActors(actors) {
    ActorsPage.container.innerHTML = " ";
    const mainActorDiv = document.createElement("div");
    mainActorDiv.classList.add("home-page-row");
    this.container.appendChild(mainActorDiv)
    actors.forEach(actor => {
      const actorDiv = document.createElement("div");
      const actorImage = document.createElement("img");
      actorImage.src = `${ActorsPage.PIC_BASE_URL+actor.profile_path}`;
      const actorName = document.createElement("h3");
      actorName.textContent = `${actor.name}`;
      actorImage.addEventListener("click", function () {
        Actors.run(actor);
      });
      actorDiv.classList.add("card");
      actorImage.classList.add("card-img-top");
      actorName.classList.add("card-title");
      actorDiv.appendChild(actorImage);
      actorDiv.appendChild(actorName);
      mainActorDiv.appendChild(actorDiv);
      actorDiv.classList.add("home-page-card");
      actorImage.classList.add("home-page-img");
      actorName.classList.add("homepage-title");
      actorName.classList.add("text-center");
    });
  }
}
////// this is for single actor page
class Actors {
  static async run(actor) {
    const actorData = await APIService.fetchActor(actor.id);
    const actorCreditsData = await APIService.fetchActorCredit(actor.id);
    ActorPage.renderActorSection(actorData, actorCreditsData);
  }
}
class ActorPage {
  static container = document.getElementById('container');
  static renderActorSection(actor, actorCredit) {
    ActorSection.renderActor(actor, actorCredit);
  }
}
class ActorSection {
  static renderActor(actor, actorCredit) {
    ActorPage.container.innerHTML = `
 <div class="row " id="single-actor-page">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <img id="actor-backdrop" src=${actor.backdropUrl}> 
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12">
          <h2 id="actor-name"><span>${actor.name}</span></h2>
          <h4>Gender:</h4>
          <p id="gender">${actor.gender}</p>
          <h4>Popularity:</h4>
          <p id="popularity">${actor.popularity}</p>
          <h4>Birthday:</h4>
          <p id="birthday">${actor.birthday}</p>
          ${actor.deathday}
          <h4>Biography:</h4>
           <p id="biography" style="color:#BDBDBD; font-size: .8rem;">${actor.biography}</p>
        </div>
        <div class="container" >
          <h4 class="row" style="padding:1rem;"> Related Movies:</h4> 
          <div class="row"> ${actorCredit.credits}</div>
        </div>
      </div>  
    `;
  }
}
//this class to render the Single Actor Data
class Actor {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w185';
  constructor(json) {
    //console.log(json)
    this.id = json.id;
    this.name = json.name;
    this.backdropPath = json.profile_path;
    //gender is added in number so we added if condition.
    if (json.gender === 1) {
      this.gender = 'Female'
    }
    if (json.gender === 2) {
      this.gender = 'Male'
    }
    this.popularity = json.popularity;
    this.birthday = json.birthday;
    if (json.deathday !== null) {
      this.deathday =  `<h3>Deathday:</h3><p>${json.deathday}</p>`;
    }
    else {
      this.deathday =  ``
    }
    this.biography = json.biography;
  }
  get backdropUrl() {
    return this.backdropPath ? Actor.BACKDROP_BASE_URL + this.backdropPath : "";
  }
}
class ActorCredit {
  constructor(json) {
    //console.log(json)
    //// movie credit
    this.credits = "";
    for (const i in json.cast) {
      let moviePic = json.cast[i].poster_path;
      let picLink;
      if (i < 5) {
        if (moviePic !== null) {
          picLink = Movie.BACKDROP_BASE_URL + moviePic
        } else {
          picLink = "./images/download.png"
        }
        this.credits += `
        <div class="col">
          <div class="card" style="width:12rem;" id="relatedMovie">
            <img src="${picLink}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">${json.cast[i].original_title} </p>
            </div>
          </div>  
       </div>`
      }
    }
  }
}

//fetching filters starts here 
let popularNav = document.getElementById('popular');
popularNav.addEventListener("click", async function () {
  const popular = await APIService.fetchPopular();
  let container = document.getElementById('container');
  container.innerHTML = "";
  HomePage.renderMovies(popular);
});

// Release Data Filter:
let releaseDate = document.getElementById('release-date')
releaseDate.addEventListener("click", async function () {
  const releaseDateData = await APIService.fetchReleaseDate();
  let container = document.getElementById('container');
  container.innerHTML = ""
  HomePage.renderMovies(releaseDateData)
});

// top rated starts here
let topRatedNav = document.getElementById('top-rated');
topRatedNav.addEventListener("click", async function () {
  const topRated = await APIService.fetchTopRated();
  let container = document.getElementById('container');
  container.innerHTML = "";
  HomePage.renderMovies(topRated);
});

//this is for upcoming
let upComingNav = document.getElementById('up-coming');
upComingNav.addEventListener("click", async function () {
  const upComing = await APIService.fetchUpComing();
  let container = document.getElementById('container');
  container.innerHTML = "";
  HomePage.renderMovies(upComing);
});

///////// Starting Genres function
let moviesNav = document.getElementById('moviesNav')
document.addEventListener("DOMContentLoaded", async function() {
  const genresArraylist =  await APIService.genresNav();
  GenreNav.renderNavGenres(genresArraylist)
  //console.log(genresArraylist)
});


/////// Genres navication filter
class GenreNav {
  static moviesNav = document.getElementById('moviesNav');
  static renderNavGenres(genres) {
    genres.forEach(genre => {
      const genreName = document.createElement("a")
      genreName.classList.add ("dropdown-item");
      genreName.textContent = `${genre.name}`
      genreName.addEventListener("click", function() {
        APIService.grenerDiscover(genre.id);
      //  console.log(genre.id);
      });
      this.moviesNav.appendChild(genreName)
    });
  }
}

// search function
let searchBox = document.getElementById('searchBox')
let searchButton = document.getElementById('searchButton')
searchButton.addEventListener("click", async function(e) {
  e.preventDefault();
  let searchValue = searchBox.value
  //console.log(searchValue)
  APIService.searchRender(searchValue);
});


////About Us section is here 

let aboutUsNav = document.getElementById('about-us');
//adding  event listner to actors in navbar
aboutUsNav.addEventListener("click", async function () {
  AboutUsPage.renderAboutUs()
});


/////// About Us page rendering  
class AboutUsPage {
  static container = document.getElementById('container');
  static renderAboutUs() {
    AboutUsPage.container.innerHTML = "";
    const AboutUsDiv = document.createElement("div");
    AboutUsDiv.classList.add("card");
    AboutUsDiv.classList.add("mb-3");
    this.container.appendChild(AboutUsDiv)

    const abousUsImg = document.createElement("img");
    abousUsImg.classList.add("card-img-top");
    abousUsImg.src = "./images/banner.png";
    AboutUsDiv.appendChild(abousUsImg)

    const AboutUsDivBody = document.createElement("div");
    AboutUsDivBody.classList.add("card-body");
    AboutUsDiv.appendChild(AboutUsDivBody)

    const AboutUsDivTitle = document.createElement("h5");
    AboutUsDivTitle.classList.add("card-title");
    AboutUsDivTitle.textContent = "Let's talk about Movie Hub";
    AboutUsDivBody.appendChild(AboutUsDivTitle)
    

    const AboutUsDivTxt = document.createElement("P");
    AboutUsDivTxt.classList.add("card-text");
    AboutUsDivTxt.innerHTML = "The Movie Hub is a website built out of TMDb database. Our main goal is to bring you all the Movie information you need. New movies, Popular movies or Old movies; you'll find it all here. <br><br><strong> Enjoy browsing Movie Hub</strong>";
    AboutUsDivBody.appendChild(AboutUsDivTxt)
  }
}

const genresArraylist = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

document.addEventListener("DOMContentLoaded", App.run);