<script lang="ts">
	import ItineraryCard from '$lib/components/ItineraryCard.svelte';

	const itineraryItems = [
		{ time: '9:00 AM', title: 'Coffee + Love Notes', description: 'Cozy start to the day together.' },
		{ time: '1:00 PM', title: 'Picnic Date', description: 'Favorite snacks, blanket, and photos.' },
		{ time: '7:00 PM', title: 'Dinner Reservation', description: 'Dress up and enjoy your night out.' },
		{ time: '9:30 PM', title: 'Movie + Dessert', description: 'Relax and end the day with something sweet.' }
	];
</script>

<section class="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-5 shadow-[var(--shadow-soft)]">
	<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Itinerary</p>
	<h2 class="mt-2 text-2xl font-semibold leading-tight">Our Valentine's Plan</h2>
	<p class="mt-2 text-sm text-[hsl(var(--color-muted))]">
		Stand-in schedule components to shape the homepage layout.
	</p>
</section>

<section class="space-y-3" aria-label="Day itinerary">
	{#each itineraryItems as item (item.time)}
		<ItineraryCard time={item.time} title={item.title} description={item.description} />
	{/each}
</section>
