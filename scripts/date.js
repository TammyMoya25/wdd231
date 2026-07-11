document.addEventListener("DOMContentLoaded", () => {
    // Inject Year
    const currentYearEl = document.getElementById("currentyear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Inject Modified Document Timestamp
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.innerHTML = `Last Modification: ${document.lastModified}`;
    }
});