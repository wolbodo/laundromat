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
	import Calculator from '$lib/Calculator.svelte';
	import { order, calculatorValue } from '$lib/stores';
</script>

<main>
	<section class="recent">
		Previous members
		<!-- <Members /> -->
	</section>

	<Products />

	<section class="state">
		<section class="user">
			<button>Pick user</button>
		</section>

		{#if $order.size > 0}
			<Order />
		{:else}
			<section class="history">history</section>
		{/if}

		<section class="value">
			{#if $calculatorValue > 0}
				{$calculatorValue}x
			{/if}
		</section>

		<Calculator />
	</section>
</main>

<style>
	main {
		--outline: none;

		user-select: none;
		display: grid;
		grid-template: 'recent products right' minmax(250px, auto) / minmax(10em, auto) auto minmax(
				10em,
				auto
			);

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
	.state {
		grid-area: right;

		display: grid;
		grid-template:
			'user' fit-content(100px)
			'main' auto
			'value' 1rem
			'calculator' fit-content(15rem);
	}
	section {
		outline: var(--outline);
	}
	.history {
		grid-area: main;
	}
	.member {
		transition: transform 1s;
	}
</style>
