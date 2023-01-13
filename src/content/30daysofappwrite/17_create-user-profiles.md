---
weight: 17
title: 'Create User Profiles'
description: 'Let’s create a user profile using the Database API'
slug: 'create-user-profiles'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-create-user-profiles-1c3m'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--QiPhddpW--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ie20pd2icksrehhf0fyn.png'
created_at: '2021-05-17T12:22:10Z'
updated_at: '2022-04-12T17:32:54Z'
published_at: '2021-05-17T13:26:27Z'
last_comment_at: '2021-05-17T13:26:27Z'
tags: ['javascript', 'webdev', 'flutter', '30daysofappwrite']
authors:
  - name: 'Torsten Dittmann'
	username: 'torstendittmann'
	twitter_username: 'DittmannTorsten'
	github_username: 'TorstenDittmann'
	user_id: '206882'
	website_url: 'https://dittmann.dev'
	profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s---17jeBDQ--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/206882/20323e85-2ed6-4239-a5b6-4ae557bb943b.jpg'
	profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--DamjbYDz--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/206882/20323e85-2ed6-4239-a5b6-4ae557bb943b.jpg'
---

## Intro

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Create User Profiles

Welcome back to another session on the Appwrite Database 👋 . We hope you have gone through the [Day 16](https://dev.to/appwrite/30daysofappwrite-database-design-140a) article. We are building upon the knowledge gained on [Day 16](https://dev.to/appwrite/30daysofappwrite-database-design-140a) and plan to work on the database for our demo application, so make sure you've caught up with our progress.

## Create A Profile

We will use the **Profile** Collection to give the users on our app a profile with a display name so that we can display the author's information in each post.

For this, we need to add two methods to our `appwrite.js` file: one to fetch a profile and another to create one. Let's restrict the user from creating more than one profile per account. First, we need to check if they have already created a profile on their account. We are going to add a `fetchUser()` function that will list all documents in the **Profiles** Collection, with the _user_ field equal to the ID of our account and limiting the number of documents to 1.

```js
import { Query } from 'appwrite';

export const api = {
	//...
	fetchUser: async (id) => {
		let res = await sdk.database.listDocuments(profilesCollection, [Query.equal('user', id)], 1);
		if (res.total > 0 && res.documents.length > 0) return res.documents[0];
		else throw Error('Not found');
	}
};
```

Notice the query `Query.equal('user', id)` passed into `listDocuments()`, which will filter the requested documents by the **user** field, which matches the provided `id`.

As you might have noticed, we are using an unknown variable called `profilesCollection` in the `listDocuments` call. For this to work, we need to create two variables that represent the unique ID of our collections. Simply prepend the following before the `const api`:

```js
const profilesCollection = '[INSERT YOUR ID HERE]';
const postsCollection = '[INSERT YOUR ID HERE]';
const bucketId = '[INSERT YOUR ID HERE]';
```

Make sure you use the IDs found in your dashboard and replace the one found in **Profile** with `profilesCollection` and the one found in the **Post** Collection with `postsCollection `.

Now that we can check if a profile exists, the user needs to be able to create their profile if it doesn't exist. For this, we are going to introduce the `createUser` method to `appwrite.js`:

```js
export const api = {
	//...
	createUser: async (id, name) => {
		return sdk.database.createDocument(
			profilesCollection,
			'unique()',
			{
				user: id,
				name: name
			},
			['role:all'],
			[`user:${id}`]
		);
	}
};
```

This will create a document in the **Profile** collection when called. As you can see, the second argument is an object that adheres to the collection rules we created on [Day 16](https://dev.to/appwrite/30daysofappwrite-database-design-140a).

After this, the `read` and `write` permissions are passed. Since we want everyone to be able to view this profile, but only the user themselves to edit it - the read permissions will be `*` and the write permissions will be the user itself.

Now that we have all the Appwrite communication logic ready, we now need to add Routes and Components for it. For this, we create the `src/routes/Profile.svelte` file, which will display profiles.

```html
// src/routes/Profile.svelte
<script>
	import Loading from '../lib/Loading.svelte';

	import { api } from '../appwrite';
	import { state } from '../store';

	export let params = {};

	const fetchUser = api.fetchUser(params.id);
</script>

<section>
	{#await fetchUser}
	<Loading />
	{:then author}
	<section class="author">
		<h3>{author.name}</h3>
	</section>
	{#if $state.user.$id == params.id}
	<h1>My Posts</h1>
	<section class="my-post">TBD</section>
	{:else}
	<h1>Latest Posts</h1>
	<section class="latest">TBD</section>
	{/if} {:catch error} {error}
	<p>
		Public profile not found
		<a href="#/profile/create">Create Public Profile</a>
	</p>
	{/await}
</section>

<style>
	section.author {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	section.latest {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: auto;
		align-content: start;
		gap: 1rem;
	}
	section.my-post {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: auto;
		align-content: start;
		gap: 0.5rem;
	}
	a {
		border: none;
		padding: 10px;
		color: white;
		font-weight: bold;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
```

When we catch the error, we prompt the user to create their profile and navigate them to `#/profile/create`. Since this route is not created yet, create a new file called `src/routes/CreateProfile.svelte`. As done before, we are going to introduce that component to the router in `src/App.svelte`:

```js
//src/App.svelte

import CreateProfile from './routes/CreateProfile.svelte';
// First import the svelte component

const routes = {
	//...
	'/profile/create': CreateProfile // Add this component
	//...
};
```

Now we need to take care of the `CreateProfile.svelte` file:

```html
<script>
	import { state } from '../store';
	import { api } from '../appwrite';
	import { replace } from 'svelte-spa-router';
	let name = $state.user.name;
	const submit = async () => {
		try {
			await api.createUser($state.user.$id, name);
			replace(`/profile/${$state.user.$id}`);
		} catch (error) {
			console.log(error.message);
		}
	};
</script>

<form on:submit|preventDefault="{submit}">
	{#if $state.user}
	<label for="name">Display Name</label>
	<input type="text" name="name" bind:value="{name}" />
	<button class="button" type="submit">Create</button>
	{/if}
</form>

<style>
	form {
		margin: auto;
		width: 500;
		display: flex;
		flex-direction: column;
	}
</style>
```

This is a simple form where the user can input their Profile name and create it!

We have now added user profiles to our application using the Database and Collections we created before. On [Day 18](https://dev.to/appwrite/30daysofappwrite-create-blog-posts-31fi), we will add posts to the main page and let the users create posts! So stay tuned.

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
