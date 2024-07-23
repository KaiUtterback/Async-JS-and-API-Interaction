const API_KEY = '05acf549a7b2719cbfe9e1c8adb153db';  
const API_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${API_KEY}`;

async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data.data.results);
        updateUI(data.data.results);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

function updateUI(characters) {
    const charactersContainer = document.getElementById('characters');
    charactersContainer.innerHTML = '';

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <p>${character.description || 'No description available'}</p>
        `;
        charactersContainer.appendChild(characterDiv);
    });
}

fetchCharacters();
