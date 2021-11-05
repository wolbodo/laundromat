<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, stuff }) {
        return {
            props: {
                members: await (await fetch('/members.json')).json(),
                products: await (await fetch('/products.json')).json(),
            }
        }
    }
</script>

<script>
    import Order from '$lib/Order.svelte'

    export let members = []
    export let products = []

    let currentMember
    let order = []

    const addProduct = product => {
        order = [...(order ?? []), { amount: 1, product }]
    }

</script>

<main>
    {#if currentMember}
        <button class='member'>{currentMember.name}</button>
    {:else}
        <section>
            <ul class='members'>
                {#each members as member}
                <li>
                    <button on:click={() => currentMember = member}>{member.name}</button>
                </li>
                {/each}
            </ul>
        </section>
    {/if}
    
    <section>
        <ul class='products'>
            {#each products as product}
            <li>
                <button on:click={() => addProduct(product)}>
                    {product.name}: <span>{(product.price/100).toFixed(2)}</span>
                </button>
            </li>
            {/each}
        </ul>
    </section>

    {#if order}
        <Order bind:order />
    {:else}
        <section>history</section>
    {/if}
</main>


<style>

    main {
        display: flex;
        background: pink;
        position: absolute;

        height: 100%;
        width: 100%;
    }
    main > * {
        flex: 1;
    }
    section {
        padding: .5em;
    }

    .member {
        position: absolute;
        bottom: 0;
        left: 0;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li > button {
        display: block;
        width: 100%;
        padding: 1em;
        margin-bottom: 1em;

        border: none;
        border-radius: none;
    }
</style>