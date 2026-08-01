document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Responsive Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // 2. Set Current Timestamp in Hidden Input
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 3. Modals Logic
    const infoButtons = document.querySelectorAll(".info-btn");
    const closeButtons = document.querySelectorAll(".close-modal");

    infoButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

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