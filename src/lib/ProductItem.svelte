<script lang="ts">
	import { formatPrice } from '$lib/stores';

	export let product;
	export let group: boolean = false;
</script>

<button on:click class:group>
	<span class="title">{product.name}</span>
	{#if product.price}
		<span class="price">{formatPrice(product.price)}</span>
	{/if}
</button>

<style>
	button {
		position: relative;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0.5rem;
		padding-bottom: 1rem;
		text-align: left;
	}

	.price {
		position: absolute;
		bottom: 0.2rem;
		right: 0.2rem;
		font-size: 0.6rem;
	}

	.group {
		background: var(--green);
		grid-column-start: 1;
	}
</style>
