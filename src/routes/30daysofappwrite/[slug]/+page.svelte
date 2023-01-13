<script>
	import 'prism-themes/themes/prism-shades-of-purple.min.css';

	/** @type {import('./$types').PageData} */
	export let data;
	const { post, prev, next } = data;
</script>

<section class="flex justify-center">
	<div class="flex flex-col gap-4 lg:gap-8">
		{#if post?.cover_image}
			<div>
				<img src={post.cover_image} alt={post.title} />
			</div>
		{/if}
		<div class="prose lg:prose-xl xl:prose-2xl">
			<svelte:component this={data?.post?.body} />
		</div>
	</div>
</section>
