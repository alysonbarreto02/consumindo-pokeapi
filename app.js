const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const capitalize = str => {
	if (typeof str !== 'string') {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.substr(1);
}


const generatePokemonPromises = () => Array(151).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

    accumulator += `
<li class="card ${types[0]}">
    <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
    <h2 class="card-title">${pokemon.id} - ${capitalize(pokemon.name)}</h2>
</li>
    `

    return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokeapi"]')
    ul.innerHTML = pokemons
}

const fetchPokemon = () => {
    const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
}

fetchPokemon()