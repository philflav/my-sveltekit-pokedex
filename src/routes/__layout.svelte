<script>
	import Nav from '../components/nav.svelte';
	import '../styles/global.css';
</script>

<div class="p-8 max-w-6xl mx-auto">
	<Nav />
</div>
<div class="container pt-16 py-28 text-center"><slot /></div>

<footer class="container py-16 text-center">Copyright: Phil Flavin 2022</footer>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
