<script>
	let title = 'Ninja Gaming Guides';

	const updateTitle = () => {
		if (title.includes('A different')) {
			title = 'Ninja Gaming Guides';
		} else {
			title = 'A different title';
		}
	};
</script>

<div>
	<h2 class="text-4xl text-center my-8 uppercase">{title}</h2>
	<p class="flex space-x-2 flex-wrap">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae a ab illo impedit, cum nesciunt
		repellat. Fugit ipsam beatae obcaecati velit officiis amet officia ut reprehenderit, culpa, cum
		veritatis libero.
	</p>

	<div class="flex space-x-2 justify-center ">
		<button
			type="button"
			class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
			 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500
			  dark:hover:bg-purple-700 dark:focus:ring-purple-600"
			on:click={updateTitle}>Toggle title</button
		>
		<input type="text" bind:value={title} />
	</div>
</div>
