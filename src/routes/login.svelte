<script>
	import { auth, googleProvider } from '../firebase.js';
	import { signInWithPopup } from 'firebase/auth';

	import { user, isLoggedIn } from '../stores/stores';

	import { goto } from '$app/navigation';

	const login = async () => {
		try {
			const res = await signInWithPopup(auth, googleProvider);
			$user = res.user;
			$isLoggedIn = true;
		} catch (err) {
			console.error(err);
		}
	};
	const logout = async () => {
		try {
			await auth.signOut();
			$user = {};
			$isLoggedIn = false;
			goto('/profile');
		} catch (err) {
			console.error(err);
		}
	};
</script>

{#if !$isLoggedIn}
	<h1 class="text-4xl text-center my-8 uppercase">Login</h1>
	<div class="text-center ">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			on:click={login}>Login with Google</button
		>
	</div>
{/if}
{#if $isLoggedIn}
	<h1 class="text-4xl text-center my-8 uppercase">Logout</h1>
	<div class="text-center ">
		<button
			class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
			on:click={logout}>LogOut</button
		>
	</div>
{/if}
