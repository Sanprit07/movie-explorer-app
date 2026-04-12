const API_KEY = "121fb0fa";
const BASE_URL = "https://www.omdbapi.com/";

let moviesData = [];

// 🔍 DEBOUNCE
let timer;

function debounceSearch(value) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    searchMovies(value);
  }, 500);
}

// 🔍 SEARCH
async function searchMovies(query) {
  if (!query) return;

  document.getElementById("movies").innerHTML = "Loading...";

  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();

    moviesData = data.Search || [];
    displayMovies(moviesData);
  } catch (err) {
    console.log(err);
  }
}

// 🎬 DISPLAY
function displayMovies(movies) {
  const container = document.getElementById("movies");

  if (!movies.length) {
    container.innerHTML = "No movies found";
    return;
  }

  container.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie" onclick="getMovieDetails('${movie.imdbID}')">
        <img src="${
          movie.Poster !== "N/A" ? movie.Poster : ""
        }" />
        <h3>${movie.Title}</h3>
        <p>📅 ${movie.Year}</p>
      </div>
    `
    )
    .join("");
}

// 🎬 DETAILS FETCH
async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  const movie = await res.json();
  showModal(movie);
}

// 🪟 MODAL
function showModal(movie) {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${movie.Title}</h2>
      <img src="${movie.Poster}" style="width:200px" />
      <p><b>Year:</b> ${movie.Year}</p>
      <p><b>Rating:</b> ⭐ ${movie.imdbRating}</p>
      <p><b>Actors:</b> ${movie.Actors}</p>
      <p><b>Plot:</b> ${movie.Plot}</p>
      <button onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.remove("hidden");
}

// ❌ CLOSE MODAL
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// 🔽 SORT (HOF)
document.getElementById("sort").addEventListener("change", (e) => {
  let sorted = [...moviesData];

  if (e.target.value === "date") {
    sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  }

  displayMovies(sorted);
});

// 🌙 DARK MODE
function toggleTheme() {
  document.body.classList.toggle("light");
}

// INITIAL SEARCH
searchMovies("harry potter");

// 🎭 GENRE FILTER
document.getElementById("genre").addEventListener("change", (e) => {
  const genre = e.target.value;

  if (!genre) {
    displayMovies(moviesData);
    return;
  }

  searchMovies(genre);
});

// 📅 YEAR FILTER
document.getElementById("yearFilter").addEventListener("change", (e) => {
  const yearFilter = e.target.value;

  if (!yearFilter) {
    displayMovies(moviesData);
    return;
  }

  let filtered = [...moviesData];

  if (yearFilter === "latest") {
    filtered = filtered.filter(
      (movie) => parseInt(movie.Year) > 2015
    );
  } else if (yearFilter === "old") {
    filtered = filtered.filter(
      (movie) => parseInt(movie.Year) < 2010
    );
  }

  displayMovies(filtered);
});