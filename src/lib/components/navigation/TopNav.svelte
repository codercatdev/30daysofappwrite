<script>
	import { page } from '$app/stores';
	import { afterUpdate, onMount } from 'svelte';

	/** @type {string[]}*/
	let breadcrumbs = [];
	afterUpdate(async () => {
		breadcrumbs = $page.url.pathname.split('/').filter((p) => p !== '');
	});

	onMount(() => {
		/**
		 * TODO: Make this more svelty
		 */

		/**
		 * Menu for mobile drawer
		 */
		const menuButton = document.querySelector('#menuButton');
		const main = document.querySelector('#main');
		const nav = document.querySelector('#nav');

		const toggleDrawer = () => {
			main?.classList.toggle('is-open');
			nav?.classList.toggle('nav-top');
		};
		menuButton?.addEventListener('click', toggleDrawer);

		/**
		 * DropDown button for dark mode
		 */
		const dropdownBtn = document.querySelector('#dropdownBtn');
		const dropdown = document.querySelector('#dropdown');
		dropdownBtn?.addEventListener('click', () => {
			dropdown?.classList.toggle('u-hide');
		});
		/**
		 * Dark Mode
		 */
		let mode = localStorage.getItem('theme');
		let darkMode = mode ? true : false;
		const body = document.querySelector('body');
		const light = document.querySelector('#light');
		const dark = document.querySelector('#dark');

		light?.addEventListener('change', function (e) {
			/**Tailwind*/
			document.documentElement.classList.remove('dark');
			/**Appwrite*/
			body?.classList.remove('theme-dark');
			darkMode = false;
			localStorage.setItem('theme', JSON.stringify(darkMode));
		});
		dark?.addEventListener('change', function (e) {
			/**Tailwind*/
			document.documentElement.classList.add('dark');
			/**Appwrite*/
			body?.classList.add('theme-dark');
			darkMode = true;
			localStorage.setItem('theme', JSON.stringify(darkMode));
		});

		if (darkMode) {
			document.documentElement.classList.add('dark');
			body?.classList.add('theme-dark');
			dark?.setAttribute('checked', 'true');
		}

		return () => menuButton?.removeEventListener('click', toggleDrawer);
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
		<nav class="u-flex u-height-100-percents u-sep-inline-start">
			<div class="drop-wrapper">
				<button id="dropdownBtn" class="user-profile-button">
					Dark Mode Setting
					<span class="icon-cheveron-down is-only-desktop" aria-hidden="true" />
				</button>
				<div id="dropdown" class="drop is-block-end is-no-arrow u-hide">
					<section class="drop-section">
						<ul class="flex flex-col gap-4">
							<li class="flex items-center gap-4">
								<img src="/images/mode/light-mode.svg" alt="light mode" width="65" height="56" />
								<input type="radio" class="is-small" id="light" name="mode" checked />
							</li>
							<li class="flex items-center gap-4">
								<img src="/images/mode/dark-mode.svg" alt="dark mode" width="65" height="56" />
								<input type="radio" class="is-small" id="dark" name="mode" />
							</li>
							<li class="flex items-center gap-4">
								<img src="/images/mode/system-mode.svg" alt="system mode" width="65" height="56" />
								<input type="radio" class="is-small" name="mode" />
							</li>
						</ul>
					</section>
				</div>
			</div>
		</nav>
	</div>
</header>
