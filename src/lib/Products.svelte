<script lang="ts">
	import { value } from '$lib/Calculator.svelte';
	import { order, products } from '$lib/stores';

	const addProduct = (product) => {
		const item = $order.get(product.name);

		if (item) {
			item.amount += $value || 1;
		} else {
			$order.set(product.name, { amount: $value || 1, product });
		}
		$order = $order;
		$value = 0;
	};
</script>

<ul class="products">
	{#each $products as product}
		<li>
			<button on:click={() => addProduct(product)}>
				{product.name}: <span>{(product.price / 100).toFixed(2)}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	button {
		width: 100%;
		white-space: nowrap;
	}

	.products {
		display: grid;
		align-content: start;
		grid: auto / repeat(3, 1fr);
		gap: 0.5em;

		outline: var(--outline);
	}
	.products > li {
	}
</style>
