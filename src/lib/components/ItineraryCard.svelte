<script lang="ts">
	let { time, title, description }: { time: string; title: string; description: string } = $props();
</script>

<article class="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 shadow-[var(--shadow-soft)]">
	<p class="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-primary-strong))]">
		{time}
	</p>
	<h3 class="mt-1 text-lg font-semibold">{title}</h3>
	<p class="mt-1 text-sm text-[hsl(var(--color-muted))]">{description}</p>
</article>
