<script>
	import Video from '$lib/components/content/Video.svelte';
	import 'prism-themes/themes/prism-shades-of-purple.min.css';
	import Authors from '$lib/components/content/Authors.svelte';

	/** @typedef {import('$lib/types/index').Post} Post */
	/** @type {Post}*/
	export let post;
	/** @type {Post}*/
	export let prev;
	/** @type {Post}*/
	export let next;
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
				<img src={post.cover_image} alt={post.title} loading="lazy" />
			{/if}
			<div>
				<h1 class="heading-level-1">{post.title}</h1>
				<div class="flex gap-2">
					<p class="">Created:</p>
					<p class="">{new Date(post.published_at).toLocaleString()}</p>
					<p class="">Updated:</p>
					<p class="">{new Date(post.updated_at).toLocaleString()}</p>
				</div>
			</div>
			{#if post?.authors}
				<Authors authors={post.authors} />
			{/if}
			<div class="prose dark:prose-invert lg:prose-xl xl:prose-2xl">
				<svelte:component this={post?.body} />
			</div>
			<div class="flex gap-2 justify-center">
				{#if prev}
					<a class="button" href={prev?.slug}>Previous</a>
				{/if}
				{#if next}
					<a class="button" href={next?.slug}>Next</a>
				{/if}
			</div>
		</div>
	</section>
{/if}
