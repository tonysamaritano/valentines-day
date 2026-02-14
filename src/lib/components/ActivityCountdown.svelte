<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { ItineraryItem } from '$lib/config/parseItineraryYaml';

	let { items, eventDate }: { items: ItineraryItem[]; eventDate: string } = $props();

	type CountdownItem = ItineraryItem & {
		targetMs: number;
		timeRemaining: string;
		isPast: boolean;
	};

	type DateParts = {
		year: number;
		month: number;
		day: number;
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

	const parseEventDate = (value: string): DateParts | null => {
		const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (!match) return null;

		const year = Number(match[1]);
		const month = Number(match[2]);
		const day = Number(match[3]);

		if (month < 1 || month > 12 || day < 1 || day > 31) return null;
		return { year, month, day };
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

	const ctFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	const ctDateFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	const getCtParts = (timestamp: number) => {
		const parts = ctFormatter.formatToParts(new Date(timestamp));
		return {
			year: Number(parts.find((part) => part.type === 'year')?.value ?? 0),
			month: Number(parts.find((part) => part.type === 'month')?.value ?? 0),
			day: Number(parts.find((part) => part.type === 'day')?.value ?? 0),
			hour: Number(parts.find((part) => part.type === 'hour')?.value ?? 0),
			minute: Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
		};
	};

	const ctLocalToUtcMs = (dateParts: DateParts, hour24: number, minute: number): number => {
		const targetAsUtc = Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, hour24, minute, 0, 0);
		let guess = targetAsUtc;

		for (let i = 0; i < 5; i += 1) {
			const observed = getCtParts(guess);
			const observedAsUtc = Date.UTC(
				observed.year,
				observed.month - 1,
				observed.day,
				observed.hour,
				observed.minute,
				0,
				0
			);
			const diff = targetAsUtc - observedAsUtc;
			if (diff === 0) break;
			guess += diff;
		}

		return guess;
	};

	const parsedEventDate = $derived.by(() => parseEventDate(eventDate));

	const eventDateLabel = $derived.by(() => {
		if (!parsedEventDate) return 'Invalid date';

		const middayUtc = Date.UTC(parsedEventDate.year, parsedEventDate.month - 1, parsedEventDate.day, 12, 0, 0, 0);
		return ctDateFormatter.format(new Date(middayUtc));
	});

	const countdownItems = $derived.by<CountdownItem[]>(() => {
		if (!parsedEventDate) return [];
		return items
			.map((item) => {
				const parsed = parseClockTime(item.time);
				if (!parsed) return null;

				const targetMs = ctLocalToUtcMs(parsedEventDate, parsed.hour, parsed.minute);
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
	<h2 class="mt-1 text-lg font-semibold">{eventDateLabel}</h2>

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
