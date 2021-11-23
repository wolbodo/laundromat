<script lang="ts">
	import { calculatorValue, currentUser, order, submitOrder } from '$lib/stores';

	const clear = () => ($calculatorValue = 0);
</script>

<section class="calculator">
	<!-- <button style="grid-area: times">X</button> -->
	<!-- <button style="grid-area: min">-</button> -->
	<!-- <button style="grid-area: plus">+</button> -->
	<button class="material-icons" style="grid-area: clear" on:click={clear}>backspace</button>
	<button
		class="submit"
		disabled={!($currentUser && $order.size)}
		style="grid-area: submit"
		on:click={submitOrder}>Submit</button
	>
	<button
		style="grid-area: punt"
		on:click={() => ($calculatorValue = parseInt(`${$calculatorValue}.`))}>.</button
	>

	{#each [...Array(10)].map((_, i) => i) as number}
		<button
			style="grid-area: n{number}"
			on:click={() => ($calculatorValue = parseInt(`${$calculatorValue}${number}`))}
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
			'n7 n8 n9 clear' 1fr
			'n4 n5 n6 min' 1fr
			'n1 n2 n3 plus' 1fr
			'n0 punt submit submit' 1fr / 1fr 1fr 1fr 1fr;
		/* 'cash cash viltjes viltjes' 3rem / 3rem 3rem 3rem 3rem; */
	}
	.submit {
		background: rgb(11, 83, 11);
	}
	.submit:disabled {
		background: rgb(2, 17, 2);
	}
</style>
