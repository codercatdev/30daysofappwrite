import '$lib/types';
import { contentlist } from '$lib/utils/content';
import { contentTypes } from '$lib/types';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return { posts: contentlist(contentTypes.guides) };
}
