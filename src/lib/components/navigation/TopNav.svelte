<script>
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	/** @type {string[]}*/
	let breadcrumbs = [];
	afterUpdate(async () => {
		breadcrumbs = $page.url.pathname.split('/').filter((p) => p !== '');
	});
</script>

<header class="main-header u-padding-inline-end-0">
	<button id="menuButton" class="icon-button is-no-desktop" aria-label="Open Menu">
		<span class="icon-menu" aria-hidden="true" />
	</button>
	<a href="/" class="logo">
		<img src="/images/appwrite-gray-light.svg" width="132" height="34" alt="Appwrite" />
	</a>
	<nav class="breadcrumbs is-only-desktop" aria-label="breadcrumb">
		<ol class="breadcrumbs-list">
			<li class="breadcrumbs-item"><a href="/" aria-level={1}>Home</a></li>
			{#each breadcrumbs as breadcrumb, level (level)}
				<li class="breadcrumbs-item">
					<a href={`/${breadcrumbs.splice(level).join('/')}`} aria-level={level + 2}>{breadcrumb}</a
					>
				</li>
			{/each}
		</ol>
	</nav>
	<div class="main-header-end">
		<nav class="u-flex u-gap-12">
			<div class="drop-wrapper">
				<a href="https://appwrite.io" class="button is-text is-only-desktop">
					<span class="text">Back to Appwrite</span>
					<span class="icon-external-link" aria-hidden="true" />
				</a>
			</div>
		</nav>
	</div>
</header>
