<script>
	import '@aw-labs/ui/dist/appwrite.css';
	import '@aw-labs/icons/dist/icon.css';
	import TopNav from '$lib/components/navigation/TopNav.svelte';
	import SideNav from '$lib/components/navigation/SideNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<main class="grid-with-side" id="main">
	<TopNav />
	<SideNav />
	<div class="main-content" id="content">
		<slot />
	</div>
	<Footer />
</main>
