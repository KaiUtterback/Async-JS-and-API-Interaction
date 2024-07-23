const publicKey = '05acf549a7b2719cbfe9e1c8adb153db';
const privateKey = 'b5714f8c7862c053d280169f1ef2eb5e78278f2d'; // For testing purposes
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const API_URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.code === 409) {
            console.error('Conflict error: Check API key or referrer settings.');
            alert('Error: Conflict error. Check the console for details.');
            return;
        }

        // Check if there are any characters in the response
        if (data.data && data.data.results) {
            updateUI(data.data.results);
        } else {
            console.error('Invalid API response structure:', data);
            alert('Error: Invalid API response structure. Check the console for details.');
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
        alert('Error: Unable to fetch characters. Check the console for details.');
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
