import { error } from '@sveltejs/kit';
import { contentTypes } from '$lib/types';

/** @param {string} contentType */
export const contentlist = async (contentType) => {
	/**
	 * TODO: This only accepts literals so we can't use dynamic parent
	 * @type {Record<string, () => Promise<unknown>>}
	 */
	let mdModules;
	switch (contentType) {
		case contentTypes._30daysofappwrite:
			mdModules = import.meta.glob(`../../content/30daysofappwrite/**`);
			break;
		default:
			mdModules = import.meta.glob(`../../content/appwrite-101/**`);
			break;
	}

	/** @type {Post[]} */
	const posts = await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			// @ts-ignore
			const { metadata } = await mdModules[path]();
			return { ...metadata };
		})
	);
	posts.sort((a, b) => a.weight - b.weight);
	return posts;
};

/**
 * @param {string} slug
 * @param {string} contentType
 * */
export const contentSingle = async (slug, contentType) => {
	/**
	 * TODO: This only accepts literals so we can't use dynamic parent
	 * @type {Record<string, () => Promise<unknown>>}
	 */
	let mdModules;
	switch (contentType) {
		case contentTypes._30daysofappwrite:
			mdModules = import.meta.glob(`../../content/30daysofappwrite/**`);
			break;
		default:
			mdModules = import.meta.glob(`../../content/appwrite-101/**`);
			break;
	}

	/** @type {Post[]} */
	let posts = await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			// @ts-ignore
			const { default: body, metadata } = await mdModules[path]();
			return { ...metadata, body };
		})
	);
	posts = posts.sort((a, b) => a.weight - b.weight);
	const postIndex = posts.findIndex((p) => p.slug === slug);
	const post = posts[postIndex];
	const prev = postIndex > 0 ? posts[postIndex - 1] : null;
	const next = postIndex < posts.length ? posts[postIndex + 1] : null;

	if (!post?.body) {
		throw error(404, {
			message: 'Not found'
		});
	}
	return {
		post,
		prev,
		next
	};
};
