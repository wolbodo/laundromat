<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	export const value = writable<number>(0);
</script>

<section class="calculator">
	<button style="grid-area: times">X</button>
	<button style="grid-area: min">-</button>
	<button style="grid-area: plus">+</button>
	<button style="grid-area: clear" on:click={() => ($value = 0)}>clear</button>
	<button style="grid-area: punt">.</button>

	{#each [...Array(10)].map((_, i) => i) as number}
		<button style="grid-area: n{number}" on:click={() => ($value = parseInt(`${$value}${number}`))}
			>{number}</button
		>
	{/each}

	<!-- <button style="grid-area: cash">Cash</button> -->
	<!-- <button style="grid-area: viltjes">Viltjes</button> -->
</section>

<style>
	.calculator {
		width: 100%;
		height: 100%;
		outline: var(--outline);

		display: grid;
		gap: 0.5em;
		grid-template:
			'n7 n8 n9 times' 1fr
			'n4 n5 n6 min' 1fr
			'n1 n2 n3 plus' 1fr
			'n0 punt clear clear' 1fr / 1fr 1fr 1fr 1fr;
		/* 'cash cash viltjes viltjes' 3rem / 3rem 3rem 3rem 3rem; */
	}
</style>
