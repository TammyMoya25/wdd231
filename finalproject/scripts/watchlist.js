// scripts/watchlist.js

const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('#nav-menu ul');
const watchlistGrid = document.getElementById('watchlist-grid');

document.getElementById('current-year').textContent = new Date().getFullYear();

// Menú Hamburguesa
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Renderizar las películas guardadas
function renderWatchlist() {
    let watchlist = JSON.parse(localStorage.getItem('popcornWatchlist')) || [];
    watchlistGrid.innerHTML = '';

    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = '<div class="empty-msg"><h3>Your watchlist is currently empty!</h3><a href="index.html" class="btn">Go find some movies</a></div>';
        return;
    }

    watchlist.forEach(movie => {
        const article = document.createElement('article');
        article.classList.add('movie-card');

        article.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy">
            <div class="card-content">
                <h3>${movie.title} (${movie.year})</h3>
                <p class="movie-meta">${movie.runtime}m | ${movie.mood}</p>
                <div class="card-actions">
                    <button class="remove-btn" data-id="${movie.id}" style="width: 100%; background-color: var(--accent-red); color: white;">Remove</button>
                </div>
            </div>
        `;
        watchlistGrid.appendChild(article);
    });

    // Agregar evento a los botones de eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeFromWatchlist(id);
        });
    });
}

function removeFromWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem('popcornWatchlist')) || [];
    // Filtramos la película que queremos eliminar
    watchlist = watchlist.filter(movie => movie.id != id);
    // Guardamos la nueva lista en localStorage
    localStorage.setItem('popcornWatchlist', JSON.stringify(watchlist));
    // Volvemos a dibujar la pantalla
    renderWatchlist();
}

// Iniciar
renderWatchlist();