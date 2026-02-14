<script lang="ts">
	import ActivityCountdown from '$lib/components/ActivityCountdown.svelte';
	import ItineraryCard from '$lib/components/ItineraryCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<ActivityCountdown items={data.itineraryItems} />

<section class="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-5 shadow-[var(--shadow-soft)]">
	<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Itinerary</p>
	<h2 class="mt-2 text-2xl font-semibold leading-tight">Our Valentine's Plan</h2>
	<p class="mt-2 text-sm text-[hsl(var(--color-muted))]">
		Stand-in schedule components to shape the homepage layout.
	</p>
</section>

<section class="space-y-3" aria-label="Day itinerary">
	{#each data.itineraryItems as item (item.time)}
		<ItineraryCard time={item.time} title={item.title} description={item.description} />
	{/each}
</section>
