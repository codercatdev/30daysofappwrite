import { contentSingle } from '$lib/utils/content';
import { contentTypes } from '$lib/types';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { slug } = params;
	const single = await contentSingle(slug, contentTypes.appwrite101);
	return { ...single };
}
