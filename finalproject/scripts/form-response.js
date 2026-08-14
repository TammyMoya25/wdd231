const urlParams = new URLSearchParams(window.location.search);
document.getElementById('res-title').textContent = urlParams.get('title') || 'N/A';
document.getElementById('res-runtime').textContent = urlParams.get('runtime') || 'N/A';
document.getElementById('res-mood').textContent = urlParams.get('mood') || 'N/A';