document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('search-btn').addEventListener('click', function () {
    const query = document.getElementById('search').value;
    if (query === "") {
        alert("Please enter a search query");
        return;
    }
    
    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            data.forEach(song => {
                let songElement = document.createElement('div');
                songElement.innerHTML = `<p>${song.title} <button onclick="downloadSong('${song.url}')">Download MP3</button></p>`;
                resultsDiv.appendChild(songElement);
            });
            addToHistory(query);
        });
});

function downloadSong(url) {
    window.location.href = `/download?url=${url}`;
}

function addToHistory(query) {
    let historyList = document.getElementById('search-history');
    let listItem = document.createElement('li');
    listItem.textContent = query;
    historyList.appendChild(listItem);
}

document.getElementById('clear-history-btn').addEventListener('click', function () {
    document.getElementById('search-history').innerHTML = '';
});
