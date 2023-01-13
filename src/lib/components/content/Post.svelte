<script>
	import Video from '$lib/components/content/Video.svelte';
	import 'prism-themes/themes/prism-shades-of-purple.min.css';

	/** @typedef {import('$lib/types/index').Post} Post */
	/** @type {{post: Post, prev:Post, next:Post}}*/
	export let data;
	const { post, prev, next } = data;
</script>

{#if !post}
	How did you get here?
{:else}
	<section class="flex justify-center m-2">
		<div class="flex flex-col gap-4 lg:gap-8 w-[80vw] xl:w-[1024px]">
			{#if post?.youtube}
				<div>
					<Video src={post.youtube} />
				</div>
			{:else if post?.cover_image}
				<!-- TODO: Make lazyload and responsive -->
				<img src={post.cover_image} alt={post.title} />
			{/if}
			<h1 class="heading-level-1 s-Z7Cde-PLUW5d">{post.title}</h1>
			<div class="prose lg:prose-xl xl:prose-2xl">
				<svelte:component this={data?.post?.body} />
			</div>
		</div>
	</section>
{/if}
