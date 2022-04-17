<script>
	import { auth, googleProvider } from '../firebase.js';
	import { signInWithPopup } from 'firebase/auth';

	const login = async () => {
		try {
			const res = await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<div>
	<h1 class="text-4xl text-center my-8 uppercase">Login</h1>
	<div class="text-center ">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			on:click={login}>Login with Google</button
		>
	</div>
</div>
