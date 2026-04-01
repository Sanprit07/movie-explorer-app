const API_KEY = "121fb0fa";
const BASE_URL = "https://www.omdbapi.com/";
// SEARCH FUNCTION
async function searchMovies(query) {
  if (!query) return;

  document.getElementById("movies").innerHTML = "Loading...";

  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}`
    );

    const data = await res.json();

    moviesData = data.Search || [];
    displayMovies(moviesData);

  } catch (err) {
    console.log(err);
  }
}

// DISPLAY FUNCTION
function displayMovies(movies) {
  const container = document.getElementById("movies");

  if (!movies.length) {
    container.innerHTML = "No movies found";
    return;
  }

  container.innerHTML = movies.map(movie => `
    <div class="movie" onclick="getMovieDetails('${movie.imdbID}')">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ''}" />
      <h3>${movie.Title}</h3>
      <p>📅 ${movie.Year}</p>
    </div>
  `).join("");
}

// 🌙 DARK MODE
function toggleTheme() {
  document.body.classList.toggle("light");
}
