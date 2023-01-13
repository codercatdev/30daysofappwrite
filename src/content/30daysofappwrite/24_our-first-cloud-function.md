---
weight: 24
title: 'Our First Cloud Function'
description: 'Trigger cloud functions using async events or http requests.'
slug: 'our-first-cloud-function'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-our-first-cloud-function-59k6'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--YfHaNxU7--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rhjukp9b7udlijwnreo2.png'
created_at: '2021-05-24T08:10:47Z'
updated_at: '2022-04-12T17:47:56Z'
published_at: '2021-05-24T13:10:16Z'
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

## Reading Time

The first Cloud Function we will implement in our Medium clone will be a function that calculates the reading time of a post. Calculating the reading time of posts as you browse can be quite an expensive task, depending on the length of the content. In order not to slow down your application unnecessarily, we will run this process on our server.

We will use a formula suggested in this [blog post from Infusion Media](https://infusion.media/content-marketing/how-to-calculate-reading-time/).

First of all, we are going to add the following rule to our **Posts** collection:

- **ID:** readingTime
- **Rule Type:** String

![Rules UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qo03coyji7i7zi07hpyo.png)

Now that the Database is prepared let's start with our cloud function. For this, we will create a Cloud function with Node.js runtime. In your **Function Dashboard** under the **Settings Tab** we need to enable the trigger for the events **database.documents.create** and **database.documents.update**. As environment variables, we are going to add the following:

- **APPWRITE_PROJECT_ID**: Insert your project ID.
- **APPWRITE_ENDPOINT**: Insert your appwrite endpoint.
- **APPWRITE_API_KEY**: Insert an API key with _documents.write_ permission.
- **POSTS_COLLECTION**: Insert the ID of the Posts collection.

To stay true to the language of our demo project, we will write it in Node.js.

Change your current directory to the project folder we created two articles ago. Then, we are going to create a new function using the Appwrite CLI:

```sh
appwrite init function
```

Set the name to `reading-time`, and the runtime should be `node-16.0`. This will create a new folder called `reading-time` with a ready-to-go template for nodeJS.

Move into the `reading-time` folder and edit the `src/index.js` file, then replace the entire content with the following:

```js
const sdk = require('node-appwrite');

module.exports = async function (req, res) {
	const DATA = JSON.parse(req.env['APPWRITE_FUNCTION_EVENT_DATA']);
	const POSTS_COLLECTION = req.env['POSTS_COLLECTION'];
	const { $id, $collection, text, published } = DATA;

	if ($collection !== POSTS_COLLECTION || !published) {
		return res.send('Failed, invalid collection or not published', 400);
	}

	const client = new sdk.Client();
	const database = new sdk.Database(client);

	if (!req.env['APPWRITE_ENDPOINT'] || !req.env['APPWRITE_API_KEY']) {
		console.warn('Environment variables are not set. Function cannot use Appwrite SDK.');
	} else {
		client
			.setEndpoint(req.env['APPWRITE_ENDPOINT'])
			.setProject(req.env['APPWRITE_PROJECT_ID'])
			.setKey(req.env['APPWRITE_API_KEY'])
			.setSelfSigned(true);
	}

	let words = text.match(
		/[A-Za-z\u00C0-\u017F]+|[\u0400-\u04FF\u0500–\u052F]+|[\u0370-\u03FF\u1F00-\u1FFF]+|[\u4E00–\u9FFF]|\d+/g
	);

	words = words ? words.length : 0;

	let minutes = words / 200;
	let seconds = (minutes % 1) * 60;
	let readingTime = `${Math.floor(minutes)}m ${Math.floor(seconds)}s`;

	// Don't update Post if reading time has not changed
	if (readingTime === DATA.readingTime) {
		return res.send(`Post ${$id} has not changed`, 200);
	}

	await database
		.updateDocument($collection, $id, {
			readingTime: readingTime
		})
		.then((data) => res.json(data))
		.catch((err) => res.json(err, 500));
};
```

This function is triggered on every document **write** and **update** events, calculates the reading time, and saves it to the _readingTime_ attribute. We are also checking if the reading time changes - this is necessary not to create an infinite loop and unnecessarily hit the API with our Cloud Function.

We will then deploy the function to our instance, go ahead and change our directory to the project one and run the following command:

```sh
appwrite deploy function
```

Make sure to select our `reading-time` function and deploy it.

## Testing Our Cloud Function

We can quickly test our reading time calculation by navigating to the Posts collection and editing the text of a published post. You can either navigate to the Functions Dashboard and check the log or refresh the document we just updated and see how the **readingTime** attribute has magically been updated!

![Function execution result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9nlg8h3hua0qw8at89kf.png)

The only thing left for us is to add the reading time to our Medium clone at the top of each post:

```html
// src/routes/Post.svelte //...
<i> {post.readingTime} </i>
//...
```

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
