<script>
	import Post from '$lib/components/content/Post.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

{#if !data?.post}
	How did you get here?
{:else}
	<Post post={data.post} prev={data.prev} next={data.next} />
{/if}
