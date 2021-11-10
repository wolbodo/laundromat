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
	import Members from '$lib/Members.svelte';
	import Products from '$lib/Products.svelte';
	import Order from '$lib/Order.svelte';
	import { order, currentMember } from '$lib/stores';
	import Calculator from '$lib/Calculator.svelte';
</script>

<main>
	<section class="previous-members">
		Previous members
		<!-- <Members /> -->
	</section>

	<Products />

	<section class="history">
		{#if $order.length > 0}
			<Order />
		{:else}
			<section>history</section>
		{/if}
	</section>

	<Calculator />
</main>

<style>
	main {
		user-select: none;
		display: grid;
		grid-template:
			'recent products history' minmax(50px, 1fr)
			'.  products calculator' minmax(50px, 1fr) / minmax(1fr, 100px) 2fr minmax(1fr, 100px);

		gap: 0.5em;
		position: absolute;

		height: 100%;
		width: 100%;
	}
	main > :global(.products) {
		grid-area: products;
	}
	main > :global(.calculator) {
		grid-area: calculator;
	}
	.member {
		transition: transform 1s;
	}
</style>
