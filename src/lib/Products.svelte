<script lang="ts">
	import { addProduct } from '$lib/stores';
	import ProductItem from './ProductItem.svelte';

	export let products = [];
</script>

<section class="products">
	{#each products as product}
		<section class={product.type || 'normal'}>
			{#if product.label}
				<h2>{product.label}</h2>
			{/if}

			{#if product.price}
				<ProductItem {product} />
			{/if}

			{#if product.items}
				{#each product.items as product}
					<ProductItem {product} on:click={() => product.price && addProduct(product)} />
				{/each}
			{/if}
		</section>
	{/each}
</section>

<style>
	.products {
		display: grid;
		align-content: start;
		grid: auto / repeat(3, 1fr);
		gap: 0.5em;

		outline: var(--outline);
		overflow-y: auto;
	}
	.products > section {
		background-color: var(--blue);
	}
	.products h2 {
		color: var(--white);
		margin: 0.5rem;
	}
	.large {
		grid-column: span 4;

		display: grid;
		grid: 6rem / repeat(4, 1fr);
		grid-gap: 0.5rem;
	}
	.group {
		grid-column: span 4;

		display: grid;
		grid: auto / repeat(4, 1fr);
		grid-gap: 0.5rem;
	}
</style>
