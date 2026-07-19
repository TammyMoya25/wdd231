// Data URL endpoint and DOM selector definitions
const dataUrl = "data/members.json";
const container = document.querySelector("#directory-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

// 1. Asynchronous fetch implementation using try/catch
async function getMembers() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error("Network response status failed");
        const data = await response.json();
        displayMembers(data, "grid"); // Grid layout active by default
        setupViewToggles(data);
    } catch (error) {
        console.error("Error reading directory source profiles: ", error);
        container.innerHTML = `<p class="error">Failed to load business profiles. Please try again later.</p>`;
    }
}

// 2. Dynamic element generation and injection controller
function displayMembers(members, layoutStyle) {
    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Compute and inject membership tier values
        let rank = "Member";
        if (member.membershipLevel === 2) rank = "Silver";
        if (member.membershipLevel === 3) rank = "Gold";
        card.classList.add(`tier-${rank.toLowerCase()}`);

        // Inside chamber/scripts/directory.js -> displayMembers function
        if (layoutStyle === "grid") {
            // Estructura limpia basada en el boceto de tarjeta de presentación
            card.innerHTML = `
                <div class="member-header">
                    <h3>${member.name}</h3>
                    <span class="badge status-${rank.toLowerCase()}">${rank} Partner</span>
                </div>
                <div class="member-body">
                    <div class="img-frame">
                        <img src="images/${member.image}" alt="Emblem for ${member.name}" loading="lazy" width="150" height="75">
                    </div>
                    <div class="member-info">
                        <p class="info"><strong>ADDRESS:</strong> ${member.address}</p>
                        <p class="info"><strong>PHONE:</strong> ${member.phone}</p>
                        <p class="info"><strong>URL:</strong> ${member.website}</p>
                    </div>
                </div>
            `;
        } else {
            // Text-only simplified rows for responsive list view layout
            card.innerHTML = `
                <div class="list-item-row">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <span class="badge status-${rank.toLowerCase()}">${rank}</span>
                    <a href="${member.website}" target="_blank" rel="noopener">Website</a>
                </div>
            `;
        }
        container.appendChild(card);
    });
}

// 3. Setup event listeners for responsive layout toggle triggers
function setupViewToggles(data) {
    gridBtn.addEventListener("click", () => {
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
        container.className = "grid-view";
        displayMembers(data, "grid");
    });

    listBtn.addEventListener("click", () => {
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
        container.className = "list-view";
        displayMembers(data, "list");
    });
}

// 4. Hamburger dynamic menu layout control toggle
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// 5. Build dynamic footer automation components
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Initialize structural lifecycle call
getMembers();