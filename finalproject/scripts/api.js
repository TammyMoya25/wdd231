// scripts/api.js
// ES Module for data fetching

export async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.movies;
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return []; // Return empty array on failure
    }
}