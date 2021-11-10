<section class="calculator">
	<button style="grid-area: times">X</button>
	<button style="grid-area: min">-</button>
	<button style="grid-area: plus">+</button>
	<button style="grid-area: clear">clear</button>

	{#each [...Array(10)].map((_, i) => i) as number}
		<button style="grid-area: n{number}">{number}</button>
	{/each}

	<button>Cash</button>
	<button>Register</button>
</section>

<style>
	.calculator {
		grid-area: 'calculator';

		display: grid;
		gap: 0.5em;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-template-areas:
			'n7 n8 n9 times'
			'n4 n5 n6 min'
			'n1 n2 n3 plus'
			'n0 clear clear clear';
	}
</style>
