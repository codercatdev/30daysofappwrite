import '$lib/types';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const mdModules = import.meta.glob('../../content/30daysofappwrite/**');
	/** @type {Post[]} */
	const posts = await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			// @ts-ignore
			const { metadata } = await mdModules[path]();
			return { ...metadata };
		})
	);
	posts.sort((a, b) => a.day - b.day);
	return { posts };
}
