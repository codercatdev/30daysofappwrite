---
weight: 8
title: 'Accounts & Users API'
description: 'Learn how to implement users and authorization in your app.'
slug: 'accounts-users-api'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-accounts-users-api-4592'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--u7jL91T2--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uzz774f9tsnynt6jzr4t.png'
created_at: '2021-05-08T14:08:41Z'
updated_at: '2021-05-08T14:08:41Z'
published_at: '2021-05-08T14:08:41Z'
tags: ['javascript', 'webdev', 'flutter', '30daysofappwrite']
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

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Accounts & Users API

Welcome to Day 8 👋. The Users and Accounts APIs seem to raise questions for newer Appwrite devs on our [Discord](https://appwrite.io/discord) server. Today, it's time to answer all of them. If you followed us yesterday, we reviewed the differences between the Client and Server Side SDKs and discussed the scopes accessible to each of them. So if you haven't already, we recommend you to read that first for some context.

## The Main Difference?

If you're looking for a TL;DR this table should help you.

| Users API                                          | Accounts API                                            |
| -------------------------------------------------- | ------------------------------------------------------- |
| Server Side API                                    | Client Side API                                         |
| Accessed using an API Key                          | Accessed using a Cookie (or JWT)                        |
| Operates in an Admin Scope                         | Operates in the scope of the currently logged in user   |
| Perform CRUD operations on all of your app's users | Perform CRUD operations on the currently logged in user |

If you're on a quest for more information, read along 😊

The Users API is part of the **Server Side SDK** specification and operates in an **admin scope** (i.e. using an API key) with access to all your project users. The Users API allows you to perform actions like create, update, delete and list your app's users, create, update and delete their preferences, etc. The complete documentation for the Users API can be found [in our docs](https://appwrite.io/docs/server/users).

Alternatively, the Accounts API operates in the scope of the currently logged-in user (using a cookie or JWT) and usually used in a client-side integration. The Accounts API allows you to create an account, create user sessions using username and password as well as OAuth2, update your accounts' email and password, initiate password recoveries, initiate email verifications, etc. The complete documentation for the Accounts API can be found [here](https://appwrite.io/docs/client/account).

## Deep Dive into the Accounts API

Let's try to understand the Accounts API a little better. Some of the most notable methods of the Accounts API are the [`createSession()`](https://appwrite.io/docs/client/account?sdk=web#accountCreateSession) and the [`createOAuth2Session()`](https://appwrite.io/docs/client/account?sdk=web#accountCreateOAuth2Session) methods. If successful, their response contains a `set-cookie` header that tells the browser to save and include this cookie with every subsequent request. In our Flutter ( and upcoming Android ) SDKs, we make use of a [Cookie Jar / Cookie Store](https://developer.android.com/reference/java/net/CookieStore) to achieve similar functionality.

Appwrite supports a variety of authentication methods. Since 0.8, we've added support for **Anonymous Users**. When you develop an application, there might be times when you want to let a user interact with parts of your app before they're signed in. This also increases the conversion rate of your users, since the hurdle of registration is very high. If an anonymous user decides to sign up to your app, they can later convert their account using their email and password or the OAuth method.

You can enable and disable any authentication method under the **Settings** tab of the **Users** section of the console.

![Login Methods](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/htrjfkacfa5n4fyykgbm.png)

Let's make our first request using the **Accounts API**. To see this in action in a complete app, check out the source code of [our demo apps](https://github.com/appwrite?q=todo&type=&language=&sort=).

We'll be using a JavaScript example for this tutorial. Whether using a framework or vanilla JS, it's really easy to get started - our [Getting Started for Web](https://appwrite.io/docs/getting-started-for-web) tutorial explains how. Once you have installed and initialised your SDK, you can follow along.

### create()

This is the method to use if you want to implement **Sign Up** functionality in your app. Do note that this will only create a new user. You will **still need to call** the `createSession()` method using the same email and password to create a new session for this user. Make sure you've followed previous posts to initialize your Appwrite SDK with your Appwrite project's endpoint and project ID before proceeding to these steps.

```js
let promise = sdk.account.create('unique()', 'email@example.com', 'password', 'name');

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

### createSession()

If you want to achieve **Login** functionality in your app, this is the method you need. This method creates a session for an existing user, so make sure you've created the user by calling `create()`.

```js
// Using the promise syntax
let promise = sdk.account.createSession('email@example.com', 'password');
promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);

// Or using async/await
const login = async () => {
	try {
		let response = await sdk.account.createSession('email@example.com', 'password');
		console.log(response);
	} catch (e) {
		console.log(e);
	}
};
login();
```

If you inspect the response from `createSession()`, you'll find the following headers.

```
set-cookie:
a_session_6062f9c2c09ce_legacy=eyJpZCI6IjYwNmI3Y....NmVhMzQ2In0=; expires=Wed, 27-Apr-2022 14:17:29 GMT; path=/; domain=.demo.appwrite.io; secure; httponly

set-cookie:
a_session_6062f9c2c09ce=eyJpZCI6IjYwNmI3Y....NmVhMzQ2In0=; expires=Wed, 27-Apr-2022 14:17:29 GMT; path=/; domain=.demo.appwrite.io; secure; httponly; samesite=None

x-fallback-cookies
{"a_session_6062f9c2c09ce":"eyJpZCI6IjYwNmI3Y....NmVhMzQ2In0="}

```

An Appwrite session cookie uses the following syntax: `a_session_<PROJECT-ID>`, `a_session_<PROJECT-ID>_legacy`. Since many browsers disable 3rd party cookies, we use the `x-fallback-cookies` header to store the cookie in local storage and then use it in subsequent requests if the cookie has not already been set.

### deleteSession()

In order to implement **Logout** functionality, you will need to delete a session using a session ID. You can delete the current session by passing in `current` in place of the `SESSION_ID`.

```js
let promise = sdk.account.deleteSession('[SESSION_ID]');

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

We've covered just a few essential methods to convey how the API works. The complete list of functionality can be found [here](https://appwrite.io/docs/client/account).

## Deep Dive into the Users API

We can achieve all the functionalities we discussed above with the Users API as well. However, you would be performing all the actions using an API key. If you're following along from yesterday, you would already have a project and API key set up. Otherwise, you can quickly get started [here](https://appwrite.io/docs/getting-started-for-server).

### create()

The create method can be used to create a new user. Do note that this is **not the same** as creating a session using the Accounts API. There is no cookie involved here. Think of this as an admin creating an account on behalf of one of their users. To create a session, the user will need to use these credentials to log in from a client-side app.

```js
let promise = users.create('email@example.com', 'password');

promise.then(
	function (response) {
		console.log(response);
	},
	function (error) {
		console.log(error);
	}
);
```

### deleteSession()

Let's say that you have a Cloud Function that monitors account logins and alerts a user about a suspicious login from a different location or IP. In this case, as a preventive measure, you might want to delete the session or block the account altogether until the real user takes action. The `deleteSession()` method comes handy in this case.

```js
let promise = users.deleteSession('[USER_ID]', '[SESSION_ID]');

promise.then(
	function (response) {
		console.log(response);
	},
	function (error) {
		console.log(error);
	}
);
```

So for some closing remarks, use the **Accounts API** when building a client-side app and the **Users API** when building a server-side app.
In the next blog post, we will use the Accounts API to add some cool functionalities to our Medium clone 🤩.

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
