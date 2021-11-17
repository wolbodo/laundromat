<script>
	import { value } from '$lib/Calculator.svelte';
	import { order } from '$lib/stores';

	const showPrice = (price) => `€ ${(price / 100).toFixed(2)}`;
</script>

<section class="order">
	{#if $value > 0}
		<section class="state">
			{$value}
		</section>
	{/if}

	<ul class="items">
		{#each [...$order.values()] as item}
			<li>
				<article>
					{item.amount}x {item.product.name}: <span>{showPrice(item.product.price)}</span>
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

	<section class="total">
		Total: {showPrice(
			[...$order.values()].reduce((sum, item) => sum + item.amount * item.product.price, 0)
		)}
	</section>
</section>

<style>
	.order {
		grid-area: 'history';

		display: grid;
		gap: 0.5em;
		grid-template:
			'state' 3rem
			'items' auto
			'total' 3rem / 1fr;
	}
	.total {
		grid-area: total;
	}
	.user {
		grid-area: user;
	}
	.items {
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
