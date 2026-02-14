<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { ItineraryItem } from '$lib/config/parseItineraryYaml';

	let { items }: { items: ItineraryItem[] } = $props();

	const ctYearFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		year: 'numeric'
	});

type CountdownItem = ItineraryItem & {
	targetMs: number;
	timeRemaining: string;
	isPast: boolean;
};

	let nowMs = $state(Date.now());
	let tickTimer: ReturnType<typeof setInterval> | null = null;

	const parseClockTime = (value: string): { hour: number; minute: number } | null => {
		const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
		if (!match) return null;

		const hour12 = Number(match[1]);
		const minute = Number(match[2]);
		const period = match[3].toUpperCase();
		if (hour12 < 1 || hour12 > 12 || minute > 59) return null;

		const hour24 = (hour12 % 12) + (period === 'PM' ? 12 : 0);
		return { hour: hour24, minute };
	};

	const toEventUtcMs = (year: number, hour24: number, minute: number): number => {
		// Feb 14 in CT is always CST (UTC-06:00), so convert directly to UTC.
		return Date.UTC(year, 1, 14, hour24 + 6, minute, 0, 0);
	};

	const formatRemaining = (deltaMs: number): string => {
		if (deltaMs <= 0) return 'Started';

		const totalSeconds = Math.floor(deltaMs / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		if (days > 0) return `${days}d ${hours}h ${minutes}m`;
		return `${hours}h ${minutes}m ${seconds}s`;
	};

	const resolvedYear = $derived.by(() => {
		const baseYear = Number(ctYearFormatter.format(new Date(nowMs)));

		const hasFutureInBaseYear = items.some((item) => {
			const parsed = parseClockTime(item.time);
			if (!parsed) return false;
			return toEventUtcMs(baseYear, parsed.hour, parsed.minute) > nowMs;
		});

		return hasFutureInBaseYear ? baseYear : baseYear + 1;
	});

const countdownItems = $derived.by<CountdownItem[]>(() => {
		return items
			.map((item) => {
				const parsed = parseClockTime(item.time);
				if (!parsed) return null;

				const targetMs = toEventUtcMs(resolvedYear, parsed.hour, parsed.minute);
				const deltaMs = targetMs - nowMs;

				return {
					...item,
					targetMs,
					timeRemaining: formatRemaining(deltaMs),
					isPast: deltaMs <= 0
				};
			})
			.filter((item): item is CountdownItem => item !== null)
			.sort((a, b) => a.targetMs - b.targetMs);
	});

	const nextUpcoming = $derived.by<CountdownItem | null>(() => {
		return countdownItems.find((item) => !item.isPast) ?? null;
	});

	tickTimer = setInterval(() => {
		nowMs = Date.now();
	}, 1000);

	onDestroy(() => {
		if (tickTimer) clearInterval(tickTimer);
	});
</script>

<section class="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 shadow-[var(--shadow-soft)]">
	<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Countdown (CT)</p>
	<h2 class="mt-1 text-lg font-semibold">February 14, {resolvedYear}</h2>

	<div class="mt-3">
		{#if nextUpcoming}
			<div class="flex items-center justify-between rounded-xl border border-[hsl(var(--color-border))] px-3 py-2">
				<div class="min-w-0">
					<p class="truncate text-sm font-semibold">{nextUpcoming.title}</p>
					<p class="text-xs text-[hsl(var(--color-muted))]">{nextUpcoming.time} CT</p>
				</div>
				<p class="pl-3 text-sm font-semibold text-[hsl(var(--color-primary-strong))]">
					{nextUpcoming.timeRemaining}
				</p>
			</div>
		{:else}
			<p class="rounded-xl border border-[hsl(var(--color-border))] px-3 py-2 text-sm text-[hsl(var(--color-muted))]">
				All activities have started for this year.
			</p>
		{/if}
	</div>
</section>
