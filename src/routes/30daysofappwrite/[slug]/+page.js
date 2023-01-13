/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { slug } = params;

	const mdModules = import.meta.glob('../../../content/30daysofappwrite/**');
	/** @type {Post[]} */
	let posts = await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			// @ts-ignore
			const { default: body, metadata } = await mdModules[path]();
			return { ...metadata, body };
		})
	);
	posts = posts.sort((a, b) => a.day - b.day);
	const postIndex = posts.findIndex((p) => p.slug === slug);
	const post = posts[postIndex];
	const prev = postIndex > 0 ? posts[postIndex - 1] : null;
	const next = postIndex < posts.length ? posts[postIndex + 1] : null;

	if (!post?.body) {
		return {
			status: 404
		};
	}

	return {
		post,
		prev,
		next
	};
}
