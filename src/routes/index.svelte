<script>
    import {pokemon} from "../stores/pokestore"
    import PokemanCard from "../components/pokemanCard.svelte"

    let searchTerm="";
    let filteredPokemon =[];

    $: {
        if(searchTerm){
            filteredPokemon = $pokemon.filter(pokeman => pokeman.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

        }else{
            filteredPokemon =[...$pokemon]
        }
    }
</script>


<svelte:head><title>Sveltkit Pokedex</title></svelte:head>

<input class= "w-full rounded-md text-lg p-4 border-2  border-gray-200" type="text" bind:value={searchTerm} placeholder="Search Pokemon">

<h1 class="text-4xl text-center my-8 uppercase">SvelteKit Pokedex</h1>
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    {#each  filteredPokemon as pokeman}
    <PokemanCard pokeman={pokeman}/> 
{/each}
</div>


<style>
    h1{
        color:rgb(137, 98, 174)
        }    
</style>

