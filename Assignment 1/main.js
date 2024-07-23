const publicKey = '05acf549a7b2719cbfe9e1c8adb153db';
const privateKey = 'b5714f8c7862c053d280169f1ef2eb5e78278f2d'; // Use only for testing
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const API_URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10&fields=id,name,thumbnail,description`;

async function fetchCharacters() {
    const cachedData = localStorage.getItem('characters');
    if (cachedData) {
        updateUI(JSON.parse(cachedData));
        return;
    }

    console.time('fetchCharacters');
    try {
        const response = await fetch(API_URL);
        console.timeEnd('fetchCharacters');
        const data = await response.json();
        console.log('API Response:', data);

        if (response.status === 409) {
            console.error('409 Conflict Error: Possible referrer issue or rate limit exceeded.');
            alert('Error: Conflict error (409). Check console for details.');
            return;
        }

        if (response.status !== 200) {
            console.error(`Error: ${response.status} - ${data.status}`);
            alert(`Error: ${response.status} - ${data.status}`);
            return;
        }

        if (data.data && data.data.results) {
            localStorage.setItem('characters', JSON.stringify(data.data.results));
            updateUI(data.data.results);
        } else {
            console.error('Invalid API response structure:', data);
            alert('Error: Invalid API response structure. Check console for details.');
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
        alert('Error: Unable to fetch characters. Check console for details.');
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
