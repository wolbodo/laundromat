<script>
    import { order } from '$lib/stores'

    const showPrice = price => `€ ${(price/100).toFixed(2)}`
</script>

<section class='user'>

</section>

<ul class='items'>
    {#each $order as item}
    <li>
        <article>
            {item.amount}x {item.product.name}: <span>{showPrice(item.product.price)}</span>
        </article>
        <button on:click={() => { $order = $order.filter(_item => _item !== item)}} >
            X
        </button>
    </li>
    {/each}
</ul>

<section class='total'>Total: {showPrice($order.reduce((sum, item) => sum + (item.amount * item.product.price), 0))}</section>

<style>
    li {
        display: flex;
        align-items: center;
    }
    article {
        flex: 1;
    }
    button {
        margin: 0;
        margin-left: .5em;
    }
</style>