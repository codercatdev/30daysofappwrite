<script>
	import '../app.postcss';
	import '@aw-labs/ui/dist/appwrite.css';
	import TopNav from '$lib/components/TopNav.svelte';
</script>

<main class="grid-with-side" id="main">
	<TopNav />
	<div class="main-content" id="content">
		<slot />
	</div>
</main>
