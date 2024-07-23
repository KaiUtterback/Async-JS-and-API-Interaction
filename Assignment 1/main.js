const apiKey = '05acf549a7b2719cbfe9e1c8adb153db';
const privateKey = 'b5714f8c7862c053d280169f1ef2eb5e78278f2d';
const ts = Date.now().toString(); // Ensure ts is a string
const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();

console.log('Timestamp:', ts);
console.log('Hash:', hash);
console.log('API Key:', apiKey);

async function fetchCharacters() {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    console.log('URL:', url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        }
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCharacters(characters) {
    const charactersContainer = document.getElementById('characters');
    charactersContainer.innerHTML = ''; // Clear previous content
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
    } else {
        console.log('No characters to display');
    }
});
