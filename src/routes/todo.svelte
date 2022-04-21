<script>
	// @ts-nocheck
	import { db } from '../firebase.js';
	import {
		collection,
		onSnapshot,
		doc,
		updateDoc,
		deleteDoc,
		addDoc,
		where,
		query
	} from 'firebase/firestore';

	import { user, isLoggedIn } from '../stores/stores';

	const displayName = $user.displayName || 'nobody';

	const colRef = collection(db, 'todos');
	const q = query(colRef, where('userUID', '==', $user.uid || ''));

	const fbTodos = [];
	let todos = [];

	const _func = onSnapshot(q, (querySnapshot) => {
		let fbTodos = [];
		let bgs = ['bg-green-400', 'bg-orange-400', 'bg-blue-300'];
		querySnapshot.forEach((doc) => {
			let todo = { ...doc.data(), id: doc.id, bg: bgs[doc.data().priority] };
			fbTodos = [todo, ...fbTodos];
		});
		todos = fbTodos.sort((a, b) => a.priority - b.priority);
		console.table(todos);
	});

	let newItem = '';

	const addItem = async (p) => {
		if (newItem !== '') {
			// console.log(priority);
			const docRef = await addDoc(collection(db, 'todos'), {
				task: newItem,
				isComplete: false,
				userUID: $user.uid,
				priority: p || 0
			});
		}
	};

	const keyPressed = (event) => {
		if (event.key === 'Enter') {
			addItem();
		}
	};

	const markCompleted = async (item) => {
		await updateDoc(doc(db, 'todos', item.id), {
			isComplete: !item.isComplete
		});
	};

	const deleteTodo = async (item) => {
		await deleteDoc(doc(db, 'todos', item.id));
	};

	let placeholder = 'Add a task';
</script>

<h1 class="text-4xl text-center my-8 uppercase">{displayName}'s Todo List</h1>

{#if $isLoggedIn}
	<input class="text-base" type="text" {placeholder} bind:value={newItem} />
	<button
		class="bg-green-500 hover:bg-green-700 text-base text-white px-4 rounded-full"
		on:click={() => {
			addItem(0);
		}}>Add as High Priority</button
	>
	<button
		class="bg-orange-500 hover:bg-orange-700 text-base text-white px-4 rounded-full"
		on:click={() => {
			addItem(1);
		}}>Add as Normal Priority</button
	>
	<button
		class="bg-blue-400 hover:bg-blue-700 text-base text-white px-4 rounded-full"
		on:click={() => {
			addItem(2);
		}}>Add as Low Priority</button
	>

	<div class="border-2 m-10  p-10">
		<ol>
			{#each todos as td}
				<li class="list-decimal text-left text-base" class:complete={td.isComplete}>
					<span
						><button
							class="bg-blue-500 hover:bg-blue-700 text-white m-2 px-2 rounded-full"
							on:click={() => markCompleted(td)}>✔</button
						></span
					>
					<span class={td.bg}>{td.task}</span>
					<span
						><button
							class="bg-red-500 hover:bg-red-700 text-white m-2 px-2 rounded-full"
							on:click={() => deleteTodo(td)}>✘</button
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
