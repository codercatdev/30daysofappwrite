<script>
	/** @type {string | undefined} */
	export let src;
	src = `https://www.youtube.com/embed/${src?.split('/').at(-1)}`;
</script>

<div class="video-wrapper w-[80vw] xl:w-[1024px] mx-auto">
	{#if src}
		<iframe
			width="100%"
			{src}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	{/if}
</div>

<style>
	.video-wrapper {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
	}
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
