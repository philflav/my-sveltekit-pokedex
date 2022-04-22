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

	const docRef = collection(db, 'blist');
	const q = query(docRef, where('userUID', '==', $user.uid || ''));

	let blists = [];

	const _func = onSnapshot(q, (querySnapshot) => {
		let fbblist = [];
		let bgs = ['bg-green-400', 'bg-orange-400', 'bg-blue-300'];
		querySnapshot.forEach((doc) => {
			let blist = { ...doc.data(), id: doc.id, bg: bgs[doc.data().priority] };
			fbblist = [blist, ...fbblist];
		});
		console.table(fbblist);
		blists = fbblist.sort((a, b) => a.priority - b.priority);
	});

	let newItem = '';

	const addItem = async (p) => {
		if (newItem !== '') {
			// console.log(priority);
			const _docRef = await addDoc(collection(db, 'blist'), {
				task: newItem,
				isComplete: false,
				userUID: $user.uid,
				priority: p || 0
			});
			newItem = '';
		}
	};

	const keyPressed = (event) => {
		if (event.key === 'Enter') {
			addItem(0);
		}
	};

	const markCompleted = async (item) => {
		await updateDoc(doc(db, 'blist', item.id), {
			isComplete: !item.isComplete
		});
	};
	const promote = async (item) => {
		await updateDoc(doc(db, 'blist', item.id), {
			priority: Math.max(item.priority - 1, 0)
		});
	};
	const demote = async (item) => {
		await updateDoc(doc(db, 'blist', item.id), {
			priority: Math.min(item.priority + 1, 2)
		});
	};

	const deleteTodo = async (item) => {
		await deleteDoc(doc(db, 'blist', item.id));
	};

	let placeholder = 'Enter bucket list ambition';
</script>

<h1 class="text-2xl text-center my-8 uppercase">{displayName}'s Bucket List</h1>
<div class="container mx-auto">
	{#if $isLoggedIn}
		<input
			class="text-lg6 text-center mx-auto bg-slate-200"
			type="text"
			{placeholder}
			bind:value={newItem}
		/>
		<div class="flex flex-col">
			<button
				class="bg-green-500 hover:bg-green-700 text-base text-white px-4 rounded-full m-3"
				on:click={() => {
					addItem(0);
				}}
			>
				Definitely going to do this &#129322</button
			>
			<button
				class="bg-orange-500 hover:bg-orange-700 text-base text-white px-4 rounded-full m-3"
				on:click={() => {
					addItem(1);
				}}
			>
				Will probably do this &#129320;</button
			>
			<button
				class="bg-blue-400 hover:bg-blue-700 text-base text-white px-4 rounded-full m-3"
				on:click={() => {
					addItem(2);
				}}>Thinking about doing this &#129300;</button
			>
		</div>

		<div class="border-2 m-2  p-2">
			<ol>
				{#each blists as bl}
					<li class="text-left text-base" class:complete={bl.isComplete}>
						<span
							><button
								title="Make more likely"
								class="bg-blue-500 hover:bg-blue-700 text-white m-1 px-1 rounded-full"
								on:click={() => promote(bl)}>&DoubleUpArrow</button
							></span
						>
						<span
							><button
								title="Make less likely"
								class="bg-blue-500 hover:bg-blue-700 text-white m-1 px-1 rounded-full"
								on:click={() => demote(bl)}>&DoubleDownArrow</button
							></span
						>
						<span
							><button
								title="Mark item as completed"
								class="bg-blue-500 hover:bg-blue-700 text-white m-1 px-1 rounded-full"
								on:click={() => markCompleted(bl)}>✔</button
							></span
						>

						<span
							><button
								title="Delete item"
								class="bg-red-500 hover:bg-red-700 text-white m-1 px-1 rounded-full"
								on:click={() => deleteTodo(bl)}>&#128465</button
							></span
						>
						<span class={bl.bg}>{bl.task}</span>
					</li>
				{:else}
					<p>No bucketlist items found</p>
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
