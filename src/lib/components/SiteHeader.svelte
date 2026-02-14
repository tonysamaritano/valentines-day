<script lang="ts">
	import { base } from '$app/paths';
	import { slide } from 'svelte/transition';

	let isMenuOpen = $state(false);

	const navItems = [
		{ label: 'Home', href: `${base}/` },
		{ label: 'Gallery', href: `${base}/gallery` }
	];
</script>

<header class="sticky top-0 z-40 w-full border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))/0.92] backdrop-blur">
	<div class="relative mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
		<div>
			<p class="text-xs uppercase tracking-[0.2em] text-[hsl(var(--color-muted))]">Valentine's Day</p>
			<h1 class="text-xl font-semibold leading-tight text-[hsl(var(--color-text))]">Tony + Kaylynn</h1>
		</div>

		<button
			type="button"
			class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[hsl(var(--color-border))] bg-white text-[hsl(var(--color-text))]"
			aria-label="Toggle menu"
			aria-expanded={isMenuOpen}
			aria-controls="header-drawer"
			onclick={() => (isMenuOpen = !isMenuOpen)}
		>
			<span class="sr-only">Open menu</span>
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M4 7h16M4 12h16M4 17h16" />
			</svg>
		</button>

		{#if isMenuOpen}
			<div
				id="header-drawer"
				class="absolute inset-x-0 top-full z-50 px-4 pb-3 sm:px-6"
				transition:slide={{ duration: 220, axis: 'y' }}
			>
				<nav
					aria-label="Main menu"
					class="grid gap-1 rounded-b-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-2 shadow-[var(--shadow-soft)]"
				>
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
	</div>
</header>
