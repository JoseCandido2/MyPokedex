const pokeContainer = document.querySelector("#poke-container");
const pokemonCount = 200
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async() => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons (i);
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color
    const pokemonInnerHTML = `
    <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="types">
              <span class="main-type">${type}</span>
            </small>
            </div>
    `

    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)

}

fetchPokemons();

//
//
//
//
//

// Adicionando funcionalidade de pesquisa
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        const searchString = searchInput.value.trim().toLowerCase();
        if (searchString === "") {
            location.reload(); // Atualiza a página se a pesquisa estiver vazia
        } else {
            const pokemonData = await fetchPokemonByName(searchString);
            if (pokemonData) {
                pokeContainer.innerHTML = ""; // Limpa os Pokémon anteriores
                createPokemonCard(pokemonData);
            } else {
                alert("Pokemon not found!");
            }
        }
    }
});

searchInput.addEventListener("input", async (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    if (searchString === "") {
        location.reload(); // Atualiza a página se o texto da pesquisa for apagado
    }
});

const fetchPokemonByName = async (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        return null;
    }
};




