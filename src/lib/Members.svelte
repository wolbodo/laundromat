<script>
    import { currentMember, members } from '$lib/stores'
</script>

<ul class='members'>
    {#each $members as member}
    <li>
        <button on:click={() => $currentMember = member}>{member.name}</button>
    </li>
    {/each}
</ul>

<style>
    button {
        width: 100%;
    }

    .members {
        display: grid;
        grid: auto / repeat(2, 1fr);
        grid-gap: .5em;
    }
    .members > li {
    }
</style>