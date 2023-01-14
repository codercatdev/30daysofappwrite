<script>
	/** @type {import('$lib/types/index').User[]} */
	export let authors;
</script>

<ul class="grid-box">
	{#each authors as author}
		<li class="card">
			<div class="flex">
				{#if author?.profile_image}
					<img
						class="avatar"
						width="60"
						height="60"
						src={author?.profile_image}
						alt={`Photo of ${author?.name}`}
					/>
				{/if}
				<div class="flex flex-col">
					{#if author?.name}
						<p class="font-bold">{author.name}</p>
					{/if}
					<div class="flex">
						{#if author?.github_username}
							<a
								href={`https://github.com/${author.github_username}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span class="icon-github social" />
							</a>
						{/if}
						{#if author?.twitter_username}
							<a
								href={`https://twitter.com/${author.github_username}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span class="icon-twitter social" />
							</a>
						{/if}
						{#if author?.website_url}
							<a href={`${author.website_url}`} target="_blank" rel="noopener noreferrer">
								<span class="icon-globe-alt social" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style>
	.social {
		font-size: var(--icon-size-large);
	}
</style>
