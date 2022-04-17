<script>
	// @ts-nocheck

	import { user, isLoggedIn } from '../stores/stores';
	const image = $user.photoURL;
	const displayName = $user.displayName;
	const email = $user.email;
	console.log($user);
</script>

<h1 class="text-4xl text-center my-8 uppercase">Profile</h1>

{#if $isLoggedIn}
	<div class="border-2 m-20 max-w-7xl p-20">
		<img class="mb-10" width="80" height="80" src={image} alt="user" />
		<h2>{displayName}</h2>
		<h2>{email}</h2>
	</div>
{/if}
{#if !$isLoggedIn}
	<div class="text-center"><h2>User not logged in</h2></div>
{/if}
