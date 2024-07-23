const apiKey = 'YOUR_PUBLIC_KEY';
const privateKey = 'YOUR_PRIVATE_KEY';
const ts = Date.now();
const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();

async function fetchCharacters() {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCharacters(characters) {
    const charactersContainer = document.getElementById('characters');
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
        `;
        charactersContainer.appendChild(characterDiv);
    });
}

fetchCharacters().then(characters => {
    if (characters) {
        displayCharacters(characters);
    }
});
