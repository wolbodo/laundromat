<script>
    import { order } from '$lib/stores'
</script>

<section>
    <ul class='order'>
        {#each $order as item}
        <li>
            {item.amount}x {item.product.name}: <span>{(item.product.price/100).toFixed(2)}</span>
            <button on:click={() => { $order = $order.filter(_item => _item !== item)}} >
                X
            </button>
        </li>
        {/each}
    </ul>
</section>