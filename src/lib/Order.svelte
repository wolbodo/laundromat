<script>
	import { order, history } from '$lib/stores';

	const totalPrice = (order) =>
		[...order.values()].reduce((sum, item) => sum + item.amount * item.product.price, 0);
	const showPrice = (price) => `€ ${(price / 100).toFixed(2)}`;

	$: if ($order && items) {
		console.log(items);
		items.scroll(0, items.scrollTopMax);
	}

	const submitOrder = () => {
		$history = [
			...$history,
			{
				user: 'user',
				total: totalPrice($order),
				items: [...$order.values()]
			}
		];
		$order = new Map();
	};

	let items;
</script>

<section class="order">
	<ul class="items" bind:this={items}>
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
		<section>
			Total: <span class="price">{showPrice(totalPrice($order))}</span>
		</section>

		<button on:click={submitOrder}>Pay</button>
	</section>
</section>

<style>
	.order {
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
