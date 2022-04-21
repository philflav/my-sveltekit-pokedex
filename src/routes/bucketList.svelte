<script>
	// @ts-nocheck

	import { user, isLoggedIn } from '../stores/stores';
	const image = $user.photoURL;
	const displayName = $user.displayName;
	const email = $user.email;
</script>

<h1 class="text-4xl text-center my-8 uppercase">{displayName}'s Bucket List</h1>

{#if $isLoggedIn}
	<div class="border-2 m-20 max-w-7xl p-20">
		<img class="mb-10" width="80" height="80" src={image} alt="user" />

		<h2>Coming soon - watch this space!</h2>
	</div>
{/if}
{#if !$isLoggedIn}
	<div class="text-center"><h2>User not logged in</h2></div>
{/if}
