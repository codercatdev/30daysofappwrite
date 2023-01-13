---
weight: 10
title: 'OAuth Providers'
description: 'Allow your users to login with their favorite OAuth provider.'
slug: 'oauth-providers'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-oauth-providers-3jf6'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--GLVA_Bnv--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vamtyve23aafhmfixwhy.png'
created_at: '2021-05-09T07:21:16Z'
updated_at: '2022-04-12T16:07:05Z'
published_at: '2021-05-10T13:22:34Z'
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

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a full-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Adding Social Login

With Appwrite, it's super easy to set up many OAuth2 providers to provide your users to authenticate with their social accounts. Appwrite supports tons of OAuth2 providers, including **Google**, **Facebook**, **Twitter**, **GitHub** and many more. The best part: most of the OAuth2 providers came as pull requests from the open-source community! ❤️

In today's session, we will look into how we can set up and use Google Sign In with our Appwrite-powered application.

## Setting up Google OAuth2 Settings

In the Appwrite console, visit the `Users->Settings` page. There, find Google from the list and turn the switch on. In order to complete this, you will need `App ID` and `App Secret`, which you can easily set up from Google API Console. Check out [their official documentation](https://support.google.com/googleapi/answer/6158849) for more details.

![OAuth 2 Dialog](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/klk4t7l4345d3h9e9gc6.png)

Once you get and fill the Google `App ID` and the `App Secret`, you need to provide the callback URL shown in the dialog to the Google OAuth2's Authorized redirect URIs.

![Google Auth Callback](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7c5csuw2sdbzc7jreaiv.png)

## Logging In using OAuth2 Provider

Now that we have set up OAuth2 login, we can make a request to authenticate a user. First, in `src/routes/Login.svelte` let's add a `Login with Google` button.

```html
<button on:click|preventDefault="{loginWithGoogle}">Login With Google</button>
```

Now we need to add a `loginWithGoogle` method to the our Login component's script:

```js
const loginWithGoogle = async () => {
	try {
		await api.loginWithGoogle();
	} catch (error) {
		console.log(error.message);
	}
};
```

Finally, in `src/appwrite.js` we need to add `loginWithGoogle`:

```js
export const api = {
	//....existing code
	loginWithGoogle: async () => {
		try {
			await sdk.account.createOAuth2Session(
				'google',
				'http://localhost:3000',
				'http://localhost:3000/#/login'
			);
		} catch (error) {
			throw error;
		}
	}
};
```

Here, we are calling the `sdk.account.createOAuth2Session`, and we are passing in few parameters. The first parameter is the **Provider**. For us, it's `google`. The second parameter is the URL to redirect to if the login is successful. The third parameter is the URL to redirect to if the login fails. Here we are providing localhost, for we are testing the app locally. Once we host our app online, we need to provide the updated URLs for successful and failed logins.

Now, if you tap **Login** with Google, you should be taken to the Google OAuth Consent screen. Once you select your valid Google account, you should be able to log in and are redirected back to `http://localhost:3000`. You can check our app's navigation bar to see if the new account name has loaded successfully.

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
