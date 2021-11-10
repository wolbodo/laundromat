<script>
	import { order, products } from '$lib/stores';

	const addProduct = (product) => {
		$order = [...($order ?? []), { amount: 1, product }];
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
	}
	.products > li {
	}
</style>
