const poke_container = document.querySelector('#poke-container')
const POKEMON_COUNT = 1000
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const colorsMap = {
  fire: '#daa8a8',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FF',
  ground: '#F4E7DA',
  rock: '#B5B5B5',
  fairy: '#FCEAFF',
  poison: '#F2C4FF',
  bug: '#F8D5A3',
  dragon: '#97B3E6',
  psychic: '#EAEDA1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#E3E3E3',
  ice: '#FFF'
}

fetchPokemon()

async function fetchPokemon() {
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    await fetch(`${API_URL}${i}`)
      .then(res => res.json())
      .then(data => creatPokemoncard(data))
      .catch(err => console.error(err))
  }
}

function creatPokemoncard(pokemon) {
  const pokemonEl = document.createElement('div')
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = pokemon.id.toString().padStart(3, '0')
  const types = pokemon.types
  const main_type = types[0].type.name
  const sub_type = types.length > 1 ? types[1].type.name : ''

  pokemonEl.style.backgroundColor = colorsMap[main_type]
  pokemonEl.classList.add('pokemon')
  pokemonEl.innerHTML = `
    <div class="img-container">
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name}" />
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="types">
        <span class="main-type">${main_type}</span>
      </small>
    </div>
  `

  if (types.length > 1) {
    const subTypeEl = document.createElement('span')

    subTypeEl.innerText = sub_type
    subTypeEl.classList.add('sub-type')
    subTypeEl.style.backgroundColor = colorsMap[sub_type]
    pokemonEl.querySelector('.types').append(subTypeEl)
  }

  poke_container.append(pokemonEl)
}
