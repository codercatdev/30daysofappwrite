---
weight: 9
title: 'Login and Signup'
description: 'We’ll start building our demo blog with user authentication.'
slug: 'login-and-signup'
path: '/appwrite/30daysofappwrite-login-and-signup-2957'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-login-and-signup-2957'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--vSoJVKfK--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hwwhtrep7snc4bvhkc9k.png'
created_at: '2021-05-09T07:17:26Z'
updated_at: '2022-04-12T20:02:00Z'
published_at: '2021-05-09T12:55:59Z'
tags: ['30daysofappwrite', 'webdev', 'flutter', 'javascript']
authors:
  - name: 'Damodar Lohani'
	username: 'lohanidamodar'
	twitter_username: 'LohaniDamodar'
	github_username: null
	user_id: '551623'
	website_url: null
	profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Y2Vg3V3b--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/551623/d6834701-4563-4984-8f1d-7c6735acd3b6.jpg'
	profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WbIqGPLg--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/551623/d6834701-4563-4984-8f1d-7c6735acd3b6.jpg'
---

## Intro

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month long event focussed at giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a fully featured Medium Clone to demonstrate how these concepts can be applied when building a real world app. We also have some exciting prizes for developers who follow along with us!

## Login and Signup

Authenticating and authorizing your users to validate their requests or to save their data is an integral part of modern application development life cycle. This is something we do in every application. Appwrite makes this process very simple by abstracting away all the features regarding user management, providing us with a nice sleek API. The authentication features of Appwrite support Email & Password based authentication as well as various OAuth2 providers such as **Google**, **Facebook**, **GitHub**, **Twitter** and many more. You can find the list of all supported providers in your **Appwrite Console -> Users -> Settings**. [Upcoming version](https://dev.to/appwrite/appwrite-0-8-is-coming-soon-and-this-is-what-you-can-expect-35li) of Appwrite will also add support for Anonymous Login.

Authentication, user management, teams, and roles are all handled by Appwrite by default. In today's session we will continue on our demo from last session and add authentication functionality. We will implement Sign Up and Sign In. So let's get started.

If you have not already, please go through the previous episodes of [30 Days of Appwrite](https://30days.appwrite.io).

## Getting Started with the Project

Now the fun begins. We have created a base project from where we will start implementing more features using Appwrite in our app. To continue with following sections and upcoming days, you need to clone or download our base project. You can find our base project [here](https://github.com/christyjacob4/30-days-of-appwrite/tree/starter). From here on we will be building upon this starter project. So please clone or download it so that you can follow along.

## Create Signup and Login Components

First we will create our Login and Signup components and set up routes to those components.

### Signup component

Let's add a Register component `src/routes/Register.svelte`.

```html
<!-- Signup page -->
<script>
	import { api } from '../appwrite';

	let name,
		mail,
		pass = '';

	const submit = async () => {
		try {
			await api.register(mail, pass, name);
		} catch (error) {
			console.log(error.message);
		}
	};
</script>

<div>
	<h1>Register</h1>
	<form on:submit|preventDefault="{submit}">
		<label for="mail"><b>Name</b></label>
		<input bind:value="{name}" type="text" placeholder="Enter Name" name="name" required />

		<label for="mail"><b>E-Mail</b></label>
		<input bind:value="{mail}" type="email" placeholder="Enter E-mail" name="mail" required />

		<label for="pass"><b>Password</b></label>
		<input bind:value="{pass}" type="password" placeholder="Enter Password" name="pass" required />

		<button type="submit">Register</button>
	</form>
</div>

<style>
	div {
		margin-left: auto;
		margin-right: auto;
		width: 400px;
	}
	form {
		display: flex;
		flex-direction: column;
	}
</style>
```

As you can see, our `submit` function here is calling `api.register(name, mail, pass)`. So we need to implement register functionality.

## Handle Register

Let's create `src/appwrite.js` file where we will use `Appwrite` SDK to handle `register` functionality.

```js
import Appwrite from 'appwrite'; //importing from Appwrite's SDK
import { state } from './store'; // saving user data to svelte store

const sdk = new Appwrite();
sdk
	.setEndpoint('https://demo.appwrite.io/v1') //set your own endpoint
	.setProject('607dd16494c6b'); //set your own project id

export const api = {
	register: async (name, mail, pass) => {
		try {
			await sdk.account.create(mail, pass, name);
			await api.login(mail, pass);
		} catch (error) {
			throw error;
		}
	}
};
```

In the register function, we are calling the [`sdk.account.create`](https://appwrite.io/docs/client/account?sdk=web#accountCreate) method. We are passing in `mail`, `password` and `name` for the account to be created. The `create` method from the `Account` service is responsible for creating the account with the given details.

### Login component

Let's add a new component `scr/routes/Login.svelte`.

```html
<!-- Login page -->
<script>
	import { api } from '../appwrite';

	let mail,
		pass = '';

	const submit = async () => {
		try {
			await api.login(mail, pass);
		} catch (error) {
			console.log(error.message);
		}
	};
</script>
<div>
	<h1>Login</h1>
	<form on:submit|preventDefault="{submit}">
		<label for="mail"><b>E-Mail</b></label>
		<input bind:value="{mail}" type="email" placeholder="Enter E-mail" name="mail" required />

		<label for="pass"><b>Password</b></label>
		<input bind:value="{pass}" type="password" placeholder="Enter Password" name="pass" required />

		<button type="submit">Login</button>
	</form>
</div>

<style>
	div {
		margin-left: auto;
		margin-right: auto;
		width: 400px;
	}
	form {
		display: flex;
		flex-direction: column;
	}
</style>
```

If you look at the `submit` function, we are calling `api.login(mail, pass)` and our `api` is imported from `../appwrite`. So let's create our login function that will communicate with Appwrite to perform login.

## Handle Login

Again in `src/appwrite.js` we will create `login` function.

```js
export const api = {
	//..register code
	login: async (mail, pass) => {
		try {
			await sdk.account.createSession(mail, pass);
			const user = await api.getAccount();
			state.update((n) => {
				n.user = user;
				return n;
			});
		} catch (error) {
			state.update((n) => {
				n.user = null;
				return n;
			});
			throw error;
		}
	}
};
```

So, we first import the Appwrite SDK and create an instance with `const sdk = new Appwrite();`. After, we need to define the API endpoint and the project ID. You can find those in the Settings page of your Appwrite Dashboard.

In our login function we are using `sdk.account.createSession(mail, pass)`. The [`createSession`](https://appwrite.io/docs/client/account?sdk=web#accountCreateSession) method from the `Account` service is responsible for creating the user's session if the credentials are valid. Finally we call `api.getAccount()` - let's implement that function as well.

```js
export const api = {
	//...login and register code
	getAccount: async () => sdk.account.get()
};
```

For [`getAccount`](https://appwrite.io/docs/client/account?sdk=web#accountGet) we are simply calling `sdk.account.get()`. The `get` method from the `Account` service will get the user profile of the user with active session. It will throw an error if no session exists.

## Credits

We hope you liked this write up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
