<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const { posts } = data;
</script>

<section class="grid items-center justify-center h-full gap-4 justify-items-center">
	<img
		src="/images/logo.989bc816.png"
		alt="Person riding rocket into clouds"
		width="320"
		height="320"
	/>
	<h1 class="heading-level-1">30 Days of Appwrite</h1>
	<p class="max-w-3xl">
		#30DaysOfAppwrite is a month long event focussed at giving developers a walkthrough of all of
		<a class="link" href="https://appwrite.io">
			<span class="text">Appwrite's</span>
			<span class="icon-external-link" aria-hidden="true" />
		</a> features, starting from the basics to more advanced features like Cloud Functions! Alongside,
		we will also be building a fully featured Medium Clone to demonstrate how these concepts can be applied
		when building a real world app. We also have some exciting prizes for developers who follow along
		with us!
	</p>
	<a
		href="https://twitter.com/search?q=%2330DaysofAppwrite"
		target="_blank"
		rel="noreferrer"
		class="button is-big"
	>
		<span class="text">Add to Twitter</span><span class="icon-external-link" aria-hidden="true" />
	</a>
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
					<a class="" href={`/30daysofappwrite/${post.slug}`}>
						<li class="list-item">
							<div
								class="bg-green-500 flex items-center justify-center flex-shrink-0 w-14 h-14 border-8 border-r-8 rounded-full text-white border-white"
								data-v-71bf8190=""
							>
								{post.day}
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
</style>
