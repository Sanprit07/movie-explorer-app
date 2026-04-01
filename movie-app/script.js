const API_KEY = "YOUR_API_KEY";

// SEARCH FUNCTION
async function searchMovies() {
  const query = document.getElementById("search").value;

  document.getElementById("movies").innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await res.json();

    displayMovies(data.results);

  } catch (error) {
    console.log("Error:", error);
  }
}

// DISPLAY FUNCTION
function displayMovies(movies) {
  const container = document.getElementById("movies");

  container.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      <h3>${movie.title}</h3>
      <p>${movie.release_date}</p>
    </div>
  `).join("");
}

// 🌙 DARK MODE
function toggleTheme() {
  document.body.classList.toggle("light");
}