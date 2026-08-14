// scripts/main.js
import { fetchMovies } from './api.js';

// DOM Elements
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('#nav-menu ul');
const movieGrid = document.getElementById('movie-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('movie-modal');
const closeModal = document.getElementById('close-modal');
const modalDetails = document.getElementById('modal-details');

let allMovies = []; // Store fetched movies globally

// Set Current Year in Footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Hamburger Menu Toggle
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Initialize Application
async function init() {
    allMovies = await fetchMovies('data/movies.json');
    renderMovies(allMovies);
}

// Render Movies to the DOM
function renderMovies(movies) {
    movieGrid.innerHTML = ''; // Clear grid

    if (movies.length === 0) {
        movieGrid.innerHTML = '<p>No movies found.</p>';
        return;
    }

    // Array method .forEach() + Template Literals
    movies.forEach(movie => {
        const article = document.createElement('article');
        article.classList.add('movie-card');

        // Displays >4 distinct data properties (title, mood, runtime, rating, poster)
        article.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy">
            <div class="card-content">
                <h3>${movie.title} (${movie.year})</h3>
                <p class="movie-meta">★ ${movie.rating} | ${movie.runtime}m | ${movie.mood}</p>
                <div class="card-actions">
                    <button class="details-btn" data-id="${movie.id}">Details</button>
                    <button class="save-btn" data-id="${movie.id}">+ Save</button>
                </div>
            </div>
        `;
        movieGrid.appendChild(article);
    });

    attachCardEvents();
}

// Attach event listeners to newly generated buttons
function attachCardEvents() {
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            showModal(id);
        });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            saveToWatchlist(id);
        });
    });
}

// Filter Logic using Array method .filter()
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const selectedMood = e.target.getAttribute('data-mood');

        if (selectedMood === 'All') {
            renderMovies(allMovies);
        } else {
            const filteredMovies = allMovies.filter(movie => movie.mood === selectedMood);
            renderMovies(filteredMovies);
        }
    });
});

// Modal Dialog Logic
function showModal(id) {
    const movie = allMovies.find(m => m.id == id);
    if (!movie) return;

    modalDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Synopsis:</strong> ${movie.synopsis}</p>
    `;
    modal.showModal();
}

closeModal.addEventListener('click', () => {
    modal.close();
});

// Local Storage functionality
function saveToWatchlist(id) {
    const movie = allMovies.find(m => m.id == id);
    let watchlist = JSON.parse(localStorage.getItem('popcornWatchlist')) || [];

    // Avoid duplicates
    if (!watchlist.some(m => m.id == id)) {
        watchlist.push(movie);
        localStorage.setItem('popcornWatchlist', JSON.stringify(watchlist));
        alert(`${movie.title} added to Watchlist!`);
    } else {
        alert(`${movie.title} is already in your Watchlist.`);
    }
}

// Run app
init();