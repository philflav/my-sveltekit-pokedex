<script>
	// @ts-nocheck

	import { user, isLoggedIn } from '../stores/stores';
	const image = $user.photoURL;
	const displayName = $user.displayName || 'nobody';
	const email = $user.email;

	let todos = [
		{ task: 'Task 1', isComplete: false },
		{ task: 'Task 2', isComplete: false },
		{ task: 'Task 3', isComplete: true },
		{ task: 'Task 4', isComplete: false },
		{ task: 'Task 5', isComplete: true }
	];

	let newItem = '';

	const addItem = () => {
		let todo = {
			task: newItem,
			isComplete: false
		};
		todos = [todo, ...todos];
		console.table(todos);
	};

	let placeholder = 'Add a task';
</script>

<h1 class="text-4xl text-center my-8 uppercase">{displayName}'s Todo List</h1>

{#if $isLoggedIn}
	<input type="text" {placeholder} bind:value={newItem} />
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
		on:click={addItem}>Add item</button
	>

	<div class="border-2 m-10  p-10">
		<ol>
			{#each todos as td}
				<li class="list-decimal text-left" class:complete={td.isComplete}>{td.task}</li>
			{/each}
		</ol>
	</div>
{/if}
{#if !$isLoggedIn}
	<div class="text-center"><h2>User not logged in</h2></div>
{/if}

<style>
	.complete {
		text-decoration: line-through;
		text-decoration-color: rgb(137, 68, 81);
	}
</style>
