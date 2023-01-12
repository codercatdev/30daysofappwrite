<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const { posts } = data;
	console.log(posts);
</script>

<section class="main-section">
	<img
		src="/images/logo.989bc816.png"
		alt="Person riding rocket into clouds"
		width="320"
		height="320"
	/>
	<h1 class="heading-level-1">30 Days of Appwrite</h1>
	<p>
		#30DaysOfAppwrite is a month long event focussed at giving developers a walkthrough of all of
		<a class="link" href="https://appwrite.io">
			<span class="text">Appwrite's</span>
			<span class="icon-external-link" aria-hidden="true" />
		</a> features, starting from the basics to more advanced features like Cloud Functions! Alongside,
		we will also be building a fully featured Medium Clone to demonstrate how these concepts can be applied
		when building a real world app. We also have some exciting prizes for developers who follow along
		with us!
	</p>
	<section class="">
		<h1 class="">⏰ Timeline</h1>
	</section>
</section>

<style>
	.main-section {
		display: grid;
		justify-content: center;
		align-items: center;
		justify-items: center;
		height: 100%;
	}
	.main-section p {
		max-width: 48rem;
	}
</style>
