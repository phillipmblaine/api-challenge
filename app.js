// console.log("JS file is connected.");

/* Plan:
    Make a site that gathers Pokemon data all in one (Pokedex).
    The site can:
        Goal:
        - Provide a single random pokemon info upon an event (click), cleanly and neatly display fetched info on page

        Stretch Goals:
        - search for a specific pokemon
        - show a full list of pokemon entries
*/

// First, check to see if we can get a successful request
const fetchPokeApi = function () {
    pokedexNumber = getRandomInt(1, 251);
    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`;
    console.log("Executing fetchPokeApi");
    fetch(baseURL)
        .then(function (response) {
            // console.log("response:", response);
            return response.json();
        })
        .then(function (pokeApiResults) {
            // console.log("pokeApiResults:", pokeApiResults);
            displayPokeApi(pokeApiResults);
        })
        .catch(function (err) {
            console.log(err);
        });
};

const fetchPokeApiSearch = function () {
    pokedexNumber = document.getElementById("searchPokemon").value.toLowerCase();
    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`;
    console.log("Executing fetchPokeApi");
    fetch(baseURL)
        .then(function (response) {
            // console.log("response:", response);
            return response.json();
        })
        .then(function (pokeApiResults) {
            // console.log("pokeApiResults:", pokeApiResults);
            displayPokeApi(pokeApiResults);
        })
        .catch(function (err) {
            console.log(err);
        });
};

document
    .getElementById("submitButton").addEventListener("click", (event) => {
        event.preventDefault();
        if (
            document.getElementById("searchPokemon").value == document.getElementById("searchPokemon").placeholder ||
            document.getElementById("searchPokemon").value == ' ' ||
            document.getElementById("searchPokemon").value == ''
        ) {
            console.log(`Please enter a valid Pokemon name or ID number between 001 and 251.`);
            document.getElementById('searchPokemon').value = '';
        } else {
            console.log(`Searching for ${document.getElementById("searchPokemon").value}`);
            fetchPokeApiSearch();
        }
    })

// Separate fetch for individual search using onsubmit search bar
// const fetchSearchPokeApi = function () {
//     pokedexNumber = getRandomInt(1, 251);
//     const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`;
//     console.log("Executing fetchPokeApi");
//     fetch(baseURL)
//         .then(function (response) {
//             // console.log("response:", response);
//             return response.json();
//         })
//         .then(function (pokeApiResults) {
//             // console.log("pokeApiResults:", pokeApiResults);
//             displayPokeApi(pokeApiResults);
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// };

// Ideally, call this function within ".then" to pass access to the display function and display the Pokemon data. Handle all data within the display function and NOT the promise resolver (".then").

function displayPokeApi(pokeApiResults) {
    console.log("Executing displayPokeApi:");
    console.log(pokeApiResults);
    // console.log(Array.isArray(pokeApiResults.sprites)); // returns false
    // console.log(pokeApiResults.sprites);

    /* ASSIGNING VARIABLES TO POKEMON ENTRY */
    // grab the pokemon id
    let pokemonIdNumber = pokeApiResults.id;
    console.log("Pokemon ID Number:", pokemonIdNumber);

    // grab the pokemon name
    let pokemonName = pokeApiResults.name;
    console.log("Pokemon Name:", pokemonName);

    // grab the sprites (images/game art) of the pokemon, assign variables
    let pokemonSpriteDefault = pokeApiResults.sprites.front_default;
    let pokemonSpriteShiny = pokeApiResults.sprites.front_shiny;

    // grab the pokemon types to display
    // console.log(pokeApiResults.types);
    // console.log(pokeApiResults.types[0].type)
    // console.log(pokeApiResults.types[1].type)
    // map can return pokemon types as an array
    // join can return array as string
    let pokemonTypes = pokeApiResults.types.map(type => type.type.name).join(", ");
    console.log("Pokemon Type:", pokemonTypes);
    // console.log("Pokemon Type Datatype:", typeof (pokemonTypes));

    // grab the pokemon abilities. Like the pokemonTypes, can use map and join to return abilities as a string
    let pokemonAbilities = pokeApiResults.abilities.map(abilities => abilities.ability.name).join(", ");
    console.log("Pokemon Abilities:", pokemonAbilities);

    // console.log(pokemonLocation); // I think this is JSON in a URL, not sure what I can do with it yet, or how to use it properly ...
    // let pokemonLocation = pokeApiResults.location_area_encounters;

    /* MODIFYING HTML DOCUMENT, PUTTING API DATA INTO HTML DOCUMENT */
    // create div that all fetched information will go into
    let pokemonDiv = document.createElement('div');
    pokemonDiv.setAttribute('class', 'pokemon-div');
    // create div for the sprites that goes into the pokemonDiv
    let spriteDiv = document.createElement('div');
    spriteDiv.setAttribute('class', 'sprite-div');
    // create div for the hover dropdown content in the pokemonDiv
    let dropdownDiv = document.createElement('div');
    dropdownDiv.setAttribute('class', 'dropdown-div');
    // dropdownDiv pokemonIdNumber and pokemonName
    let pokemonIdNumberNameH2 = document.createElement('h2');
    pokemonIdNumberNameH2.setAttribute('class', 'pokemon-id-number-name-h2');
    pokemonIdNumberNameH2.innerText = `${pokemonIdNumber}: ${pokemonName.toUpperCase()}`;
    // dropdownDiv pokemonTypes
    let pokemonTypesH3 = document.createElement('h3');
    pokemonTypesH3.setAttribute('class', 'pokemon-types-h3');
    pokemonTypesH3.innerText = `Type: ${pokemonTypes}`;
    // dropdownDiv pokemonAbilities
    let pokemonAbilitiesH3 = document.createElement('h3');
    pokemonAbilitiesH3.setAttribute('class', 'pokemon-abilities-h3');
    pokemonAbilitiesH3.innerText = `Abilities: ${pokemonAbilities}`;

    // create img tags for the grabbed pokemon sprites
    let pokemonDocSpriteDefault = document.createElement('img');
    let pokemonDocSpriteShiny = document.createElement('img');
    // assign the src of the created images to the sprite variables
    pokemonDocSpriteDefault.src = pokemonSpriteDefault;
    pokemonDocSpriteShiny.src = pokemonSpriteShiny;
    // append sprites to the spriteDiv
    spriteDiv.appendChild(pokemonDocSpriteDefault);
    spriteDiv.appendChild(pokemonDocSpriteShiny);

    // append pokemonIdNumberNameH2, pokemonTypesH3, pokemonAbilitiesH3 to dropdownDiv
    dropdownDiv.appendChild(pokemonIdNumberNameH2);
    dropdownDiv.appendChild(pokemonTypesH3);
    dropdownDiv.appendChild(pokemonAbilitiesH3);
    // attach the inner spriteDiv and dropdownDiv to pokemonDiv
    pokemonDiv.appendChild(spriteDiv);
    pokemonDiv.appendChild(dropdownDiv);

    // attach pokemonDiv to the first section tag of the document (which already has spriteDiv and dropdownDiv appended)
    document.getElementsByTagName("section")[0].appendChild(pokemonDiv);

    // document.getElementsByTagName("section")[0].appendChild(pokemonDocSpriteDefault);
    // document.getElementsByTagName("section")[0].appendChild(pokemonDocSpriteShiny);

    // assign classes to the sprites so hover windows can work mousing over sprites
    // pokemonDocSpriteDefault.setAttribute('class', "hover-windows");
    // pokemonDocSpriteShiny.setAttribute('class', "hover-windows");
};

// this function returns a random integer between two given values (courtesy MDN)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function clearPokemon() {
    while (document.getElementsByTagName("section")[0].firstChild) {
        document.getElementsByTagName("section")[0].innerHTML = "";
    }
}

/* Animating Styles */

// document.getElementById("randomPokemonButton").addEventListener("click", function () {
//     document.getElementById("randomPokemonButton").style.background = "red";
// })

// document.getElementById("randomPokemonButton").addEventListener("click", animateButton());

// function animateButton() {
//     // document.getElementById("randomPokemonButton").style.backgroundColor = "navy";
//     document.getElementById("randomPokemonButton").setAttribute("class", "animation");
// }