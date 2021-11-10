<script context="module">
    import { members, products } from '$lib/stores';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, stuff }) {
        members.set(await fetch('/members.json').then(x => x.json()))
        products.set(await await fetch('/products.json').then(x => x.json()))
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
    <section class='member' class:floating={!!$currentMember}>
        {#if $currentMember}
            <button on:click={() => $currentMember = null}>{$currentMember.name}</button>
        {:else}
            <Members />
        {/if}
    </section>
            
    <section>
        <Products />
    </section>

    <section class='right-panel'>
        {#if $order.length > 0}
            <Order />
        {:else}
            <section>history</section>
        {/if}
    </section>
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

    .right-panel {
        flex: none;
        width: 20%;
    }

    .member {
        background: white;
        transition: transform 1s;
    }
    .member.floating {   
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>