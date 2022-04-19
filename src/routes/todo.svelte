<script>
	// @ts-nocheck

	import { user, isLoggedIn } from '../stores/stores';
	const image = $user.photoURL;
	const displayName = $user.displayName || 'nobody';
	const email = $user.email;

	let todos = [
		{ task: 'Task 1', isComplete: false },
		{ task: 'Task 2', isComplete: false },
		{ task: 'Task 3', isComplete: false },
		{ task: 'Task 4', isComplete: false },
		{ task: 'Task 5', isComplete: false }
	];

	let newItem = '';

	const addItem = () => {
		let todo = {
			task: newItem,
			isComplete: false
		};
		if (newItem !== '') {
			todos = [todo, ...todos];
			newItem = '';
		}
	};

	const keyPressed = (event) => {
		if (event.key === 'Enter') {
			addItem();
		}
	};

	const markCompleted = (index) => {
		todos[index].isComplete = !todos[index].isComplete;
	};

	const deleteTodo = (index) => {
		todos.splice(index, 1);
		todos = todos;
	};

	let placeholder = 'Add a task';
</script>

<h1 class="text-4xl text-center my-8 uppercase">{displayName}'s Todo List</h1>

{#if $isLoggedIn}
	<input type="text" {placeholder} bind:value={newItem} />
	<button class="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-full" on:click={addItem}
		>Add item</button
	>

	<div class="border-2 m-10  p-10">
		<ol>
			{#each todos as td, index}
				<li class="list-decimal text-left" class:complete={td.isComplete}>
					<span
						><button
							class="bg-blue-500 hover:bg-blue-700 text-white m-2 px-2 rounded-full"
							on:click={() => markCompleted(index)}>✔</button
						></span
					>
					<span>{td.task}</span>
					<span
						><button
							class="bg-red-500 hover:bg-red-700 text-white m-2 px-2 rounded-full"
							on:click={() => deleteTodo(index)}>✘</button
						></span
					>
				</li>
			{:else}
				<p>No todos found</p>
			{/each}
		</ol>
	</div>
{/if}
{#if !$isLoggedIn}
	<div class="text-center"><h2>User not logged in</h2></div>
{/if}

<svelte:window on:keypress={keyPressed} />

<style>
	.complete {
		text-decoration: line-through;
		text-decoration-color: rgb(137, 68, 81);
	}
</style>
