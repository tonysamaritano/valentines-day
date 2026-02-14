<script lang="ts">
	import { base } from '$app/paths';

	const imageCount = 34;
	const imageIds = Array.from({ length: imageCount }, (_, index) => index);
</script>

<section class="gallery-shell" aria-label="Photo gallery">
	<div class="gallery-note-wrap">
		<div class="gallery-note">
            <p class="gallery-note-kicker">Dear Kaylynn</p>
            <h2>It doesn’t matter where we are or what we’re doing — every moment with you is the best moment of my life.</h2>
            <p>
            Thank you for being my favorite person in every moment. I’m grateful for you every day.
            </p>
            <p>With all my love,</p>
            <p>Tony</p>
		</div>
	</div>

	<div class="gallery-columns">
		{#each imageIds as id (id)}
			<figure class="gallery-item">
				<img
					src={`${base}/${id}.webp`}
					alt={`Valentine's Day photo ${id + 1}`}
					loading="lazy"
					decoding="async"
					width="512"
				/>
			</figure>
		{/each}
	</div>
</section>

<style>
	.gallery-shell {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}

	.gallery-columns {
		column-count: 2;
		column-gap: 0;
		margin: 0 auto;
		max-width: 64rem;
	}

	.gallery-note-wrap {
		padding: 0.75rem 0.75rem 0.9rem;
	}

	.gallery-note {
		margin: 0 auto;
		max-width: 64rem;
		border: 1px solid hsl(var(--color-border));
		background: hsl(var(--color-surface));
		box-shadow: var(--shadow-soft);
		border-radius: 1rem;
		padding: 1rem;
	}

	.gallery-note-kicker {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: hsl(var(--color-primary-strong));
	}

	.gallery-note h2 {
		margin: 0.35rem 0 0;
		font-size: 1.2rem;
		line-height: 1.3;
	}

	.gallery-note p {
		margin: 0.5rem 0 0;
		font-size: 0.95rem;
		color: hsl(var(--color-muted));
	}

	.gallery-item {
		break-inside: avoid;
		margin: 0;
	}

	.gallery-item img {
		display: block;
		width: 100%;
		height: auto;
	}

	@media (min-width: 768px) {
		.gallery-note-wrap {
			padding: 1rem 1rem 1.1rem;
		}

		.gallery-columns {
			column-count: 3;
		}
	}

	@media (min-width: 1024px) {
		.gallery-columns {
			column-count: 4;
		}
	}
</style>
