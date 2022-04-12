<script>
    import {pokemon} from "../stores/pokestore"
</script>


<svelte:head><title>Sveltkit Pokedex</title></svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">SvelteKit Pokedex</h1>

{#each  $pokemon as pokeman}
<p>{pokeman.name}</p>    
{/each}

<style>
    h1{
        color:rgb(137, 98, 174)
        }    
</style>

