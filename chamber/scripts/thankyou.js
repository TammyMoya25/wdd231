document.addEventListener("DOMContentLoaded", () => {
    // Menu Responsive Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // Parse URL Search Parameters
    const currentUrl = window.location.href;
    const formData = currentUrl.split('?')[1];

    const resultsContainer = document.getElementById("results");

    if (formData && resultsContainer) {
        const params = new URLSearchParams(formData);

        // Helper function to format timestamp
        const rawDate = params.get("timestamp");
        let formattedDate = "N/A";
        if (rawDate) {
            const dateObj = new Date(rawDate);
            formattedDate = dateObj.toLocaleString();
        }

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${params.get("fname") || "N/A"}</p>
            <p><strong>Last Name:</strong> ${params.get("lname") || "N/A"}</p>
            <p><strong>Email:</strong> ${params.get("email") || "N/A"}</p>
            <p><strong>Mobile Phone:</strong> ${params.get("phone") || "N/A"}</p>
            <p><strong>Business Name:</strong> ${params.get("organization") || "N/A"}</p>
            <p><strong>Submission Timestamp:</strong> ${formattedDate}</p>
        `;
    } else if (resultsContainer) {
        resultsContainer.innerHTML = `<p>No application submission data found.</p>`;
    }

    // Footer Dates
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedPara = document.getElementById("lastModified");
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;
    }
});