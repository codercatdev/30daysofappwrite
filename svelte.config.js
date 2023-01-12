import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svelte.md'],
	kit: {
		adapter: adapter()
	},

	preprocess: [
		mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }),
		preprocess({
			postcss: true
		})
	]
};

export default config;
