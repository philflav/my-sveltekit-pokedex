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

	const colRef = collection(db, 'shopping');
	const q = query(colRef, where('userUID', '==', $user.uid || ''));

	const fbshopping = [];
	let shopping = [];

	const _func = onSnapshot(q, (querySnapshot) => {
		let fbshopping = [];
		let bgs = ['bg-green-400', 'bg-orange-400', 'bg-blue-300'];
		querySnapshot.forEach((doc) => {
			let todo = { ...doc.data(), id: doc.id, bg: bgs[doc.data().shop] };
			fbshopping = [todo, ...fbshopping];
		});
		shopping = fbshopping.sort((a, b) => a.shop - b.shop);
		console.table(shopping);
	});

	let newItem = '';

	const addItem = async (shop) => {
		if (newItem !== '') {
			// console.log(priority);
			const docRef = await addDoc(collection(db, 'shopping'), {
				task: newItem,
				isComplete: false,
				userUID: $user.uid,
				shop: shop || 0
			});
			newItem = '';
		}
	};

	const keyPressed = (event) => {
		if (event.key === 'Enter') {
			addItem();
		}
	};

	const markCompleted = async (item) => {
		await updateDoc(doc(db, 'shopping', item.id), {
			isComplete: !item.isComplete
		});
	};

	const deleteTodo = async (item) => {
		await deleteDoc(doc(db, 'shopping', item.id));
	};

	let placeholder = 'Add a shopping item';
</script>

<h1 class="text-4xl text-center my-8 uppercase">{displayName}'s Shopping List</h1>
<div class="container mx-auto">
	{#if $isLoggedIn}
		<input class="text-lg6 text-center mx-auto" type="text" {placeholder} bind:value={newItem} />
		<div class="flex flex-col">
			<button
				class="bg-green-500 hover:bg-green-700 text-base text-white px-4 rounded-full m-3"
				on:click={() => {
					addItem(0);
				}}
			>
				Shop 1</button
			>
			<button
				class="bg-orange-500 hover:bg-orange-700 text-base text-white px-4 rounded-full m-3"
				on:click={() => {
					addItem(1);
				}}
			>
				Shop 2</button
			>
			<button
				class="bg-blue-400 hover:bg-blue-700 text-base text-white px-4 rounded-full m-3"
				on:click={() => {
					addItem(2);
				}}>Shop 3</button
			>
		</div>

		<div class="border-2 m-10  p-5">
			<ol>
				{#each shopping as td}
					<li class="list-decimal text-left text-base" class:complete={td.isComplete}>
						<span
							><button
								title="Mark task as bought"
								class="bg-blue-500 hover:bg-blue-700 text-white m-2 px-1 rounded-full"
								on:click={() => markCompleted(td)}>✔</button
							></span
						>
						<span class={td.bg}>{td.task}</span>
						<span
							><button
								title="Delete item"
								class="bg-red-500 hover:bg-red-700 text-white m-2 px-1 rounded-full"
								on:click={() => deleteTodo(td)}>✘</button
							></span
						>
					</li>
				{:else}
					<p>No shopping found</p>
				{/each}
			</ol>
		</div>
	{/if}
	{#if !$isLoggedIn}
		<div class="text-center"><h2>User not logged in</h2></div>
	{/if}
</div>

<svelte:window on:keypress={keyPressed} />

<style>
	.complete {
		text-decoration: line-through;
		text-decoration-color: rgb(137, 68, 81);
	}
</style>
