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
</style>