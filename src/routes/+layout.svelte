<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen">
	<SiteHeader />

	<main class="mx-auto w-full max-w-2xl space-y-5 px-4 pb-16 pt-6 sm:px-6">
		{@render children()}
	</main>
</div>
