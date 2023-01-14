<script>
	import { contentTypes } from '$lib/types';

	/** @type {import('./$types').PageData} */
	export let data;
	const { posts } = data;
</script>

<section class="grid items-center justify-center h-full gap-4 justify-items-center">
	<span class="icon-book-open huge" />
	<div>
		<h1 class="heading-level-1">Guides</h1>
		<p class="max-w-3xl">A Great way to start learning how to use Appwrite.</p>
	</div>
	<section class="m-2">
		<h2 class="heading-level-2">⏰ Timeline</h2>
		<div class="relative">
			<div
				class="absolute top-0 h-full border-r-4 border-gray-200"
				data-v-71bf8190=""
				style="z-index: -1; left: 26px;"
			/>
			<ul class="list">
				{#each posts as post}
					<a class="" href={`/${contentTypes.guides}/${post.slug}`}>
						<li class="list-item">
							<div
								class="flex items-center justify-center flex-shrink-0 text-white bg-green-500 border-8 border-r-8 border-white rounded-full w-14 h-14"
								data-v-71bf8190=""
							>
								{post.weight}
							</div>
							<span class="text">{post.title}</span>
						</li>
					</a>
				{/each}
			</ul>
		</div>
	</section>
</section>

<style>
	.list {
		display: grid;
		gap: 2rem;
	}
	.huge {
		font-size: 200px;
	}
</style>
