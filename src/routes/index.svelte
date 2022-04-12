<script>
    import {pokemon} from "../stores/pokestore"
</script>

<h1>SvelteKit Pokedex</h1>

<svelte:head><title>Sveltkit Pokedex</title></svelte:head>

{#each  $pokemon as pokeman}
<p>{pokeman.name}</p>    
{/each}

<style>
    h1{
        color:rgb(137, 98, 174)
        }    
</style>

