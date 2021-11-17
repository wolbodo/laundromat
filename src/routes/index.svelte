<script context="module">
	import { members, products } from '$lib/stores';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, stuff }) {
		members.set(await fetch('/members.json').then((x) => x.json()));
		products.set(await fetch('/products.json').then((x) => x.json()));
		return {};
	}
</script>

<script>
	import Products from '$lib/Products.svelte';
	import Order from '$lib/Order.svelte';
	import { order, currentMember } from '$lib/stores';
	import Calculator from '$lib/Calculator.svelte';
</script>

<main>
	<section class="recent">
		Previous members
		<!-- <Members /> -->
	</section>

	<Products />

	{#if $order.size > 0}
		<Order />
	{:else}
		<section class="history">history</section>
	{/if}

	<Calculator />
</main>

<style>
	main {
		--outline: 1px solid black;

		user-select: none;
		display: grid;
		grid-template:
			'recent products history' minmax(50px, 1fr)
			'.  products calculator' minmax(250px, auto) / 1fr auto minmax(10em, auto);

		gap: 0.5em;
		position: absolute;

		height: 100%;
		width: 100%;
	}
	.recent {
		grid-area: recent;
	}
	main > :global(.products) {
		grid-area: products;
	}
	main > :global(.calculator) {
		grid-area: calculator;
	}
	section {
		outline: var(--outline);
	}
	.history {
		grid-area: history;
	}
	.member {
		transition: transform 1s;
	}
</style>
