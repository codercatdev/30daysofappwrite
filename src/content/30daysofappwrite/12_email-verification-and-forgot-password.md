---
weight: 12
title: 'Email Verification and Forgot Password'
description: 'Building a more user-friendly login experience.'
slug: 'email-verification-and-forgot-password'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-email-verification-and-forgot-password-420o'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--TwaLUTSO--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jfk7cod0ojhsc28eja8u.png'
created_at: '2021-05-12T12:53:21Z'
updated_at: '2022-04-12T20:12:30Z'
published_at: '2021-05-12T13:13:30Z'
tags: ['javascript', 'flutter', 'webdev', '30daysofappwrite']
authors:
  - name: 'Christy Jacob'
	username: 'christyjacob4'
	twitter_username: null
	github_username: 'christyjacob4'
	user_id: '119691'
	website_url: null
	profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--xsn7j9ry--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/119691/5be2bcad-e1ee-4ef8-928b-d71f4e355af6.png'
	profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--IX4ROHsY--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/119691/5be2bcad-e1ee-4ef8-928b-d71f4e355af6.png'
---

## Intro

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

# Account verification

Welcome to Day 12 👋. Email Verification and Password Recovery are two crucial features for any app! Let's learn how we can implement both of these using Appwrite.

> Note: This requires that you have SMTP setup on Appwrite. Check out [yesterday's blog](https://dev.to/appwrite/30daysofappwrite-getting-started-with-smtp-1e2e), where we teach you how to enable SMTP on Appwrite.

Let's start with Email Verification. Email Verification is not needed with OAuth2 login since the email address, in this case, is already verified by the login provider.

## Initialize Verification

To verify an account, you must call the [`createVerification(url)`](https://appwrite.io/docs/client/account?sdk=web#accountCreateVerification) method after you have already created a session for your user. This method will send a verification message to your users' email addresses to confirm they are the valid owners of that address. The provided URL should redirect the user back to your app and allow you to complete the verification process by verifying both the `userId` and `secret` parameters that have been provided to the user.

```js
let promise = sdk.account.createVerification('http://myappdomain/verifyEmail');

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

The URL gets these two parameters, required for the next step, appended to the URL as query parameters. For example, if you pass `http://myappdomain/verify` to the method, the URL provided to the user via email will look like this:

`http://localhost/verifyEmail?userId=XXXX&secret=YYYY`

## Complete Email Verification

Now that the user can initialize the verification process of their account, we need to complete it by handling the redirect from the URL provided in the email.

The first step is retrieving the `userId` and `secret` values provided in the URL. In JavaScript, we can get these like this:

```js
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const secret = urlParams.get('secret');
```

With these values we now can complete the e-mail verification using the [`updateVerification(userId, secret)`](https://appwrite.io/docs/client/account#accountUpdateVerification):

```js
const sdk = new Appwrite();

sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let promise = sdk.account.updateVerification(userId, secret);

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

Now we have successfully verified a user!

> Be sure that this method is executed only on the URL provided in the email. In our example, this would be `http://myappdomain/verifyEmail`.

## Full Example

Great, now let's implement the above functionality in our demo app. In `src/lib/Navigation.svelte` create a button to display the verification status of the user

```js
...
{#if !$state.user.emailVerification}
    <button on:click={startEmailVerification}>Not Verified ❌</button>
{:else}
    <p>Verified ✅</p>
{/if}
....
```

In the `<script>` section add a `startEmailVerification` function.

```js
...
import { api } from "../appwrite";

const startEmailVerification = async () => {
    try {
        const url = `${window.location.origin}/#/verifyEmail`
        await api.createVerification(url)
        alert("Verification Email sent")
    } catch (error) {
        alert(error.message)
    }
}
...

```

In `src/appwrite.js`, create the following functions:

```js
...
createVerification: async (url) => {
    await sdk.account.createVerification(url);
},
completeEmailVerification: async(userId, secret) => {
    await sdk.account.updateVerification(userId, secret);
},
...
```

We need to create a new page in our app to receive the redirect from the verification email and complete the verification.

Create a new file `src/routes/VerifyEmail.svelte` and add the following

```html
<script>
	import { api } from '../appwrite';
	let urlSearchParams = new URLSearchParams(window.location.search);
	let secret = urlSearchParams.get('secret');
	let userId = urlSearchParams.get('userId');
	console.log(userId, secret);
	const completeEmailVerification = async () => {
		await api.completeEmailVerification(userId, secret);
		window.location.href = '/';
	};
	completeEmailVerification();
</script>
```

Don't forget to create a route for this page in `src/App.svelte` 😊

```js
import VerifyEmail from "./routes/VerifyEmail.svelte";

...
const routes = {
    "/": Index,
    "/login": Login,
    "/register": Register,
    "/verifyEmail": VerifyEmail,
    "*": NotFound,
};
...
```

Great work! You have just enabled `Email Verification` for your users without writing a single line of Backend Code! Now it's time to enable `Password Recovery`.

# Password Reset

Now that users can verify their accounts, we also need to give them the ability to recover their accounts if they lose their password. This flow is very similar to the one used for verifying an account.

## Initialize Password Recovery

The first step is to send the user an email with a temporary secret key for password reset in a URL using the [`createRecovery(email, url)`](https://appwrite.io/docs/client/account#accountCreateRecovery) method.

```js
let promise = sdk.account.createRecovery('email@example.com', 'http://myappdomain/resetPassword');

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

If this call was successful, the user is sent an email providing a URL that has a `secret` and `userid` value appended to the URL passed in `createRecovery(email, url)`.

## Complete Password Recovery

The recover page should prompt the user to enter a new password twice and on submit, call the [`updateRecovery(userId, secret, password, passwordAgain)`](https://appwrite.io/docs/client/account#accountUpdateRecovery). Just like the previous scenario, we are grabbing the `userId` and `secret` values from the URL:

```js
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const secret = urlParams.get('secret');
```

With these values, we can complete the password recovery using the `updateRecovery(userId, secret, password, passwordAgain)` :

```js
const sdk = new Appwrite();

sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID
let password; // Assign the new password choosen by the user
let passwordAgain;
let promise = sdk.account.updateRecovery(userId, secret, password, paswordAgain);

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

Now we have successfully reset the user's password!

## Full Example

Great, time to code! In `src/routes/Login.svelte`, create a button to allow the user to recover their password:

```html
...

<button class="button" on:click|preventDefault="{forgotPassword}">Forgot Password?</button>

....
```

In the `<script>` section add a `forgotPassword` function.

```js
...
import { api } from "../appwrite";

const forgotPassword = async () => {
    const url = `${window.location.origin}/#/resetPassword`
    console.log(url);
    try {
        await api.forgotPassword(mail, url)
        alert("Recovery Email Sent")
    } catch (error) {
        alert(error.message);
    }
}
...

```

In `src/appwrite.js`, create the following functions:

```js
....

forgotPassword: async (email, url) => {
    await sdk.account.createRecovery(email, url)
},
completePasswordRecovery: async (userId, secret, pass, confirmPass) => {
    await sdk.account.updateRecovery(userId, secret, pass, confirmPass)
},

...
```

We need to create a new page in our app to receive the redirect from the password recovery email. Create a new file `src/routes/ResetPassword.svelte` and add the following code to it.

Don't be overwhelmed. It simply fetches `userId` and `secret` from the URL params, asks the user to enter the new password, makes a request to `updateRecovery` and redirects the user to the login page on success.

```html
<script>
	import { api } from '../appwrite';
	let urlSearchParams = new URLSearchParams(window.location.search);
	let secret = urlSearchParams.get('secret');
	let userId = urlSearchParams.get('userId');
	let password = '',
		confirmPassword = '';
	const submit = async () => {
		try {
			await api.completePasswordRecovery(userId, secret, password, confirmPassword);
			window.location.href = '/#/login';
		} catch (error) {
			alert(error.message);
		}
	};
</script>

<div>
	<h1>Reset your password</h1>

	<form on:submit|preventDefault="{submit}">
		<label for="password"><b>New Password</b></label>
		<input
			bind:value="{password}"
			type="password"
			placeholder="Enter New Password"
			name="password"
			required
		/>

		<label for="confirmPassword"><b>Confirm Password</b></label>
		<input
			bind:value="{confirmPassword}"
			type="password"
			placeholder="Confirm Password"
			name="confirmPassword"
			required
		/>

		<button class="button" type="submit">Reset Password</button>
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

Don't forget to create a route for this page in `src/App.svelte` 😊

```js
import ResetPassword from "./routes/ResetPassword.svelte";

...
const routes = {
    "/": Index,
    "/login": Login,
    "/register": Register,
    "/resetPassword": ResetPassword,
    "/verifyEmail": VerifyEmail,
    "*": NotFound,
};
...
```

Awesome! If all goes well, your users will now be able to reset their passwords!! You can always check [this PR](https://github.com/christyjacob4/30-days-of-appwrite/pull/5/files) to see how we implemented this functionality.

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
