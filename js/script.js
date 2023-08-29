const global = {
  currentPage: window.location.pathname
};

//! Display Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                  class="card-img-top" alt="${movie.title}">`
                  : `<img src="../images/no-image.jpg"
                  class="card-img-top" alt="${movie.title}">`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
              </p>
            </div>
      `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

//! Display Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
              <a href="tv-details.html?id=${show.id}">
                ${
                  show.poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
                    class="card-img-top" alt="${show.name}">`
                    : `<img src="../images/no-image.jpg"
                    class="card-img-top" alt="${show.name}">`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                  <small class="text-muted">Air Date: ${
                    show.first_air_date
                  }</small>
                </p>
              </div>
        `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

//! Fetch Data From TMDB API
async function fetchData(endpoint) {
  const API_KEY = '882fc8fd12843f1f68b8f5fac70c7976';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//! Highlight Active Page
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//! Init Function

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/tv-details.html':
      console.log('TV Details Page');
      break;
    case '/search.html':
      console.log('Search Page');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
