// variables
const pokemonName = document.querySelector('.pokemon__name')
const pokemonId = document.querySelector('.pokemon__id')
const pokemonSprite = document.querySelector('.pokemon__sprite')
const form = document.querySelector('.pokemon__form')
const input = document.querySelector('.pokemon__input')
const submit = document.querySelector('.pokemon__submit')
const buttonPrev = document.querySelector('.prev-btn')
const buttonNext = document.querySelector('.next-btn')
const error = document.querySelector('.error')
const loading = document.querySelector('.loading')

var cont = 1

// functions
const fetchPokemon = async (pokemon) => {
    loading['style']['display'] = 'flex'
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    loading['style']['display'] = 'none';
    if (APIResponse['status'] === 200) {
        const data = await APIResponse.json();
        return data;
    } else {
        error['style']['display'] = 'flex'
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data['name'];
    pokemonId.innerHTML = data['id'];
    pokemonSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    cont = data['id'];
}

// form action
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
})

// prev and next buttons action
buttonNext.addEventListener('click', (event) => {
    event.preventDefault();
    if (cont != 649) {
        cont += 1
        renderPokemon(cont)
    };
})

buttonPrev.addEventListener('click', (event) => {
    event.preventDefault();
    if (cont != 1) {
        cont -= 1
        renderPokemon(cont)
    };
    
})

error.addEventListener('click', (event) => {
    event.preventDefault();
    error['style']['display'] = 'none'
})

// initial value
renderPokemon(cont);