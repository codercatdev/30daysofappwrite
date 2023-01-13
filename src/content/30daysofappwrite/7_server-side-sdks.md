---
weight: 7
title: 'Server Side SDKs'
description: 'Write in Javascript, Dart, Python, PHP, and more!'
slug: 'server-side-sdks'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-server-side-sdks-24di'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--UzXv2n-n--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/50m5y6y5lhkegibxkr41.png'
created_at: '2021-05-07T13:07:43Z'
updated_at: '2022-04-12T14:52:34Z'
published_at: '2021-05-07T13:54:27Z'
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

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside, we will also be building a full-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

# Server Side SDKs

Welcome to Day 7 👋 . Today we're going to take a look at Appwrite's [Server Side SDKs](https://appwrite.io/docs/sdks#server) and talk about the differences between the Client and Server SDKs. The difference between Client and Server Side SDKs is a common source of confusion among Appwrite developers. We're going to clarify their difference and use cases in today's post.

Appwrite's vision emphasizes the fact that Backend-as-a-Service should not be designed solely for front-end developers. Building upon this vision, Appwrite was designed to be platform-agnostic and integrates seamlessly with client-side and server-side applications. This is why Appwrite provides server-side SDKs. You can use Appwrite to build your backend services. Appwrite doesn't aim to replace your backend, instead works alongside it.

Appwrite officially supports 8 Server Side SDKs with more in the pipeline. If you didn't already know, all our SDKs are automatically generated from the Swagger Specification of our APIs. This allows our small team to maintain a total of 8 + 4 (Client + Server) SDKs.

We ❤️ PRs! If you would like to help us create SDKs in your favorite language, feel free to check out [SDK Generator](https://github.com/appwrite/sdk-generator).

## 🤔 How are they different?

### Authentication

The key difference between the client and server-side SDKs is the authentication mechanism. Server-side SDKs use a scoped API key to access the Appwrite API, whereas the client-side SDKs rely on a session authentication, where the client user logs in via email + password or an OAuth provider.

### Scopes

The second main difference is the scopes that the client and server-side SDKs are allowed to access. While the client SDK is intended to operate on behalf of the logged-in user, the server SDK API is intended to manage your entire Appwrite project with its scope defined by an API key. This is why certain API Routes are only available for server-side SDKs, such as deploying new functions or creating a new bucket for storage. You can see these differences in more detail in our [documentation](https://appwrite.io/docs).

To create a new API key, go to your **API Keys** tab in your project setting using your Appwrite console and click the **Add API Key** button. When adding a new API key, you can choose the scopes that you would like to grant to your application. It is a best practice to allow **only** the permissions you need to meet your project goals. If you need to replace your API key, create a new key, update your app credentials and, once ready, delete your old key.

When using Appwrite API from your Server-side with an API key you will automatically run in `admin mode`. Admin mode disables the default [user permission access control](https://appwrite.io/docs/permissions) restrictions and allows you to access all the server resources ( Documents, Users, Collections, Files, Teams) in your project, regardless of the read and write permissions. This is very useful when you want to manipulate your users' data like files and documents or even if you want to get a list of your users.

> It is not recommended to run admin mode from a client as it will lead to huge privacy and security risks. Check the [Admin Mode documentation](https://appwrite.io/docs/admin) to learn more.

The following table is a good visualisation of what you can and cannot do with the Client and Server-side SDKs and is a good summary of what we've covered.

| Name              | Description                                                                 | Server | Client |
| ----------------- | --------------------------------------------------------------------------- | ------ | ------ |
| account           | Access to read and write on behalf of the currently logged-in user          | ❌     | ✅     |
| users.read        | Access to read your project's users                                         | ✅     | ❌     |
| users.write       | Access to create, update, and delete your project's users                   | ✅     | ❌     |
| teams.read        | Access to read your project's teams                                         | ✅     | ✅     |
| teams.write       | Access to create, update, and delete your project's teams                   | ✅     | ✅     |
| collections.read  | Access to read your project's database collections                          | ✅     | ❌     |
| collections.write | Access to create, update, and delete your project's database collections    | ✅     | ❌     |
| documents.read    | Access to read your project's database documents                            | ✅     | ✅     |
| documents.write   | Access to create, update, and delete your project's database documents      | ✅     | ✅     |
| files.read        | Access to read your project's storage files and preview images              | ✅     | ✅     |
| files.write       | Access to create, update, and delete your project's storage files           | ✅     | ✅     |
| functions.read    | Access to read your project's functions and code tags                       | ✅     | ❌     |
| functions.write   | Access to create, update, and delete your project's functions and code tags | ✅     | ❌     |
| execution.read    | Access to read your project's execution logs                                | ✅     | ✅     |
| execution.write   | Access to execute your project's functions                                  | ✅     | ✅     |
| locale.read       | Access to access your project's Locale service                              | ✅     | ✅     |
| avatars.read      | Access to access your project's Avatars service                             | ✅     | ✅     |
| health.read       | Access to read your project's health status                                 | ✅     | ❌     |

## Getting started

Getting started with the server-side SDK and making your first request is really simple. For the sake of this example, we will choose the Node SDK - the same principles apply to all the other SDKs as well.

The first step is to create a Node project and install the `node-appwrite` package.

```sh
$ mkdir getting-started
$ cd getting-started
$ npm init -y
$ npm install node-appwrite --save
```

The next step is to head to your Appwrite Dashboard and create a new project. Give your project a name and click **Create** to get started. Once the project is created, head over to the **API keys** section and create a key with the required scopes (Make sure it has the `users.read` and `users.write` scopes since the example depends on that). Copy this key as we will need it in the next step. Also, take a note of your **Project ID** and **API Endpoint**, which can be found under the **Settings** section in your Appwrite Dashboard.

![Settings UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/be27zzqt7wd9golp4c5g.png)

It's time to initialise your SDK and make your first request. Fill in all the values you copied in the previous step. We will then try to create a user using the Appwrite SDK.

```js
const sdk = require('node-appwrite');

let client = new sdk.Client();

client
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('<Your Project ID>') // Your project ID
	.setKey('<Your API Key>'); // Your secret key

let users = new sdk.Users(client);

let promise = users.create('unique()', 'email@example.com', 'password');

promise.then(
	function (response) {
		console.log(response);
	},
	function (error) {
		console.log(error);
	}
);
```

There you have it! That was your first request using Appwrite's server-side SDK! If you would like to see this example in other languages that we support, you can check them out [here](https://appwrite.io/docs/getting-started-for-server).

If you feel adventurous and would like to use the Appwrite API using your favourite HTTP request library, [this guide](https://dev.to/eldadfux/learn-how-you-can-take-advantage-of-the-appwrite-api-without-using-any-sdk-a41) was written precisely for that!

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
