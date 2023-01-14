<script>
	import { page } from '$app/stores';
	import '../app.postcss';
	import '@aw-labs/ui/dist/appwrite.css';
	import '@aw-labs/icons/dist/icon.css';
	import TopNav from '$lib/components/navigation/TopNav.svelte';
	import SideNav from '$lib/components/navigation/SideNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import { MetaTags } from 'svelte-meta-tags';
	import { afterUpdate } from 'svelte';

	/** @type {import('$lib/types/index').Post} */
	let content = $page?.data?.post;
	let title = content?.title || `Appwrite.io`;
	let description =
		content?.description ||
		'Secure Open Source Backend Server for Web, Mobile & Flutter Developers';
	let url = `https://guides.appwrite.io/${content?.slug || ''}`;

	let images = content?.cover_image
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
	afterUpdate(() => {
		setMeta();
	});
	const setMeta = () => {
		content = $page?.data?.post;
		title = content?.title || `Appwrite.io`;
		description =
			content?.description ||
			'Secure Open Source Backend Server for Web, Mobile & Flutter Developers';
		url = `https://guides.appwrite.io/${content?.slug || ''}`;

		images = content?.cover_image
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
		console.debug('metadata:set', document.querySelector('meta[property="og:title"]'));
	};
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
