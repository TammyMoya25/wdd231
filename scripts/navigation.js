document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        // Update hamburger icon visual feedback securely
        menuToggle.innerHTML = navMenu.classList.contains("open") ? "&#10006;" : "&#9776;";
    });
});