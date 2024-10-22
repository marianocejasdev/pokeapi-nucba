const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', async () => {
    const numberInput = document.getElementById('pokemonNumber').value;
    resultContainer.innerHTML = ''; // Limpiar resultados previos

    if (!numberInput) {
        resultContainer.innerHTML = '<p class="error">Por favor, ingresa un número.</p>';
        return;
    }

    const pokemonNumber = parseInt(numberInput);

    if (isNaN(pokemonNumber) || pokemonNumber <= 0) {
        resultContainer.innerHTML = '<p class="error">Por favor, ingresa un número válido.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const pokemon = await response.json();

        const card = document.createElement('div');
        card.classList.add('card');

        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const types = pokemon.types.map(type => type.type.name).join(', ');
        const height = (pokemon.height / 10).toFixed(2); // Convertir a metros
        const weight = (pokemon.weight / 10).toFixed(2); // Convertir a kilogramos
        const image = pokemon.sprites.front_default;

        card.innerHTML = `
                    <h2>${name}</h2>
                    <p><strong>Tipo:</strong> ${types}</p>
                    <p><strong>Altura:</strong> ${height} m</p>
                    <p><strong>Peso:</strong> ${weight} kg</p>
                    <img src="${image}" alt="${name}" />
                `;

        resultContainer.appendChild(card);
    } catch (error) {
        resultContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
});