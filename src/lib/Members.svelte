<script lang="ts">
	import { User, currentUser, members, history } from '$lib/stores';

	const setUser = (user) => {
		$currentUser = user;
	};

	$: memberIndex = $members.reduce(
		(members: Map<string, User>, member: User) => members.set(member.name, member),
		new Map()
	);
	$: previousNames = $history.map(({ user }) => user);
	$: list = [...previousNames.slice(0, 5), ...$members];
	$: {
		console.log('last', previousNames);
	}

	$: {
		console.log($history, memberIndex);
	}
</script>

<ul class="members">
	{#each list as member}
		<li>
			<button on:click={() => setUser(member)}>{member.name}</button>
		</li>
	{/each}
</ul>

<style>
	button {
		width: 100%;
	}

	.members {
		display: grid;
		grid: auto / repeat(1, 1fr);
		grid-gap: 0.5em;

		overflow-y: auto;
	}
	.members > li {
	}
</style>
