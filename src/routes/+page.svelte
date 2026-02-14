<script lang="ts">
	import { base } from '$app/paths';
	import ActivityCountdown from '$lib/components/ActivityCountdown.svelte';
	import ItineraryCard from '$lib/components/ItineraryCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const pageTitle = 'happy valentines day kaylynn';
	const pageDescription = "Valentine's Day itinerary with our plans, schedule, and countdown for the day.";
	const pageImage = `${base}/0.webp`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={pageImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
</svelte:head>

<ActivityCountdown items={data.itineraryItems} />

<section class="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-5 shadow-[var(--shadow-soft)]">
	<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Itinerary</p>
	<h2 class="mt-2 text-2xl font-semibold leading-tight">Our Valentine's Plan</h2>
	<p class="mt-2 text-sm text-[hsl(var(--color-muted))]">
		I wish it wasn't going to be rainy, but no matter what the weather is like, I know we'll have a wonderful day together. Here's the plan for our Valentine's Day.
	</p>
</section>

<section class="space-y-3" aria-label="Day itinerary">
	{#each data.itineraryItems as item (item.time)}
		<ItineraryCard time={item.time} title={item.title} description={item.description} />
	{/each}
</section>
