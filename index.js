
const API = "https://api.themoviedb.org/4/search/movie?api_key=58a318aadb8df40a52f2d68b7634295d&language=en-US&query=";
const popular_movies = 'https://api.themoviedb.org/3/movie/popular?api_key=58a318aadb8df40a52f2d68b7634295d&language=en-US&page=1&region=ua'
const Part = "&page=1&include_adult=false"
const partimage = "https://image.tmdb.org/t/p/w500/"
const API_treiler = "https://api.themoviedb.org/3/movie/"
const Append = "?api_key=58a318aadb8df40a52f2d68b7634295d&append_to_response=videos,images";
const urlYouTube = "https://www.youtube.com/embed/";
const rated = "top_rated?api_key=58a318aadb8df40a52f2d68b7634295d&language=en-US&page=1";

const popular_films = document.getElementsByClassName('popular_films')[0];
const content = document.getElementsByClassName('content')[0];
const rating = document.getElementsByClassName('rating')[0];
    
    fetch(`${popular_movies}`)
        .then(res => res.json())
        .then(popMovies => {
            popMovies.results.map(popmovie => popular_films.appendChild(popular(popmovie)));
        })

function popular(popmovie) {
        const film_pop = document.createElement('DIV');
        film_pop.classList.add('film_pop')
        const h4 = document.createElement('H4');
        const img = document.createElement('IMG');
        img.src = partimage + popmovie.backdrop_path;
        h4.innerHTML =  popmovie.title;
        film_pop.appendChild(h4);
        film_pop.appendChild(img);img.addEventListener('click', () => {
        popular_films.innerHTML = "";
        fetch(`${API_treiler + popmovie.id + Append}`).then(res => res.json())
            .then(video => {
                console.log(video);
                const movie = document.createElement('div');
                movie.classList.add('movie');
                const iframe = document.createElement('iframe');
                const title = document.createElement('h4');
                const movie_info = document.createElement('div');
                movie_info.classList.add('info');
                const span = document.createElement('p');
                const span3 = document.createElement('p');
                const span4 = document.createElement('p')
                span,span3,span4.classList.add('label');
                const span_2 = document.createElement('h4');
                span_2.classList.add('value');
                const description = document.createElement('div');
                description.classList.add('description_movie');
                const poster = document.createElement('img');
                poster.classList.add('poster');
                const p_description = document.createElement('p');
                title.innerHTML = video.title;
                iframe.src = urlYouTube + video.videos.results[0].key;
                span.innerHTML = "rating - " + video.vote_average;
                span3.innerHTML = "release_date - " + video.release_date;
                span4.innerHTML = "budget - " + video.budget;
                span_2.innerHTML = "overview -" + video.title;
                poster.src = partimage + video.poster_path;
                p_description.innerHTML = video.overview;
                content.appendChild(movie);
                movie.appendChild(title);
                movie.appendChild(iframe);
                movie.appendChild(movie_info);
                movie_info.appendChild(span);
                movie_info.appendChild(span3);
                movie_info.appendChild(span4);
                movie.appendChild(span_2);
                movie.appendChild(description);
                description.appendChild(poster);
                description.appendChild(p_description);      
                return content;
            })        
       })   
        return film_pop;    
    }

    const container = document.getElementsByClassName('container')[0];
    const input = document.querySelector('input')
    btn_seach.addEventListener('click', () => {
        const title = input.value;
        container.innerHTML = "";
        popular_films.innerHTML = "";
    fetch(`${API + title + Part}`)
            .then(response => response.json())
        .then(movies => {
                movies.results.map(movie => container.appendChild(getMovie(movie)));
                input.value = ""
            });
    })   
function getMovie(movie) {

        const film = document.createElement('DIV');
        film.classList.add('film')
        const h3 = document.createElement('H3');
        h3.classList.add('title')
        const img = document.createElement('IMG');
        const p_overview = document.createElement('P');
        const p = document.createElement('P');
        const trailer = document.createElement('button');
        trailer.classList.add('btn_trailer');
        img.src = partimage + movie.backdrop_path;
        h3.innerHTML =  movie.original_title;
        p.innerHTML = "Vote average - " + movie.vote_average;
        trailer.innerHTML = "details"
        p_overview.innerHTML = movie.overview;
    trailer.addEventListener("click", () => {
        container.innerHTML = "";
        content.innerHTML = "";
        fetch(`${API_treiler + movie.id + Append}`).then(res => res.json())
            .then(video => {
            const movie = document.createElement('div');
            movie.classList.add('movie');
            const iframe = document.createElement('iframe');
            const title = document.createElement('H4');
            const movie_info = document.createElement('div');
            const span = document.createElement('p');
            const span3 = document.createElement('p');
            const span4 = document.createElement('p')
            span,span3,span4.classList.add('label');
            const span_2 = document.createElement('h4');
            span_2.classList.add('value');
            const description = document.createElement('div');
            description.classList.add('description_movie');
            const poster = document.createElement('img');
            poster.classList.add('poster');
            const p_description = document.createElement('p');
            title.innerHTML = video.title;
            iframe.src = urlYouTube + video.videos.results[0].key;
            span.innerHTML = "rating - " + video.vote_average;
            span.innerHTML = "release_date - " + video.release_date;
            span.innerHTML = "budget - " + video.budget;
            span_2.innerHTML = "overview -" + video.title;
            poster.src = partimage + video.poster_path;
            p_description.innerHTML = video.overview;
            content.appendChild(movie);
            movie.appendChild(title);
            movie.appendChild(iframe);
            movie.appendChild(movie_info);
            movie_info.appendChild(span);
            movie_info.appendChild(span3);
            movie_info.appendChild(span4);
            movie.appendChild(span_2);
            movie.appendChild(description);
            description.appendChild(poster);
            description.appendChild(p_description); 
            
        })
         return content;;   
        })

        film.appendChild(h3);
        film.appendChild(img);
        film.appendChild(p);
        film.appendChild(p_overview);
        film.appendChild(trailer);
        
    return film;     
    
};


btn_toggle.addEventListener("click", changeTheme)
    
   function changeTheme () {
  document.body.classList.toggle("dark-theme");
};


fetch(`${API_treiler+rated}`)
.then(res => res.json())
    .then(ratedMovies => {
    ratedMovies.results.map(rated_movie => rating.appendChild(top_rated(rated_movie)));
})


function top_rated (rated_movie) {
    const rating_Movie = document.createElement('div');
    rating_Movie.classList.add('rating_Movie')
    const td1 = document.createElement('p');
    const td2 = document.createElement('p');
    const td3 = document.createElement('p');
    const td4 = document.createElement('p');
    td1.innerHTML = rated_movie.title;
    td2.innerHTML = rated_movie.popularity;
    td3.innerHTML = rated_movie.vote_average;
    td4.innerHTML = rated_movie.release_date;
    rating_Movie.appendChild(td1);
    rating_Movie.appendChild(td2);
    rating_Movie.appendChild(td3);
    rating_Movie.appendChild(td4);
        
    rating_Movie.addEventListener('click', () => {
        rating.innerHTML = "";
        fetch(`${API_treiler + rated_movie.id + Append}`).then(res => res.json())
            .then(video => {
                const movie = document.createElement('div');
                movie.classList.add('movie');
                const iframe = document.createElement('iframe');
                const title = document.createElement('h4');
                const movie_info = document.createElement('div');
                movie_info.classList.add('info');
                const span = document.createElement('p');
                const span3 = document.createElement('p');
                const span4 = document.createElement('p')
                span, span3, span4.classList.add('label');
                const span_2 = document.createElement('h4');
                span_2.classList.add('value');
                const description = document.createElement('div');
                description.classList.add('description_movie');
                const poster = document.createElement('img');
                poster.classList.add('poster');
                const p_description = document.createElement('p');
                title.innerHTML = video.title;
                iframe.src = urlYouTube + video.videos.results[0].key;
                span.innerHTML = "rating - " + video.vote_average;
                span3.innerHTML = "release_date - " + video.release_date;
                span4.innerHTML = "budget - " + video.budget;
                span_2.innerHTML = "overview -" + video.title;
                poster.src = partimage + video.poster_path;
                p_description.innerHTML = video.overview;
                content.appendChild(movie);
                movie.appendChild(title);
                movie.appendChild(iframe);
                movie.appendChild(movie_info);
                movie_info.appendChild(span);
                movie_info.appendChild(span3);
                movie_info.appendChild(span4);
                movie.appendChild(span_2);
                movie.appendChild(description);
                description.appendChild(poster);
                description.appendChild(p_description);
                return content;
            })
    })
        
    return rating_Movie;    
}



