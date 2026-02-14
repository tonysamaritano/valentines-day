<script lang="ts">
	import { base } from '$app/paths';
	import ActivityCountdown from '$lib/components/ActivityCountdown.svelte';
	import ItineraryCard from '$lib/components/ItineraryCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let isAlertDismissed = $state(false);

	const pageTitle = 'Happy Valentines Day Kaylynn';
	const pageDescription = "Valentine's Day itinerary with our plans, schedule, and countdown for the day.";
	const pageImage = `${base}/5.webp`;

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	const formatDateLabel = (value: string | null): string => {
		if (!value) return 'the original date';
		const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (!match) return value;

		const year = Number(match[1]);
		const month = Number(match[2]);
		const day = Number(match[3]);
		const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
		return dateFormatter.format(date);
	};

	const postponementMessage = $derived.by(() => {
		const eventDate = formatDateLabel(data.siteConfig.eventDate);
		return `ALERT: Postponed to ${eventDate} due to emergency`;
	});
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

{#if data.siteConfig.showPostponementAlert && !isAlertDismissed}
	<section
		class="mb-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-warning))] p-4 shadow-[var(--shadow-soft)]"
		role="status"
		aria-live="polite"
	>
		<div class="flex items-center justify-between gap-3">
			<p class="text-sm font-bold text-red-800">{postponementMessage}</p>
			<button
				type="button"
				class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--color-warning))] text-[hsl(var(--color-muted))]"
				aria-label="Dismiss postponement alert"
				onclick={() => (isAlertDismissed = true)}
			>
				<span aria-hidden="true">X</span>
			</button>
		</div>
	</section>
{/if}

<ActivityCountdown items={data.itineraryItems} eventDate={data.siteConfig.eventDate} />

<section class="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-5 shadow-[var(--shadow-soft)]">
	<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Itinerary</p>
	<h2 class="mt-2 text-2xl font-semibold leading-tight">Our Valentine's Plan</h2>
	<p class="mt-2 text-sm text-[hsl(var(--color-muted))]">
		Plans change, and that's okay. I'm always here for you ❤️ Here's the plan for our delayed Valentine's Day.
	</p>
</section>

<section class="space-y-3" aria-label="Day itinerary">
	{#each data.itineraryItems as item (item.time)}
		<ItineraryCard time={item.time} title={item.title} description={item.description} />
	{/each}
</section>
