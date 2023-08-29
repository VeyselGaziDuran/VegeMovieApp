const global = {
  currentPage: window.location.pathname
};

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
  console.log('init');
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home Page');
      break;
    case '/shows.html':
      console.log('Shows Page');
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
