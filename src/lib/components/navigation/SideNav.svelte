<script>
	import { page } from '$app/stores';
</script>

<nav id="nav" class="main-side">
	<div class="side-nav">
		<div class="side-nav-main">
			<section class="drop-section">
				<ul class="drop-list">
					<li class="drop-list-item">
						<a class="drop-button" class:is-selected={$page.route.id === '/'} href="/">
							<span class="icon-home" aria-hidden="true" />
							<span class="text">Home</span>
						</a>
					</li>
					<li class="drop-list-item">
						<a class="drop-button" class:is-selected={$page.route.id === '/guides'} href="/guides">
							<span class="icon-book-open" aria-hidden="true" />
							<span class="text">Guides</span>
						</a>
					</li>
					<li class="drop-list-item">
						<a
							class="drop-button"
							class:is-selected={$page.route.id === '/appwrite-101'}
							href="/appwrite-101"
						>
							<span class="icon-academic-cap" aria-hidden="true" />
							<span class="text">Appwrite 101</span>
						</a>
					</li>
					<li class="drop-list-item">
						<a
							class="drop-button"
							class:is-selected={$page.route.id === '/30daysofappwrite'}
							href="/30daysofappwrite"
						>
							<span class="icon-calendar" aria-hidden="true" />
							<span class="text">30 Days of Appwrite</span>
						</a>
					</li>
				</ul>
			</section>
		</div>
	</div>
</nav>
