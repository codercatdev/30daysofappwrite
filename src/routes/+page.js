/** @type {import('./$types').PageLoad} */
export async function load() {
	const mdModules = import.meta.glob('../content/30daysofappwrite/**');
	const posts = await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			const slug = path.split('/').at(-1);
			const { metadata } = await mdModules[path]();
			return { ...metadata, slug };
		})
	);
	return { posts };
}
