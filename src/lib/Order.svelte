<script context="module" lang="ts">
	import { order, formatPrice } from '$lib/stores';
</script>

<script>
	$: if ($order && items) {
		console.log(items);
		items.scroll(0, items.scrollTopMax);
	}

	let items;
</script>

<section class="order">
	<ul class="items" bind:this={items}>
		{#each [...$order.values()] as item}
			<li>
				<article>
					{item.amount}x {item.product.name}: <span>{formatPrice(item.product.price)}</span>
				</article>
				<button
					on:click={() => {
						$order.delete(item.product.name);
						$order = $order;
					}}
				>
					X
				</button>
			</li>
		{/each}
	</ul>
</section>

<style>
	.order {
		background: var(--blue);
		color: var(--white);
		grid-area: 'main';

		display: grid;
		gap: 0.5em;
		grid-template:
			'items' auto
			'total' fit-content(5rem);
	}
	.price {
		white-space: nowrap;
	}
	.total {
		grid-area: total;

		display: grid;
		grid-template: 'total submit' fit-content(1rem) / 1fr 1fr;
	}
	.user {
		grid-area: user;
	}
	.items {
		font-size: 0.7rem;
		grid-area: items;
		overflow: auto;
	}
	.items li {
		display: flex;
		align-items: center;
	}
	.items article {
		flex: 1;
	}
	button {
		margin: 0;
		margin-left: 0.5em;
	}
</style>
