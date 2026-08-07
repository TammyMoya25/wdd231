import { itemsOfInterest } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // Set Footer Date info
    const currentYearEl = document.getElementById("currentyear");
    const lastModifiedEl = document.getElementById("lastModified");

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
    }

    // Handle Visitor Message via localStorage
    handleVisitorMessage();

    // Render Items of Interest Cards
    renderDiscoverCards(itemsOfInterest);
});

function handleVisitorMessage() {
    const visitorBanner = document.getElementById("visitor-message");
    if (!visitorBanner) return;

    const lastVisit = localStorage.getItem("lastVisitTimestamp");
    const now = Date.now();

    if (!lastVisit) {
        visitorBanner.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifferenceMs = now - parseInt(lastVisit, 10);
        const msInDay = 84600000; // 1000 * 60 * 60 * 24

        if (timeDifferenceMs < msInDay) {
            visitorBanner.textContent = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(timeDifferenceMs / msInDay);
            const dayText = days === 1 ? "day" : "days";
            visitorBanner.textContent = `You last visited ${days} ${dayText} ago.`;
        }
    }

    // Store current visit timestamp
    localStorage.setItem("lastVisitTimestamp", now.toString());
}

function renderDiscoverCards(items) {
    const container = document.getElementById("discover-grid");
    if (!container) return;

    container.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = `discover-card ${item.id}`;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;

        container.appendChild(card);
    });
}