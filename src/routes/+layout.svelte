<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';

	let { children } = $props();

	let isMenuOpen = $state(false);

	const navItems = [
		{ label: 'Home', href: `${base}/` },
		{ label: 'Gallery', href: `${base}/gallery` }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="mx-auto min-h-screen w-full max-w-md px-4 pb-16 pt-5 sm:max-w-2xl sm:px-6">
	<header class="relative mb-8">
		<div class="flex items-center justify-between rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] px-4 py-3 shadow-[var(--shadow-soft)]">
			<div>
				<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Valentine's Day</p>
				<h1 class="text-xl font-semibold leading-tight text-[hsl(var(--color-text))]">Tony + Kaylynn</h1>
			</div>

			<button
				type="button"
				class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[hsl(var(--color-border))] bg-white text-[hsl(var(--color-text))]"
				aria-label="Toggle menu"
				aria-expanded={isMenuOpen}
				aria-controls="mobile-menu"
				onclick={() => (isMenuOpen = !isMenuOpen)}
			>
				<span class="sr-only">Open menu</span>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			</button>
		</div>

		{#if isMenuOpen}
			<div
				id="mobile-menu"
				class="absolute right-0 top-[calc(100%+0.5rem)] z-10 w-44 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-2 shadow-[var(--shadow-soft)]"
			>
				<nav aria-label="Main menu" class="grid gap-1">
					{#each navItems as item (item.href)}
						<a
							href={item.href}
							class="rounded-lg px-3 py-2 text-sm font-medium text-[hsl(var(--color-text))] transition hover:bg-[hsl(var(--color-bg))]"
							onclick={() => (isMenuOpen = false)}
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
		{/if}
	</header>

	<main class="space-y-5">
		{@render children()}
	</main>
</div>
