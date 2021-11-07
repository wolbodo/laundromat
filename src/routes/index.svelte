<script context="module">
    import { members, products } from '$lib/stores';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, stuff }) {
        members.set(await (await fetch('/members.json')).json())
        products.set(await (await fetch('/products.json')).json())
        return {}
    }
</script>

<script>
    import Members from '$lib/Members.svelte'
    import Products from '$lib/Products.svelte'
    import Order from '$lib/Order.svelte'
    import { order, currentMember } from '$lib/stores'
</script>

<main>
    {#if $currentMember}
        <button class='member'>{$currentMember.name}</button>
    {:else}
        <Members />
    {/if}
    
    <Products />

    {#if $order.length > 0}
        <Order />
    {:else}
        <section>history</section>
    {/if}
</main>


<style>

    main {
        user-select: none;
        display: flex;
        background: pink;
        position: absolute;

        height: 100%;
        width: 100%;
    }
    main > :global(*) {
        flex: 1;
    }
    main > * {
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