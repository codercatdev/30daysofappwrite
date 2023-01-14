<script>
	import { page } from '$app/stores';
	import '../app.postcss';
	import '@aw-labs/ui/dist/appwrite.css';
	import '@aw-labs/icons/dist/icon.css';
	import TopNav from '$lib/components/navigation/TopNav.svelte';
	import SideNav from '$lib/components/navigation/SideNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import { MetaTags } from 'svelte-meta-tags';

	// TODO: https://github.com/sveltejs/kit/issues/2733
	import { afterNavigate } from '$app/navigation';
	/** @type {HTMLElement} */
	let contentElem;
	afterNavigate(() => {
		setTimeout(() => {
			contentElem.scrollTo(0, 0);
		}, 0);
	});

	/** @type {import('$lib/types/index').Post} */
	const content = $page?.data?.content;
	const title = content?.title || `Appwrite.io`;
	const description =
		content?.description ||
		'Secure Open Source Backend Server for Web, Mobile & Flutter Developers';
	const url = `https://guides.appwrite.io/${content?.slug || ''}`;

	const images = content?.cover_image
		? [
				{
					url: content?.cover_image,
					alt: content?.title || 'Cover Image'
				}
		  ]
		: [
				{
					url: 'https://appwrite.io/images/logo.png',
					alt: 'Appwrite Logo'
				}
		  ];
</script>

<MetaTags
	{title}
	{description}
	canonical={url}
	openGraph={{
		type: 'website',
		url,
		title,
		description,
		images
	}}
	twitter={{
		handle: '@CodingCatDev',
		site: '@CodingCatDev',
		cardType: 'summary_large_image'
	}}
/>

<main class="grid-with-side" id="main">
	<TopNav />
	<SideNav />
	<div class="main-content" id="content">
		<slot />
	</div>
	<Footer />
</main>
