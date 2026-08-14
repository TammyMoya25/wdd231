document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('menu-btn').addEventListener('click', () => {
        document.querySelector('#nav-menu ul').classList.toggle('open');
    });
});