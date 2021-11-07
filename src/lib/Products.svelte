<script>
    import { order, products } from '$lib/stores'

    const addProduct = product => {
        $order = [...($order ?? []), { amount: 1, product }]
    }

</script>

<ul class='products'>
    {#each $products as product}
    <li>
        <button on:click={() => addProduct(product)}>
            {product.name}: <span>{(product.price/100).toFixed(2)}</span>
        </button>
    </li>
    {/each}
</ul>