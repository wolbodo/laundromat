<script context="module">
	import {
		members,
		products,
		history,
		order,
		calculatorValue,
		currentUser,
		formatPrice,
		totalPrice
	} from '$lib/stores';
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
	import Calculator from '$lib/Calculator.svelte';
</script>

<main>
	<Members />

	<Products products={$products} />

	<section class="state">
		{#if $order.size > 0}
			<Order />
		{:else}
			<section class="history">
				<ul>
					{#each $history as order}
						<li>{order.user?.name}: {order.total}</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section class="total">
			{#if $currentUser}
				<p>{$currentUser?.name}</p>
			{/if}
			{#if $calculatorValue}
				<section class="value">
					{$calculatorValue}x
				</section>
			{/if}
			{#if $order.size}
				<section>
					Total: <span class="price">{formatPrice(totalPrice($order))}</span>
				</section>
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
	main > :global(.products) {
		grid-area: products;
	}
	.state {
		grid-area: right;

		display: grid;
		grid-template:
			'main' auto
			'summary' auto
			'calculator' fit-content(15rem);
	}
	.total {
		background: var(--blue);
		color: var(--white);
	}
	section {
		outline: var(--outline);
	}
	.history {
		grid-area: main;
	}
</style>
