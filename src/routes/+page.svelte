<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const { posts } = data;
	console.log(posts);
</script>

<section class="grid items-center justify-center h-full gap-1 justify-items-center">
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
	<section class="m-2">
		<h2 class="heading-level-2">⏰ Timeline</h2>
		<ul class="list">
			{#each posts as post}
				<li class="list-item">
					<span class="icon-arrow-circle-right" aria-hidden="true" />
					<a class="" href={`/${post.slug}`}>
						<span class="text">{post.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</section>

<style>
	.list {
		display: grid;
		gap: 2rem;
	}
</style>
