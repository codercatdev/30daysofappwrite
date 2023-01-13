<script>
	import 'prism-themes/themes/prism-shades-of-purple.min.css';

	/** @type {import('./$types').PageData} */
	export let data;
	const { post, prev, next } = data;
</script>

{#if !post}
	How did you get here?
{:else}
	<section class="flex justify-center m-2">
		<div class="flex flex-col gap-4 lg:gap-8">
			<!-- TODO: Make lazyload and responsive -->
			{#if post?.cover_image}
				<div>
					<img src={post.cover_image} alt={post.title} />
				</div>
			{/if}
			<h1 class="heading-level-1 s-Z7Cde-PLUW5d">{post.title}</h1>

			<div class="prose lg:prose-xl xl:prose-2xl">
				<svelte:component this={data?.post?.body} />
			</div>
		</div>
	</section>
{/if}
