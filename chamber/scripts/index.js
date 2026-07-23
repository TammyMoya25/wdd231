// OpenWeatherMap API & Member Data Configuration
const apiKey = "26f7f9e68236adc22746a67fc0040874";
const lat = "9.9281";  // San José, Costa Rica Latitude
const lon = "-84.0907"; // San José, Costa Rica Longitude

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersUrl = "data/members.json";

// DOM Elements
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

// 1. Mobile Hamburger Menu Toggle
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// 2. Fetch and Render Current Weather Data
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error("Weather response failed");
        const data = await response.json();

        const tempElement = document.querySelector("#current-temp");
        const descElement = document.querySelector("#weather-desc");
        const iconElement = document.querySelector("#weather-icon");

        tempElement.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
        const description = data.weather[0].description;
        descElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);

        const iconCode = data.weather[0].icon;
        iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
        iconElement.setAttribute("alt", description);
    } catch (error) {
        console.error("Error fetching current weather:", error);
        document.querySelector(".current-weather").innerHTML = "<p>Weather data unavailable</p>";
    }
}

// 3. Fetch and Render 3-Day Forecast
async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error("Forecast response failed");
        const data = await response.json();

        const forecastContainer = document.querySelector("#forecast-container");
        forecastContainer.innerHTML = "";

        // Filter readings taken around noon (12:00:00) for daily representation
        const dailyReadings = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyReadings.forEach(reading => {
            const dateObj = new Date(reading.dt * 1000);
            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
            const temp = Math.round(reading.main.temp);

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
                <span class="day">${dayName}</span>
                <span class="temp">${temp}&deg;C</span>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    } catch (error) {
        console.error("Error fetching forecast:", error);
        document.querySelector("#forecast-container").innerHTML = "<p>Forecast unavailable</p>";
    }
}

// 4. Fetch and Render Random Silver/Gold Member Spotlights
async function fetchMemberSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Members response failed");
        const members = await response.json();

        // Filter for Gold (level 3) or Silver (level 2) members
        const qualifiedMembers = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        // Randomly select 2 or 3 members
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selectedCount = Math.floor(Math.random() * 2) + 2; // Returns 2 or 3
        const selectedSpotlights = shuffled.slice(0, selectedCount);

        renderSpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Error loading member spotlights:", error);
        document.querySelector("#spotlights-container").innerHTML = "<p>Spotlights unavailable</p>";
    }
}

function renderSpotlights(spotlights) {
    const container = document.querySelector("#spotlights-container");
    container.innerHTML = "";

    spotlights.forEach(member => {
        let rank = member.membershipLevel === 3 ? "Gold" : "Silver";

        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
            <div class="member-header">
                <h3>${member.name}</h3>
                <p class="tagline">"${member.tagline || 'Driving community excellence.'}"</p>
            </div>
            <div class="member-body">
                <div class="img-frame">
                    <img src="images/${member.image}" alt="Logo for ${member.name}" loading="lazy" width="120" height="80">
                </div>
                <div class="member-info">
                    <p class="info"><strong>ADDRESS:</strong> ${member.address}</p>
                    <p class="info"><strong>PHONE:</strong> ${member.phone}</p>
                    <p class="info"><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                    <span class="badge status-${rank.toLowerCase()}">${rank} Partner</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 5. Automated Footer Components
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Initialize Homepage Scripts
fetchCurrentWeather();
fetchWeatherForecast();
fetchMemberSpotlights();