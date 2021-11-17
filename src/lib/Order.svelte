<script>
	import { order } from '$lib/stores';

	const showPrice = (price) => `€ ${(price / 100).toFixed(2)}`;
</script>

<section class="order">
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
		grid-area: 'main';

		display: grid;
		gap: 0.5em;
		grid-template:
			'items' auto
			'total' 1rem / 1fr;
	}
	.state {
		grid-area: state;

		display: grid;
		grid-template: 'count user';

		padding: 0.5rem 0;
		/* font-size: 1.5rem; */
		align-items: center;
	}
	.state > button {
		grid-area: user;
		padding: 0.1rem;
		height: 100%;
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
